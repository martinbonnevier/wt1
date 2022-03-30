import axios from 'axios'

/**
 *
 * @param req
 * @param res
 */
export async function logOut (req, res) {
  try{
    req.session.destroy()
  } catch (error) {
    res.render('error', { error: error })
  }
}
