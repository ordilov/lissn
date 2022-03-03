import React, {Dispatch, SetStateAction, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faHeadphones, faMusic, faSearch, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {toast} from "react-toastify";
import {ACCESS_TOKEN, GOOGLE_AUTH_URL} from "../libs/constants";
import Link from "next/link";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {Dropdown} from "react-bootstrap";

function NavLayout({
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
                        <li className="nav-item">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="nav-settings-toggle" className={"navbar-icon"}>
                                    <FontAwesomeIcon icon={faCog as IconProp}/> 설정
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <a className="navbar-icon" href="#" onClick={() => {
                        }}>
                            <FontAwesomeIcon icon={faUser as IconProp}/> {member?.name}님
                            {/*<img src={currentUser?.profileImageUrl} alt={""}/>*/}
                        </a>
                        <a className="navbar-icon" href="./" onClick={logout}>
                            <FontAwesomeIcon icon={faSignOutAlt as IconProp} size={"1x"}/> 로그아웃
                        </a>

                        <Link href="/playlists">
                            <a className="navbar-icon" href="#" onClick={getMemberPlaylists}>
                                <FontAwesomeIcon icon={faMusic as IconProp} size={"1x"}/> 플레이리스트
                            </a>
                        </Link>
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

export default NavLayout;