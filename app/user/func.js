"use server";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import sql from "@/db";
import { cookies } from "next/headers";

async function checkUser(email) {
  if (email) {
    const users = await sql`select * from users where email = ${email}`;
    if (users?.length != 0) {
      return users[0];
    } else {
      return false;
    }
  }
}

async function getUser(formData, userData) {
  const cookieStore = cookies();
  const email = formData?.email;
  if (email) {
    if (userData?.length != 0) {
      bcrypt.compare(formData?.password, userData?.password).then((res) => {
        if (res) {
          const token = jwt.sign({ email }, process.env.SECRET_KEY);
          cookieStore.set("jsonwebtoken", token);
          console.log(`user Signed in!`);
        }
      });
    } else {
      return false;
    }
  }
}

async function getEmail() {
  const cookieStore = cookies();
  const token = cookieStore.get("jsonwebtoken")?.value;
  if (token) {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    return data.email;
  } else {
    return false;
  }
}

async function addUser(data) {
  const cookieStore = cookies();
  const email = data.email;
  bcrypt.hash(data.password, 8, async function (err, hash) {
    const users = [
      {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: hash,
      },
    ];
    await sql`
    insert into users ${sql(users)}
    `;
  });
  const token = jwt.sign({ email }, process.env.SECRET_KEY);
  cookieStore.set("jsonwebtoken", token);
  console.log(`new user added!`);
}

async function logout() {
  const cookieStore = cookies();
  cookieStore.delete("jsonwebtoken");
}

export { addUser, checkUser, getEmail, getUser, logout };
