import React from 'react'
import SpotifyIcon from '../../assets/spotify-icons-logos/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png'
import { useMediaQuery } from 'react-responsive'
import './index.css'
export default function Footer(props) {
  const isSmall = useMediaQuery({ query: '(max-width: 760px)' })
  return (
    <>
      {!isSmall && <footer className="footer">
        <div className="left-msg">
          <p>Made with care by <a rel="noopener noreferrer" href="https://github.com/GabrielBG0" target="_blank"><u>GBG</u></a></p>
        </div>
        <div className="right-msg">
          <div className="right-msg">
            <p>Powered by the Spotify Web API</p>
            <p>Click <a rel="noopener noreferrer" href="https://developer.spotify.com/documentation/web-api/reference/" target="_blank"><u>Here</u></a> to know more</p>
          </div>
          <a rel="noopener noreferrer" href="https://www.spotify.com/" target="_blank"><img src={SpotifyIcon} alt="Spotify Logo"></img></a>
        </div>
      </footer>}
      {isSmall && <footer className="M-footer">
        <div className="M-footer-msg">
          <p>Made with care by <a rel="noopener noreferrer" href="https://github.com/GabrielBG0" target="_blank"><u>GBG</u></a></p>
        </div>
      </footer>}
    </>
  )
}