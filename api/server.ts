import GoogleAuth = gapi.auth2.GoogleAuth;

export async function login(googleAuth: GoogleAuth | undefined) {
    let basicProfile = googleAuth?.currentUser.get().getBasicProfile();
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: basicProfile?.getId(),
            name: basicProfile?.getName(),
            email: basicProfile?.getEmail(),
        })
    })
    const data = await response.json();
    console.log(data);
}