import React, { useRef } from "react";
import { useUserContext } from "../context/userContext";
import '../Styles/Login.css'
import '../Styles/Button.css'


const Signin = () => {
    const emailRef = useRef();
    const psdRef = useRef();
    const { signInUser, forgotPassword } = useUserContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = psdRef.current.value;
        if (email && password) signInUser(email, password);
    };

    const forgotPasswordHandler = () => {
        const email = emailRef.current.value;
        if (email)
            forgotPassword(email).then(() => {
                emailRef.current.value = "";
            });
    };

    return (
        <div className="form">
            <label> Iniciar Sesión </label>
            <form onSubmit={onSubmit}>
                <label>Email</label>
                <input type="email" ref={emailRef} />
                <label>Contraseña</label>
                <input type="password" ref={psdRef} />
                <div className="btnContainer">
                    <button className="button" type="submit">Iniciar Sesión</button>
                </div>
                <p onClick={forgotPasswordHandler}>Forgot Password?</p>
            </form >
        </div >
    );
};

export default Signin;