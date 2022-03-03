import type {NextPage} from 'next'
import {useRouter} from "next/router";
import {useEffect} from "react";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../libs/constants";

const OAuth2RedirectHandler: NextPage = () => {
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return;
        const {token, refreshToken} = router.query;
        localStorage.setItem(ACCESS_TOKEN, token as string)
        localStorage.setItem(REFRESH_TOKEN, refreshToken as string)

        router.push("/")
    }, [router.isReady])
    return <></>
}

export default OAuth2RedirectHandler
