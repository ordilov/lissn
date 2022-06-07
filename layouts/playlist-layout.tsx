import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {addYoutubePlaylistApi, addYoutubeVideoApi, deletePlaylistApi, updatePlaylistTitleApi} from "../api/server";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {useRouter} from "next/router";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";

export default function PlaylistLayout({playlist, memberId}: { playlist: any, memberId: number | undefined }) {

    const router = useRouter();
    const [title, setTitle] = useState(playlist.title);
    const [youtubeLink, setYoutubeLink] = useState("");

    useEffect(() => {
    }, []);


    async function updatePlaylistTitle(playlistId: number, title: string) {
        setTitle(title);
        await updatePlaylistTitleApi(playlistId, title);
    }

    const addYoutubeVideo = async (playlistId: number, youtubeUrl: string) => {
        await addYoutubeVideoApi(playlistId, youtubeUrl);
    };

    const addYoutubePlaylist = async (playlistId: number, youtubePlaylistId: string) => {
        await addYoutubePlaylistApi(playlistId, youtubePlaylistId);
    }


    const Title = styled.h2`
      padding: 10px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      color: black;
      font-weight: bold;

      &:hover {
        color: white;
      }
    `;

    const Author = styled.p`
      color: #555;
    `


    async function deletePlaylist(playlistId: number) {
        await deletePlaylistApi(playlistId);
        await router.push("/");
    }

    return (
        <div>
            <Title>{title}</Title>

            <input type="text"
                   onKeyUp={(e: any) => {
                       if (e.key === "Enter") {
                           updatePlaylistTitle(playlist.id, e.target.value);
                       }
                   }}
                   placeholder={playlist.title}
                   aria-describedby="button-addon2"/>
            <Author>{playlist.author}

            </Author>

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

            <a className="" href="#" onClick={() => deletePlaylist(playlist.id)}>
                <FontAwesomeIcon icon={faTrashAlt as IconProp} size={"1x"}/> 삭제
            </a>


            <h3>{playlist.authorId === memberId ? "내 플레이리스트" : "상대방 플레이리스트"}</h3>
            {playlist.items.map((item: any) => {
                return (
                    <div key={item.id}>
                        <p>{item.title}</p>
                        <p>{item.isLiked ? "like" : "notLike"}</p>
                    </div>
                )
            })}
            <h3>{playlist.isLiked}</h3>
        </div>
    );
}


