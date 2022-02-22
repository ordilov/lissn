import type {NextPage} from 'next'
import HeaderLayout from "../components/headerLayout";
import FooterLayout from "../components/footerLayout";
import Player from "../components/player";
import React, {useEffect, useState} from "react";
import NavLayout from "../components/navLayout";
import {ACCESS_TOKEN} from "../libs/constants";

const Home: NextPage = () => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        let token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return
        getCurrentUser(token).then(user => {
            setCurrentUser(user);
        })
    }, [])

    if (currentUser){
        return (
            <>
                <HeaderLayout/>
                <NavLayout currentUser={currentUser}/>
                <main>
                    <Player/>
                </main>
                <FooterLayout/>
            </>
        )
    }

    return (
        <>
            <HeaderLayout/>
            <NavLayout currentUser={currentUser}/>
            <main>
                <Player/>
            </main>
            <FooterLayout/>
        </>
    )
}

export async function getCurrentUser(accessToken: string) {
    const headers = new Headers({
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    })
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/members/me`, {
        method: 'GET',
        headers
    })
    const user = await response.json();
    return user.data;
}

export default Home
