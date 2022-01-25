import Head from "next/head";
import {NextPage} from "next";

const HeadLayout: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Random Play</title>
                <meta name="description" content="Random play youtube music" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    )
}

export default HeadLayout;