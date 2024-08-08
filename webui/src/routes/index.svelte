<script>
    import {goto} from '$app/navigation';
    import {analyzeUrl} from '$lib/analyze-url';
    let bundleUrl = "";
    
    function formSubmitted() {
        goto(`analyze/${encodeURIComponent(bundleUrl)}`);
    }
</script>

<form on:submit|preventDefault={formSubmitted} action="analyze" method="post">
    <input type="text"
           size="100"
           placeholder="https://example.app/main-c3ad3ac.min.js"
           bind:value={bundleUrl}>
</form>

<style>
form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

html,
body,
div,
svg {
  width: 100%;
  height: 100%;
}
</style>