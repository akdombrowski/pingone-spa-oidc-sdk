"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import {
  LogLevel,
  OidcClient as OIDC_Client,
  OidcClient,
  ResponseType,
  StorageType,
} from "@pingidentity-developers-experience/ping-oidc-client-sdk";

const envID = "333d66b5-d2f0-48d0-8ec0-cf4cafd35d25";
const clientID = "7cbbc92e-97d7-4f72-97e8-28173f76b8ba";
const redirectURI = "http://localhost:3000";
const scopes = "openid";
const responseType = "code";
const grantType = "authorization_code";

export const Home = () => {
  const [idT, setIDT] = useState("");
  const [aT, setAT] = useState("");
  const oidcClientRef = useRef<OidcClient | null>(null);

  useEffect(() => {
    const initOIDCClient = async () => {
      const oidcClient = await OIDC_Client.initializeFromOpenIdConfig(
        "https://auth.pingone.com/" + envID + "/as",
        {
          client_id: clientID,
          redirect_uri: redirectURI,
          response_type: ResponseType.AuthorizationCode,
          scope: scopes,
          logLevel: LogLevel.None,
          storageType: StorageType.Session,
        }
      );

      oidcClientRef.current = oidcClient;
    };

    initOIDCClient();
  }, []);

  const onLogin = async (event: SyntheticEvent) => {
    event.preventDefault();

    const oidc = oidcClientRef.current;
    if (oidc) {
      await oidc.authorize();

      if (await oidc.hasToken()) {
        const token = await oidc.getToken();

        setAT(token.access_token);
        setIDT(token.id_token || "");
      }
    }
  };

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
        <input
          type="button"
          onClick={onLogin}
          value="Login"
        />
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
};

export default Home;
