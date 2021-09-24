// import express from 'express'


// export  const router = express.Router()
// router.route('/login',)
//   .post((req, res) => {
//     try {
//       const code = req.body.code
//       const spotifyApi = new SpotifyWebApi({
//         redirectUri: 'http://localhost:3000',
//         clientId: '9a1a788280984d31a644ce66849271bc',
//         clientSecret: '26eda315546b4858830e804260bce6ec'
//       })
//       spotifyApi.authorizationCodeGrant(code).then(data => {
//         res.json({
//           access: data.body.access_token,
//           refresh_token: data.body.refresh_token,
//           expiresIn: data.expires_in
//         })
//       })


//     } catch (error) {
//       console.log('🦄 ~ .post ~ error', error)
//       res.sendStatus(500)
//     }

//   })
  

 