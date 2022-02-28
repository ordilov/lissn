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
        height: "553",
        width: "800",
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

        {login && (playlist?.isLiked ?
            <button className="btn btn-primary" onClick={() => likePlaylist(playlist?.id)}>
                <FontAwesomeIcon icon={"fa-solid fa-heart" as IconProp}/>
            </button> :
            <button className="btn btn-primary"
                    onClick={() => likePlaylist(playlist!!.id)}>
                <FontAwesomeIcon icon={"fa-regular fa-heart" as IconProp}/>
            </button>)
        }

        <div className={"d-grid gap-2 col-5 mx-auto"}>
            {
                playlist.items.map((item, innerIndex) => {
                    if (innerIndex === index) {
                        return <strong key={`item:${innerIndex}`} className={"fs-4"}>
                            {item.title.length > 30 ? item.title.substring(0, 30) + "..." : item.title}
                        </strong>
                    }
                    return <button key={`item:${innerIndex}`} className={"text-start"}
                                   onClick={() => playClicked(innerIndex)}>
                        {item.title.length > 50 ? item.title.substring(0, 50) + "..." : item.title}
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