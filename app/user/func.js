"use server";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import sql from "@/db";
import { cookies } from "next/headers";

async function checkUserExists(email) {
  const users = await sql`select * from users where email = ${email}`;
  if (users?.length != 0) {
    return users[0];
  } else {
    return undefined;
  }
}

async function signin(formData) {
  const email = formData.email;
  const cookieStore = cookies();
  const userData = await checkUserExists(email);
  if (userData) {
    let err = await bcrypt
      .compare(formData.password, userData.password)
      .then((res) => {
        if (res) {
          const token = jwt.sign({ email }, process.env.SECRET_KEY);
          cookieStore.set("jsonwebtoken", token);
        } else {
          return "Wrong password!";
        }
      })
      .catch(() => {
        return "Something went wrong!";
      });
    if (err) {
      return Promise.reject(err);
    }
  } else {
    return Promise.reject("User not found!");
  }
}

async function login(data) {
  const email = data.email;
  const cookieStore = cookies();
  const userData = await checkUserExists(email);
  if (!userData) {
    let err = bcrypt.hash(data.password, 8, async function (error, hash) {
      if (error) {
        return "Something went wrong!";
      }
      const users = [{ email: data.email, password: hash }];
      await sql`insert into users ${sql(users)}`;
    });
    if (err) {
      return Promise.reject(err);
    }
    const token = jwt.sign({ email }, process.env.SECRET_KEY);
    cookieStore.set("jsonwebtoken", token);
  } else {
    return Promise.reject("User already exists!");
  }
}

async function logout() {
  const cookieStore = cookies();
  cookieStore.delete("jsonwebtoken");
}

export { login, signin, logout };
