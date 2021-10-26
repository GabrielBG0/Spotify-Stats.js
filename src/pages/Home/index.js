import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import LeftMenu from '../../components/LeftMenu'
import { useMediaQuery } from 'react-responsive'
import { Login, SpotifyApi } from '../../services/spotifyApi'
import './index.css'


export default function Home(props) {
  const [userName, setUserName] = useState('')
  const [userInfoHere, setUserInfoHere] = useState(false)
  const isSmall = useMediaQuery({ query: '(max-width: 760px)' })

  function login() {
    Login()
  }
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      SpotifyApi.setAccessToken(localStorage.getItem('access_token'))
      SpotifyApi.getMe().then(res => {
        setUserName(res.display_name + ' ')
        setUserInfoHere(true)
      })

    }
  }, [])

  return (
    <>
      {!isSmall && <div>
        <Header />
        <div className="usable-area">
          <div className="left-menu">
            <LeftMenu isHereH={true} />
          </div>
          <div className="home">
            <h1>Home</h1>
            <p>Welcome {userInfoHere && userName}to the Spotify Stats Home page</p>
            {!userInfoHere &&
              <div className="text">
                <p>For prociding with authrization click on the Login button</p>
                <button onClick={login}>Login</button>
              </div>}
          </div>
        </div>
      </div>}
      {isSmall && <div>
        <Header />
        <div className="M-usable-area">
          <div className="M-home">
            <h1>Home</h1>
            <p>Welcome {userInfoHere && userName}to the Spotify Stats Home page</p>
            {!userInfoHere &&
              <div className="text">
                <p>For prociding with authrization click on the Login button</p>
                <button onClick={login}>Login</button>
              </div>}
          </div>
        </div>
      </div>}
    </>
  )
}