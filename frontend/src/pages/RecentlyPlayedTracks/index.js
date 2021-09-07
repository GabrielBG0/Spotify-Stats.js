import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import LeftMenu from '../../components/LeftMenu'
import MusicCard from '../../components/MusicCard'
import { SpotifyApi, refreshToken } from '../../services/spotifyApi'
import { useMediaQuery } from 'react-responsive'
import './index.css'


export default function RecentlyPlayedTracks(props) {

  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const isSmall = useMediaQuery({ query: '(max-width: 760px)' })
  const time = new Date()

  async function getList(token) {
    SpotifyApi.setAccessToken(token)
    SpotifyApi.getMyRecentlyPlayedTracks({ limit: 30 }).then(res => {
      setRecentlyPlayed(res.items)
    })
  }

  useEffect(() => {
    if (localStorage.getItem('token_time') + localStorage.getItem('expires_in') < (time.getTime() / 1000)) {
      refreshToken()
    }

    getList(localStorage.getItem('access_token'))
  }, [])


  return (
    <div>
      {!isSmall && <div >
        <Header />
        <div className="usable-area">
          <div className="left-menu">
            <LeftMenu isHereRP={true} />
          </div>
          <div className="content">
            <div className="RecentlyPlayedTracks">
              <h1>Recently Played Tracks</h1>
              <ul className="RP-listing">
                {recentlyPlayed.map((track, index) => (
                  <li className="RP-list-itens">
                    <MusicCard track={track.track}>
                      {console.log(track)}
                      <img src={track.track.album.images[0].url} alt="Album Cover"></img>
                      <p>{index + 1}- {track.track.name} from {track.track.artists[0].name}</p>
                    </MusicCard>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>}
      {isSmall && <div>
        <Header />
        <div className="M-usable-area">
          <h1>Recently Played</h1>
          <ul className="M-RP-listing">
            {recentlyPlayed.map((track, index) => (
              <li className="M-RP-list-itens">
                <MusicCard track={track.track}>

                  <img src={track.track.album.images[0].url} alt="Album Cover"></img>
                  <p>{index + 1}- {track.track.name} from {track.track.artists[0].name}</p>
                </MusicCard>
              </li>
            ))}
          </ul>
        </div>
      </div>}
    </div>
  )
}