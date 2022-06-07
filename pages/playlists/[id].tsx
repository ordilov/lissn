import React, {useEffect, useState} from "react";
import {Member} from "../../libs/types";
import {ACCESS_TOKEN} from "../../libs/constants";
import {getCurrentUser} from "../../api/member-api";
import Nav from "../../components/nav";
import Footer from "../../components/footer";
import {getPlaylistApi} from "../../api/server";
import {useRouter} from "next/router";
import PlaylistLayout from "../../layouts/playlist-layout";

export default function Playlist() {
    const [member, setMember] = useState<Member>();
    const [login, setLogin] = useState(false);
    const [playlist, setPlaylist] = useState<any>();
    const router = useRouter();
    const {id} = router.query;


    useEffect(() => {
        getUser();

        if (!id) return;
        getPlaylist(parseInt(id as string));
    }, [id])


    async function getUser() {
        if (!localStorage.getItem(ACCESS_TOKEN)) return
        const member = await getCurrentUser();
        setMember(member);
        setLogin(true);
    }

    async function getPlaylist(id: number) {
        const playlist = await getPlaylistApi(id);
        console.log(playlist);
        setPlaylist(playlist);
    }

    if (!playlist) return <div>loading</div>

    return (
        <>
            <Nav loginState={[login, setLogin]} memberState={[member, setMember]}/>
            <main>
                <PlaylistLayout playlist={playlist} memberId={member?.id}/>
            </main>
            <Footer/>
        </>
    );
}