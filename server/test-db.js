const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function test() {
  try {
    console.log('Testing connection to:', process.env.DATABASE_URL);
    const result = await pool.query('SELECT NOW()');
    console.log('Success:', result.rows[0]);
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    await pool.end();
  }
}

test();
