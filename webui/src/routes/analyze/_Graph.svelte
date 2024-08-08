<svelte:window on:sveltekit:start={renderGraph}></svelte:window>

physics: <input type="checkbox" id="simulationToggle"> |
dominators view <input type="checkbox" id="viewToggle"> |
collapse non-dominators <input type="checkbox" id="collapsedNondominatorsViewToggle">
<hr>
<div id="graph"></div>

<style>
#graph {
    width: 100vw;
    height: 100vh;
}
</style>

<script>
import * as Viva from "vivagraphjs";

export let data;

function renderGraph() {

const elem = document.getElementById('graph');

var graph = Viva.Graph.graph();

var graphics = Viva.Graph.View.svgGraphics();

graphics
  .node(function(node) {
    //console.log(node);
    const fillColor = node.data.sourceMapInfo?.package
      ? stringToColor2(node.data.sourceMapInfo.package)
      : 'gray';
    const rectWidth = bytesToPx(node.data.selfSize);

    const svgNode = Viva.Graph.svg('svg').attr('overflow', 'visible');

    const rect = Viva.Graph.svg('rect')
      .attr('width', rectWidth)
      .attr('height', rectWidth)
      .attr('fill', fillColor);

    if (node.data.dominanceInfo.retainedSize !== node.data.selfSize) {
      const circleRadius = Math.sqrt(
        node.data.dominanceInfo.retainedSize / Math.PI
      );
      svgNode
        .append('circle')
        .attr('cx', rectWidth / 2)
        .attr('cy', rectWidth / 2)
        .attr('r', circleRadius)
        .attr('fill-opacity', '0%')
        .attr('stroke', fillColor);
    }

    if (node.data.entryPoint) {
      if (node.data.name === '#DEAD#') {
        rect
          .append('animate')
          .attr('attributeName', 'fill')
          .attr('values', `red;white;orange;white;red`)
          .attr('dur', '1s')
          .attr('repeatCount', 'indefinite');
      } else {
        rect
          .append('animate')
          .attr('attributeName', 'fill')
          .attr('values', `white;${fillColor};black;${fillColor};white`)
          .attr('dur', '3s')
          .attr('repeatCount', 'indefinite');
      }
    }

    const title = node.data.sourceMapInfo
      ? `${node.data.sourceMapInfo.name} (${node.id}@${
          node.data.position.line
        }:${node.data.position.column})\n----${
          node.data.entryPoint ? ' entry point' : '-------'
        }----\nself size: ${node.data.selfSize} bytes / ${toPercentage(
          node.data.selfSize
        )}\nretained size: ${
          node.data.dominanceInfo.retainedSize
        } bytes / ${toPercentage(
          node.data.dominanceInfo.retainedSize
        )}\nimmediately retained size: ${
          node.data.dominanceInfo.iRetainedSize
        } bytes / ${toPercentage(
          node.data.dominanceInfo.iRetainedSize
        )}\n---------------\n${node.data.sourceMapInfo.source}`
      : `${node.id} \n(${node.data.selfSize} bytes${
          node.data.entryPoint ? ', entry point' : ''
        })`;
    rect.append('title').text(title);

    svgNode.append(rect);

    svgNode
      .append('text')
      .attr('x', rectWidth / 2)
      .attr('y', rectWidth / 2)
      //.attr("textLength", rectWidth)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .attr('font-family', 'system-ui')
      .attr('font-size', Math.min(12, (10 * node.data.selfSize) / 1000) + 'px')
      .text(node.data.sourceMapInfo?.name ?? node.data.name);

    svgNode.data = node.data;

    return svgNode;
  })
  .placeNode(function(nodeUI, pos) {
    nodeUI
      .attr('x', pos.x - bytesToPx(nodeUI.data.selfSize) / 2)
      .attr('y', pos.y - bytesToPx(nodeUI.data.selfSize) / 2);
  });

// To render an arrow we have to address two problems:
//  1. Links should start/stop at node's bounding box, not at the node center.
//  2. Render an arrow shape at the end of the link.

// Rendering arrow shape is achieved by using SVG markers, part of the SVG
// standard: http://www.w3.org/TR/SVG/painting.html#Markers
var createMarker = function(id) {
    return Viva.Graph.svg('marker')
      .attr('id', id)
      .attr('viewBox', '0 0 10 10')
      .attr('refX', '10')
      .attr('refY', '5')
      .attr('markerUnits', 'strokeWidth')
      .attr('markerWidth', '10')
      .attr('markerHeight', '5')
      .attr('orient', 'auto')
      .attr('fill', 'lightgray');
  },
  marker = createMarker('Triangle');
marker.append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z');

// Marker should be defined only once in <defs> child element of root <svg> element:
var defs = graphics.getSvgRoot().append('defs');
defs.append(marker);

var geom = Viva.Graph.geom();

graphics
  .link(function(link) {
    // Notice the Triangle marker-end attribe:
    const path = Viva.Graph.svg('path')
      .attr('stroke', 'lightgray')
      .attr('marker-end', 'url(#Triangle)');
    path.data = link.data;
    path.append('title').text(`${link.fromId} -> ${link.toId})`);
    return path;
  })
  .placeLink(function(linkUI, fromPos, toPos) {
    // Here we should take care about
    //  "Links should start/stop at node's bounding box, not at the node center."

    // For rectangular nodes Viva.Graph.geom() provides efficient way to find
    // an intersection point between segment and rectangle
    var toNodeSize = bytesToPx(linkUI.data.targetSelfSize) + 30,
      fromNodeSize = bytesToPx(linkUI.data.sourceSelfSize) + 30;

    if (linkUI.data.entryPoint) {
      linkUI.attr('stroke', 'red');
    }
    var from =
      geom.intersectRect(
        // rectangle:
        fromPos.x - fromNodeSize / 2, // left
        fromPos.y - fromNodeSize / 2, // top
        fromPos.x + fromNodeSize / 2, // right
        fromPos.y + fromNodeSize / 2, // bottom
        // segment:
        fromPos.x,
        fromPos.y,
        toPos.x,
        toPos.y
      ) || fromPos; // if no intersection found - return center of the node

    var to =
      geom.intersectRect(
        // rectangle:
        toPos.x - toNodeSize / 2, // left
        toPos.y - toNodeSize / 2, // top
        toPos.x + toNodeSize / 2, // right
        toPos.y + toNodeSize / 2, // bottom
        // segment:
        toPos.x,
        toPos.y,
        fromPos.x,
        fromPos.y
      ) || toPos; // if no intersection found - return center of the node

    var data = 'M' + from.x + ',' + from.y + 'L' + to.x + ',' + to.y;

    linkUI.attr('d', data);
  });
// .removeLink(function(linkUI) {
//   linkUI.remove();
// });

let maxSelfSize = 0;
let rootNode = null;
let dominatorsView = false;
let collapsedNondominatorsView = false;
let running = undefined;

var layout = Viva.Graph.Layout.forceDirected(graph, {
  // springLength: 100,
  // springCoeff: 0.0005,
  // dragCoeff: 0.02,
  // gravity: -3.2
  springLength: Math.sqrt(maxSelfSize) * 0.8, // 20% longer than the high of the largest square //40,
  springCoeff: 0.00005,
  dragCoeff: 0.02,
  gravity: -3.5
});

toggleRetainersAndDominatorsView();

var renderer = Viva.Graph.View.renderer(graph, {
  graphics: graphics,
  layout: layout,
  container: elem,
  //prerender: 3000
});

renderer.run();

elem.children[0].setAttribute('style', 'width: 100vw;height: 100vh;');

running = true;
fitToScreen();

// top-center the root node
// let graphRect = layout.getGraphRect()
// let graphWidth = graphRect.x2 - graphRect.x1;
// layout.setNodePosition(rootNode.id,  graphRect.x1 + graphWidth / 2, graphRect.y1 + 20);
// layout.pinNode(rootNode, true);

setTimeout(toggleSimulation, 3000);

document
  .querySelector('#simulationToggle')
  .addEventListener('click', toggleSimulation, true);

document
  .querySelector('#viewToggle')
  .addEventListener('click', toggleRetainersAndDominatorsView, true);

document
  .querySelector('#collapsedNondominatorsViewToggle')
  .addEventListener('click', toggleCollapseNondominators, true);

function toggleSimulation() {
  running ? renderer.pause() : renderer.resume();
  running = !running;
  document.querySelector('#simulationToggle').checked = running;
}

function toggleRetainersAndDominatorsView() {
  dominatorsView = !dominatorsView;
  document.querySelector('#viewToggle').checked = dominatorsView;
  document.querySelector('#collapsedNondominatorsViewToggle').checked = false;
  document.querySelector(
    '#collapsedNondominatorsViewToggle'
  ).disabled = !dominatorsView;

  // const links = [];
  // graph.forEachLink(l => links.push(l));
  // links.forEach(l => graph.removeLink(l));

  const nodes = [];
  graph.forEachNode(node => {
    nodes.push(node);
  });
  nodes.forEach(node => graph.removeNode(node.id));

  // reverse order of nodes so that big nodes render first and don't overlay small ones
  // svg uses node creation order to control stacking, so if not reversed, big circles
  // will prevent selection and tooltips on nearby smaller nodes
  data.nodes.reverse().forEach(node => {
    // hack: artificially increase the size of the ROOT and DEAD nodes so that it's easy to spot
    if (node.name == '#ROOT#') {
      node.selfSize = 3000;
      rootNode = graph.addNode(node.name, node);
    } else {
      if (node.name == '#DEAD#' && node.dominanceInfo.retainedSize > 0) {
        node.selfSize = 3000;
      }
      graph.addNode(node.name, node);
    }

    if (node.selfSize > maxSelfSize) maxSelfSize = node.selfSize;
  });

  if (dominatorsView) {
    data.idomLinks.forEach(l => {
      graph.addLink(l.source, l.target, {
        sourceSelfSize: graph.getNode(l.source).data.selfSize,
        targetSelfSize: graph.getNode(l.target).data.selfSize,
        entryPoint: graph.getNode(l.source).data.entryPoint
      });
    });
  } else {
    data.links.forEach(l => {
      graph.addLink(l.source, l.target, {
        sourceSelfSize: graph.getNode(l.source).data.selfSize,
        targetSelfSize: graph.getNode(l.target).data.selfSize,
        entryPoint: graph.getNode(l.source).data.entryPoint
      });
    });
  }

  for (let i = 0; i < 3000; i++) {
    if (layout.step()) break;
  }

  if (running === false) toggleSimulation();
}

function toggleCollapseNondominators() {
  // if we are not in the dominators view then ignore
  if (!dominatorsView) {
    document.querySelector('#collapsedNondominatorsViewToggle').checked = false;
    return;
  }

  collapsedNondominatorsView = !collapsedNondominatorsView;
  document.querySelector(
    '#collapsedNondominatorsViewToggle'
  ).checked = collapsedNondominatorsView;

  const links = [];
  graph.forEachLink(l => links.push(l));
  const nodes = [];
  graph.forEachNode(n => {
    nodes.push(n);
  });
  //links.forEach(l => graph.removeLink(l));

  if (collapsedNondominatorsView) {
    // links.forEach(link => {
    //   const targetNode = graph.getNode(link.toId);
    //   if (targetNode.data.dominanceInfo.retainedSize === targetNode.data.selfSize) {
    //     graph.removeLink(link);
    //   }
    // });
    nodes.forEach(node => {
      if (node.data.dominanceInfo.retainedSize === node.data.selfSize) {
        graph.removeNode(node.id);
      }
    });
  } else {
  }

  if (running === false) toggleSimulation();
}

/**
 * quite hacky
 * origin: https://github.com/anvaka/VivaGraphJS/blob/a5c5c92cdecd6964b0bb0c1cb0aaa63c30ffc9e4/demos/other/precompute-advanced.html#L62-L77
 */
function fitToScreen() {
  var graphRect = layout.getGraphRect();
  var graphSize = Math.min(
    graphRect.x2 - graphRect.x1,
    graphRect.y2 - graphRect.y1
  );
  var screenSize = Math.min(
    document.body.clientWidth,
    document.body.clientHeight
  );
  //console.log(graphRect, graphSize, screenSize);

  var desiredScale = screenSize / graphSize;
  zoomOut(desiredScale, 1);

  function zoomOut(desiredScale, currentScale) {
    // zoom API in vivagraph 0.5.x is silly. There is no way to pass transform
    // directly. Maybe it will be fixed in future, for now this is the best I could do:
    if (desiredScale < currentScale) {
      currentScale = renderer.zoomOut();
      //setTimeout(function() {
      zoomOut(desiredScale, currentScale);
      //}, 16);
    }
  }
}

function stringToColor(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

function stringToColor2(str) {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return `hsl(${hash % 360}, 100%, 40%)`;
}

// convert the node/symbol size to px
function bytesToPx(bytes) {
  return Math.sqrt(bytes);
}

function toPercentage(partialSize) {
  return (
    Number.parseFloat(
      "" + ((partialSize / rootNode.data.dominanceInfo.retainedSize) * 100)
    ).toFixed(2) + '%'
  );
}
}
</script>

