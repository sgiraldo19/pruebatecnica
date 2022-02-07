import React, { useState } from "react";
import BtnSignIn from "./buttonSignIn";
import BtnRegister from "./buttonRegister";
import '../Styles/Login.css'

const Auth = () => {
    const [index, setIndex] = useState(false);
    const toggleIndex = () => {
        setIndex((prevState) => !prevState);
    };
    return (
        <div className="loginContainer">
            <div className="btnContainer">
                {!index ? <BtnSignIn /> : <BtnRegister />}
                <span onClick={toggleIndex} className="span-Alert">{!index ? "¿No tienes una cuenta? Regístrate " : "¿Tienes una cuenta? Inicia sesión"}</span>
            </div>
        </div>
    );
};

export default Auth;