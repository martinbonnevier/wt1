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
  try {
    console.log('I render 1')
    // if(req.session.loggedin === true){
    // console.log(req.session.userData)
    const userData = req.session.userData
    console.log(userData.name)
    console.log(res.render('printout', { printout: userData }))
    res.render('printout', { printout: userData })
    // }
    console.log('I render 2')
    // else
    // res.render('login', {})
  } catch (error) {
    res.render('error', { error: error })
  }
}

export function renderUserDataLoggedIn (req, res) {
  try {
    console.log('klägg1')
    // if(req.session.loggedin === true){
    // console.log(req.session.userData)
    const userData = req.session.userData
    console.log(userData.name)
    console.log(res.render('printout', { printout: userData }))
    res.render('printout', { printout: userData })
    // }
    console.log('klägg2')
    // else
    // res.render('login', {})
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
  try {
    // if(req.session.loggedin === true){
    res.render('history', { gitLabHistory: history })
    // }
    // else{
    res.render('login', {})
    // }
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
