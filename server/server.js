import  express from 'express'
import  SpotifyWebApi  from 'spotify-web-api-node'

const app = express()
app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '9a1a788280984d31a644ce66849271bc',
  })
  spotifyApi.clientCredentialsGrant(code).then(data => {
    res.json({
      access: data.body.access_token,
      refresh_token: data.body.refresh_token,
      expiresIn: data.expires_in
    })
      .catch(() =>
        res.sendStatus(500))
  })
})
app.listen(8000)
