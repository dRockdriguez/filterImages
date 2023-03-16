<script>
  import { Input, Label } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import ColorPicker from "./ColorPicker.svelte";
  import { extraFiltersValue } from "../store";

  let text = $extraFiltersValue.text;
  let textColor = $extraFiltersValue.textColor;
  let bgColor = $extraFiltersValue.bgColor;

  let colorOpacity = $extraFiltersValue.colorOpacity;

  export let showText = false;
  export let showColorPicker = false;

  const dispatch = createEventDispatcher();

  function handleFilter() {
    dispatch("extraFilterChanged", { text, bgColor, textColor, colorOpacity });
  }
</script>

<div class="mt-10 border border-gray-300 rounded-lg p-5">
  {#if showText}
    <div class="border-b py-6">
      <Label>Text</Label>
      <Input
        class="mt-3"
        on:input={handleFilter}
        on:change={handleFilter}
        bind:value={text}
        type="text"
        id="userText"
        placeholder="Whatever..."
        required
      />
    </div>

    <div class="flex justify-center py-6 border-b">
      <Label>Text Color</Label>
      <ColorPicker bind:rgb={textColor} on:changeColor={handleFilter} />
    </div>
  {/if}

  {#if showColorPicker}
    <div class="flex justify-center py-6">
      <Label>Background Color</Label>
      <ColorPicker bind:rgb={bgColor} on:changeColor={handleFilter} />
    </div>

    <div class="flex justify-center py-6 border-b">
      <Label>Color opacity</Label>
      <Input
        on:input={handleFilter}
        on:change={handleFilter}
        bind:value={colorOpacity}
        type="number"
        id="colorOpacity"
        required
        min="0"
        max="100"
      />
    </div>
  {/if}
</div>
