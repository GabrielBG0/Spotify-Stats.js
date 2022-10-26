import SpotifyWebApi from "spotify-web-api-node";
import { clientId, clientSecret, redirectUri } from "../keys";
import { stringify } from "querystring";
import axios from "axios";
import nookies from "nookies";

const SpotifyApi = new SpotifyWebApi();
const scopes = "user-top-read user-read-private user-read-recently-played";
const time = new Date();

async function login() {
  console.log(clientId, clientSecret, scopes, redirectUri);
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

async function refreshToken(ctx) {
  const cookies = nookies.get(ctx);
  console.log(cookies);
  try {
    const result = await axios.post(
      "https://accounts.spotify.com/api/token",
      stringify({
        grant_type: "refresh_token",
        refresh_token: cookies.refresh_token,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }
    );

    const data = await result.data;

    nookies.destroy(ctx, "access_token");
    nookies.destroy(ctx, "token_type");
    nookies.destroy(ctx, "expires_in");
    nookies.destroy(ctx, "scope");
    nookies.destroy(ctx, "refresh_token");
    nookies.destroy(ctx, "token_time");

    nookies.set(ctx, "access_token", data.access_token);
    nookies.set(ctx, "token_type", data.token_type);
    nookies.set(ctx, "expires_in", data.expires_in);
    nookies.set(ctx, "scope", data.scope);
    nookies.set(ctx, "refresh_token", data.refresh_token);
    nookies.set(ctx, "token_time", time.getTime() / 1000);

    return data;
  } catch (e) {
    console.log("err");
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
    nookies.set(ctx, "token_time", time.getTime() / 1000);

    return data;
  }
}

export { SpotifyApi, login, scopes, refreshToken, getCode };
