import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {deletePlaylistItemApi, getPlaylistsApi, likeTrackApi} from "../api/server";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

function PlaylistItemLayout({list, item}: { list: any, item: any }) {
    const [playlist, setPlaylist] = useState(list);
    const [playlistItem, setPlaylistItem] = useState(item);
    const [liked, setLiked] = useState(item.isLiked);

    useEffect(() => {

    }, [list, item]);

    async function deletePlaylistItem(playlistId: number, playlistItemId: number) {
        await deletePlaylistItemApi(playlistId, playlistItemId);
        setPlaylist(null);
    }

    async function likeTrack(trackId: number) {
        const result = await likeTrackApi(trackId);
        setLiked(result.isLiked);
    }

    if (playlist == null) {
        return null;
    }

    return (
        <>
            <li key={`${playlist.id}:${playlistItem.id}`}>
                                <span className={"d-inline-block playlistItem-title"}>
                                    {playlistItem.title.substring(0, 40)}
                                </span>
                <a className="nav-link d-inline" href="#"
                   onClick={() => likeTrack(playlistItem.trackId)}>
                    {liked ?
                        <FontAwesomeIcon icon={"fa-solid fa-heart" as IconProp}/> :
                        <FontAwesomeIcon icon={"fa-regular fa-heart" as IconProp}/>
                    } 추천
                </a>

                <a className="nav-link d-inline" href="#"
                   onClick={() => deletePlaylistItem(playlist.id, playlistItem.id)}>
                    <FontAwesomeIcon icon={faCircleXmark}/> 삭제
                </a>
            </li>
        </>
    )
}

export default PlaylistItemLayout;