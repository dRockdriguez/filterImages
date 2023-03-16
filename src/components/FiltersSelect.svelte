<script>
  import { Button, Dropdown, Chevron } from "flowbite-svelte";
  import CheckBoxFilter from "./CheckBoxFilter.svelte";
  import { createEventDispatcher } from "svelte";
  import ExtraFilters from "./ExtraFilters.svelte";
  import { extraFiltersValue } from "../store";

  const dispatch = createEventDispatcher();

  export let filters = [];
  let showColorPicker = false;
  let showText = false;

  function handleFilterChanged() {
    showText = false;
    showColorPicker = false;

    filters.forEach((filter) => {
      if (filter.id === "text" && filter.value) {
        showText = true;
      }

      if (filter.id === "colorized" && filter.value) {
        showColorPicker = true;
      }
    });

    dispatch("filterChanged");
  }

  function handleExtraFilterChanged({ detail }) {
    extraFiltersValue.set(detail);

    dispatch("filterChanged");
  }
</script>

<div class="flex justify-center pt-10">
  <Button><Chevron>Filters</Chevron></Button>
  <Dropdown class="w-48 p-3 space-y-1 text-sm">
    {#each filters as filter}
      <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
        <CheckBoxFilter
          bind:isChecked={filter.value}
          text={filter.text}
          on:filterChanged={handleFilterChanged}
        />
      </li>
    {/each}
  </Dropdown>
</div>

<ExtraFilters
  {showText}
  {showColorPicker}
  on:extraFilterChanged={handleExtraFilterChanged}
/>
