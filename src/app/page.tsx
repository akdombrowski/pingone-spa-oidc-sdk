import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [idT, setidT] = useState("");
  const [aT, setAT] = useState("");

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Get started with PingOne and NextJS</p>
        <div>
          <div style={{ paddingBottom: "1vh" }}>By</div>
          <a
            href="https://apidocs.pingidentity.com/pingone/main/v1/api/#getting-started-with-the-pingone-apis"
            target="_blank"
            rel="noopener noreferrer">
            <Image
              src="/Ping-Logo.svg"
              alt="Ping Identity Logo"
              className={styles.pingLogo}
              width={100}
              height={100}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/PingOne.svg"
          alt="PingOne Logo"
          width={620}
          height={112}
          priority
        />
      </div>

      <div
        style={{
          borderColor: "white",
          borderStyle: "solid",
          borderWidth: 3,
          padding: ".5rem",
        }}>
        <a
          href={authzURL}
          target="_self">
          <h1>Login</h1>
        </a>
      </div>

      <div
        style={{
          height: "10rem",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}>
        {aT ? (
          <p
            style={{
              fontSize: "0.75rem",
              wordBreak: "break-all",
              height: "100%",
              overflow: "auto",
            }}>
            access token: <br />
            {aT}
          </p>
        ) : (
          <></>
        )}
      </div>

      <div
        style={{
          height: "10rem",
          marginTop: "1rem",
          marginBottom: "2rem",
          fontSize: ".75rem",
        }}>
        {idT ? (
          <p
            style={{
              fontSize: "0.75rem",
              wordBreak: "break-all",
              height: "100%",
              overflow: "auto",
            }}>
            id token: <br />
            {idT}
          </p>
        ) : (
          <p>
            Click on <strong>Login</strong> to retrieve tokens
          </p>
        )}
      </div>
    </main>
  );
}
