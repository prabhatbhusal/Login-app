// app/login/actions.ts
"use server";

import { signIn } from "@/auth";

export async function signInWithGithub() {
  console.log("200");
  await signIn("github");
  console.log("200");
}

export async function signInWithGoogle() {
  console.log("200");
  await signIn("google");
}