let inputScaleResults = [...document.querySelectorAll(".scales__resultGB")];
let rangeScaleResults = [...document.querySelectorAll(".scales__item-input")];

inputScaleResults.forEach((scaleInput) => {
  setGBToInput(scaleInput);
});
rangeScaleResults.forEach((rangeInput) => {
  rangeInput.addEventListener("input", (event) => {
      setGBFromNumberToRangeAndViseVersa(
        event,
        ".scales__storage-result",
        ".scales__transfer-result",
        "storage-scale",
        "transfer-scale"
      );
      calculatePriceBasedOnRangeBackblaze(
        event.currentTarget,
        "storage-scale",
        "transfer-scale"
      );
      calculatePriceBasedOnRangeVultr(
        event.currentTarget,
        "storage-scale",
        "transfer-scale"
      );
      calculatePriceBasedOnRangeBunny(
        event.currentTarget,
        "storage-scale",
        "transfer-scale"
      );
      calculatePriceBasedOnRangeScaleway(
        event.currentTarget,
        "storage-scale",
        "transfer-scale"
      );
  });
});

function setGBToInput(element) {
  element.addEventListener("input", (event) => {
    if (event.currentTarget.value > 1000) {
      event.currentTarget.value = 1000;
    }
    setGBFromNumberToRangeAndViseVersa(
      event,
      ".storage-scale",
      ".transfer-scale",
      "scales__storage-result",
      "scales__transfer-result"
    );
    calculatePriceBasedOnRangeBackblaze(
      event.currentTarget,
      "scales__storage-result",
      "scales__transfer-result"
    );
    calculatePriceBasedOnRangeVultr(
      event.currentTarget,
      "scales__storage-result",
      "scales__transfer-result"
    );
    calculatePriceBasedOnRangeBunny(
      event.currentTarget,
      "scales__storage-result",
      "scales__transfer-result"
    );
    calculatePriceBasedOnRangeScaleway(
      event.currentTarget,
      "scales__storage-result",
      "scales__transfer-result"
    );
  });
}
function setGBFromNumberToRangeAndViseVersa(
  event,
  el1,
  el2,
  containsEl1,
  containsEl2
) {
  if (event.currentTarget.classList.contains(containsEl1)) {
    let el = document.querySelector(el1);
    el.value = event.currentTarget.value;
  }
  if (event.currentTarget.classList.contains(containsEl2)) {
    let el = document.querySelector(el2);
    el.value = event.currentTarget.value;
  }
}

const tariffs = {
  backblaze: {
    storage: 0.005,
    transfer: 0.01,
    minPayment: 7,
  },
  bunny: {
    storage: {
      hdd: 0.01,
      ssd: 0.02,
    },
    transfer: 0.01,
    maxPayment: 10,
  },
  scaleway: {
    storage: {
      multi: 0.06,
      single: 0.03,
    },
    transfer: 0.02,
    free: 75,
  },
  vultr: {
    storage: 0.01,
    transfer: 0.01,
    minPayment: 5,
  },
};

let prbackblazeStorage = 0;
let prbackblazeTransfer = 0;
function calculatePriceBasedOnRangeBackblaze(
  inputPrice,
  containsEl1,
  containsEl2
) {
  if (inputPrice.classList.contains(containsEl1)) {
    prbackblazeStorage = +inputPrice.value * tariffs.backblaze.storage;
  }
  if (inputPrice.classList.contains(containsEl2)) {
    prbackblazeTransfer = +inputPrice.value * tariffs.backblaze.transfer;
  }

  let priceSum = (prbackblazeStorage + prbackblazeTransfer).toFixed(2);
  let line = document.querySelector(".backblaze__line");
  line.style.width = `${100 + priceSum * 4}px`;
  if (priceSum < tariffs.backblaze.minPayment) {
    priceSum = tariffs.backblaze.minPayment;
    line.style.width = `${100 + tariffs.backblaze.minPayment * 4}px`;
  }


  let el = document.querySelector(".backblaze__price");
  el.textContent = priceSum;
}
let line1 = document.querySelector(".backblaze__line");
line1.style.width = `${100 + tariffs.backblaze.minPayment * 4}px`;

let prvultrStorage = 0;
let prvultrTransfer = 0;
function calculatePriceBasedOnRangeVultr(inputPrice, containsEl1, containsEl2) {
    if (inputPrice.classList.contains(containsEl1)) {
      prvultrStorage = +inputPrice.value * tariffs.vultr.storage;
    }
    if (inputPrice.classList.contains(containsEl2)) {
      prvultrTransfer = +inputPrice.value * tariffs.vultr.transfer;
    }

    let priceSum = (prvultrStorage + prvultrTransfer).toFixed(2);
    let line = document.querySelector(".vultr__line");
    line.style.width = `${100 + priceSum * 4}px`;
    if (priceSum < tariffs.vultr.minPayment) {
      priceSum = tariffs.vultr.minPayment;
      line.style.width = `${100 + tariffs.vultr.minPayment * 4}px`;
    }
    let el = document.querySelector(".vultr__price");
    el.textContent = priceSum;
}
let line2 = document.querySelector(".vultr__line");
line2.style.width = `${100 + tariffs.vultr.minPayment * 4}px`;

