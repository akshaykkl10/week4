import {
    debounce,
    showToast,
    scrollAnimate,
    categoryFilter
} from "./utils.js";
import { darkMode } from "./components/darkMode.js";
import { mobileNav } from "./components/nav.js";
import { backToTop } from "./components/backtotop.js";
import { accordion } from "./components/accordion.js";
import { progressBar } from "./components/progressBar.js";
import { galleryLightbox, imgLazy } from "./components/gallery.js";
import { services } from "./components/service.js";
import { users } from "./components/team.js";
import { showPost } from "./components/showPost.js";

debounce()
darkMode()
showToast()
mobileNav()
backToTop()
scrollAnimate()
accordion()
progressBar()
galleryLightbox()
categoryFilter()
services()
users()
showPost()
imgLazy()



