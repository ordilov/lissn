import Head from "next/head";
import {NextPage} from "next";

const HeadLayout: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Lissn</title>
                <meta name="description" content="Random play youtube music" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    )
}

export default HeadLayout;