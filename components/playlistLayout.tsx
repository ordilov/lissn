import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {createPlaylistApi, getPlaylists} from "../api/server";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Playlists from "./Playlists";

function PlaylistLayout() {
    const [playlists, setPlaylists] = useState([]);
    const [editable, setEditable] = useState([] as boolean[]);
    const [playlistTitle, setPlaylistTitle] = useState("");
    useEffect(() => {
        getPlaylists().then(data => {
            setEditable(data.map(() => false));
            setPlaylists(data)
            return data;
        })
    }, []);

    async function createPlaylist(title: string) {
        await createPlaylistApi(title);
        setPlaylists(await getPlaylists());
        setPlaylistTitle("");
        editable.push(true);
        setEditable(editable);
    }

    if (!playlists) {
        return <a className="nav-link" href="#" onClick={() => createPlaylist(playlistTitle)}>
            <FontAwesomeIcon icon={faPlus as IconProp} size={"1x"}/> 플레이리스트 생성
        </a>
    }

    return <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#playlist-title-modal">
            <FontAwesomeIcon icon={faPlus as IconProp} size={"1x"}/> 플레이리스트 생성
        </button>

        <div className="modal fade" id="playlist-title-modal" tabIndex={-1} aria-labelledby="ptm"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">플레이리스트 제목</span>
                            <input type="text" className="form-control" aria-label="Sizing example input"
                                   aria-describedby="inputGroup-sizing-default" id={"playlist-title"}
                                   value={playlistTitle}
                                   onChange={(e) => setPlaylistTitle(e.target.value)}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => createPlaylist(playlistTitle)}>
                            만들기
                        </button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                    </div>
                </div>
            </div>
        </div>

        <Playlists playlists={playlists}/>
    </>
}

export default PlaylistLayout;