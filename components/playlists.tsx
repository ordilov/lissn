import React, {useEffect, useState} from "react";
import {getPlaylists} from "../api/server";
import {PlaylistType} from "../libs/types";
import Playlist from "./playlist";

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
            (playlistData: PlaylistType, indexData: number) =>
                <Playlist playlistData={playlistData} indexData={indexData}/>)
    } </>
}

export default Playlists;