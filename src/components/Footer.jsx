import React from "react";
import SpotifyIcon from "../../public/Spotify_Icon_RGB_Green.png";
import { BsFillSuitHeartFill } from "react-icons/bs";
import Image from "next/image";
import styles from "../../styles/components/Footer.module.scss";

export default function Footer(props) {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.leftMsg}>
          <p>
            Made with <BsFillSuitHeartFill color="#e31b23" /> by{" "}
            <a
              rel="noopener noreferrer"
              href="https://github.com/GabrielBG0"
              target="_blank"
            >
              <u>GBG</u>
            </a>
          </p>
        </div>
        <div className={styles.rightMsg}>
          <div className={styles.rightMsgTxt}>
            <p>Powered by the Spotify Web API</p>
            <p>
              Click{" "}
              <a
                rel="noopener noreferrer"
                href="https://developer.spotify.com/documentation/web-api/reference/"
                target="_blank"
              >
                <u>Here</u>
              </a>{" "}
              to know more
            </p>
          </div>
          <a
            rel="noopener noreferrer"
            href="https://www.spotify.com/"
            target="_blank"
          >
            <Image
              src={SpotifyIcon}
              alt="Spotify Logo"
              width={42}
              height={42}
            />
          </a>
        </div>
      </footer>
    </>
  );
}
