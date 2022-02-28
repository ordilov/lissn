import type {NextPage} from 'next'
import HeaderLayout from "../components/headerLayout";
import FooterLayout from "../components/footerLayout";
import Player from "../components/player";
import React, {useEffect, useState} from "react";
import NavLayout from "../components/navLayout";
import {ACCESS_TOKEN} from "../libs/constants";
import {getCurrentUser} from "../api/server";
import Space from "../components/space";

const Home: NextPage = () => {
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
                <Player/>
            </main>
            <FooterLayout/>
            <Space />
        </>
    )
}
export default Home
