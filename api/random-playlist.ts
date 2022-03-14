import {request} from "./server";

async function randomPlaylist(){
    const response = await request({
        url: "/playlists/random",
        method: "GET",
    });
    console.log("response", response);
    return response;
}

export default randomPlaylist;