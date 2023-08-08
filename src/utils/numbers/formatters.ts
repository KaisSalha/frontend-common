export const canadaNumberFormatter = new Intl.NumberFormat("en-CA");

export const canadaDollarFormatter = new Intl.NumberFormat("en-CA", {
	style: "currency",
	currency: "CAD",
	maximumSignificantDigits: 3,
});
