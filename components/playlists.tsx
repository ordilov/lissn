import React, {useEffect, useState} from "react";
import {PlaylistType} from "../libs/types";
import PlaylistFrame from "./playlist/playlist-frame";

function Playlists({playlistDatas}: { playlistDatas: PlaylistType[] }) {
    const [playlists, setPlaylists] = useState(playlistDatas);

    useEffect(() => {
        setPlaylists(playlistDatas);
    }, [playlistDatas]);

    return <> {
        playlists.map(
            (playlist: PlaylistType) => <PlaylistFrame title={playlist.title} id={playlist.id}/>
        )
    } </>
}

export default Playlists;