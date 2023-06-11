"use server";
import sql from "@/db";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";

async function allNotes() {
  const cookieStore = cookies();
  const token = cookieStore.get("jsonwebtoken")?.value;
  if (token) {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const email = data?.email;
    const todos = await sql`select * from notes where uid = ${email} order by is_checked, last_updated desc`;
    return todos;
  }
}

async function editNote(data, id) {
  await sql`
      update notes set title = ${data.get("title")}, body = ${data.get(
    "body"
  )}, last_updated = now() where id = ${id}
      `;
  console.log(`note : ${id} updated.`);
}

async function addNote(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("jsonwebtoken")?.value;
  if (token) {
    const jwtData = jwt.verify(token, process.env.SECRET_KEY);
    const email = jwtData?.email;
    const notes = [
      {
        title: data.get("title"),
        body: data.get("body"),
        last_updated: Date.now(),
        is_checked: false,
        uid: email,
      },
    ];
    await sql`
    insert into notes ${sql(notes)}
    `;
    console.log(`new note added!`);
  }
}

async function deleteNote(id) {
  await sql`delete from notes where id = ${id}`;
  console.log(`note : ${id} deleted.`);
}

async function checkNote(id, isChecked) {
  await sql`
      update notes set is_checked = ${isChecked}, last_updated = now() where id = ${id}
      `;
  console.log(`changed checked to ${isChecked} in note : ${id}`);
}

export { addNote, deleteNote, editNote, checkNote, allNotes };
