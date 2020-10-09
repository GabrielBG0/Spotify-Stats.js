import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import LeftMenu from '../LeftMenu'
import { clientId, clientSecret, redirectUri } from '../../Keys'
import { SpotifyApi, spotifyLogin } from '../../services/spotifyApi'
import { useHistory } from 'react-router-dom'
import { stringify } from 'querystring'
import './index.css'


export default function TopArtists(props) {
    const history = useHistory()
    async function getCode() {
        const code = stractCode(window.location.href)
        if (code !== 'access_denied') {

            fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: stringify({
                    'grant_type': "authorization_code",
                    'code': code,
                    'redirect_uri': redirectUri,
                    'client_id': clientId,
                    'client_secret': clientSecret
                })
            }).then(resp => {
                localStorage.setItem('token_data', resp)
                console.log(resp)
            })

        } else {
            history.push('accessDenied')
        }
    }


    function stractCode(string) {
        const url = string.split('?').pop()
        const response = url.split('&')
        const code = response[0].split('=').pop()
        return code

    }
    return (
        <div onLoad={getCode}>
            <Header />
            <div className="usable-area">
                <div className="left-menu">
                    <LeftMenu isHereH={true} />
                </div>
                <div className="home">
                    <h1>Loding...</h1>
                    <p>Preparing Content</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}