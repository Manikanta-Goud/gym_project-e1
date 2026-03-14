
const { Client } = require('pg');
const client = new Client({
    connectionString: 'postgresql://postgres.nsqopogavongylvsmtio:SaTGc08Y256B2b8y@aws-1-ap-south-1.pooler.supabase.com:5432/postgres'
});

async function checkColumns() {
    try {
        await client.connect();
        const res = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'users'");
        console.log('Columns in users table:', res.rows.map(r => r.column_name).join(', '));
    } catch (err) {
        console.error('Database connection error:', err.message);
    } finally {
        await client.end();
    }
}

checkColumns();
