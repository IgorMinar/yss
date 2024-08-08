import { analyzeUrl } from '$lib/analyze-url';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
	const url = decodeURIComponent(params.bundleUrl);

	const response = await fetch(url);

	if (response.ok) {
		return {
			body: await response.text()
		};
	} else {
		return {
			status: response.status,
			body: response.statusText
		};
	}
}
