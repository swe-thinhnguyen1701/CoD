const menuToggle = () => {
    $("#menu").toggle("blind", {}, 500);
}

$("#menu-toggle-open-btn").on("click", menuToggle);
$("#menu-toggle-close-btn").on("click", menuToggle);