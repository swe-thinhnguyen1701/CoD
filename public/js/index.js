const menu = $("#menu");

const defaultMenu = () => {
  if ($(window).width() >= 1024) menu.removeAttr("style");
};

const menuToggle = () => {
  menu.toggle("blind", {}, 500);
};

$(window).on("resize", defaultMenu);
$("#menu-toggle-open-btn").on("click", menuToggle);
$("#menu-toggle-close-btn").on("click", menuToggle);
// $(document).ready(() => {
//   const video = document.getElementById("video");
//   video.play().catch(function (error) {
//     console.error("Autoplay prevented:", error);
//     // Handle autoplay prevention
//   });
// });
