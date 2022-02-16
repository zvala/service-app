import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

import { Link } from "react-router-dom";

export default function LoginForm() {
  const [isPasswordHidden, setIsPasswordHidden] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      setValue("email", user.email);
      setValue("password", user.password);
    }
  }, []);

  let schema = yup.object().shape({
    email: yup.string().email().required(),
    //TODO: Add regular expression to avoid generic passwords
    password: yup.string().required().min(8),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));

    signInWithEmailAndPassword(auth, data.email, data.password).then(res => {
      //TODO: Redireccionar a la vista de dashboard
      console.log(res)
    }).catch(error => {
      //TODO: Agregar manejo de errores!
      console.log(error.code)
      console.log(error.message)
    })
  };

  const toggleIsPasswordHidden = () => setIsPasswordHidden(!isPasswordHidden);

  return (
    <form onSubmit={handleSubmit(login)}>
      <input {...register("email")} type="text" placeholder="email" />
      <span>{errors.email?.message}</span>
      <div>
        <input
          {...register("password")}
          type={isPasswordHidden ? "text" : "password"}
          placeholder="password"
        />
        <i onClick={toggleIsPasswordHidden}>x</i>
      </div>
      <div>
        <span>{errors.password?.message}</span>
      </div>
      <input type="submit" value="enviar" />
      <Link to="/signup">sign up</Link>
    </form>
  );
}
