import {ACCESS_TOKEN} from "../libs/constants";
import {request} from "./server";

export const memberRequest = (options: any) => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request(options);
};

export async function getCurrentUser() {
    return memberRequest({
        url: `/members/me`,
        method: 'GET',
    });
}

export async function updateNameApi(memberId: number, name: string) {
    return memberRequest({
        url: `/members/${memberId}/name?name=${name}`,
        method: "PATCH",
    });
}

export async function updatePictureApi(memberId: number, picture: FormData) {
    const headers = new Headers();
    headers.append('Content-Type', 'none');
    return memberRequest({
        url: `/members/${memberId}/picture`,
        method: "PATCH",
        headers,
        body: picture
    });
}