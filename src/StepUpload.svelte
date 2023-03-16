<script lang="ts">
  import { ImageStatus } from "../types.d";
  import {
    imageStatus,
    originalImage,
    imageHeight,
    imageWidth,
    publicId,
  } from "./store";
  import Dropzone from "dropzone";
  import "dropzone/dist/dropzone.css";
  import { onMount } from "svelte";

  onMount(() => {
    const dropzone = new Dropzone("#dropzone", {
      uploadMulptiple: false,
      acceptedFiles: ".jpg,.png,.webp",
      maxFiles: 1,
    });

    dropzone.on("sending", (file, xhr, formData) => {
      imageStatus.set(ImageStatus.UPLOADING);

      formData.append("upload_preset", "ml_default");
      formData.append("timestamp", Date.now() / 1000);
      formData.append("api_key", "126695716718657");
    });

    dropzone.on("success", (file, response) => {
      const { secure_url, public_id, width, height } = response;

      publicId.set(public_id);
      imageHeight.set(height);
      imageWidth.set(width);
      imageStatus.set(ImageStatus.DONE);
      originalImage.set(secure_url);
    });
  });
</script>

<form
  class="shadow-2xl border border-dashed border-gray-300 rounded-lg aspect-video w-full flex items-center justify-center flex-col"
  id="dropzone"
  action="https://api.cloudinary.com/v1_1/dedmbnyps/image/upload"
>
  {#if $imageStatus === ImageStatus.READY}
    <button
      class="font-bold pointer-events-none bg-blue-600 rounded-full text-bold text-white text-xl px-6 py-4"
    >
      Upload image
    </button>

    <strong class="text-lg mt-4 text-gray-800">or drop a file</strong>
  {/if}

  {#if $imageStatus === ImageStatus.UPLOADING}
    <strong class="text-lg mt-4 text-gray-800">Uploading image...</strong>
  {/if}
</form>
