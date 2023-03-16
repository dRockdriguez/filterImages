<script lang="ts">
  import {
    originalImage,
    modifiedImage,
    imageHeight,
    imageWidth,
  } from "../store";
  import "two-up-element";
</script>

<two-up
  style={`width: ${$imageWidth}px; height:${$imageHeight}px; margin: 0 auto;`}
>
  <img src={$originalImage} alt="Original image" />
  {#if $modifiedImage}
    <img src={`${$modifiedImage}`} alt="Image with filters" />
  {/if}
</two-up>
