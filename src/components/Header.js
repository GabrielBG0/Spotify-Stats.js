import react from "react";
import { FiUser } from "react-icons/fi";
import styles from "../../styles/components/Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>Spotify Stats</h1>
      </div>
      <div>
        <span>Home</span>
        <span>Top Artists</span>
        <span>Top Songs</span>
        <span>Recent Tracks</span>
        <span>
          <FiUser />
        </span>
      </div>
    </header>
  );
}
