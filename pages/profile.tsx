import Nav from "../components/nav";
import Footer from "../components/footer";
import React, {useEffect, useState} from "react";
import {Member} from "../libs/types";
import {ACCESS_TOKEN} from "../libs/constants";
import {getCurrentUser, updateNameApi, updatePictureApi} from "../api/member-api";
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
        getCurrentUser().then(member => {
            setMember(member);
            setName(member.name);
            setPicture(member.picture);
            setLogin(true);
        });
    }, [])

    async function updateName(memberId: number, name: string) {
        await updateNameApi(memberId, name);
        setMember(await getCurrentUser());
    }

    async function updatePicture(memberId: number, picture: File) {
        const formData = new FormData();
        formData.append("data", picture);
        await updatePictureApi(memberId, formData);
        setMember(await getCurrentUser());
    }

    if (!member) return <div>Loading...</div>

    return (
        <>
            <Nav loginState={[login, setLogin]} memberState={[member, setMember]}/>
            <main className={styles.container}>
                <div className={styles.ProfileContainer}
                     onMouseOver={() => setOnPicture(true)}
                     onMouseLeave={() => {
                         setOnPicture(false)
                     }}>
                    <div className={styles.ProfileImageCropper}>
                        <img className={styles.ProfileImage}
                             src={member?.picture} alt="프로필"/>
                    </div>
                    {onPicture &&
                        <>
                            <label
                                className={styles.ProfileImageButton}
                                htmlFor={'files'}> 사진 변경 </label>
                            <input type={'file'}
                                   className={styles.ProfileImageButton}
                                   id={'files'}
                                   onChange={(e) => updatePicture(member.id, e.target.files!![0])}
                            />
                        </>
                    }
                </div>

                <div className={styles.ProfileNameContainer}>
                    <input type={'text'}
                           className={styles.ProfileNameInput}
                           onChange={(e) => setName(e.target.value)}
                           defaultValue={name}
                           placeholder={"이름을 입력해주세요."}
                           minLength={2}
                           maxLength={10}/>
                    <button onClick={() => updateName(member.id, name)}
                            className={styles.ProfileNameButton}>
                        변경
                    </button>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Profile;