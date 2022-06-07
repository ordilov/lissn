import type {NextPage} from 'next'
import Footer from "../components/footer";
import Player from "../components/player";
import React, {useEffect, useState} from "react";
import Nav from "../components/nav";
import {ACCESS_TOKEN} from "../libs/constants";
import Space from "../components/space";
import {Member} from "../libs/types";
import {getCurrentUser} from "../api/member-api";

const Home: NextPage = () => {
    const [member, setMember] = useState<Member>();
    const [login, setLogin] = useState(false);

    useEffect(() => {
        getUser();
    }, [])

    async function getUser(){
        let token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return
        const member = await getCurrentUser();
        setMember(member);
        setLogin(true);
    }

    return (
        <>
            <Nav loginState={[login, setLogin]}
                 memberState={[member, setMember]}/>
            <main>
                <Player login={login}/>
            </main>
            <Footer/>
            <Space/>
        </>
    )
}
export default Home
