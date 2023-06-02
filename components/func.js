"use server";
import sql from "@/db";

async function allNotes() {
  const todos = await sql`select * from notes order by last_updated asc`;
  return todos;
}

async function editNote(data, id) {
  await sql`
      update notes set title = ${data.get("title")}, body = ${data.get(
    "body"
  )} where id = ${id}
      `;
  console.log(`note : ${id} updated.`);
}

async function addNote(data) {
  const notes = [
    {
      title: data.get("title"),
      body: data.get("body"),
      last_updated: Date.now(),
      is_checked: false,
      user_fk_id: 1,
    },
  ];
  await sql`
  insert into notes ${sql(notes)}
  `;
  console.log(`new note added!`);
}

async function deleteNote(id) {
  await sql`delete from notes where id = ${id}`;
  console.log(`note : ${id} deleted.`);
}

async function checkNote(id, isChecked) {
  await sql`
      update notes set is_checked = ${isChecked} where id = ${id}
      `;
  console.log(`changed checked to ${isChecked} in note : ${id}`);
}

export { addNote, deleteNote, editNote, checkNote, allNotes };
