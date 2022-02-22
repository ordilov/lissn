import '../public/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {config, library} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type {AppProps} from 'next/app'
import "react-toastify/dist/ReactToastify.css";
import {useEffect} from "react";
import {fas} from '@fortawesome/free-solid-svg-icons'
import {fab} from "@fortawesome/free-brands-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";

config.autoAddCss = false

function MyApp({Component, pageProps}: AppProps) {
    useEffect(() => {
        // @ts-ignore
        import("bootstrap/dist/js/bootstrap");
        // @ts-ignore
        library.add(fas)
        // @ts-ignore
        library.add(fab)
        library.add(far)
    }, []);
    return <Component {...pageProps} />
}

export default MyApp
