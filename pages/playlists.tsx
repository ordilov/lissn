import HeaderLayout from "../components/headerLayout";
import FooterLayout from "../components/footerLayout";
import React, {useEffect, useState} from "react";
import NavLayout from "../components/navLayout";
import {ACCESS_TOKEN} from "../libs/constants";
import PlaylistLayout from "../components/playlistLayout";
import {getCurrentUser} from "../api/server";

function MyPlaylists() {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        let token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return
        getCurrentUser().then(user => {
            setCurrentUser(user);
        })
    }, [])

  return (
      <>
        <HeaderLayout/>
        <NavLayout currentUser={currentUser}/>
        <main>
            <PlaylistLayout/>
        </main>
        <FooterLayout/>
      </>
  )
}

export default MyPlaylists
