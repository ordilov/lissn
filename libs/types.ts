export interface PlaylistType {
    id: number;
    title: string
    isLiked: boolean;
    items: PlaylistItem[];
}

export interface PlaylistItem {
    id: number;
    title: string;
    trackId: number;
    isLiked: boolean;
    resourceId: string
}

export interface PlayingType {
    nowPlaying: number;
    items: PlaylistItem[];
}

export interface Member {
    id: number;
    name: string;
    email: string;
    picture: string;
    provider: string;
    refreshToken: string;
}

export enum ErrorCode {
    EXPIRED_TOKEN = 'EXPIRED_TOKEN'
}