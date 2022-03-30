import axios from 'axios'

/**
 *
 * @param req
 * @param res
 */
export async function logOut (req, res) {
  try{
    console.log("logout1")
  } catch (error) {
    console.log(error)
    res.render('error', { error: error })
  }
}
