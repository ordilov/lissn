export class playlistType {
    id: number;
    title: string
    isLiked: boolean;
    items: playlistItem[];

    constructor(id: number, title: string, isLiked: boolean, playlistItems: playlistItem[]) {
        this.id = id;
        this.title = title;
        this.isLiked = isLiked;
        this.items = playlistItems;
    }
}

export class playlistItem {
    id: number;
    title: string;
    trackId: number;
    isLiked: boolean;
    resourceId: string

    constructor(id: number, isLiked: boolean, title: string, trackId: number, resourceId: string) {
        this.id = id;
        this.title = title;
        this.isLiked = isLiked;
        this.trackId = trackId;
        this.resourceId = resourceId;
    }
}