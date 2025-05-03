import pool from "./pg";

export async function getTestData() {
  const res = await pool.query("SELECT * FROM bitebytesUser")
  const data = await res
  console.log(data)
  return true
}

