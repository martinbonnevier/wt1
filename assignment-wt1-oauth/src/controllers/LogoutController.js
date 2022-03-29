import axios from 'axios'

/**
 *
 */
export async function logOut () {
  await axios.post('https://gitlab.lnu.se/users/sign_out')
}
