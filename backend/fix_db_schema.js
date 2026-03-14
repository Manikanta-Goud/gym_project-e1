
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres.nsqopogavongylvsmtio:SaTGc08Y256B2b8y@aws-1-ap-south-1.pooler.supabase.com:5432/postgres'
});

async function runFix() {
    try {
        await client.connect();
        console.log("Connected to database. Fixing column types...");

        // Fix users table
        await client.query(`
            ALTER TABLE users 
            ALTER COLUMN bio TYPE TEXT,
            ALTER COLUMN photo_url TYPE TEXT,
            ALTER COLUMN weekly_schedule TYPE TEXT,
            ALTER COLUMN prs TYPE TEXT,
            ALTER COLUMN fitness_goal TYPE TEXT,
            ALTER COLUMN experience TYPE TEXT,
            ALTER COLUMN home_gym TYPE TEXT;
        `);
        console.log("Updated 'users' table columns to TEXT.");

        // Fix gym_members table
        await client.query(`
            ALTER TABLE gym_members 
            ALTER COLUMN details TYPE TEXT;
        `);
        console.log("Updated 'gym_members' table columns to TEXT.");

        console.log("Database schema fixed successfully!");
    } catch (err) {
        console.error("Error fixing database schema:", err.message);
    } finally {
        await client.end();
    }
}

runFix();
