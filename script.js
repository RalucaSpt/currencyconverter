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

// Get references to the input fields, select elements, and button
const inputCurrencyElement = document.querySelector(".input-currency");
const outputCurrencyElement = document.querySelector(".output-currency");
const dateElement = document.getElementById("dateElement");
const inputAmountElement = document.getElementById("input-amount");
const outputAmountElement = document.getElementById("output-amount");

// Variables to store fetched exchange rates
let exchangeRates = {};


function populateCurrencyDropdowns() {
    for (const currencyCode in currencies) {
        const inputOptionElement = document.createElement("option");
        inputOptionElement.value = currencyCode;
        inputOptionElement.innerText = currencies[currencyCode];
        inputCurrencyElement.appendChild(inputOptionElement);
        outputCurrencyElement.appendChild(inputOptionElement.cloneNode(true));
    }
}

populateCurrencyDropdowns();
