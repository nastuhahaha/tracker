/**
 * Get a list of the 12 months of the year as strings, according to specified locale and format
 * @typedef {Object} Options
 * @property {string} [locale=navigator.language] : name of locale, e.g. en-GB, defaults to
 *   the user's own locale
 * @property {string} [monthFormat="long"] : "short", "numeric", or "long" (default)
 *
 * @param {Options} [options] : input options
 * @return {string[]} : an array of 12 strings, the months of the year in the requested format
 */

type MonthsOptions = {
  locale?: string;
  format?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
};
export const getAllMonths = ({
  locale = navigator.language,
  format = 'long',
}: MonthsOptions): string[] => {
  const applyFormat = new Intl.DateTimeFormat(locale, { month: format }).format;
  return [...Array(12).keys()].map((m) => applyFormat(new Date(2021, m)));
};
