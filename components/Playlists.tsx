import React, {useEffect, useState} from "react";
import {getPlaylists} from "../api/server";
import {playlistType} from "../libs/types";
import Playlist from "./Playlist";

function Playlists(props: any) {
    const [playlists, setPlaylists] = useState(props.playlists);

    useEffect(() => {
        getPlaylists().then(data => {
            setPlaylists(data)
            return data;
        })
    }, [props]);

    return <> {
        playlists.map(
            (playlistData: playlistType, indexData: number) =>
                <Playlist playlistData={playlistData} indexData={indexData}/>)
    } </>
}

export default Playlists;