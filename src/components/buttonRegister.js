import React, { useRef } from "react";
import { useUserContext } from "../context/userContext";

const Signup = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const psdRef = useRef();
  const { registerUser } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = psdRef.current.value;
    if (email && password && name) registerUser(email, password, name);
  };

  return (
    <div className="form">
      <label> Registro </label>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" ref={emailRef} />
        <label>Nombre</label>
        <input type="name" ref={nameRef} />
        <label>Contraseña</label>
        <input type="password" ref={psdRef} />
        <div className="btnContainer">
        <button type="submit">Registrarse</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;