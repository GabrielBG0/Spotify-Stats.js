import Head from "next/head";
import styles from "../styles/pages/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Spotify Stats - Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      content
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
