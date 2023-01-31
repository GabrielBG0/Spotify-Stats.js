/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";
import { getCode, SpotifyApi } from "../src/services/spotify";

export default function Code({ cookiesSet }) {
  const router = useRouter();

  useEffect(() => {
    if (cookiesSet) {
      router.push("/");
    }
  }, []);

  return (
    <div className="usable-area">
      <div className="left-menu"></div>
      <div className="home-cg">
        <h1>Loding...</h1>
        <p>Preparing Content</p>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const data = await getCode(stractCode(ctx.resolvedUrl), ctx);

  const userName = await getUserName(data.access_token);

  nookies.set(ctx, "userName", userName);
  return { props: { data, cookiesSet: true } };
}

function stractCode(string) {
  const url = string.split("?").pop();
  const response = url.split("&");
  return response[0].split("=").pop();
}

async function getUserName(token) {
  SpotifyApi.setAccessToken(token);

  const user = await SpotifyApi.getMe();

  return user.body.display_name;
}
