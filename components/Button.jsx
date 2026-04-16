"use client";

import { signIn } from "next-auth/react";

const Button = () => {
  return <button onClick={() => signIn("google")}>Sign Google</button>;
};

export default Button;
