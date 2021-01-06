import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import LeftMenu from '../../LeftMenu'
import MusicCard from '../../../components/MusicCard'
import { SpotifyApi, refreshToken } from '../../../services/spotifyApi'
import '../index.css'


export default function TopSongs(props) {

  const [topS, setTopS] = useState([])
  const [topM, setTopM] = useState([])
  const [topL, setTopL] = useState([])
  const time = new Date()

  const optionsS = {
    limit: 20,
    offset: 0,
    time_range: 'short_term'
  }

  const optionsM = {
    limit: 20,
    offset: 0,
    time_range: 'medium_term'
  }

  const optionsL = {
    limit: 20,
    offset: 0,
    time_range: 'long_term'
  }

  async function getLists(token) {
    SpotifyApi.setAccessToken(token)
    SpotifyApi.getMyTopTracks(optionsS).then(res => {
      setTopS(res.items)
    })
    SpotifyApi.getMyTopTracks(optionsM).then(res => {
      setTopM(res.items)
    })
    SpotifyApi.getMyTopTracks(optionsL).then(res => {
      setTopL(res.items)
    })
  }

  useEffect(() => {
    if (localStorage.getItem('token_time') + localStorage.getItem('expires_in') < time.getHours() / 1000) {
      refreshToken()
    }
    getLists(localStorage.getItem('access_token'))

  }, [])

  return (
    <div >
      <Header />
      <div className="usable-area">
        <div className="left-menu">
          <LeftMenu isHereS={true} />
        </div>
        <div className="content">
          <div className="time-frame">
            <h1>1 Month</h1>
            <ul className="listing">
              {topS.map((track, index) => (
                <li className="list-itens">
                  <MusicCard track={track}>
                    <img src={track.album.images[0].url} alt="Artist Img" ></img>
                    <p>{index + 1}- {track.name} from {track.artists[0].name}</p>
                  </MusicCard>
                </li>
              ))}
            </ul>
          </div>
          <div className="time-frame">
            <h1>6 Months</h1>
            <ul className="listing">
              {topM.map((track, index) => (
                <li className="list-itens">
                  <MusicCard track={track}>
                    <img src={track.album.images[0].url} alt="Artist Img" ></img>
                    <p>{index + 1}- {track.name} from {track.artists[0].name}</p>
                  </MusicCard>
                </li>
              ))}
            </ul>
          </div>
          <div className="time-frame">
            <h1>Years</h1>
            <ul className="listing">
              {topL.map((track, index) => (
                <li className="list-itens">
                  <MusicCard track={track}>
                    <img src={track.album.images[0].url} alt="Artist Img" ></img>
                    <p>{index + 1}- {track.name} from {track.artists[0].name}</p>
                  </MusicCard>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}