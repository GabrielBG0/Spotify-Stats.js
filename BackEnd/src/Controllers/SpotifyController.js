const spotifyApi = require('../SpotifyConnection')
module.exports = {
    getToken(request, response) {
        const { token } = request.params

        spotifyApi.setAccessToken(token)
    }
}