import React from "react";
import Image from "next/image";
import styles from "../../styles/components/RankingItem.module.scss";

export default function RankingItem(props) {
  return (
    <li
      className={styles.card}
      style={{ backgroundColor: props.bgc, color: props.fc }}
    >
      <div className={styles.rank}>{props.rank}</div>
      <div className={styles.image}>
        <Image src={props.img} alt="album cover" width={50} height={50} />
      </div>
      <div>
        {props.title} from {props.artist}
      </div>
    </li>
  );
}
