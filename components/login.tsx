import {handleAuthClick, revokeAccess} from "../api/googleOAuth";

function Login(props: any) {
  return <>
    <button
        onClick={() => handleAuthClick(props.googleAuth)}>
      {props.signIn ? "Sign out" : "Sign in"}
    </button>
    {props.signIn &&
        <button
            id="revoke-access-button"
            onClick={() => revokeAccess(props.googleAuth)}>
          revoke access
        </button>
    }
  </>
}

export default Login;