/* eslint-disable no-unused-vars */
import React from 'react'
import { Container, Button } from 'react-bootstrap'
const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=9a1a788280984d31a644ce66849271bc&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played%20user-top-read%20user-library-modify'
/*%20user-modify-playback-state%20user-read-recently-played%20user-top-read%20user-library-modify' */

const Login = () => {
  return (
    <Container
      className=""
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>Login </a>

    </Container>

  )
}

export default Login
