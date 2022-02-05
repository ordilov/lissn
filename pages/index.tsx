import type {NextPage} from 'next'
import HeaderLayout from "../components/headerLayout";
import FooterLayout from "../components/footerLayout";
import Player from "../components/player";
import React from "react";
import NavLayout from "../components/navLayout";

const Home: NextPage = () => {
  return (
      <>
        <HeaderLayout/>
        <NavLayout/>
        <main>
          <Player/>
        </main>
        <FooterLayout/>
      </>
  )
}

export default Home
