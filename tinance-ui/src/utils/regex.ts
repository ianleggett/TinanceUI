/**
 * Fix original regex string if needed.
 *
 * @param regex - Original regex string
 * @returns - Fixed regex string;
 */
export function fixRegex(regex?: string): string {
  if (!regex) {
    return '[\\s\\S]*';
  }

  let fixedRegex = regex;

  if (!fixedRegex.startsWith('^')) {
    fixedRegex = `^${fixedRegex}`;
  }

  if (!fixedRegex.endsWith('$')) {
    fixedRegex = `${fixedRegex}$`;
  }

  return fixedRegex;
}
