import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import randomPlaylist from "../api/random-playlist";
import {PlaylistItem, PlaylistType} from "../libs/types";
import {likePlaylistApi} from "../api/server";
import YouTube, {Options} from "react-youtube";
import {YouTubePlayer} from "youtube-player/dist/types";
import PlayBar from "./player/play-bar";

function Player({login}: { login: boolean }) {
    const [index, setIndex] = useState(0);
    const [state, setState] = useState(-1);
    const [target, setTarget] = useState<YouTubePlayer>();
    const [playlist, setPlaylist] = useState<PlaylistType>();
    const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);

    useEffect(() => {
        if (playlist) return;
        randomPlaylist().then(data => {
                setPlaylist(data);
                setPlaylistItems(data.items);
            }
        );
    }, [playlist, state, target]);

    async function likePlaylist(playlistId: number) {
        if (playlist == null) return;
        await likePlaylistApi(playlistId);
        randomPlaylist().then(data => setPlaylist(data));
    }

    function playClicked(order: number) {
        setIndex(order);
        target?.playVideoAt(order);
    }

    if (playlist == null) return <div>Loading...</div>

    const opts: Options = {
        width: "1080",
        height: "640",
        playerVars: {
            autoplay: 0,
        }
    };

    function onReady(event: { target: YouTubePlayer; data: number }) {
        setTarget(event.target);
        if (playlist == null) return;
        let videoId = playlist.items.map(item => item.resourceId);
        event.target.cuePlaylist(videoId);
    }

    function onStateChange(event: { target: YouTubePlayer; data: number }) {
        setState(event.data);
    }

    return <div className="container-fluid">
        <div className={"d-flex justify-content-center"}>
            <YouTube opts={opts} onReady={onReady} onStateChange={onStateChange}/>
        </div>

        <div className={"d-grid justify-content-center"}>
        {login && (playlist?.isLiked ?
            <button className="btn " onClick={() => likePlaylist(playlist?.id)}>
                <FontAwesomeIcon icon={"fa-solid fa-heart" as IconProp}/>
            </button> :
            <button className="btn " onClick={() => likePlaylist(playlist!!.id)}>
                <FontAwesomeIcon icon={"fa-regular fa-heart" as IconProp}/>
            </button>)
        }
        </div>

        <div className={"d-grid gap-2 justify-content-center"}>
            {
                playlist.items.map((item, innerIndex) => {
                    return <button key={`item:${innerIndex}`} className={"playlist-item text-start " + (innerIndex === index ? "fs-4" : "")}
                                   onClick={innerIndex === index ? undefined : () => playClicked(innerIndex)}>
                        <img className={"thumbnail"} src={`https://img.youtube.com/vi/${item.resourceId}/0.jpg`} alt={"로딩중.."}/>
                        {item.title.length > 60 ? item.title.substring(0, 60) + "..." : item.title}
                    </button>
                })
            }
        </div>

        {target && <PlayBar target={target}
                            playlistItemsState={[playlistItems, setPlaylistItems]}
                            indexState={[index, setIndex]}
                            playingState={[state, setState]}/>}
    </div>
}

export default Player;