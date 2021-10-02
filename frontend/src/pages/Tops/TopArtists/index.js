import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import LeftMenu from '../../../components/LeftMenu'
import ArtistCard from '../../../components/ArtistCard'
import { SpotifyApi, refreshToken } from '../../../services/spotifyApi'
import { useMediaQuery } from 'react-responsive'
import '../index.css'


export default function TopArtists(props) {

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
    <>
      {!isSmall && <div >
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
      </div>}
      {isSmall && <div>
        <Header />
        <div className="M-usable-area">
          <h1>Top Artists</h1>
          <div className="M-time-frame">
            <h2>1 Month</h2>
            <ul className="M-listing">
              {topS.map((artist, index) => (
                <li className="M-list-itens">
                  <ArtistCard artist={artist}>
                    <img src={artist.images[0].url} alt="Artist Img" ></img>
                    <p>{index + 1}- {artist.name}</p>
                  </ArtistCard>
                </li>
              ))}
            </ul>
          </div>
          <div className="M-time-frame">
            <h2>6 Months</h2>
            <ul className="M-listing">
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
          <div className="M-time-frame">
            <h2>Years</h2>
            <ul className="M-listing">
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
      </div>}
    </>
  )
}