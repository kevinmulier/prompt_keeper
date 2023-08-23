function showMenu() {
  document.querySelector("#mobileMenu").classList.remove("hidden");
  document.querySelector("#openMenu").classList.add("hidden");
  document.querySelector("#closeMenu").classList.remove("hidden");
}

function hideMenu() {
  document.querySelector("#mobileMenu").classList.add("hidden");
  document.querySelector("#closeMenu").classList.add("hidden");
  document.querySelector("#openMenu").classList.remove("hidden");
}

export { showMenu, hideMenu };
