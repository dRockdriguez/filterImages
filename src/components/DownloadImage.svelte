<script lang="ts">
  import { modifiedImage } from "../store";
</script>

<a
  download
  href={$modifiedImage}
  target="_blank"
  class="block mt-10 bg-blue-500 hover:bg-blue-700 w-full text-center font-bold text-white rounded-full px-4 py-2"
>
  Download image
</a>
