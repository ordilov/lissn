export async function getYoutubePlaylist() {
    let request = gapi.client.request({
        'method': 'GET',
        'path': 'https://www.googleapis.com/youtube/v3/playlists',
        'params': {
            'part': 'snippet',
            'mine': 'true',
            'maxResults': '50',
        }
    });

    request.execute(function (response) {
        console.log(response);
    });
}