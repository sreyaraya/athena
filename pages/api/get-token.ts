import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const secret = process.env.JWT_SECRET


  const token = await getToken({ req, secret})
  if (token) {
    // Signed in
    //console.log("JSON Web Token", JSON.stringify(token, null, 2))
    res.send(JSON.stringify(token, null, 2))
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}