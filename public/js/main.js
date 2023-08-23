import { showMenu, hideMenu } from "./toggleMenu.js";

document.querySelector("#closeMenu").addEventListener("click", hideMenu);
document.querySelector("#openMenu").addEventListener("click", showMenu);
