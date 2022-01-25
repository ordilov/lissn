import YoutubePlayer from "./youtubePlayer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import Button from "./button";
import React from "react";
import playlists from "../libs/playlists";

function Player() {

    const [playlist, setPlaylist] = React.useState(playlists[0]);
    const [index, setIndex] = React.useState(0);
    const queryStrings = '&amp;t=15&amp;wmode=transparent&amp;autoplay=1&amp;rel=0&amp;showinfo=0&amp;iv_load_policy=3&amp;showsearch=0&amp;autohide=1&amp;controls=0&amp;wadsworth=1'
    let baseUrl = 'https://www.youtube.com/embed/?list={id}&index={index}';
    const [url, setUrl] = React.useState(baseUrl.replace('{id}', playlist.id).replace('{index}', String(index)));

    function prevTrack() {
        setIndex(index - 1);
        setUrl(baseUrl.replace('{id}', playlist.id).replace('{index}', String(index)));
    }

    function nextTrack() {
        setIndex(index + 1);
        setUrl(baseUrl.replace('{id}', playlist.id).replace('{index}', String(index)));
    }

    return <div className="container-fluid">
        <div className="d-flex justify-content-around align-items-center">
            <Button id={'back'} inner={<FontAwesomeIcon className="icon" icon={faStepBackward}/>}
                    onClick={() => prevTrack()}/>
            <YoutubePlayer src={url}/>
            <Button id={'forward'} inner={<FontAwesomeIcon className="icon" icon={faStepForward}/>}
                    onClick={() => nextTrack()}/>
        </div>
    </div>
}


export default Player;