import { analyze } from 'src/analyzer';
import { sourceMapperFactory } from 'src/source-mapper';

export async function analyzeUrl(url: string, scriptContent, sourceMapContent) {
	console.log('analyzing url! ', url, sourceMapContent.slice(0, 100));

	const sourceMapper = await sourceMapperFactory(sourceMapContent);
	const analysis = analyze(url, scriptContent, false, true, sourceMapper);
	return analyze;
}
