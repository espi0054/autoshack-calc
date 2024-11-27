const ONT_SALES_TAX_RATE = 0.13; // Ontario HST rate
const WARRANTY_RATE = 0.17; // 17% warranty cost
const STORAGE_KEY = 'autoShackCalculatorData';
const STORAGE_EXPIRY = 10 * 60 * 1000; // 10 minutes in milliseconds

const basePriceInput = document.getElementById('basePrice');
const productTotalEl = document.getElementById('productTotal');
const warrantyPriceEl = document.getElementById('warrantyPrice');
const totalPriceEl = document.getElementById('totalPrice');

// Load saved data from local storage
window.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    if (Date.now() - parsedData.timestamp < STORAGE_EXPIRY) {
      basePriceInput.value = parsedData.basePrice;
      calculateAndDisplayPrices(parsedData.basePrice);
    }
  }
});

// Save data to local storage
basePriceInput.addEventListener('input', (e) => {
  const basePrice = e.target.value;
  const storageData = { basePrice, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  calculateAndDisplayPrices(basePrice);
});

// Calculate and display prices
function calculateAndDisplayPrices(basePrice) {
  const baseValue = parseFloat(basePrice) || 0;
  const productTotal = baseValue * (1 + ONT_SALES_TAX_RATE);
  const warrantyPrice = baseValue * WARRANTY_RATE;
  const totalWithWarranty = (baseValue + warrantyPrice) * (1 + ONT_SALES_TAX_RATE);

  productTotalEl.textContent = productTotal.toFixed(2);
  warrantyPriceEl.textContent = warrantyPrice.toFixed(2);
  totalPriceEl.textContent = totalWithWarranty.toFixed(2);
}
