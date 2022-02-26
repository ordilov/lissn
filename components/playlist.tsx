import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKeyboard, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";
import React, {useEffect, useState} from "react";
import {
    addYoutubePlaylistApi,
    addYoutubeVideoApi,
    deletePlaylistApi,
    likePlaylistApi,
    updatePlaylistTitleApi
} from "../api/server";
import {PlaylistItem, PlaylistType} from "../libs/types";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import PlaylistItemLayout from "./playlistItemLayout";

function Playlist({playlistData, indexData}: { playlistData: PlaylistType, indexData: number }) {
    const [editable, setEditable] = useState([] as boolean[]);
    const [playlist, setPlaylist] = useState<PlaylistType | null>(playlistData);
    const [index, setIndex] = useState(indexData);
    const [youtubeLink, setYoutubeLink] = useState("");
    const [like, setLike] = useState(playlistData.isLiked);

    useEffect(() => {
        setPlaylist(playlistData);
    }, [playlistData]);

    async function deletePlaylist(playlistId: number) {
        await deletePlaylistApi(playlistId);
        setPlaylist(null);
    }

    async function updatePlaylistTitle(playlistId: number, title: string) {
        await updatePlaylistTitleApi(playlistId, title);
    }

    const addYoutubeVideo = async (playlistId: number, youtubeUrl: string) => {
        await addYoutubeVideoApi(playlistId, youtubeUrl);
    };

    const addYoutubePlaylist = async (playlistId: number, youtubePlaylistId: string) => {
        await addYoutubePlaylistApi(playlistId, youtubePlaylistId);
    }

    async function changeEditPlaylist(playlistId: number) {
        const read = [...editable]
        read[playlistId] = !read[playlistId]
        setEditable(read);
    }

    async function likePlaylist(playlistId: number) {
        const result = await likePlaylistApi(playlistId);
        setLike(result.isLiked);
    }

    if (playlist == null) {
        return null;
    }

    return (
        <div key={`playlist:${index}`}>
            <h2>
                <div className="col-auto input-group flex-nowrap">
                    <button className="btn btn-outline-secondary"
                            onClick={() => changeEditPlaylist(index)}>
                        <FontAwesomeIcon icon={faKeyboard as IconProp} size={"1x"}/>
                    </button>
                    <input type="text"
                        // className={!editable[index] ? "form-control-plaintext" : "form-control"}
                           onKeyUp={(e: any) => {
                               if (e.key === "Enter") {
                                   updatePlaylistTitle(playlist.id, e.target.value);
                                   changeEditPlaylist(index);
                               }
                           }}
                           placeholder={playlist.title}
                           readOnly={!editable[index]}
                           aria-describedby="button-addon2"/>
                    <button className="btn btn-outline-secondary"
                            onClick={() => likePlaylist(playlist.id)}>
                        {like ?
                            <FontAwesomeIcon icon={"fa-solid fa-heart" as IconProp}/> :
                            <FontAwesomeIcon icon={"fa-regular fa-heart" as IconProp}/>
                        } 추천
                    </button>
                </div>
            </h2>

            <ul>
                {playlist.items.map(
                    (item: PlaylistItem) =>
                        <PlaylistItemLayout list={playlist} item={item}/>
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
                            <button type="button" className="btn btn-primary"
                                    onClick={() => addYoutubeVideo(playlist.id, youtubeLink)}>
                                더하기
                            </button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        </div>
                    </div>
                </div>
            </div>


            <a className="nav-link d-inline" href="#"
               onClick={() => addYoutubePlaylist(playlist.id, "PL15B1E77BB5708555")}>
                <FontAwesomeIcon icon={faYoutube as IconProp} size={"1x"}/> 유튜브 ply
            </a>
            <a className="nav-link d-inline" href="#" onClick={() => deletePlaylist(playlist.id)}>
                <FontAwesomeIcon icon={faTrashAlt as IconProp} size={"1x"}/> 삭제
            </a>
        </div>
    )
}

export default Playlist;