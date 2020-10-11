import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import LeftMenu from '../LeftMenu'
import { SpotifyApi } from '../../services/spotifyApi'
import { clientId, clientSecret } from '../../Keys'
import { stringify } from 'querystring'
import './index.css'


export default function TopSongs(props) {

    const [topS, setTopS] = useState([])
    const [topM, setTopM] = useState([])
    const [topL, setTopL] = useState([])
    const time = new Date()

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

    function getLists(token) {
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

    async function refreshToken() {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: stringify({
                'grant_type': "refresh_token",
                'refresh_token': localStorage.getItem('refresh_token'),
                'client_id': clientId,
                'client_secret': clientSecret
            })
        })

        const data = await result.json()
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('token_type', data.token_type)
        localStorage.setItem('expires_in', data.expires_in)
        localStorage.setItem('scope', data.scope)
        localStorage.setItem('token_time', time.getTime() / 1000)

        getLists(data.access_token)
    }


    useEffect(() => {
        if (localStorage.getItem('token_time') + localStorage.getItem('expires_in') < time.getHours() / 1000) {
            refreshToken()
        } else {
            getLists(localStorage.getItem('access_token'))
        }
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
                        <h1>Short Term</h1>
                        <ul className="listing">
                            {topS.map(track => (
                                <li className="list-itens">
                                    <img src={track.album.images[0].url} alt="Artist Img" ></img>
                                    <p>{track.name} from {track.artists[0].name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="time-frame">
                        <h1>Medium term</h1>
                        <ul className="listing">
                            {topM.map(track => (
                                <li className="list-itens">
                                    <img src={track.album.images[0].url} alt="Artist Img" ></img>
                                    <p>{track.name} from {track.artists[0].name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="time-frame">
                        <h1>Long term</h1>
                        <ul className="listing">
                            {topL.map(track => (
                                <li className="list-itens">
                                    <img src={track.album.images[0].url} alt="Artist Img" ></img>
                                    <p>{track.name} from {track.artists[0].name}</p>
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