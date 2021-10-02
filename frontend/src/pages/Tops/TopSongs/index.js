import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import LeftMenu from '../../../components/LeftMenu'
import MusicCard from '../../../components/MusicCard'
import { SpotifyApi, refreshToken } from '../../../services/spotifyApi'
import { useMediaQuery } from 'react-responsive'
import '../index.css'


export default function TopSongs(props) {

  const [topS, setTopS] = useState([])
  const [topM, setTopM] = useState([])
  const [topL, setTopL] = useState([])
  const isSmall = useMediaQuery({ query: '(max-width: 760px)' })
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
  function mountList(track, index) {
    return (
      <li className="list-itens">
        <MusicCard track={track}>
          <img src={track.album.images[0].url} alt="Artist Img" ></img>
          <p>{index + 1}- {track.name} from {track.artists[0].name}</p>
        </MusicCard>
      </li>
    )
  }

  function mountListMobile(track, index) {
    return (
      <li className="M-list-itens">
        <MusicCard track={track}>
          <img src={track.album.images[0].url} alt="Artist Img" ></img>
          <p>{index + 1}- {track.name} from {track.artists[0].name}</p>
        </MusicCard>
      </li>
    )
  }

  useEffect(() => {
    if (localStorage.getItem('token_time') + localStorage.getItem('expires_in') < time.getHours() / 1000) {
      refreshToken()
    }
    getLists(localStorage.getItem('access_token'))
    console.log(topM)

  }, [])

  return (
    <>
      {!isSmall && <div >
        <Header />
        <div className="usable-area">
          <div className="left-menu">
            <LeftMenu isHereS={true} />
          </div>
          <div className="content">
            <div className="time-frame">
              <h1>1 Month</h1>
              <ul className="listing">
                {topS.map((artist, index) => mountList(artist, index))}
              </ul>
            </div>
            <div className="time-frame">
              <h1>6 Months</h1>
              <ul className="listing">
                {topM.map((artist, index) => mountList(artist, index))}
              </ul>
            </div>
            <div className="time-frame">
              <h1>Years</h1>
              <ul className="listing">
                {topL.map((artist, index) => mountList(artist, index))}
              </ul>
            </div>
          </div>
        </div>
      </div>}
      {isSmall && <div>
        <Header />
        <div className="M-usable-area">
          <h1>Top Songs</h1>
          <div className="M-time-frame">
            <h2>1 Month</h2>
            <ul className="M-listing">
              {topS.map((artist, index) => mountListMobile(artist, index))}
            </ul>
          </div>
          <div className="M-time-frame">
            <h2>6 Months</h2>
            <ul className="M-listing">
              {topM.map((artist, index) => mountListMobile(artist, index))}
            </ul>
          </div>
          <div className="M-time-frame">
            <h2>Years</h2>
            <ul className="M-listing">
              {topL.map((artist, index) => mountListMobile(artist, index))}
            </ul>
          </div>
        </div>
      </div>}
    </>
  )
}
