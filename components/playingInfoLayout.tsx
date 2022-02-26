import React, {useEffect, useState} from "react";
import {PlayingInfo} from "../libs/types";
import {changePlaylistApi, likePlaylistApi} from "../api/server";
import YouTube, {Options} from "react-youtube";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core/styles.css";
import randomPlaylist from "../api/random-playlist";

function PlayingInfoLayout({currentUser}: { currentUser: any }) {
    const [user, setUser] = useState(currentUser);
    const [state, setState] = useState(0);
    const [index, setIndex] = useState(0);

    const [playingInfo, setPlayingInfo] = useState<PlayingInfo | null>(null);
    useEffect(() => {
        setUser(currentUser);
        if (!currentUser) return
        changePlaylistApi(1, 1).then(res => {
            setPlayingInfo(res);
        })
    }, [currentUser]);

    function prevTrack() {
    }

    function nextTrack() {
    }

    function prevIndex(index: number, length: number) {
    }

    function nextIndex(index: number, length: number) {
    }

    function playVideo() {
    }

    function pauseVideo() {
    }


    if (playingInfo === null) return <div>로딩중</div>
    const nowPlaying = playingInfo.trackInfos[playingInfo.nowPlaying];
    const opts : Options = {
        height: "10",
        width: "10",
    }
    const nowPlayingInfo =
        <div>
            <div className={"fs-3"}>
                <YouTube videoId={nowPlaying.resourceId} opts={opts}/> {nowPlaying.title}
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
            </div>
        </div>


    return (<>
        {nowPlayingInfo}
    </>);
}

export default PlayingInfoLayout;