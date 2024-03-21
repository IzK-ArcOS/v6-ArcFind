<script lang="ts">
  import { sleep } from "$ts/util";
  import { onMount } from "svelte";
  import Result from "./Components/Result.svelte";
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";
  export let runtime: Runtime;

  const { Query, Results } = runtime;

  let input: HTMLInputElement;

  onMount(async () => {
    await sleep(100);
    input.focus();
  });
</script>

<div class="search-bar">
  <span class="material-icons-round">search</span>
  <input
    type="text"
    placeholder="Search settings, files and apps"
    bind:value={$Query}
    bind:this={input}
    on:keydown={(e) => runtime.MutateIndex(e)}
  />
</div>

<div class="results" class:show={$Results.length}>
  {#each $Results as result, index}
    <Result {result} {runtime} {index} />
  {/each}
</div>
