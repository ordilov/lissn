import {YouTubePlayer} from "youtube-player/dist/types";
import React, {BaseSyntheticEvent, CSSProperties, Dispatch, SetStateAction, useEffect, useState} from "react";

function TimeBar({
                     target,
                     playing,
                     timeState: [currentTime, setCurrentTime],
                     durationState: [duration, setDuration],
                 }: {
    target: YouTubePlayer,
    playing: boolean,
    timeState: [
        currentTime: number,
        setCurrentTime: Dispatch<SetStateAction<number>>
    ],
    durationState: [
        duration: number,
        setDuration: Dispatch<SetStateAction<number>>
    ]
}) {
    const [check, setCheck] = useState<NodeJS.Timer>();

    useEffect(() => {
        if (!playing && check) {
            clearInterval(check);
            return;
        }
        if (playing) {
            setCurrentTime(target.getCurrentTime());
            setDuration(target.getDuration());

            setCheck(setInterval(() => {
                setCurrentTime(target.getCurrentTime());
            }, 500));
        }
    }, [playing])

    if (duration === 0) return null;

    return (
        <div className={"d-flex justify-content-center"}>
            <span className={"time-text"}>
                {`${Math.floor(currentTime / 60)}:${String(Math.floor(currentTime % 60)).padStart(2, '0')}`}
            </span>
            <input className={"styled-slider slider-progress"} type="range" id="time-bar" name="volume"
                   style={{
                       "--value": `${Math.floor(currentTime)}`,
                       "--max": `${Math.floor(duration)}`,
                       "--min": "0"
                   } as CSSProperties}
                   value={currentTime}
                   onInput={(e: BaseSyntheticEvent) => {
                       const value = parseInt(e.target.value);
                       target.seekTo(value, true);
                       setCurrentTime(value);
                   }}
                   min="0" step="1" max={duration}/>
            <span className={"time-text"}>
                {`${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padEnd(2, '0')}`}
            </span>
        </div>
    )
}

export default TimeBar;