export function urlRegex(url: string, id: string, index: string): string {
    const idRegex = new RegExp('\{id\}', 'gi');
    const indexRegex = new RegExp('\{index\}', 'gi');
    url = url.replace(idRegex, id);
    url = url.replace(indexRegex, index);
    return url;
}