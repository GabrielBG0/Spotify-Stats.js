/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { clientId, clientSecret, redirectUri } from "../src/keys";
import { stringify } from "querystring";
import { useRouter } from "next/router";
import nookies from "nookies";
import axios from "axios";
import { getCode } from "../src/services/spotify";

export default function Code({ data, cookiesSet }) {
  const time = new Date();
  const router = useRouter();

  useEffect(() => {
    console.log(data);
    if (cookiesSet) {
      router.push("/");
    }
  }, [cookiesSet]);

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

  return { props: { data, cookiesSet: true } };
}

function stractCode(string) {
  const url = string.split("?").pop();
  const response = url.split("&");
  return response[0].split("=").pop();
}
