const menu = $("#menu");
const usAmountInput = $(".us-amount-input");
const usSpeed = {
  dd: 0,
  hh: 0,
  mm: 0
}

const defaultMenu = () => {
  if ($(window).width() >= 1024) menu.removeAttr("style");
};

const menuToggle = () => {
  menu.toggle("blind", {}, 500);
};

const usCalculator = () => {
  let total = 0;
  usAmountInput.each(function () {
    if ($(this).val().trim().length != 0)
      total += parseInt($(this).val().trim()) * parseInt($(this).data("val"));
  });

  renderTotal(total, 0);
}

const renderTotal = (total, category) => {
  const categories = ["#us-total", "#bs-total", "#tes-total", "#trs-total"];
  let dd = 0, hh = 0, mm = 0;
  if (total >= 1440) {
    dd = total / 1440;
    hh = parseInt((dd % 1) * 24);
    mm = total - Math.floor(dd) * 1440 - hh * 60;
  } else if (total >= 60) {
    hh = parseInt(total / 60);
    mm = total - (hh * 60);
  } else {
    mm = total;
  }

  if (category == 0) {
    usSpeed.dd = Math.floor(dd);
    usSpeed.hh = Math.floor(hh);
    usSpeed.mm = mm;
  }
  const displayTotal = $(`${categories[category]}`);
  displayTotal.empty();
  displayTotal.append(`Total: <span class="fs-20">${Math.floor(dd)}</span>D <span class="fs-20">${ Math.floor(hh)}</span>H <span class="fs-20">${mm}</span>M`);
  if(category != 0){
    displayTotal.append(`+ Universal: <span class="fs-20">${usSpeed.dd}</span>D <span class="fs-20">${usSpeed.hh}</span>H <span class="fs-20">${usSpeed.mm}</span>M`);
    displayTotal.append(`<span class = "fs-20 fc-gold">${Math.floor(dd) + usSpeed.dd}</span>D <span class="fs-20 fc-gold">${usSpeed.hh + Math.floor(hh)}</span>H <span class="fs-20 fc-gold">${usSpeed.mm + mm}</span>M`)
  }
}

const usInput = () => {
  usAmountInput.on("keydown keyup", e => {
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
}



$(window).on("resize", defaultMenu);
$("#menu-toggle-open-btn").on("click", menuToggle);
$("#menu-toggle-close-btn").on("click", menuToggle);

$(document).ready(() => {
  usInput();
})
