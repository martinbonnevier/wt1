import express from 'express'
import * as renderController from '../controllers/RenderController.js'
import * as logoutController from '../controllers/LogoutController.js'
import * as oAuthController from '../controllers/OauthController.js'
import dotenv from 'dotenv'

let userId
let accesToken

dotenv.config()
const router = express.Router()

router.get('/', (req, res) => {
  renderController.renderIndex(res)
})

router.get('/login', (req, res) => {
  renderController.renderLogin(res)
})

router.get('/logout', async (req, res) => {
  logoutController.logOut()
  renderController.renderLogOut(res)
})

router.get('/login/oauth', (req, res) => {
  oAuthController.requestAuthorizationCode(res)
})

router.get('/loggedin', async (req, res) => {
  renderController.renderUserData(res, await oAuthController.requestAnAccessToken(req))
})

router.get('/loggedin/history', async (req, res) => {
  renderController.renderHistory(res, await oAuthController.getHistory())
})

export default router
