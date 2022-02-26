export class PlaylistType {
    id: number;
    title: string
    isLiked: boolean;
    items: PlaylistItem[];

    constructor(id: number, title: string, isLiked: boolean, playlistItems: PlaylistItem[]) {
        this.id = id;
        this.title = title;
        this.isLiked = isLiked;
        this.items = playlistItems;
    }
}

export class PlaylistItem {
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

export class PlayingInfo {
    nowPlaying: number;
    trackInfos: TrackInfo[];

    constructor(nowPlaying: number, trackInfos: TrackInfo[]) {
        this.nowPlaying = nowPlaying;
        this.trackInfos = trackInfos;
    }
}

export class TrackInfo{
    id: number;
    title: string;
    resourceId: string;

    constructor(id: number, title: string, resourceId: string) {
        this.id = id;
        this.title = title;
        this.resourceId = resourceId;
    }
}