import { DeclarationAnalysis, FileAnalysis } from './analyzer';
import { assertIsDefined } from './utils';

export interface DominanceInfo {
  dominator: string;
  /** total retained size including self */
  retainedSize: number;
  /** immediately retained size - sum of self and size of retainees that don't dominate any other nodes */
  iRetainedSize: number;
}

/**
 * // dominator of the start node is the start itself
 * Dom(n0) = {n0}
 * // for all other nodes, set all nodes as the dominators
 * for each n in N - {n0}
 *   Dom(n) = N;
 * // iteratively eliminate nodes that are not dominators
 * while changes in any Dom(n)
 *     for each n in N - {n0}:
 *         Dom(n) = {n} union with intersection over Dom(p) for all p in pred(n)
 * @param fileAnalysis
 */
export function computeDominators(fileAnalysis: FileAnalysis) {
  const allStatements = fileAnalysis.expressionStatements
    .map((es) => es.name)
    .concat(fileAnalysis.declarations.map((d) => d.name));

  const domMap = new Map<string, Set<string>>();

  const fullDominatorSet = new Set<string>(allStatements);

  for (const expressionStatement of fileAnalysis.expressionStatements) {
    domMap.set(
      expressionStatement.name,
      new Set<string>([fileAnalysis.rootNode.name, expressionStatement.name]), // TODO: remove expressionStatement.name ?
    );
  }

  for (const declaration of fileAnalysis.declarations) {
    domMap.set(declaration.name, new Set(fullDominatorSet));
  }

  let dominatorsUpdated = false;

  console.error('computing dominance map...');
  do {
    dominatorsUpdated = false;
    for (const declaration of fileAnalysis.declarations) {
      const selfName = declaration.name;
      const dominatorSet = domMap.get(selfName);
      assertIsDefined(dominatorSet);
      const dominatorsCount = dominatorSet.size;

      // compute union of self and intersection over all dominators of all retainers
      // if (selfName === 'Di') {
      //   console.error('name: ', selfName, 'retainers', declaration.retainers.join(','));
      //   console.error('name: ', selfName, 'dom candidates', [...dominatorSet].join(','));
      // }
      let firstRetainerDominatorSet = domMap.get(declaration.retainers[0]);

      assertIsDefined(
        firstRetainerDominatorSet,
        `can't find any retainers for ${JSON.stringify(declaration)}`,
      );
      // console.error(
      //   'dominators of retainer: ',
      //   declaration.retainers[0],
      //   [...firstRetainerDominatorSet].join(','),
      // );

      const updatedDominators = [selfName].concat(
        [...firstRetainerDominatorSet].filter((dominator) => {
          for (let i = 1, n = declaration.retainers.length; i < n; i++) {
            // if (selfName === 'Di')
            //   console.error(
            //     'dominators of retainer: ',
            //     declaration.retainers[i],
            //     [...domMap.get(declaration.retainers[i])!].join(','),
            //   );
            if (!domMap.get(declaration.retainers[i])?.has(dominator)) {
              //if (selfName === 'Di') console.error('eliminating dominator: ', dominator);
              return false;
            }
          }
          return true;
        }),
      );

      // if some dominators have been eliminated the count will be stale, update the domMap and keep on churning
      if (dominatorsCount > updatedDominators.length) {
        // if (selfName === 'Di')
        //   console.error(
        //     `   updated dominator count for ${declaration.name}: ${dominatorsCount} >>> ${
        //       updatedDominators.length
        //     } (${updatedDominators.join(',')})`,
        //   );
        domMap.set(declaration.name, new Set(updatedDominators));
        dominatorsUpdated = true;
      }
    }
  } while (dominatorsUpdated);

  //console.error('computing dominator tree...');
  /**
   * map of: declaration --> immediate dominator
   */
  const idomMap = new Map<string, string>();
  for (const expressionStatement of fileAnalysis.expressionStatements) {
    // TODO: this is messy since we already initialized the domMap, refactor to unify expressionStatements with declarations
    if (expressionStatement.name !== fileAnalysis.rootNode.name) {
      idomMap.set(expressionStatement.name, fileAnalysis.rootNode.name);
    }
  }
  for (const declaration of fileAnalysis.declarations) {
    const dominators = domMap.get(declaration.name);
    assertIsDefined(dominators);
    // console.error(
    //   `    looking for idom(${declaration.name}) among (${dominators?.size}): ${[
    //     ...dominators,
    //   ].join(', ')}`,
    // );
    // TODO: currently assumes that only one root expressionStatement retains each node, in practice
    //       we need to support multiple root retainers

    // idom(x) === dom(idom(x))
    let idom;

    if (dominators.size === 1) {
      idom = [...dominators][0];
    } else {
      for (const dominator of dominators) {
        // skip self
        if (dominator === declaration.name) continue;

        const domDoms = domMap.get(dominator);
        //console.error(`      dom ${dominator} - domdom ${domDoms?.size} `);
        assertIsDefined(domDoms, dominator);
        // TODO: is it sufficient to just check the size?
        if (domDoms.size === dominators.size - 1) {
          idom = dominator;
          break;
        }
      }
    }

    assertIsDefined(idom, `Can't find idom for ${declaration.name}`);
    idomMap.set(declaration.name, idom);
    //console.error(`        found ${idom}`);
  }

  /**
   * map of: declaration/expression -> <set of dominated declarations>
   */
  const reversedIdomMap = new Map<string, string[]>();
  idomMap.forEach((dominatorId, retaineeId) => {
    const retainees = reversedIdomMap.get(dominatorId);
    if (retainees === undefined) {
      reversedIdomMap.set(dominatorId, [retaineeId]);
    } else {
      retainees.push(retaineeId);
    }
  });

  const selfSizes = new Map<string, number>();
  for (const expressionStatement of fileAnalysis.expressionStatements) {
    selfSizes.set(expressionStatement.name, expressionStatement.selfSize);
  }
  for (const declaration of fileAnalysis.declarations) {
    selfSizes.set(declaration.name, declaration.selfSize);
  }

  for (const expressionStatement of fileAnalysis.expressionStatements) {
    expressionStatement.dominanceInfo = {
      retainedSize: calculateRetainedSize(expressionStatement.name, reversedIdomMap, selfSizes),
      iRetainedSize: calculateImmediatelyRetainedSize(
        expressionStatement.name,
        reversedIdomMap,
        selfSizes,
      ),
      dominator: idomMap.get(expressionStatement.name)!,
    };
    //console.error('es dump', JSON.stringify(expressionStatement, null, 2));
  }
  for (const declaration of fileAnalysis.declarations) {
    declaration.dominanceInfo = {
      retainedSize: calculateRetainedSize(declaration.name, reversedIdomMap, selfSizes),
      iRetainedSize: calculateImmediatelyRetainedSize(declaration.name, reversedIdomMap, selfSizes),
      dominator: idomMap.get(declaration.name)!,
    };
  }

  return idomMap;
}

