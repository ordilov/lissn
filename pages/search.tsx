import HeaderLayout from "../components/header";
import Nav from "../components/nav";
import Footer from "../components/footer";
import React, {useEffect, useState} from "react";
import {Member} from "../libs/types";
import {ACCESS_TOKEN} from "../libs/constants";
import {getCurrentUser} from "../api/member-api";

function Search() {
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
            </main>
            <Footer/>
        </>
    )
}

export default Search;