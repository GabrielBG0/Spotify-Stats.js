import SpotifyWebApi from 'spotify-web-api-js'
import axios from 'axios'
import { clientId, clientSecret, redirectUri } from '../Keys'

const SpotifyApi = new SpotifyWebApi()
const spotifyLogin = axios.create({
    baseURL: 'https://accounts.spotify.com/'
})
// TODO mudar com o avanço do desenvolvimento
const scopes = 'user-top-read user-read-private user-read-recently-played user-modify-playback-state user-read-recently-played'


async function Login() {
    window.location.replace('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + clientId + '&client_secret=' + clientSecret +
        '&scope=' + scopes +
        '&redirect_uri=' + redirectUri)
}

function setToken() {
    if (localStorage.getItem("token")) {
        SpotifyApi.setAccessToken(localStorage.getItem('token'))
    }
}



export { SpotifyApi, Login, setToken, spotifyLogin, scopes }