import { analyze } from 'src/analyzer';
import { computeDominators } from 'src/dominance';
import type {
	FileAnalysis,
	DeclarationAnalysis,
	ExpressionStatementAnalysis
} from 'src/analyzer-shared';
import { sourceMapperFactory } from 'src/source-mapper';

const analysisCache = global['analysisCache'] ?? new Map<string, FileAnalysis>();
global['analysisCache'] = analysisCache;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
	const scriptUrl = decodeURIComponent(params.bundleUrl);

	// TODO: we should check Etag as well
	if (analysisCache.has(scriptUrl)) {
		return {
			body: analysisCache.get(scriptUrl)
		};
	} else {
		console.log('cache miss!');
	}

	const response = await fetch(scriptUrl);
	console.log(scriptUrl);
	if (response.ok) {
		const bundleContent = await response.text();
		const originalSourceMapUrl = bundleContent.match(
			/\/\/# sourceMappingURL=(?<sourceMappingUrl>\S+)/
		).groups.sourceMappingUrl;
		console.log(scriptUrl);
		const sourceMapUrl = originalSourceMapUrl.startsWith('http')
			? originalSourceMapUrl
			: scriptUrl.replace(/(?<=\/)[^\/]+$/, originalSourceMapUrl);
		const sourceMapContent = sourceMapUrl ? await (await fetch(sourceMapUrl)).text() : null;

		const analysis = await analyzeUrl(scriptUrl, bundleContent, sourceMapContent);
		analysisCache.set(scriptUrl, analysis);
		return {
			body: analysis
		};
	} else {
		return {
			status: response.status,
			body: response.statusText
		};
	}
}

export async function analyzeUrl(url: string, scriptContent, sourceMapContent) {
	console.log('analyzing url! ', url, sourceMapContent.slice(0, 100));

	const sourceMapper = await sourceMapperFactory(sourceMapContent);
	const analysis = analyze(url, scriptContent, false, true, sourceMapper);

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
		idomLinks: [] as { source: string; target: string; retainedSize: number; color?: string }[]
	};
	analysis.declarations.forEach((d) => {
		nodesAndLinks.nodes.push(d);
		d.retainers.forEach((r) => nodesAndLinks.links.push({ source: r, target: d.name }));
		nodesAndLinks.idomLinks.push({
			//source: d.dominanceInfo!.dominator,
			source: d.dominanceInfo!.dominator,
			//target: d.name,
			target: d.name,
			retainedSize: d.dominanceInfo!.retainedSize,
			color: d.sourceMapInfo?.package ? stringToColor2(d.sourceMapInfo!.package!) : 'grey'
		});
	});
	analysis.expressionStatements.forEach((es) => {
		nodesAndLinks.nodes.push({ ...es, entryPoint: true });
		es.retainers.forEach((r) => nodesAndLinks.links.push({ source: r, target: es.name }));

		// skip root node, it would link to itself
		if (es === analysis.rootNode) return;

		nodesAndLinks.idomLinks.push({
			//source: es.dominanceInfo!.dominator,
			source: es.dominanceInfo!.dominator,
			//target: es.name,
			target: es.name,
			retainedSize: es.dominanceInfo!.retainedSize,
			color: es.sourceMapInfo?.package ? stringToColor2(es.sourceMapInfo!.package!) : 'grey'
		});
	});

	function stringToColor2(str: string) {
		let hash = 0;
		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}

		return `hsl(${hash % 360}, 100%, 40%)`;
	}

	return nodesAndLinks;
}
