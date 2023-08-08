/**
 * @param val number
 * @param sigFigs number
 * @returns string representation of val truncated to the specified
 * significant figures for numbers >= 1
 */

const precisionTrunc = (val: number, sigFigs: number) => {
	const valStr = val.toString();
	const decimalIdx = valStr.indexOf(".");

	if (decimalIdx > 0 && decimalIdx < sigFigs) {
		return valStr.slice(0, sigFigs + 1);
	}

	return valStr.slice(0, sigFigs);
};

/**
 *
 * @param val number
 * @returns a number formatted in the form of 100K or 1M
 *
 * Converts a positive number between 1e3 and 1e9 to its short form using truncation rather than rounding.
 * e.g. 996,999 -> 996K, not 1M or 997K.
 */
export const shortNumberFormatter = (val: number) => {
	if (val >= 1e3 && val < 1e6) {
		return `${precisionTrunc(val / 1e3, 3)}K`;
	}
	if (val >= 1e6 && val < 1e9) {
		return `${precisionTrunc(val / 1e6, 3)}M`;
	}

	return val.toString();
};
