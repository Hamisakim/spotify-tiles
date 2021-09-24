import React from 'react'
import { Container } from 'react-bootstrap'

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=9a1a788280984d31a644ce66849271bc&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played%20user-top-read%20user-library-modify'

export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  )
}
