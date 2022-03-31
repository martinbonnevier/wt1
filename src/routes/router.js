import express from 'express'
import * as renderController from '../controllers/RenderController.js'
import * as logoutController from '../controllers/LogoutController.js'
import * as oAuthController from '../controllers/OauthController.js'
import dotenv from 'dotenv'
import createError from 'http-errors'

dotenv.config()
const router = express.Router()

router.get('/', (req, res) => {
  renderController.renderIndex(res)
})

router.get('/login', (req, res) => {
  renderController.renderLogin(res)
})

router.get('/logout', async (req, res) => {
  logoutController.logOut(req, res)
  renderController.renderLogOut(res)
})

router.get('/login/oauth', (req, res, next) => {
  oAuthController.requestAuthorizationCode(req, res, next)
})

router.get('/loggedin', async (req, res) => {
  await oAuthController.requestAnAccessToken(req, res)
  renderController.renderUserData(req, res)
})

router.get('/user', (req, res) => {
  renderController.renderUserDataLoggedIn(req, res)
})

router.get('/loggedin/history', async (req, res, next) => {
  renderController.renderHistory(req, res, await oAuthController.getHistory(req, res, next), next)
})

router.use('*', (req, res, next) => next(createError(404)))

export default router
