import axios from 'axios'
import * as randomState from '../utils/randomState.js'

/**
 * Function for requesting an authorization code from GitLab.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export function requestAuthorizationCode (req, res, next) {
  try {
    req.session.state = randomState.generateState()
    res.redirect(`https://gitlab.lnu.se/oauth/authorize?client_id=${process.env.GITLAB_APPLICATION_ID}&redirect_uri=${process.env.redirect_uri}&response_type=code&state=${req.session.state}&scope=email+profile+read_api&client_secret=${process.env.GITLAB_SECRET}`)
  } catch (error) {
    res.render('error', { error: error })
  }
}

/**
 * Function for requesting an access token from GitLab.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export async function requestAnAccessToken (req, res) {
  try {
    const code = req.query.code
    req.session.code = code
    const parameters = `client_id=${process.env.GITLAB_APPLICATION_ID}&client_secret=${process.env.GITLAB_SECRET}&code=${req.session.code}&grant_type=authorization_code&redirect_uri=${process.env.redirect_uri}`
    const reqUri = 'https://gitlab.lnu.se/oauth/token?' + parameters
    const gitlabResponse = await axios.post(reqUri)
    const gitLabUserData = await axios.get('https://gitlab.lnu.se/api/v4/user' + '?access_token=' + gitlabResponse.data.access_token)
    req.session.userId = gitLabUserData.data.id
    req.session.userData = gitLabUserData.data
    req.session.accesToken = gitlabResponse.data.access_token
    req.session.loggedin = true
  } catch (error) {
    res.render('error', { error: error.status })
  }
}

/**
 * Function for reurning an array containing the 101 latest GitLab actions.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export async function getHistory (req, res, next) {
  try {
    let pageNr = 1

    const historyData = []
    for (let i = 0; i < 6; i++) {
      historyData.push(await axios.get(`https://gitlab.lnu.se/api/v4/users/${req.session.userId}/events?per_page=20&page=${pageNr}`, {
        headers: {
          Authorization: `Bearer ${req.session.accesToken}`
        }
      }))
      pageNr++
    }
    let count = 1
    const latestActions = []
    for (let i = 0; i < historyData.length; i++) {
      for (let j = 0; j < historyData[i].data.length; j++) {
        if (count < 102) {
          latestActions.push(historyData[i].data[j])
          count++
        }
      }
    }
    console.log(latestActions.length)
    return latestActions
  } catch (error) {
    res.render('error', { error: error })
  }
}
