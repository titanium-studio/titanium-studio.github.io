import { is, each } from "https://x-titan.github.io/utils/index.js"
import { search, styler, css } from "https://x-titan.github.io/web-utils/index.js"
import { initGallery } from "./gallery.js";

initGallery({
  moreButton: search.id("moreButton"),
  gallery: search.id("gallery"),
  addImageOnClickMoreButton: 10
})