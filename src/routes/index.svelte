<script lang="ts">
  import { writable } from "svelte/store";
  import { offset, flip, shift } from "@floating-ui/dom";
  import { createFloatingActions, arrow } from "$lib/index";

  const arrowRef = writable<HTMLElement>(null);
  const [ floatingRef, floatingContent, update ] = createFloatingActions({
    strategy: "absolute",
    placement: "bottom",
    middleware: [
      offset(6),
      flip(),
      shift(),
      arrow({ element: arrowRef }),
    ],
    onComputed({ placement, middlewareData }) {
      const { x, y, } = middlewareData.arrow;
      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[placement.split("-")[0]];

      Object.assign($arrowRef.style, {
        left: x != null ? `${x}px` : "",
        top: y != null ? `${y}px` : "",
        [staticSide]: "-4px"
      });
    }
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
  <div class="tooltip" use:floatingContent>
    Tooltip this is some longer text than the button
    <div class="arrow" bind:this={$arrowRef} />
  </div>
{/if}

<style>
  .tooltip {
    position: absolute;
    background: #222;
    color: white;
    font-weight: bold;
    padding: 5px;
    border-radius: 4px;
    font-size: 90%;
    pointer-events: none;
  }

  .arrow {
    position: absolute;
    background: #333;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
  }
</style>