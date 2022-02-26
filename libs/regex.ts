export const YOUTUBE_VIDEO_BASE_URL = 'https://www.youtube.com/embed/{id}';
const queryStrings = '&amp;t=15&amp;wmode=transparent&amp;autoplay=1&amp;rel=0&amp;showinfo=0&amp;iv_load_policy=3&amp;showsearch=0&amp;autohide=1&amp;controls=0&amp;wadsworth=1'

export function urlRegex(url: string, id: string, index: string): string {
    const idRegex = new RegExp('\{id\}', 'gi');
    const indexRegex = new RegExp('\{index\}', 'gi');
    url = url.replace(idRegex, id);
    url = url.replace(indexRegex, index);
    return url;
}

export function youtubeVideoUrlRegex(id: string): string {
    const idRegex = new RegExp('\{id\}', 'gi');
    return YOUTUBE_VIDEO_BASE_URL.replace(idRegex, id);

}