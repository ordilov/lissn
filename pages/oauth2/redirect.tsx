import type {NextPage} from 'next'
import {useRouter} from "next/router";
import {useEffect} from "react";
import {ACCESS_TOKEN} from "../../libs/constants";

const OAuth2RedirectHandler: NextPage = () => {
    const router = useRouter()
    console.log("TOKEN");

    useEffect(() => {
        if(!router.isReady) return;
        const {token} = router.query;
        localStorage.setItem(ACCESS_TOKEN, token as string)
        router.push("/")
    }, [router.isReady])


    return <></>
}

export default OAuth2RedirectHandler
