export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const YOUTUBE_AUTH = 'https://www.googleapis.com/auth/youtube';
export const YOUTUBE_AUTH_READ = 'https://www.googleapis.com/auth/youtube.readonly';
export const YOUTUBE_AUTH_UPLOAD = 'https://www.googleapis.com/auth/youtube.upload';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const OAUTH2_REDIRECT_URI = process.env.NEXT_PUBLIC_OAUTH2_REDIRECT_URI;
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;