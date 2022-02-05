import GoogleAuth = gapi.auth2.GoogleAuth;

export function handleAuthClick(googleAuth: GoogleAuth | undefined) {
    if (googleAuth?.isSignedIn.get()) {
        googleAuth?.signOut();
    } else {
        googleAuth?.signIn();
    }
}

export function revokeAccess(googleAuth: GoogleAuth | undefined) {
    googleAuth?.disconnect();
}