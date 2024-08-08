<script context="module">
/**
 * @type {import('@sveltejs/kit').Load}
 */
export async function load({ page, fetch, session, context }) {
    const bundleUrl = page.params.bundle.replace(/^\//, '');
    const res = await fetch('/process/' + bundleUrl);

    if (res.ok) {
        const analysis = await res.json();
        
        return {
            props: {
                bundleUrl,
                analysis
            }
        };
    }

    return {
        status: res.status,
        error: new Error(`Could not load: ${bundleUrl}`),
    };
}
</script>

<script>
import Graph from './_Graph.svelte';

export let bundleUrl;
export let analysis;

  
</script>

{bundleUrl}
<hr>
<Graph data={analysis}></Graph>