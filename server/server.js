import  express from 'express'
// import { router } from './config/router.js'
import cors from 'cors'
import SpotifyWebApi  from 'spotify-web-api-node'

const app = express()
app.use(cors())
app.use(express.json())

try {
  app.use((req, _res, next) => {
    console.log(`🚨 Incoming request: ${req.method} - ${req.url}🚨`)
    next()
  })
  
  // app.use('/api', router)
  const port = 8000
  // * Server
  app.listen(port, () => console.log(`🚀 Express is up and running on port ${port}🚀`))
} catch (err) {
  console.log('🆘 Something went wrong starting the app')
  console.log(err)
}

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '9a1a788280984d31a644ce66849271bc',
    clientSecret: '26eda315546b4858830e804260bce6ec',
    refreshToken
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post('/login', (req, res) => {
  console.log('🦄 ~ app.post ~ req', req.body)
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '9a1a788280984d31a644ce66849271bc',
    clientSecret: '26eda315546b4858830e804260bce6ec'
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })
})
