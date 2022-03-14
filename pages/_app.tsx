import '../public/styles/globals.scss'
import '../public/styles/input.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type {AppProps} from 'next/app'
import "react-toastify/dist/ReactToastify.css";
import {useEffect} from "react";
import {fas} from '@fortawesome/free-solid-svg-icons'
import {fab} from "@fortawesome/free-brands-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {config, IconPack, library} from '@fortawesome/fontawesome-svg-core'
import Header from "../components/header";

config.autoAddCss = false

function MyApp({Component, pageProps}: AppProps) {
    useEffect(() => {
        // @ts-ignore
        import("bootstrap/dist/js/bootstrap");
        library.add(far);
        library.add(fas as IconPack);
        library.add(fab as IconPack);
    }, []);


    return (
        <>
            <Header/>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
