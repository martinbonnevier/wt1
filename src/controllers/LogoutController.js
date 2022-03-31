import axios from 'axios'

/**
 * Function handling logout. Revoking gitlab acces token. Destroying session cookie.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export async function logOut (req, res) {
  try {
    const parameters = `client_id=${process.env.GITLAB_APPLICATION_ID}&client_secret=${process.env.GITLAB_SECRET}&token=${req.session.accesToken}`
    axios.post('https://gitlab.lnu.se/oauth/revoke', parameters)
    req.session.destroy()
  } catch (error) {
    res.render('error', { error: error })
  }
}
