/**
 *
 */
export function generateState () {
  console.log('i generateState')
  const result = Math.random().toString(36).substring(2, 7)

  return result
}
