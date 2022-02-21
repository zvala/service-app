import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export default function LogoutBtn() {
  const logout = () => {
    signOut(auth)
      .then((res) => {
      })
      .catch((e) => {});
  };

  return <button onClick={logout}>Sign out</button>;
}
