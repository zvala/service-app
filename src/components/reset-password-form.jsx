import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";

export default function ResetPasswordForm() {
  let schema = yup.object().shape({
    email: yup.string().email().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const resetPassword = (data) => {
    sendPasswordResetEmail(auth, data.email)
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      });
  };

  return (
    <form onSubmit={handleSubmit(resetPassword)}>
      <input {...register("email")} type="text" placeholder="email" />
      <input type="submit" value="submit" />
    </form>
  );
}
