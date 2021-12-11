# svelte-floating-ui

[Floating UI](https://github.com/floating-ui/floating-ui/) for Svelte with [actions](https://svelte.dev/docs#use_action). No wrapper components or component bindings required!

Heavily based on [svelte-popperjs by Bryan Lee](https://github.com/bryanmylee/svelte-popperjs).

## Installation

```bash
npm i -D svelte-floating-ui
```

Since Svelte automatically bundles all required dependencies, you only need to install this package as a dev dependency with the -D flag.

## Usage

`createFloatingUIActions` takes an optional [options object](https://floating-ui.com/docs/computePosition#options) for configuring the content placement. The content action also takes an optional [options object](https://floating-ui.com/docs/computePosition#options) for updating the options of the content placement.

`createFloatingUIActions` also returns an `update` method as it's third value which can be used to [manually update](https://floating-ui.com/docs/computePosition#updating) the content position.

### Example

```svelte
<script lang="ts">
  import { createFloatingUIActions, offset, shift, flip } from "svelte-floating-ui";

  const [ floatingRef, floatingContent ] = createFloatingUIActions({
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
```

## API

### Setting Floating UI options

Floating UI options can be set statically when creating the actions, or dynamically on the content action.

If both are set, then the dynamic options will be merged with the initial options.

```svelte
<script>
  // set once and no longer updated
  const [ floatinRef, floatingContent ] = createFloatingUIActions(initOptions);
</script>

<!-- will be merged with initOptions -->
<div use:floatingContent={ dynamicOptions }/>
```

### Updating the Floating UI position

The content element's position can be manually updated by using the third value returned by `createFloatingUIActions`. This method takes an optional options object which will be merged with the initial options.

```svelte
<script>
  // Get update method
  const [ , , update] = createFloatingUIActions(initOptions);
</script>

<!-- Will be merged with initOptions -->
<svelte:window on:resize={() => update(updateOptions)} />
```