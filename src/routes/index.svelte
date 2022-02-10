<script lang="ts">
  import { offset, flip, shift } from "@floating-ui/dom";
  import { createFloatingActions } from "$lib";

  const [ floatingRef, floatingContent, update ] = createFloatingActions({
    strategy: "absolute",
    placement: "top",
    middleware: [
      offset(6),
      flip(),
      shift(),
    ]
  });

  let showTooltip: boolean = false;
</script>

<svelte:window on:resize={() => update()} />

<button 
  on:mouseenter={() => showTooltip = true}
  on:mouseleave={() => showTooltip = false}
  use:floatingRef
>Hover me</button>

{#if showTooltip}
  <div style="position:absolute" use:floatingContent>
    Tooltip this is some longer text than the button
  </div>
{/if}