let prbunnyStorage = 0;
let prbunnyTransfer = 0;
let storageHDDoption = document.querySelector("#bunny-HHD");
let storageSSDoption = document.querySelector("#bunny-SSD");
function calculatePriceBasedOnRangeBunny(inputPrice, containsEl1, containsEl2) {
    if (inputPrice.classList.contains(containsEl1) && storageHDDoption.checked) {
      prbunnyStorage = 0;
      prbunnyStorage = +inputPrice.value * tariffs.bunny.storage.hdd;
    }
    if (inputPrice.classList.contains(containsEl1) && storageSSDoption.checked) {
      prbunnyStorage = 0;
      prbunnyStorage = +inputPrice.value * tariffs.bunny.storage.ssd;
    }

    if (inputPrice.classList.contains(containsEl2)) {
      prbunnyTransfer = +inputPrice.value * tariffs.bunny.transfer;
    }
    let priceSum = prbunnyStorage + prbunnyTransfer;
    let line = document.querySelector(".bunny__line");
    line.style.width = `${100 + priceSum * 4}px`;
    if (priceSum > tariffs.bunny.maxPayment) {
      priceSum = tariffs.bunny.maxPayment;
      line.style.width = `${100 + tariffs.bunny.maxPayment * 4}px`;
    }
    let el = document.querySelector(".bunny__price");
    el.textContent = priceSum;
}

storageHDDoption.addEventListener("change", (event) => {
  //console.log("HDD option");
  let storageValue = document.querySelector(".scales__storage-result");
  calculatePriceBasedOnRangeBunny(
    storageValue,
    "scales__storage-result",
    "scales__transfer-result"
  );
});

storageSSDoption.addEventListener("change", (event) => {
  //console.log("SSD option");
  let storageValue = document.querySelector(".scales__storage-result");
  calculatePriceBasedOnRangeBunny(
    storageValue,
    "scales__storage-result",
    "scales__transfer-result"
  );
});

let prscalewayStorage = 0;
let prscalewayTransfer = 0;
let amountOfGBstorage = 0;
let amountOfGBtransfer = 0;
let storageMultioption = document.querySelector("#scaleway-multi");
let storageSingleoption = document.querySelector("#scaleway-single");
function calculatePriceBasedOnRangeScaleway(
  inputPrice,
  containsEl1,
  containsEl2
) {
    if (
        inputPrice.classList.contains(containsEl1) &&
        storageMultioption.checked
    ) {
      prscalewayStorage = 0;

      amountOfGBstorage = +inputPrice.value;
      if (amountOfGBstorage > tariffs.scaleway.free) {
        prscalewayStorage =
            (amountOfGBstorage - tariffs.scaleway.free) *
            tariffs.scaleway.storage.multi;
      } else {
        prscalewayStorage = 0;
      }
    }
    if (
        inputPrice.classList.contains(containsEl1) &&
        storageSingleoption.checked
    ) {
      prscalewayStorage = 0;

      amountOfGBstorage = +inputPrice.value;
      if (amountOfGBstorage > tariffs.scaleway.free) {
        prscalewayStorage =
            (amountOfGBstorage - tariffs.scaleway.free) *
            tariffs.scaleway.storage.single;
      } else {
        prscalewayStorage = 0;
      }
    }

    if (inputPrice.classList.contains(containsEl2)) {
      amountOfGBtransfer = +inputPrice.value;
      if (amountOfGBtransfer > tariffs.scaleway.free) {
        prscalewayTransfer =
            (amountOfGBtransfer - tariffs.scaleway.free) *
            tariffs.scaleway.transfer;
      } else {
        prscalewayTransfer = 0;
      }
    }
    let priceSum = prscalewayStorage + prscalewayTransfer;
    let line = document.querySelector(".scaleway__line");
    line.style.width = `${100 + priceSum * 4}px`;

    let el = document.querySelector(".scaleway__price");
    el.textContent = priceSum;
}

storageMultioption.addEventListener("change", (event) => {
  let storageValue = document.querySelector(".scales__storage-result");
  calculatePriceBasedOnRangeScaleway(
    storageValue,
    "scales__storage-result",
    "scales__transfer-result"
  );
});

storageSingleoption.addEventListener("change", (event) => {
  let storageValue = document.querySelector(".scales__storage-result");
  calculatePriceBasedOnRangeScaleway(
    storageValue,
    "scales__storage-result",
    "scales__transfer-result"
  );
});
