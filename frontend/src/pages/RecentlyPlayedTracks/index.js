import React, { useState, useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import LeftMenu from '../LeftMenu'
import { SpotifyApi, refreshToken } from '../../services/spotifyApi'
import './index.css'


export default function RecentlyPlayedTracks(props) {

    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const time = new Date()

    async function getList(token) {
        SpotifyApi.setAccessToken(token)
        SpotifyApi.getMyCurrentPlayingTrack({ limit: 10 }).then(res => {
            setRecentlyPlayed(res.items)
            console.log(res)
        })
    }

    useEffect(() => {
        if (localStorage.getItem('token_time') + localStorage.getItem('expires_in') < (time.getTime() / 1000)) {
            refreshToken()
        }
        getList(localStorage.getItem('access_token'))
        console.log(recentlyPlayed)
    })


    return (
        <div >
            <Header />
            <div className="usable-area">
                <div className="left-menu">
                    <LeftMenu isHereRP={true} />
                </div>
                <div className="home">
                    <ul>

                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    )
}