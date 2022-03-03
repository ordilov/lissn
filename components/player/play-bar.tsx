import VolumeBar from "./volume-bar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCompress,
    faExpand,
    faList,
    faPause,
    faPlay,
    faStepBackward,
    faStepForward
} from "@fortawesome/free-solid-svg-icons";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {PlaylistItem} from "../../libs/types";
import {YouTubePlayer} from "youtube-player/dist/types";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {Dropdown} from "react-bootstrap";
import {deletePlayingApi, getPlayingApi, savePlayingApi} from "../../api/server";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {ACCESS_TOKEN} from "../../libs/constants";
import {Mode} from "./player-mode";
import TimeBar from "./time-bar";

function PlayBar(
    {
        target,
        readOnly,
        modeState: [mode, setMode],
        indexState: [index, setIndex],
        playingState: [playing, setPlaying],
        playlistItemsState: [playlistItems, setPlaylistItems],
    }: {
        target: YouTubePlayer,
        readOnly: boolean,
        modeState: [Mode, Dispatch<SetStateAction<Mode>>],
        indexState: [index: number, setIndex: Dispatch<SetStateAction<number>>],
        playingState: [playing: number, setPlaying: Dispatch<SetStateAction<number>>],
        playlistItemsState: [PlaylistItem[], Dispatch<SetStateAction<PlaylistItem[]>>],
    }) {
    const [title, setTitle] = useState("재생 중인 곡이 없습니다.");
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (playlistItems === null || playlistItems.length === 0) return;
        setTitle(playlistItems[index].title);
    }, [playlistItems, index, playing]);

    const length = playlistItems.length;

    return (
        <div className={"play-bar"}>
            <div className={"d-flex justify-content-between align-items-center"}>
                <strong className={"text-center playing-title"}>
                    {title}
                </strong>
                <div className={"d-flex"}>
                    <Dropdown>
                        <Dropdown.Toggle className={"play-bar-list-toggle"} id="play-bar-list-toggle">
                            <FontAwesomeIcon icon={faList as IconProp}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu id={"dropdown-menu"}>
                            {playlistItems.map((item, i) => (
                                <Dropdown.Item key={i} onClick={() => playTrack(i, setIndex, target, setPlaying)}>
                                    <div className={"play-bar-list-item"}>
                                        <div className={"play-bar-list-title"}>
                                            {item.title.length > 60 ? item.title.substring(0, 60) + "..." : item.title}
                                        </div>

                                        {!readOnly && <button className={"play-bar-list-delete"}
                                                              onClick={() => deletePlayingItem({
                                                                  id: item.id,
                                                                  index: i,
                                                                  setIndex,
                                                                  setPlaylistItems,
                                                              })}>
                                            <FontAwesomeIcon icon={faCircleXmark as IconProp}/>
                                        </button>}
                                    </div>
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    {<button className={"play-button"}
                             onClick={() => setMode(mode === Mode.THEATER ? Mode.NORMAL : Mode.THEATER)}>
                        <FontAwesomeIcon icon={(mode == Mode.THEATER ? faCompress : faExpand) as IconProp}/>
                    </button>}
                    {target && <VolumeBar target={target}/>}
                </div>
            </div>

            <TimeBar target={target}
                     playing={playing === 1}
                     timeState={[currentTime, setCurrentTime]}
                     durationState={[duration, setDuration]}/>

            <div className={"d-flex justify-content-center"}>
                <button className={"play-button"}
                        onClick={() => prevTrack({target, index, length, setIndex, playlistItems})}>
                    <FontAwesomeIcon className="icon" icon={faStepBackward as IconProp}/>
                </button>
                {
                    (playing === 1) ?
                        <button className={"play-button move-button"} onClick={() => pauseVideo(target, setPlaying)}>
                            <FontAwesomeIcon icon={faPause as IconProp}/>
                        </button> :
                        <button className={"play-button move-button"}
                                onClick={() => playVideo(target, setPlaying, index)}>
                            <FontAwesomeIcon icon={faPlay as IconProp}/>
                        </button>
                }
                <button className={"play-button"}
                        onClick={() => nextTrack({target, index, length, setIndex, playlistItems})}>
                    <FontAwesomeIcon className="icon" icon={faStepForward as IconProp}/>
                </button>
            </div>
        </div>
    )
}

async function deletePlayingItem({id, index, setIndex, setPlaylistItems}: {
    id: number,
    index: number,
    setIndex: Dispatch<SetStateAction<number>>,
    setPlaylistItems: Dispatch<SetStateAction<PlaylistItem[]>>
}) {
    if (index != 0) {
        setIndex(index - 1);
    }
    await deletePlayingApi(id);
    getPlayingApi().then(res => {
        console.log(res);
        setPlaylistItems(res.items);
    });
}

function playTrack(index: number, setIndex: Dispatch<SetStateAction<number>>, target: YouTubePlayer,
                   setPlaying: Dispatch<SetStateAction<number>>) {
    setIndex(index);
    setPlaying(1);
    playVideo(target, setPlaying, index);
}

function playVideo(target: YouTubePlayer, setPlaying: Dispatch<SetStateAction<number>>, index: number) {
    target?.playVideo();
    setPlaying(1);
}

function pauseVideo(target: YouTubePlayer, setPlaying: Dispatch<SetStateAction<number>>) {
    target?.pauseVideo();
    setPlaying(2);
}

async function prevTrack({target, index, length, setIndex, playlistItems}: {
    index: number,
    length: number,
    target: YouTubePlayer,
    playlistItems: PlaylistItem[],
    setIndex: Dispatch<SetStateAction<number>>
}) {
    let prev = prevIndex(index, length);

    if (localStorage.getItem(ACCESS_TOKEN))
        await savePlayingApi(playlistItems[prev].id);
    setIndex(prev);
    target?.playVideoAt(prev);
}

async function nextTrack({target, index, length, setIndex, playlistItems}: {
    index: number,
    length: number,
    target: YouTubePlayer,
    playlistItems: PlaylistItem[],
    setIndex: Dispatch<SetStateAction<number>>
}) {
    let next = nextIndex(index, length);
    if (localStorage.getItem(ACCESS_TOKEN))
        await savePlayingApi(playlistItems[next].id);
    setIndex(next);
    target?.playVideoAt(next);
}

function prevIndex(index: number, length: number) {
    return (index + length - 1) % length;
}

function nextIndex(index: number, length: number) {
    return (index + length + 1) % length;
}

export default PlayBar;