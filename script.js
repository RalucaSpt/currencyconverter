const currencies = {
    "EUR": "Euro",
    "USD": "US Dollar",
    "JPY": "Japanese Yen",
    "BGN": "Bulgarian Lev",
    "CZK": "Czech Republic Koruna",
    "DKK": "Danish Krone",
    "GBP": "British Pound Sterling",
    "HUF": "Hungarian Forint",
    "PLN": "Polish Zloty",
    "RON": "Romanian Leu",
    "SEK": "Swedish Krona",
    "CHF": "Swiss Franc",
    "ISK": "Icelandic Króna",
    "NOK": "Norwegian Krone",
    "HRK": "Croatian Kuna",
    "RUB": "Russian Ruble",
    "TRY": "Turkish Lira",
    "AUD": "Australian Dollar",
    "BRL": "Brazilian Real",
    "CAD": "Canadian Dollar",
    "CNY": "Chinese Yuan",
    "HKD": "Hong Kong Dollar",
    "IDR": "Indonesian Rupiah",
    "ILS": "Israeli New Sheqel",
    "INR": "Indian Rupee",
    "KRW": "South Korean Won",
    "MXN": "Mexican Peso",
    "MYR": "Malaysian Ringgit",
    "NZD": "New Zealand Dollar",
    "PHP": "Philippine Peso",
    "SGD": "Singapore Dollar",
    "THB": "Thai Baht",
    "ZAR": "South African Rand"
};

const inputCurrencyElement = document.querySelector(".input-currency");
const outputCurrencyElement = document.querySelector(".output-currency");
const dateElement = document.getElementById("dateElement");
const inputAmountElement = document.getElementById("input-amount");
const outputAmountElement = document.getElementById("output-amount");
const warningElement = document.getElementById("warning");
const swapBtn = document.getElementById('swap-btn');
const resultHeader = document.getElementById('result-header');

let exchangeRates = {};


function populateCurrencyDropdowns() {
    for (const currencyCode in currencies) {
        const inputOptionElement = document.createElement("option");
        inputOptionElement.value = currencyCode;
        inputOptionElement.innerText = currencies[currencyCode];
        inputCurrencyElement.appendChild(inputOptionElement);
        outputCurrencyElement.appendChild(inputOptionElement.cloneNode(true));
    }

    inputCurrencyElement.value = "RON";
    outputCurrencyElement.value = "EUR";
}

function fetchExchangeRates() {
    if(!navigator.onLine) {
        const warnMessage = `You are currently offline. Exchange rates may not be up to date. Using saved rates from ${new Date(parseInt(localStorage.getItem('exchangeRatesTime'))).toLocaleString()}`;
        warningElement.innerText = warnMessage;
        useCachedRates();
        return;
    }

    fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_A8B5fHavBAZG6opxPJ85vozPY4fQj8nPQvZfdU9s')
        .then(response => response.json())
        .then(data => {
            exchangeRates = data.data; // Store the exchange rates from the API response
            console.log('Exchange Rates:', exchangeRates);

            localStorage.setItem('exchangeRates', JSON.stringify(exchangeRates));
            localStorage.setItem('exchangeRatesTime', Date.now());
        })
        .catch(error => {
           const warnMessage = `Error fetching exchange rates. Using saved exchange rates from ${new Date(parseInt(localStorage.getItem('exchangeRatesTime'))).toLocaleString()}`;
            console.error('Error fetching exchange rates:', error);
            useCachedRates();
        });
}

function useCachedRates() {
    const cachedData = localStorage.getItem('exchangeRates');
    const cachedTime = localStorage.getItem('exchangeRatesTime');

    if (cachedData && cachedTime) {
        exchangeRates = JSON.parse(cachedData); 
        console.log('Using cached exchange rates:', exchangeRates);
    } else {
        console.warn('No valid cached exchange rates available.');
        exchangeRates = {}; 
    }
}


function convertCurrency() {
    const inputCurrency = inputCurrencyElement.value;
    const outputCurrency = outputCurrencyElement.value;
    const inputAmount = parseFloat(inputAmountElement.value);

    const inputRate = exchangeRates[inputCurrency];
    const outputRate = exchangeRates[outputCurrency];

    if (inputRate && outputRate) {
        const convertedAmount = (inputAmount / inputRate * outputRate).toFixed(2);
        outputAmountElement.value = convertedAmount;
    } else {
        outputAmountElement.value = 'N/A'; // Handle cases where the exchange rate is not available
    }

    resultHeader.innerText = `${inputAmount} ${inputCurrency} = ${outputAmountElement.value} ${outputCurrency}`;
}


