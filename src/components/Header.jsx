import react from "react";
import { FiUser } from "react-icons/fi";
import Link from "next/link";
import styles from "../../styles/components/Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <Link href="/">
          <h1>Spotify Stats</h1>
        </Link>
      </div>
      <div className={styles.menu}>
        <Link href="/">Home</Link>
        <Link href="/TopArtists">Top Artists</Link>
        <Link href="/TopSongs">Top Songs</Link>
        <span>
          <FiUser size={30} />
        </span>
      </div>
    </header>
  );
}
