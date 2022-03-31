/**
 * Function for generating a random string to be used as state.
 *
 * @returns {string} result - String (random letters and numbers).
 */
export function generateState () {
  const result = Math.random().toString(36).substring(2, 7)
  return result
}
