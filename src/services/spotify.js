import SpotifyWebApi from "spotify-web-api-node";
import { clientId, clientSecret, redirectUri } from "../keys";
import { stringify } from "querystring";
import axios from "axios";
import nookies from "nookies";

const SpotifyApi = new SpotifyWebApi();
const scopes = "user-top-read user-read-private user-read-recently-played";
const time = new Date();

async function login() {
  window.location.replace(
    "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret +
      "&scope=" +
      scopes +
      "&redirect_uri=" +
      redirectUri
  );
}

async function runRefreshToken(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const result = await axios.post(
      "https://accounts.spotify.com/api/token",
      stringify({
        grant_type: "refreshToken",
        refreshToken: cookies.refresh_token2,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }
    );

    const data = await result.data;

    nookies.set(ctx, "access_token", data.access_token);
    nookies.set(ctx, "token_type", data.token_type);
    nookies.set(ctx, "expires_in", data.expires_in);
    nookies.set(ctx, "scope", data.scope);
    nookies.set(ctx, "refresh_token", data.refresh_token);
    nookies.set(ctx, "refresh_token2", data.refresh_token);
    nookies.set(ctx, "token_time", time.getTime() / 1000);
    return data;
  } catch (e) {
    return { err: true };
  }
}
async function getCode(code, ctx) {
  const time = new Date();
  if (code !== "access_denied") {
    const result = await axios.post(
      "https://accounts.spotify.com/api/token",
      stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }
    );

    const data = await result.data;

    nookies.set(ctx, "access_token", data.access_token);
    nookies.set(ctx, "token_type", data.token_type);
    nookies.set(ctx, "expires_in", data.expires_in);
    nookies.set(ctx, "scope", data.scope);
    nookies.set(ctx, "refresh_token", data.refresh_token);
    nookies.set(ctx, "refresh_token2", data.refresh_token);
    nookies.set(ctx, "token_time", time.getTime() / 1000);

    return data;
  }
}

export { SpotifyApi, login, scopes, runRefreshToken, getCode };
