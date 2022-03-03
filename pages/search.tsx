import HeaderLayout from "../components/headerLayout";
import NavLayout from "../components/navLayout";
import FooterLayout from "../components/footerLayout";
import React, {useEffect, useState} from "react";
import {Member} from "../libs/types";
import {ACCESS_TOKEN} from "../libs/constants";
import {getCurrentUser} from "../api/server";

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
            <HeaderLayout/>
            <NavLayout loginState={[login, setLogin]} memberState={[member, setMember]}/>
            <main>
            </main>
            <FooterLayout/>
        </>
    )
}

export default Search;