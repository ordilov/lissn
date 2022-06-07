import React, {Dispatch, SetStateAction, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faHeadphones, faMusic, faSearch, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {toast} from "react-toastify";
import {ACCESS_TOKEN, GOOGLE_AUTH_URL} from "../libs/constants";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

function Nav({
                 loginState: [login, setLogin],
                 memberState: [member, setMember],
             }: {
    memberState: [any, any], loginState: [boolean, Dispatch<SetStateAction<boolean>>]
}) {

    useEffect(() => {
    }, [member])

    function logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expiresAt');
        localStorage.removeItem('user');
        setMember(null);
        setLogin(false);
        toast.success("Logged out successfully")
    }

    return <>
        <nav className="navbar navbar-expand-sm">
            <a className="menu-button navbar-brand navbar-icon" href="./">
                <div><FontAwesomeIcon icon={faHeadphones as IconProp} size={"1x"}/> 리슨</div>
            </a>
            <a className="navbar-brand navbar-icon" href="/search">
                <FontAwesomeIcon icon={faSearch as IconProp} size={"1x"}/> 검색
            </a>

            <ul className="navbar-nav ms-auto">
                {member ?
                    <>
                        <a className="navbar-icon">
                            <FontAwesomeIcon icon={faCog as IconProp}/> 설정
                        </a>

                        <a className="navbar-icon" href="/profile">
                            <FontAwesomeIcon icon={faUser as IconProp}/> {member?.name}님
                        </a>

                        <a className="navbar-icon" href="./" onClick={logout}>
                            <FontAwesomeIcon icon={faSignOutAlt as IconProp} size={"1x"}/> 로그아웃
                        </a>

                        <a className="navbar-icon" href="/playlists" onClick={getMemberPlaylists}>
                            <FontAwesomeIcon icon={faMusic as IconProp} size={"1x"}/> 플레이리스트
                        </a>
                    </>
                    :
                    <>
                        <a className="navbar-icon" href={GOOGLE_AUTH_URL}>
                            <FontAwesomeIcon icon={faGoogle as IconProp} size={"1x"}/> 로그인
                        </a>
                    </>
                }
            </ul>
        </nav>
        <style jsx>{`

        `}</style>
    </>
}

async function getMemberPlaylists() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/playlists`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json();
    console.log(data);
}

export default Nav;