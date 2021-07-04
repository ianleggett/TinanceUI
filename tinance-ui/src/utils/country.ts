import { CountryCode } from '../constants';

/**
 * Get country flag emoji from country code.
 *
 * @param countryCode - Country code string, ISO 3166-1 alpha-2
 * @returns Flag emoji string
 */
export function countryCodeToFlag(countryCode: string): string {
  return typeof String.fromCodePoint !== 'undefined'
    ? countryCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127_397))
    : countryCode;
}

/**
 * Format country code object to string.
 *
 * @param option - Country code option
 * @returns - Formatted option string
 */
export function formatCountryCodeOption(option?: CountryCode): string {
  if (option) {
    return `${countryCodeToFlag(option.dualCode)} ${option.name} (${option.tripleCode})`;
  }

  return '';
}
