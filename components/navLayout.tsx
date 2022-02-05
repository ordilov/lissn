import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faHeadphones, faSearch, faUser} from "@fortawesome/free-solid-svg-icons";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import Login from "./login";
import {login} from "../api/server";
import {YOUTUBE_AUTH, YOUTUBE_AUTH_READ, YOUTUBE_AUTH_UPLOAD} from "../libs/constants";
import Script from "next/script";
import GoogleAuth = gapi.auth2.GoogleAuth;
import {NavbarBrand} from "react-bootstrap";

function NavLayout() {

  const [googleAuth, setGoogleAuth] = useState<GoogleAuth>();
  const [name, setName] = useState("");
  const [signIn, setSignIn] = useState(false);


  useEffect(() => {
    setName("");
    if (signIn) {
      login(googleAuth);
      setName(googleAuth?.currentUser.get().getBasicProfile().getName() || "");
    }
  }, [signIn])

  async function updateSignInStatus(isSignedIn: boolean) {
    setSignIn(isSignedIn);
  }

  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  async function initClient() {
    const scopes = [YOUTUBE_AUTH, YOUTUBE_AUTH_READ, YOUTUBE_AUTH_UPLOAD].join(' ');

    await gapi.client.init({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      scope: scopes
    });
    const auth = gapi.auth2.getAuthInstance();
    auth.isSignedIn.listen(updateSignInStatus);
    setGoogleAuth(auth);
    setSignIn(auth.isSignedIn.get());
  }


  async function getMemberPlaylists() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/{memberId}/playlists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await response.json();
    console.log(data);
  }

  return <>
    <Script async defer src="https://apis.google.com/js/api.js"
            onLoad={handleClientLoad}>
    </Script>

    <nav className="navbar navbar-expand-sm navbar-inverse bg-dark">

      <a className="navbar-brand" href="#"> <div> <FontAwesomeIcon icon={faHeadphones} size={"1x"}/> 리슨 </div></a>
      <a className="navbar-brand" href="#"><FontAwesomeIcon icon={faSearch} size={"1x"}/> 검색</a>

      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <FontAwesomeIcon icon={faGoogle} size={"1x"}/>
          <Login googleAuth={googleAuth} signIn={signIn}/>
        </li>

        <li className="nav-item">
          <button id={"google-login"} onClick={console.log}>
            <FontAwesomeIcon icon={faUser}/> {name}님
          </button>
        </li>
        <li className="nav-item">
          <button id={"google-login"} onClick={console.log}>
            <FontAwesomeIcon icon={faCog}/> 설정
          </button>
        </li>
      </ul>
    </nav>

  </>
}

export default NavLayout;