import  express from 'express'
// import { router } from './config/router.js'
import cors from 'cors'
import SpotifyWebApi  from 'spotify-web-api-node'
import lyricsFinder from 'lyrics-finder'


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
const accessToken = ''
const credentials = ''
const spotifyApi = new SpotifyWebApi({
  redirectUri: 'http://localhost:3000',
  clientId: '9a1a788280984d31a644ce66849271bc',
  clientSecret: '26eda315546b4858830e804260bce6ec',
  accessToken: 'BQBRothUCQyObuCLpCoLzXXLYN0kGV1zlrdKsoB-Gq_3N2U1GNhBh5yT7YkryjCu9u_R0lhdJeDHRWLasB0cy1vbNLYyvOtWvEhu7JoHb6ufMQ7P-JF_sRSei52VsnsOd3A2UDEBlsobUB_b8Os0_rr75ilWFcp7iQWlDrZY2PyBMgg8cyBpeeuPYQEbrT_GnNtcgew'
})
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
  const code = req.body.code
  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      // spotifyApi.setAccessToken(code)
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })

    })
    .catch(err => {
      console.log('🟥 ~ app.post ~ err', err)
      res.sendStatus(400)
    })
})

app.get('/lyrics', async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || 'No Lyrics Found'
  res.json({ lyrics })
})

app.get('/tracks', async (req, res) => {
  console.log('🦄 ~ app.get ~ spotifyApi', spotifyApi)
  console.log('🦄 ~ app.get ~ code', code)
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '9a1a788280984d31a644ce66849271bc',
    clientSecret: '26eda315546b4858830e804260bce6ec'
  })
  spotifyApi
    .getMyTopTracks()
    .then(data=> {
      const topTracks = data.body.items
      console.log('🦄 ~ app.get ~ topTracks', topTracks)
      console.log(topTracks)
      res.sendStatus(200)
    }) 
    .catch(err => {
      console.log('🟥 ~ app.get ~ err', err)
      res.sendStatus(500)
    })
})

app.post('/top-tracks', async (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '9a1a788280984d31a644ce66849271bc',
    clientSecret: '26eda315546b4858830e804260bce6ec',
    accessToken: req.body.accessToken
  })
  try {
    const data = await spotifyApi.getMyTopTracks()
    const topTracks = data.body.items
    // console.log(topTracks[0])
    res.status(202).json(topTracks)
  } catch (error) {
    console.log('🟥 ~ app.post ~ top-tracks', error)
    res.status(500).json(error)
  }
})

app.post('/top-artists', async(req, res) => {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '9a1a788280984d31a644ce66849271bc',
    clientSecret: '26eda315546b4858830e804260bce6ec',
    accessToken: req.body.accessToken
  })
  spotifyApi.getMyTopArtists()
    .then(function(data) {
      const topArtists = data.body.items
      res.status(202).json(topArtists)
    }, function(err) {
      console.log('Something went wrong!', err)
      res.status(500).json(err)
    })

})

app.post('/recent-tracks', async (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '9a1a788280984d31a644ce66849271bc',
    clientSecret: '26eda315546b4858830e804260bce6ec',
    accessToken: req.body.accessToken
  })
  spotifyApi.getMyRecentlyPlayedTracks({
    limit: 20
  }).then(function(data) {
    // Output items
    console.log('Your 20 most recently played tracks are:')
    // data.body.items.forEach(item => console.log(item.track))
    const recentTracks = data.body.items.map(item =>  item.track)
    console.log('🦄 ~ app.post ~ recentTracks', recentTracks[0])
    res.status(202).json(recentTracks)

  }, function(err) {
    console.log('Something went wrong!', err)
  })
})


app.post('/user-current-playback-state', async (req, res) => {
  console.log('🦄 ~ app.post ~ req', req)
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '9a1a788280984d31a644ce66849271bc',
    clientSecret: '26eda315546b4858830e804260bce6ec',
    accessToken: req.body.accessToken
  })
  spotifyApi.getMyCurrentPlaybackState()
    .then(function(data) {
      console.log('🦄 ~ .then ~ data', data.body)
      // Output items
      if (data.body && data.body.is_playing) {
        console.log('User is currently playing something!')
        res.status(202).json(data.body.item)

      } else {
        console.log('User is not playing anything, or doing so in private.')
      }
    }, function(err) {
      console.log('Something went wrong!', err)
    })
})