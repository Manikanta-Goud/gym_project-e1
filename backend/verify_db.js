
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres.nsqopogavongylvsmtio:SaTGc08Y256B2b8y@aws-1-ap-south-1.pooler.supabase.com:5432/postgres'
});

async function run() {
    try {
        await client.connect();
        const res = await client.query(`
            SELECT column_name, data_type, character_maximum_length
            FROM information_schema.columns
            WHERE table_name = 'users' AND table_schema = 'public' 
            AND column_name IN ('fitness_goal', 'experience');
        `);
        console.log("Columns:", res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

run();
