import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import LeftMenu from '../LeftMenu'
import ArtistCard from '../../components/ArtistCard'
import { SpotifyApi, refreshToken } from '../../services/spotifyApi'
import './index.css'


export default function TopArtists(props) {

  const [topS, setTopS] = useState([])
  const [topM, setTopM] = useState([])
  const [topL, setTopL] = useState([])
  const time = new Date()

  const optionsS = {
    limit: 15,
    offset: 0,
    time_range: 'short_term'
  }

  const optionsM = {
    limit: 15,
    offset: 0,
    time_range: 'medium_term'
  }

  const optionsL = {
    limit: 15,
    offset: 0,
    time_range: 'long_term'
  }

  async function getLists(token) {
    SpotifyApi.setAccessToken(token)
    SpotifyApi.getMyTopArtists(optionsS).then(res => {
      setTopS(res.items)
    })
    SpotifyApi.getMyTopArtists(optionsM).then(res => {
      setTopM(res.items)
    })
    SpotifyApi.getMyTopArtists(optionsL).then(res => {
      setTopL(res.items)
    })
  }




  useEffect(() => {
    if (localStorage.getItem('token_time') + localStorage.getItem('expires_in') < (time.getTime() / 1000)) {
      refreshToken()
    }
    getLists(localStorage.getItem('access_token'))

  }, [])

  return (
    <div >
      <Header />
      <div className="usable-area">
        <div className="left-menu">
          <LeftMenu isHereA={true} />
        </div>
        <div className="content">
          <div className="time-frame">
            <h1>1 Month</h1>
            <ul className="listing">
              {topS.map((artist, index) => (
                <li className="list-itens">
                  <ArtistCard artist={artist}>
                    <img src={artist.images[0].url} alt="Artist Img" ></img>
                    <p>{index + 1}- {artist.name}</p>
                  </ArtistCard>
                </li>
              ))}
            </ul>
          </div>
          <div className="time-frame">
            <h1>6 Months</h1>
            <ul className="listing">
              {topM.map((artist, index) => (
                <li className="list-itens">
                  <ArtistCard artist={artist}>
                    <img src={artist.images[0].url} alt="Artist Img" ></img>
                    <p>{index + 1}- {artist.name}</p>
                  </ArtistCard>
                </li>
              ))}
            </ul>
          </div>
          <div className="time-frame">
            <h1>Years</h1>
            <ul className="listing">
              {topL.map((artist, index) => (
                <li className="list-itens">
                  <ArtistCard artist={artist}>
                    <img src={artist.images[0].url} alt="Artist Img" ></img>
                    <p>{index + 1}- {artist.name}</p>
                  </ArtistCard>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}