import * as oauthController from './OauthController.js'
/**
 *
 * @param res
 */
export function renderIndex (res) {
  try {
    res.render('index', {})
  } catch (error) {
    res.render('error', { error: error.status })
  }
}

/**
 *
 * @param res
 */
export function renderLogin (res) {
  try {
    res.render('login', {})
  } catch (error) {

  }
}

/**
 *
 * @param res
 */
export function renderLogOut (res) {
  try {
    res.render('logout', {})
  } catch (error) {
    res.render('error', { error: error })
  }
}

/**
 *
 * @param req
 * @param res
 * @param gitlabAccessToken
 */
export function renderUserData (req, res) {
  console.log(res.req.session.state)
  try {
    if (res.req.session.state === req.session.state) {
      console.log('State ok!')
      const userData = req.session.userData
      console.log(userData.name)
      res.render('printout', { printout: userData })
    } else {
      res.render('error', { error: 'Wrong state.' })
    }
  } catch (error) {
    res.render('error', { error: error })
  }
}

/**
 *
 * @param req
 * @param res
 */
export function renderUserDataLoggedIn (req, res) {
  console.log(res.req.session.state)
  try {
    if (res.req.session.state === req.session.state) {
      console.log('State ok i renderUserDataLoggedIn!')
      const userData = req.session.userData
      console.log(userData.name)
      res.render('printout', { printout: userData })
    } else {
      res.render('error', { error: 'Wrong state.' })
    }
  } catch (error) {
    res.render('error', { error: error })
  }
}
/**
 *
 * @param req
 * @param res
 * @param history
 * @param next
 */
export function renderHistory (req, res, history, next) {
  console.log('------------------')
  console.log(res.req.session.state)
  console.log('------------------')
  try {
    if (res.req.session.state === req.session.state) {
      res.render('history', { gitLabHistory: history })
    } else {
      res.render('error', { error: 'Wrong state.' })
    }
  } catch (error) {
    res.render('error', { error: error })
  }
}
/**
 *
 * @param res
 * @param error
 */
export function renderError (res, error) {
  res.render('error', { error: error })
}
