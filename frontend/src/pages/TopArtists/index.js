import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import LeftMenu from '../LeftMenu'
import { SpotifyApi } from '../../services/spotifyApi'
import './index.css'


export default function TopArtists(props) {

    const [topS, setTopS] = useState([])
    const [topM, setTopM] = useState([])
    const [topL, setTopL] = useState([])

    const optionsS = {
        limit: 10,
        offset: 0,
        time_range: 'short_term'
    }

    const optionsM = {
        limit: 10,
        offset: 0,
        time_range: 'medium_term'
    }

    const optionsL = {
        limit: 10,
        offset: 0,
        time_range: 'long_term'
    }


    useEffect(() => {
        SpotifyApi.setAccessToken(localStorage.getItem('access_token'))
        SpotifyApi.getMyTopArtists(optionsS).then(res => {
            setTopS(res.items)
        })
        SpotifyApi.getMyTopArtists(optionsM).then(res => {
            setTopM(res.items)
        })
        SpotifyApi.getMyTopArtists(optionsL).then(res => {
            setTopL(res.items)
        })
    }, [localStorage.getItem('access_token')])

    return (
        <div >
            <Header />
            <div className="usable-area">
                <div className="left-menu">
                    <LeftMenu isHereA={true} />
                </div>
                <div className="content">
                    <div className="time-frame">
                        <h1>Short Term</h1>
                        <ul className="listing">
                            {topS.map(track => (
                                <li className="list-itens">
                                    <img src={track.images[0].url} alt="Artist Img" ></img>
                                    <p>{track.name} with {track.popularity}/100 of popularity</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="time-frame">
                        <h1>Medium term</h1>
                        <ul className="listing">
                            {topS.map(track => (
                                <li className="list-itens">
                                    <img src={track.images[0].url} alt="Artist Img" ></img>
                                    <p>{track.name} with {track.popularity}/100 of popularity</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="time-frame">
                        <h1>Long term</h1>
                        <ul className="listing">
                            {topS.map(track => (
                                <li className="list-itens">
                                    <img src={track.images[0].url} alt="Artist Img" ></img>
                                    <p>{track.name} with {track.popularity}/100 of popularity</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}