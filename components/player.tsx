import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import randomPlaylist from "../api/random-playlist";
import {PlaylistType} from "../libs/types";
import {likePlaylistApi} from "../api/server";
import YouTube, {Options} from "react-youtube";
import {YouTubePlayer} from "youtube-player/dist/types";

function Player() {
    const [index, setIndex] = useState(0);
    const [state, setState] = useState(-1);
    const [target, setTarget] = useState<YouTubePlayer>();
    const [playlist, setPlaylist] = useState<PlaylistType>();

    useEffect(() => {
        if (playlist) return;
        randomPlaylist().then(data => setPlaylist(data));
    }, [playlist, state, target]);


    function prevTrack() {
        if (playlist == null) return;
        target?.previousVideo();
        let prev = prevIndex(index, playlist.items.length);
        setIndex(prev);
        target?.playVideoAt(prev);
    }

    function nextTrack() {
        if (playlist == null) return;
        let next = nextIndex(index, playlist.items.length);
        setIndex(next);
        target?.playVideoAt(next);
    }

    function prevIndex(index: number, length: number) {
        return (index + length - 1) % length;
    }

    function nextIndex(index: number, length: number) {
        return (index + length + 1) % length;
    }

    async function likePlaylist(playlistId: number) {
        if (playlist == null) return;
        await likePlaylistApi(playlistId);
        randomPlaylist().then(data => setPlaylist(data));
    }

    function playVideo() {
        target?.playVideo();
        setState(1);
    }

    function pauseVideo() {
        target?.pauseVideo();
        setState(2);
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

    let title = playlist.items[index].title;
    if (title.length > 50) title = title.substring(0, 50) + "...";

    return <div className="container-fluid">
        <div className={"d-flex justify-content-center"}>
            <YouTube opts={opts} onReady={onReady} onStateChange={onStateChange}/>
        </div>

        <div className={"play-bar"}>
            <strong className={"text-center playing-title"}>
                {title}
            </strong>
            <div className={"d-flex justify-content-center"}>
                <button id={'back'} onClick={() => prevTrack()}>
                    <FontAwesomeIcon className="icon" icon={faStepBackward as IconProp}/>
                </button>
                {
                    (state === 1) ?
                        <button onClick={pauseVideo}>
                            <FontAwesomeIcon icon={faPause as IconProp}/>
                        </button> :
                        <button onClick={playVideo}>
                            <FontAwesomeIcon icon={faPlay as IconProp}/>
                        </button>
                }
                <button id={'forward'} onClick={() => nextTrack()}>
                    <FontAwesomeIcon className="icon" icon={faStepForward as IconProp}/>
                </button>
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
        </div>

        <div className={"d-grid gap-2 col-5 mx-auto"}>
            {
                playlist.items.map((item, innerIndex) => {
                    if (innerIndex === index) {
                        return <strong className={"fs-4"}>
                            {item.title.length > 30 ? item.title.substring(0, 30) + "..." : item.title}
                        </strong>
                    }
                    return <button className={"text-start"} onClick={() => playClicked(innerIndex)}>
                        {item.title.length > 50 ? item.title.substring(0, 50) + "..." : item.title}
                    </button>
                })
            }
        </div>
    </div>
}


export default Player;