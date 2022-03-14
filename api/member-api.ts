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

export async function updateProfile(name: string, picture: string) {
    console.log(name, picture);
    return memberRequest({
        url: "/members",
        method: "PATCH",
        body: JSON.stringify({
            name,
            picture
        })
    });
}