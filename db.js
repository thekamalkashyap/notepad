import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_DATABASE);

export default sql;