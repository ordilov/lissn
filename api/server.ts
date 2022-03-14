import {ACCESS_TOKEN, REFRESH_TOKEN} from "../libs/constants";
import {memberRequest} from "./member-api";

export const request = async (options: any) => {
    if(!options.headers) {
        options.headers = new Headers();
    }

    if(!options.headers.get('Content-Type')) {
        options.headers.append('Content-Type', 'application/json');
    }

    if(options.headers.get('Content-Type') === 'none') {
        options.headers.delete('Content-Type');
    }

    if (localStorage.getItem(ACCESS_TOKEN)) {
        options.headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${options.url}`;

    let response = await fetch(url, options);

    const json = await response.json();
    if (json.result === 'SUCCESS') return json.data;

    if (json.errorCode === 'EXPIRED_TOKEN') {
        localStorage.removeItem(ACCESS_TOKEN);
        if (!localStorage.getItem(REFRESH_TOKEN))
            window.location.href = '/';
        const refreshToken = localStorage.getItem(REFRESH_TOKEN) as string
        const response = await refreshRequest(refreshToken);
    }
};

async function refreshRequest(refreshToken: string) {
    if (localStorage.getItem(ACCESS_TOKEN)) {
        console.log("Access token already set.");
    }
    console.log("Refreshing token...");

    return request({
        url: '/auth/refresh',
        method: 'POST',
        body: JSON.stringify({refreshToken})
    }).then(res => {
        console.log(res);
        localStorage.setItem(ACCESS_TOKEN, res.accessToken);
        localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
    }).catch(err => {
        console.log(err)
        localStorage.removeItem(REFRESH_TOKEN);
        return Promise.reject(err);
    })
}

export async function getPlaylists() {
    return memberRequest({
        url: `/playlists`,
        method: "GET"
    });
}

export async function createPlaylistApi(title: string) {
    return memberRequest({
        url: `/playlists`,
        method: 'POST',
        body: JSON.stringify({
            title
        })
    });
}

export async function addYoutubePlaylistApi(playlistId: number, youtubePlaylistId: string) {
    return memberRequest({
        url: `/playlists/youtube`,
        method: 'POST',
        body: JSON.stringify({
            playlistId,
            youtubePlaylistId
        })
    })
}

export async function addYoutubeVideoApi(playlistId: number, url: string) {
    return memberRequest({
        url: `/playlists/${playlistId}/playlistItems`,
        method: 'POST',
        body: JSON.stringify({
            url
        })
    })
}

export async function updatePlaylistTitleApi(playlistId: number, title: string) {
    return memberRequest({
        url: `/playlists/${playlistId}`,
        method: 'PATCH',
        body: JSON.stringify({
            title
        })
    })
}

export async function deletePlaylistApi(playlistId: number) {
    return memberRequest({
        url: `/playlists/${playlistId}`,
        method: 'DELETE',
    })
}

export async function deletePlaylistItemApi(playlistId: number, playlistItemId: number) {
    return memberRequest({
        url: `/playlists/${playlistId}/playlistItems/${playlistItemId}`,
        method: 'DELETE'
    });
}

export async function likeTrackApi(trackId: number) {
    return memberRequest({
        url: `/likes/track`,
        method: 'POST',
        body: JSON.stringify({
            trackId
        })
    });
}

export async function likePlaylistApi(playlistId: number) {
    return memberRequest({
        url: `/likes/playlist`,
        method: 'POST',
        body: JSON.stringify({
            playlistId
        })
    });
}

export async function changePlayingApi(playlistId: number, playlistItemId: number) {
    return memberRequest({
        url: `/playing`,
        method: 'POST',
        body: JSON.stringify({
            playlistId,
            playlistItemId
        })
    });
}

export async function getPlayingApi() {
    const data = await memberRequest({
        url: `/playing`,
        method: 'GET'
    });
    return data;
}

export async function deletePlayingApi(playingId: number) {
    return memberRequest({
        url: `/playing/${playingId}`,
        method: 'DELETE'
    });
}

export async function savePlayingApi(playingId: number) {
    return memberRequest({
        url: `/playing/${playingId}`,
        method: 'POST',
    });
}