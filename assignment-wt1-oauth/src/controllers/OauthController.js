import axios from 'axios'
import * as loginController from './LoginController.js'
let accesToken
let userId

/**
 *
 * @param res
 */
export function requestAuthorizationCode (res) {
  const state = loginController.generateState()
  res.redirect(`https://gitlab.lnu.se/oauth/authorize?client_id=${process.env.GITLAB_APPLICATION_ID}&redirect_uri=${process.env.redirect_uri}&response_type=code&state=${state}&scope=email+profile+read_api&client_secret=${process.env.GITLAB_SECRET}`)
}

/**
 *
 * @param req
 */
export async function requestAnAccessToken (req) {
  const code = req.query.code
  const state = req.query.state
  const parameters = `client_id=${process.env.GITLAB_APPLICATION_ID}&client_secret=${process.env.GITLAB_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.redirect_uri}`
  const reqUri = 'https://gitlab.lnu.se/oauth/token?' + parameters
  const gitlabResponse = await axios.post(reqUri)
  const gitlabAccessToken = await axios.get('https://gitlab.lnu.se/api/v4/user' + '?access_token=' + gitlabResponse.data.access_token)

  accesToken = gitlabResponse.data.access_token
  userId = gitlabAccessToken.data.id
  accesToken = gitlabResponse.data.access_token
  return gitlabAccessToken.data
}

/**
 *
 */
export async function getHistory () {
  console.log('history!!!')
  let pageNr = 1

  const historyData = []
  for (let i = 0; i < 6; i++) {
    historyData.push(await axios.get(`https://gitlab.lnu.se/api/v4/users/${userId}/events?per_page=20&page=${pageNr}`, {
      headers: {
        Authorization: `Bearer ${accesToken}`
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
  return latestActions
}
