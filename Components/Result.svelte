<script lang="ts">
  import { SearchItem } from "$types/search";
  import { Runtime } from "../ts/runtime";

  export let result: SearchItem;
  export let runtime: Runtime;
  export let index: number;

  const { SelectionIndex } = runtime;
</script>

<button
  class="result"
  on:click={() => runtime.Trigger(result)}
  class:selected={index == $SelectionIndex}
>
  <img src={result.image} alt="" />
  <div class="context">
    <p class="caption">{result.caption}</p>
    {#if result.description}
      <p class="description">{result.description}</p>
    {/if}
  </div>
</button>
