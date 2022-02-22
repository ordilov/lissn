import YoutubePlayer from "./youtubePlayer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import randomPlaylist from "../api/random-playlist";
import {playlistType} from "../libs/types";
import {likePlaylistApi} from "../api/server";

function Player() {
    const [playlist, setPlaylist] = useState<playlistType | null>(null);
    const [index, setIndex] = useState(0);
    const queryStrings = '&amp;t=15&amp;wmode=transparent&amp;autoplay=1&amp;rel=0&amp;showinfo=0&amp;iv_load_policy=3&amp;showsearch=0&amp;autohide=1&amp;controls=0&amp;wadsworth=1'
    // let baseUrl = 'https://www.youtube.com/embed/?list={id}&index={index}';
    let baseUrl = 'https://www.youtube.com/embed/{id}';
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (!playlist) {
            randomPlaylist().then(data => setPlaylist(data));
        }

        if (playlist) {
            if(playlist.items.length <= 0) return
            setUrl(baseUrl.replace('{id}', playlist.items[index].resourceId));
        }
    }, [playlist, index]);

    console.log("PLAYLIST" + JSON.stringify(playlist, null, 1));

    function prevTrack() {
        if (playlist == null) return;
        setIndex((index + playlist.items.length - 1) % playlist.items.length);
        setUrl(baseUrl.replace('{id}', playlist.items[index].resourceId));
    }

    function nextTrack() {
        if (playlist == null) return;
        setIndex((index + playlist.items.length + 1) % playlist.items.length);
        setUrl(baseUrl.replace('{id}', playlist.items[index].resourceId));
    }

    async function likePlaylist(playlistId: number) {
        if (playlist == null) return;
        await likePlaylistApi(playlist.id);
        randomPlaylist().then(data => setPlaylist(data));
    }

    return <div className="container-fluid">
        <div className="d-flex justify-content-around align-items-center">
            <button id={'back'} onClick={() => prevTrack()}>
                <FontAwesomeIcon className="icon" icon={faStepBackward as IconProp}/>
            </button>
            <YoutubePlayer src={url}/>
            <button id={'forward'} onClick={() => nextTrack()}>
                <FontAwesomeIcon className="icon" icon={faStepForward as IconProp}/>
            </button>
        </div>
        <div>
            {playlist?.isLiked ?
                <button className="btn btn-primary" onClick={() => likePlaylist(playlist?.id)}>
                    <FontAwesomeIcon icon={"fa-solid fa-heart" as IconProp}/>
                </button> :
                <button className="btn btn-primary"
                        onClick={() => likePlaylist(playlist!!.id)}>
                    <FontAwesomeIcon icon={"fa-regular fa-heart" as IconProp}/>
                </button>
            }
        </div>

        <div>
            {playlist?.items.map(
                (item, innerIndex) => {
                    if (innerIndex === index) {
                        return (
                            <strong>
                                <pre> {item.title}</pre>
                            </strong>
                        )
                    }

                    return (
                        <div>
                            {item.title}
                        </div>
                    )
                })
            }
        </div>
    </div>
}


export default Player;