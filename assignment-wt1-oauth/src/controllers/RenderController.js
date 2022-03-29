/**
 *
 * @param res
 */
export function renderIndex (res) {
  res.render('index', {})
}

/**
 *
 * @param res
 */
export function renderLogin (res) {
  res.render('login', {})
}

/**
 *
 * @param res
 */
export function renderLogOut (res) {
  res.render('logout', {})
}

/**
 *
 * @param res
 * @param gitlabAccessToken
 */
export function renderUserData (res, gitlabAccessToken) {
  res.render('printout', { printout: gitlabAccessToken })
}

/**
 *
 * @param res
 * @param history
 */
export function renderHistory (res, history) {
  res.render('history', { gitLabHistory: history })
}
