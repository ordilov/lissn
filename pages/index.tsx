import type {NextPage} from 'next'
import HeaderLayout from "../components/headerLayout";
import FooterLayout from "../components/footerLayout";
import Player from "../components/player";

const Home: NextPage = () => {
    return (
        <>
            <HeaderLayout/>
            <main>
                <h1 className="title"> Random Play </h1>
                <Player/>
            </main>
            <FooterLayout/>
        </>
    )
}

export default Home
