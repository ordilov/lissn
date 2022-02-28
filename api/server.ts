import {ACCESS_TOKEN} from "../libs/constants";

export const request = (options: any) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${options.url}`;
    return fetch(url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json.data;
            })
        );
};

const memberRequest = (options: any) => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request(options);
};

export async function getCurrentUser() {
    return memberRequest({
        url: `/members/me`,
        method: 'GET',
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
    return memberRequest({
        url: `/playing`,
        method: 'GET'
    });
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