import axios from 'axios'

/**
 *
 * @param req
 * @param res
 */
export async function logOut (req, res) {
  try {
    const parameters = `client_id=${process.env.GITLAB_APPLICATION_ID}&client_secret=${process.env.GITLAB_SECRET}&token=${req.session.accesToken}`
    axios.post('https://gitlab.lnu.se/oauth/revoke', parameters)
    req.session.destroy()
    console.log('hatt', req.session)
  } catch (error) {
    res.render('error', { error: error })
  }
}
