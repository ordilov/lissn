import HeaderLayout from "../components/headerLayout";
import FooterLayout from "../components/footerLayout";
import React, {useEffect, useState} from "react";
import NavLayout from "../components/navLayout";
import {ACCESS_TOKEN} from "../libs/constants";
import PlaylistLayout from "../components/playlistLayout";
import {getCurrentUser} from "../api/server";
import Space from "../components/space";
import {Member} from "../libs/types";

function MyPlaylists() {
    const [member, setMember] = useState<Member>()
    const [login, setLogin] = useState<boolean>(false)

    useEffect(() => {
        let token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return
        getCurrentUser().then(member => {
            setMember(member);
            setLogin(true);
        })
    }, [])

    return (
        <>
            <HeaderLayout/>
            <NavLayout loginState={[login, setLogin]} memberState={[member, setMember]}/>
            <main>
                <PlaylistLayout/>
            </main>
            <FooterLayout/>
            <Space/>
        </>
    )
}

export default MyPlaylists
