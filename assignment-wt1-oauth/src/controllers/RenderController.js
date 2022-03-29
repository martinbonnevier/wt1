/**
 *
 * @param res
 */
export function renderIndex (res) {
  try {
    res.render('index', {})
  } catch (error) {
    res.render('/error', { error: error.status })
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
    res.render('/error', { error: error.status })
  }
}

/**
 *
 * @param res
 * @param gitlabAccessToken
 */
export function renderUserData (res, gitlabAccessToken) {
  try {
    res.render('printout', { printout: gitlabAccessToken })
  } catch (error) {
    res.render('/error', { error: error.status })
  }
}

/**
 *
 * @param res
 * @param history
 */
export function renderHistory (res, history) {
  try {
    res.render('history', { gitLabHistory: history })
  } catch (error) {
    res.render('/error', { error: error.status })
  }
}
