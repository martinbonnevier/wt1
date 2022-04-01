/**
 * Function for rendering index page.
 *
 * @param {object} res - Express response object.
 */
export function renderIndex (res) {
  try {
    res.render('index', {})
  } catch (error) {
    res.render('error', { error: error.status })
  }
}

/**
 * Function for rendering login page.
 *
 * @param {object} res - Express response object.
 */
export function renderLogin (res) {
  try {
    res.render('login', {})
  } catch (error) {

  }
}

/**
 * Function for rendering logout page.
 *
 * @param {object} res - Express response object.
 */
export function renderLogOut (res) {
  try {
    res.render('logout', {})
  } catch (error) {
    res.render('error', { error: error })
  }
}

/**
 * Function for rendering user info page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export function renderUserData (req, res) {
  try {
    if (res.req.session.state === req.session.state) {
      const userData = req.session.userData
      res.render('printout', { printout: userData })
    } else {
      res.render('error', { error: 'Wrong state.' })
    }
  } catch (error) {
    res.render('error', { error: error })
  }
}

/**
 * Function for rendering user info page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export function renderUserDataLoggedIn (req, res) {
  try {
    if (res.req.session.state === req.session.state) {
      const userData = req.session.userData
      res.render('printout', { printout: userData })
    } else {
      res.render('error', { error: 'Wrong state.' })
    }
  } catch (error) {
    res.render('error', { error: error })
  }
}
/**
 * Function for rendering user history page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Array} history - Array containing the latest 101 GitLab actions.
 * @param {Function} next - Express next middleware function.
 */
export function renderHistory (req, res, history, next) {
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
 * Function for rendering error page.
 *
 * @param {object} res - Express response object.
 * @param {object} error - Error object.
 */
export function renderError (res, error) {
  res.render('error', { error: error })
}
