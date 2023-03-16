<script lang="ts">
  import {
    modifiedImage,
    publicId,
    defaultColor,
    filters,
    extraFiltersValue,
  } from "./store";
  import { Cloudinary } from "@cloudinary/url-gen";
  import { source } from "@cloudinary/url-gen/actions/overlay";
  import { text } from "@cloudinary/url-gen/qualifiers/source";
  import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
  import {
    sepia,
    colorize,
    grayscale,
  } from "@cloudinary/url-gen/actions/effect";

  import FiltersSelect from "./components/FiltersSelect.svelte";
  import TwoImages from "./components/TwoImages.svelte";
  import DownloadImage from "./components/DownloadImage.svelte";

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: "dedmbnyps",
    },
    url: {
      secure: true,
    },
  });

  const filtersWithActions = $filters.map((filter) => {
    if (filter.id == "grayScale") {
      return {
        ...filter,
        action: (image) => {
          image.effect(grayscale());
        },
      };
    }
    if (filter.id == "colorized") {
      return {
        ...filter,
        action: (image, detail) => {
          image.effect(
            colorize()
              .level(detail?.colorOpacity ?? 50)
              .color(detail?.bgColor ?? $defaultColor)
          );
        },
      };
    }
    if (filter.id == "sepia") {
      return {
        ...filter,
        action: (image) => {
          image.effect(sepia());
        },
      };
    }
    if (filter.id == "text") {
      return {
        ...filter,
        action: (image, detail) => {
          if (detail?.text && detail?.text !== "") {
            image.overlay(
              source(
                text(
                  detail.text,
                  new TextStyle("Arial", 54).fontWeight("bold")
                ).textColor(detail?.textColor ?? $defaultColor)
              )
            );
          }
        },
      };
    }
  });

  function generateImage() {
    const imageModified = cloudinary.image($publicId);
    filtersWithActions.forEach((filter) => {
      if (filter.value) {
        filter.action(imageModified, $extraFiltersValue);
      }
    });

    modifiedImage.set(imageModified.toURL());
  }
</script>

<TwoImages />

<FiltersSelect filters={filtersWithActions} on:filterChanged={generateImage} />

<DownloadImage />
