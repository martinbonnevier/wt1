import axios from 'axios'

/**
 *
 * @param res
 */
export async function logOut (res) {
  try {
    await axios.post('https://gitlab.lnu.se/users/sign_out')
  } catch (error) {
    res.render('/error', { error: error.status })
  }
}
