import type {NextPage} from 'next'
import HeaderLayout from "../components/headerLayout";
import FooterLayout from "../components/footerLayout";
import Player from "../components/player";
import React, {useEffect, useState} from "react";
import NavLayout from "../components/navLayout";
import {ACCESS_TOKEN} from "../libs/constants";
import {getCurrentUser} from "../api/server";
import Space from "../components/space";
import {Member} from "../libs/types";

const Home: NextPage = () => {
    const [member, setMember] = useState<Member>();
    const [login, setLogin] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return
        getCurrentUser().then((member: Member) => {
            setMember(member);
            setLogin(true);
        });
    }, [])

    return (
        <>
            <HeaderLayout/>
            <NavLayout loginState={[login, setLogin]}
                       memberState={[member, setMember]}/>
            <main>
                <Player login={login}/>
            </main>
            <FooterLayout/>
            <Space/>
        </>
    )
}
export default Home
