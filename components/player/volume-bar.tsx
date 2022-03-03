import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVolumeMute, faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {BaseSyntheticEvent, CSSProperties, Dispatch, SetStateAction, useEffect, useState} from "react";
import {YouTubePlayer} from "youtube-player/dist/types";

function VolumeBar({target}: { target: YouTubePlayer }) {
    const [volume, setVolume] = useState<number>(0);
    useEffect(() => {
        if (!target || !target.getVolume()) return;
        setVolume(target.getVolume());
    }, [target]);

    return (
        <div className={"volume-bar"}>
            <button className={"play-button"}
                    onClick={() => (changeMute(volume, setVolume, target))}>{
                volume == 0 ?
                    <FontAwesomeIcon icon={faVolumeMute as IconProp}/> :
                    <FontAwesomeIcon icon={faVolumeUp as IconProp}/>
            }
            </button>
            <input type="range" id="volume" name="volume" value={volume}
                   className={"styled-slider slider-progress"}
                   style={{
                       "--value": `${Math.floor(volume)}`,
                       "--max": `${100}`,
                       "--min": "0"
                   } as CSSProperties}
                   onInput={(e: BaseSyntheticEvent) => changeVolume(Number(e.target.value), setVolume, target)}
                   min="0" step="10" max="100"/>
        </div>
    )
}

function changeMute(volume: number, setVolume: Dispatch<SetStateAction<number>>, target: YouTubePlayer) {
    if (volume === 0) {
        target?.setVolume(30);
        setVolume(30);
    } else {
        target?.setVolume(0);
        setVolume(0);
    }
}

function changeVolume(volume: number, setVolume: Dispatch<SetStateAction<number>>, target: YouTubePlayer) {
    target?.setVolume(volume);
    setVolume(volume);
}

export default VolumeBar;