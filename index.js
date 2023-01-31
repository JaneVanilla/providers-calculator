const storageScale = document.querySelector("#storage-scale");
const transferScale = document.querySelector("#transfer-scale");
const storageTransferScales = [
  ...document.querySelectorAll(".scales__item-input"),
];
const value1 = document.querySelector(".scales__storage-result");
const value2 = document.querySelector(".scales__transfer-result");
const allItem = [...document.querySelectorAll(".result-section__item")];
//const allCurrentPrice = [...document.querySelectorAll('.result-section__current-price')];
let backblazePrice = document.querySelector(".backblaze__price");

const prices = {
  backblaze: {
    storage: 0.005,
    transfer: 0.01,
  },
  bunny: {
    storage: {
      hdd: 0.01,
      ssd: 0.02,
    },
    transfer: 0.01,
  },
};
let backblazePriceStorage = 0;
let backblazePriceTransfer = 0;
let bunnyPriceStorage = 0;
let bunnyPriceTransfer = 0;
storageTransferScales.forEach((scale) => {
  scale.addEventListener("input", (event) => {
    let eventTargetValue = +event.target.value;
    putPriceToFiled(scale, eventTargetValue);
  });
});

function putPriceToFiled(scale, eventTargetValue) {
  if (scale.classList.contains("storage-scale")) {
    let currentAmountOfGB = eventTargetValue;
    backblazePriceStorage = calculateStoragePaymentBackblaze(currentAmountOfGB);
    bunnyPriceStorage = calculateStoragePaymentBunny(currentAmountOfGB);
  }
  if (scale.classList.contains("transfer-scale")) {
    let currentAmountOfGB = eventTargetValue;
    backblazePriceTransfer =
      calculateTransferPaymentBackblaze(currentAmountOfGB);
    bunnyPriceTransfer = calculateTransferPaymentBunny(currentAmountOfGB);
  }
  let sumbackblaze = (backblazePriceStorage + backblazePriceTransfer).toFixed(
    2
  );
  setDiagramBackblaze(sumbackblaze);
  let sumbunny = (bunnyPriceStorage + bunnyPriceTransfer).toFixed(2);
  setDiagramBunny(sumbunny);
}

function setDiagramBunny(sum) {
  let bunnyPrice = document.querySelector(".bunny__price");
  let itemParent = bunnyPrice.closest(".result-section__item");
  let lineElement = itemParent.querySelector(".result-section__line");
  if (sum <= 10) {
    lineElement.style.width = sum + "px";
    bunnyPrice.textContent = sum;
  }
}

function setDiagramBackblaze(sum) {
  let itemParent = backblazePrice.closest(".result-section__item");
  let lineElement = itemParent.querySelector(".result-section__line");
  if (sum > 7) {
    lineElement.style.width = sum + "px";
    backblazePrice.textContent = sum;
  } else {
    lineElement.style.width = 7 + "px";
    backblazePrice.textContent = 7;
  }
}

function calculateStoragePaymentBunny(currentAmountOfGB) {
  let inputOptionHHD = document.querySelector("#bunny-HHD");

  let calculatePrice = 0;
  if (inputOptionHHD.checked) {
    calculatePrice = currentAmountOfGB * prices.bunny.storage.hdd;
    return calculatePrice;
  } else {
    calculatePrice = currentAmountOfGB * prices.bunny.storage.ssd;
    return calculatePrice;
  }
}

let bunnyOptionHHD = document.querySelector("#bunny-HHD");
let bunnyOptionSSD = document.querySelector("#bunny-SSD");

bunnyOptionHHD.addEventListener("change", () => {
  let storageScaleResult = +document.querySelector(".scales__storage-result")
    .textContent;
  let price = storageScaleResult * prices.bunny.storage.hdd;
  let bunnyPrice = document.querySelector(".bunny__price");
  bunnyPrice.textContent = price;
});
bunnyOptionSSD.addEventListener("change", () => {
  let storageScaleResult = +document.querySelector(".scales__storage-result")
    .textContent;
  let price = storageScaleResult * prices.bunny.storage.ssd;
  let bunnyPrice = document.querySelector(".bunny__price");
  bunnyPrice.textContent = price;
});

let bunnyOptions = document.querySelectorAll(
  ".bunny__options input[type='radio']"
);
function changeOptions() {
  let storageScaleResult = document.querySelector(".scales__storage-result");
  bunnyOptions.forEach((option) => {
    option.addEventListener("change", (event) => {
      if (event.currentTarget.value === "SSD") {
        let price = +storageScaleResult.textContent * prices.bunny.storage.hdd;
      } else {
        return "HDD";
      }
    });
  });
}
changeOptions();

function calculateTransferPaymentBunny(currentAmountOfGB) {
  let calculatePrice = currentAmountOfGB * prices.bunny.transfer;
  return calculatePrice;
}

function calculateStoragePaymentBackblaze(currentAmountOfGB) {
  let calculatePrice = currentAmountOfGB * prices.backblaze.storage;
  return calculatePrice;
}
function calculateTransferPaymentBackblaze(currentAmountOfGB) {
  let calculatePrice = currentAmountOfGB * prices.backblaze.transfer;
  return calculatePrice;
}

putCurrentValueToBlock(value1, storageScale);
putCurrentValueToBlock(value2, transferScale);

function putCurrentValueToBlock(value, input) {
  value.value = input.value;
  input.addEventListener("input", (event) => {
    value.value = event.target.value;
  });
}

function extractValueFromInputToScale(value, input) {
  value.addEventListener("input", (event) => {
    input.value = event.target.value;
    putPriceToFiled(input, event.target.value);
  });
}
extractValueFromInputToScale(value1, storageScale);
extractValueFromInputToScale(value2, transferScale);

allItem.forEach((item) => {
  setStartingPrice(item);
});

function setStartingPrice(item) {
  let minPayment = +item.dataset.minPayment;
  let lineElement = item.querySelector(".result-section__line");
  if (minPayment > 0) {
    lineElement.style.width = `${minPayment}` + "px";
  }
}