function calculateRetainedSize(
  nodeId: string,
  reversedIdomMap: Map<string, string[]>,
  selfSizeMap: Map<string, number>,
) {
  let retainedSize = selfSizeMap.get(nodeId)!;
  assertIsDefined(retainedSize);

  const retainees = reversedIdomMap.get(nodeId);
  if (retainees) {
    //console.error('got some retainees for: ' + nodeId, retainees, retainedSize);
    retainees.forEach((retainee) => {
      retainedSize += calculateRetainedSize(retainee, reversedIdomMap, selfSizeMap);
    });
    //console.error('     => ', retainedSize);
  }

  return retainedSize;
}

function calculateImmediatelyRetainedSize(
  nodeId: string,
  reversedIdomMap: Map<string, string[]>,
  selfSizeMap: Map<string, number>,
) {
  let iRetainedSize = selfSizeMap.get(nodeId)!;
  assertIsDefined(iRetainedSize);

  const retainees = reversedIdomMap.get(nodeId);
  if (retainees) {
    //console.error('got some retainees for: ' + nodeId, retainees, retainedSize);
    retainees.forEach((retainee) => {
      if (reversedIdomMap.get(retainee) === undefined) {
        //if a retainee doesn't has its retainees, increase `iRetainedSize`
        iRetainedSize += selfSizeMap.get(retainee)!;
      }
    });
    //console.error('     => ', retainedSize);
  }

  return iRetainedSize;
}
