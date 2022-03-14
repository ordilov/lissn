import Footer from "../components/footer";
import React, {useEffect, useState} from "react";
import Nav from "../components/nav";
import {ACCESS_TOKEN} from "../libs/constants";
import PlaylistLayout from "../components/playlistLayout";
import Space from "../components/space";
import {Member} from "../libs/types";
import {getCurrentUser} from "../api/member-api";

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
            <Nav loginState={[login, setLogin]} memberState={[member, setMember]}/>
            <main>
                <PlaylistLayout/>
            </main>
            <Footer/>
            <Space/>
        </>
    )
}

export default MyPlaylists
