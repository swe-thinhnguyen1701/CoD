const menu = $("#menu");
const amountInput = $(".us-amount-input");

const defaultMenu = () => {
  if ($(window).width() >= 1024) menu.removeAttr("style");
};

const menuToggle = () => {
  menu.toggle("blind", {}, 500);
};

const usCalculator = () => {
  let total = 0;
  amountInput.each(function () {
    if ($(this).val().trim().length != 0)
      total += parseInt($(this).val().trim()) * parseInt($(this).data("val"));
  });
  const dd = total / 1440;
  const hh = (dd % 1) * 24;
  const mm = (hh % 1) * 60;
  const displayTotal = $("#us-total");
  displayTotal.empty();
  $("#us-total").append(`<span class="fs-20">${Math.floor(dd)}</span>D <span class="fs-20">${Math.floor(hh)}</span>H <span class="fs-20">${mm}</span>M`);
}

amountInput.on("keydown", e => {
  console.log(e.key);
  const key = e.key;
  const isNumber = /^[0-9]$/;
  const isNavigationKey = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'].includes(key);

  if (!isNumber.test(key) && !isNavigationKey) {
    e.preventDefault();
    return;
  };


  usCalculator();
});

$(window).on("resize", defaultMenu);
$("#menu-toggle-open-btn").on("click", menuToggle);
$("#menu-toggle-close-btn").on("click", menuToggle);
