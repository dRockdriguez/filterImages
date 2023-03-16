<script>
  import { Checkbox } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let isChecked = false;
  export let text = "";

  function handleChange() {
    isChecked = !isChecked;
    dispatch("filterChanged");
  }
</script>

{#if isChecked}
  <Checkbox checked on:change={handleChange}>{text}</Checkbox>
{:else}
  <Checkbox on:change={handleChange}>{text}</Checkbox>
{/if}
