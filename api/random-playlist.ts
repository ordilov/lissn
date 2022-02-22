import {request} from "./server";

async function randomPlaylist(){
    const response = await request({
        url: "/playlists/random",
        method: "GET",
    });

    console.log(response);
    return response;
}

export default randomPlaylist;