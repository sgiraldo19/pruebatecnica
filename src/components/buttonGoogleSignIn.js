import { auth } from '../firebase';
import GoogleButton from 'react-google-button';
import "../Styles/Button.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const signInWhitGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((re) => {
            console.log(re);
        })
        .catch((err => {
            console.log(err)
        }))
}

const btnSignGoogle = (props) => {
    return (
        <GoogleButton className="button" onClick={signInWhitGoogle} className="button_signin">{props.text}</GoogleButton>
    )
};

export default btnSignGoogle;