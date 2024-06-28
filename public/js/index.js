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

  let dd = 0, hh = 0, mm = 0;
  if(total >= 1440){
    dd = total / 1440;
    hh = parseInt((dd % 1) * 24);
    mm = total - Math.floor(dd) * 1440 - hh * 60;
  }else if(total >= 60){
    hh = parseInt(total / 60);
    mm = total - (hh * 60);
  }else{
    mm = total;
  }

  const displayTotal = $("#us-total");
  displayTotal.empty();
  $("#us-total").append(`<span class="fs-20">${Math.floor(dd)}</span>D <span class="fs-20">${Math.floor(hh)}</span>H <span class="fs-20">${mm}</span>M`);
}



$(window).on("resize", defaultMenu);
$("#menu-toggle-open-btn").on("click", menuToggle);
$("#menu-toggle-close-btn").on("click", menuToggle);

$(document).ready(() => {
  amountInput.on("keyup", e => {
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
})
