import SpotifyWebApi from 'spotify-web-api-js'
import { clientId, clientSecret, redirectUri } from '../Keys'
import { stringify } from 'querystring'

const SpotifyApi = new SpotifyWebApi()
const scopes = 'user-top-read user-read-private user-read-recently-played user-modify-playback-state user-read-playback-state user-read-recently-played'
const time = new Date()

async function Login() {
    window.location.replace('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + clientId + '&client_secret=' + clientSecret +
        '&scope=' + scopes +
        '&redirect_uri=' + redirectUri)
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

}



export { SpotifyApi, Login, scopes, refreshToken }