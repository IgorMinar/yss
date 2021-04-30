#!/usr/bin/env node --experimental-specifier-resolution=node -r source-map-support/register
import yargs from 'yargs';
import fs from 'fs';
import {
  analyze,
  DeclarationAnalysis,
  ExpressionStatementAnalysis,
  FileAnalysis,
} from './analyzer';
import { computeDominators } from './dominance';
import { sourceMapperFactory } from './source-mapper';
import { ForInStatement } from 'ts-morph';

const argv = yargs(process.argv.slice(2))
  .command({
    command: 'analyze <file>',
    describe: 'analyze a JS bundle',
    builder: (yargs) => {
      return yargs.positional('file', {
        describe: 'JS bundle to analyze',
        demandOption: true,
        type: 'string',
      });
    },
    handler: async (argv) => {
      if (argv.verbose) {
        console.info(`analyzing file :${argv.file}`);
      }
      const filePath = argv.file as string;
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const sourceMapPath = `${filePath}.map`;
      let sourceMapContents, sourceMapper;
      if (fs.existsSync(sourceMapPath)) {
        sourceMapContents = fs.readFileSync(sourceMapPath, 'utf-8');
        sourceMapper = await sourceMapperFactory(sourceMapContents);
      }
      const analysis = analyze(filePath, fileContents, false, sourceMapper);
      const idomMap = computeDominators(analysis);

      const analysisMap = new Map<string, DeclarationAnalysis | ExpressionStatementAnalysis>();
      analysis.declarations.forEach((d) => {
        analysisMap.set(d.name, d);
      });
      analysis.expressionStatements.forEach((es) => {
        analysisMap.set(es.name, es);
      });
      //console.log(JSON.stringify(analysis, undefined, 2));

      const nodesAndLinks = {
        nodes: [] as unknown[],
        links: [] as { source: string; target: string }[],
        idomLinks: [] as { source: string; target: string; retainedSize: number; color?: string }[],
      };
      analysis.declarations.forEach((d) => {
        nodesAndLinks.nodes.push(d);
        d.retainers.forEach((r) => nodesAndLinks.links.push({ source: r, target: d.name }));
        nodesAndLinks.idomLinks.push({
          //source: d.dominanceInfo!.dominator,
          source: sankeyLabel(d.dominanceInfo!.dominator),
          //target: d.name,
          target: sankeyLabel(d.name),
          retainedSize: d.dominanceInfo!.retainedSize,
          color: d.sourceMapInfo?.package ? stringToColor2(d.sourceMapInfo!.package!) : 'grey',
        });
      });
      analysis.expressionStatements.forEach((es) => {
        nodesAndLinks.nodes.push({ ...es, entryPoint: true });
        es.retainers.forEach((r) => nodesAndLinks.links.push({ source: r, target: es.name }));

        // skip root node, it would link to itself
        if (es === analysis.rootNode) return;

        nodesAndLinks.idomLinks.push({
          //source: es.dominanceInfo!.dominator,
          source: sankeyLabel(es.dominanceInfo!.dominator),
          //target: es.name,
          target: sankeyLabel(es.name),
          retainedSize: es.dominanceInfo!.retainedSize,
          color: es.sourceMapInfo?.package ? stringToColor2(es.sourceMapInfo!.package!) : 'grey',
        });
      });

      // vivagraph output
      console.log(JSON.stringify(nodesAndLinks, undefined, 2));

      // sankey output:
      // nodesAndLinks.idomLinks.forEach((link) =>
      //   console.log(
      //     `"${csvEscape(link.source)}","${csvEscape(link.target)}",${link.retainedSize},"${
      //       link.color
      //     }"`,
      //   ),
      // );

      function csvEscape(string: string) {
        return string.replace(/"/g, '""');
      }

      // function sankeyLabel(nodeId: string) {
      //   const analysis = analysisMap.get(nodeId)!;
      //   return analysis.sourceMapInfo?.name !== nodeId
      //     ? `${analysis.sourceMapInfo?.name} [${analysis.selfSize}b] / ${analysis.sourceMapInfo?.package}:${nodeId}`
      //     : `${nodeId} [${analysis.selfSize}b]`;
      // }
      function sankeyLabel(nodeId: string) {
        return nodeId;
      }

      function stringToColor2(str: string) {
        let hash = 0;
        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        return `hsl(${hash % 360}, 100%, 40%)`;
      }
    },
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  })
  .help()
  .strict().argv;
