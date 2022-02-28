import React, {useEffect, useState} from "react";
import {PlaylistType} from "../libs/types";
import Playlist from "./playlist";

function Playlists({playlistDatas}: { playlistDatas: PlaylistType[] }) {
    const [playlists, setPlaylists] = useState(playlistDatas);

    useEffect(() => {
        setPlaylists(playlistDatas);
    }, [playlistDatas]);

    return <> {
        playlists.map(
            (playlistData: PlaylistType, indexData: number) =>
                <Playlist key={`playlist:${indexData}`} playlistData={playlistData} indexData={indexData}/>)
    } </>
}

export default Playlists;