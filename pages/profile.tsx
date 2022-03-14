import Nav from "../components/nav";
import Footer from "../components/footer";
import React, {useEffect, useState} from "react";
import {Member} from "../libs/types";
import {ACCESS_TOKEN} from "../libs/constants";
import {getCurrentUser, updateProfile} from "../api/member-api";
import styles from '../public/styles/Profile.module.scss';

function Profile() {
    const [member, setMember] = useState<Member>()
    const [name, setName] = useState("")
    const [picture, setPicture] = useState("")
    const [onPicture, setOnPicture] = useState(false)
    const [login, setLogin] = useState<boolean>(false)

    useEffect(() => {
        let token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return
        console.log(token);
        getCurrentUser().then(member => {
            setMember(member);
            setName(member.name);
            setPicture(member.picture);
            setLogin(true);
        });
    }, [])

    async function updateName(name: string) {
        await updateProfile(name, picture);
        setMember(await getCurrentUser());
    }

    async function updatePicture(picture: string) {
        await updateProfile(name, picture);
        setMember(await getCurrentUser());
    }

    return (
        <>
            <Nav loginState={[login, setLogin]} memberState={[member, setMember]}/>
            <main className={styles.container}>
                <div className={styles.ProfileContainer}
                     onMouseOver={() => setOnPicture(true)}
                     onMouseLeave={() => {setOnPicture(false)}}>
                    <div className={styles.ProfileImageCropper}>
                        <img className={styles.ProfileImage}
                             src={member?.picture} alt="프로필"/>
                    </div>
                    {onPicture &&
                        <button className={styles.ProfileImageButton}
                        onClick={() => updatePicture(picture)}>
                            프로필 편집
                        </button>}
                </div>
                <h2>{name}</h2>
                <input type={'text'} onChange={(e) => setName(e.target.value)} placeholder={'닉네임'} minLength={2}
                       maxLength={10}/>
                <button onClick={() => updateName(name)}>수정</button>
            </main>
            <Footer/>
        </>
    )
}

export default Profile;