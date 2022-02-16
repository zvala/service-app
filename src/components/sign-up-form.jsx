import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function SignUpForm() {
  const [isPasswordHidden, setIsPasswordHidden] = useState(false);

  const toggleIsPasswordHidden = () => setIsPasswordHidden(!isPasswordHidden);

  let schema = yup.object().shape({
    email: yup.string().email().required(),
    //TODO: Add regular expression to avoid generic passwords
    password: yup.string().required().min(8),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const signUp = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <form onSubmit={handleSubmit(signUp)}>
      <input {...register("email")} type="text" placeholder="email" />
      <div>
        <input
          {...register("password")}
          type={isPasswordHidden ? "text" : "password"}
          placeholder="password"
        />
        <i onClick={toggleIsPasswordHidden}>x</i>
      </div>
      <input type="submit" value="submit" />
    </form>
  );
}
