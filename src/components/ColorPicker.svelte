<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleChangeColor() {
    dispatch("changeColor");
  }

  export let rgb = "";
</script>

<input
  type="color"
  id="head"
  name="head"
  class="w-full ml-10 "
  bind:value={rgb}
  on:input={handleChangeColor}
  on:change={handleChangeColor}
/>
