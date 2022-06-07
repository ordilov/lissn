import Head from "next/head";
import {NextPage} from "next";

const Header: NextPage = () => {
    return (
        <Head>
            <title>Lissn</title>
            <meta name="description" content="Random play youtube music"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="shortcut icon" href="/images/favicon.ico"/>
        </Head>
    )
}

export default Header;