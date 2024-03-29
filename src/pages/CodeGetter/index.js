import React, { useEffect } from 'react'
import Header from '../../components/Header'
import LeftMenu from '../../components/LeftMenu'
import { clientId, clientSecret, redirectUri } from '../../Keys'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { stringify } from 'querystring'
import './index.css'


export default function TopArtists(props) {
  const history = useHistory()
  const time = new Date()
  const isSmall = useMediaQuery({ query: '(max-width: 760px)' })

  async function getCode() {
    const code = stractCode(window.location.href)
    if (code !== 'access_denied') {
      const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: stringify({
          'grant_type': "authorization_code",
          'code': code,
          'redirect_uri': redirectUri,
          'client_id': clientId,
          'client_secret': clientSecret
        })
      })

      const data = await result.json()
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('token_type', data.token_type)
      localStorage.setItem('expires_in', data.expires_in)
      localStorage.setItem('scope', data.scope)
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.setItem('token_time', time.getTime() / 1000)
      history.push('/')


    } else {
      history.push('accessDenied')
    }
  }

  useEffect(() => {
    getCode()
  })

  function stractCode(string) {
    const url = string.split('?').pop()
    const response = url.split('&')
    return response[0].split('=').pop()

  }
  return (
    <>
      {!isSmall && <div>
        <Header />
        <div className="usable-area">
          <div className="left-menu">
            <LeftMenu />
          </div>
          <div className="home-cg">
            <h1>Loding...</h1>
            <p>Preparing Content</p>
          </div>
        </div>
      </div>}
      {isSmall && <div>
        <div className="M-usable-area">
          <div className="M-home-cg">
            <h1>Loding...</h1>
            <p>Preparing Content</p>
          </div>
        </div>
      </div>}
    </>
  )
}