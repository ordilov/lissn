import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKeyboard, faPlay, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {changePlayingApi, deletePlaylistApi, likePlaylistApi} from "../api/server";
import {PlaylistItem, PlaylistType} from "../libs/types";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import PlaylistItemLayout from "./playlistItemLayout";
import styles from "../public/styles/playlist/Playlist.module.scss";

function Playlist({playlistData, indexData}: { playlistData: PlaylistType, indexData: number }) {
    const [editable, setEditable] = useState([] as boolean[]);
    const [playlist, setPlaylist] = useState<PlaylistType | null>(playlistData);
    const [index, setIndex] = useState(indexData);
    const [youtubeLink, setYoutubeLink] = useState("");
    const [like, setLike] = useState(playlistData.isLiked);

    useEffect(() => {
        setPlaylist(playlistData);
    }, [playlistData]);


    async function changeEditPlaylist(playlistId: number) {
        const read = [...editable]
        read[playlistId] = !read[playlistId]
        setEditable(read);
    }

    async function likePlaylist(playlistId: number) {
        const result = await likePlaylistApi(playlistId);
        setLike(result.isLiked);
    }

    if (playlist === null) return null;

    return (
        <div className={styles.container} key={`playlist:${index}`}>
            <button className={styles.editButton}
                    onClick={() => changeEditPlaylist(index)}>
                <FontAwesomeIcon icon={faKeyboard as IconProp} size={"1x"}/>
            </button>

            <button className={styles.LikeButton}
                    onClick={() => likePlaylist(playlist.id)}>
                {like ?
                    <FontAwesomeIcon icon={"fa-solid fa-heart" as IconProp}/> :
                    <FontAwesomeIcon icon={"fa-regular fa-heart" as IconProp}/>
                } 추천
            </button>
            <button onClick={() => changePlayingApi(playlist.id, 0)}>
                <FontAwesomeIcon icon={faPlay as IconProp} size={"1x"}/>
            </button>

            <ul>
                {playlist.items.map(
                    (item: PlaylistItem, itemIndex: number) =>
                        <PlaylistItemLayout key={`playlist:${index}:playlistItem:${itemIndex}`} list={playlist}
                                            item={item}/>
                )}
            </ul>
            <a className="nav-link d-inline" href="#" data-bs-toggle="modal"
               data-bs-target={`#playlist-modal-${playlist.id}`}>
                <FontAwesomeIcon icon={faYoutube as IconProp} size={"1x"}/> 유튜브 vid
            </a>

            <div className="modal fade" id={`playlist-modal-${playlist.id}`} tabIndex={-1} aria-labelledby="ptm"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">유튜브 링크</span>
                                <input type="text" className="form-control" aria-label="Sizing example input"
                                       aria-describedby="inputGroup-sizing-default" id={"playlist-title"}
                                       value={youtubeLink}
                                       onChange={(e) => setYoutubeLink(e.target.value)}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Playlist;