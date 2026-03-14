
const { Client } = require('pg');
const client = new Client({
    connectionString: 'postgresql://postgres.nsqopogavongylvsmtio:SaTGc08Y256B2b8y@aws-1-ap-south-1.pooler.supabase.com:5432/postgres'
});

async function run() {
    try {
        await client.connect();
        
        // Update Pardha
        await client.query("UPDATE gym_members SET goal = 'Strength', timing = 'Morning', details = 'Focusing on compound lifts' WHERE name ILIKE 'pardha'");
        
        // Update Punervesh
        await client.query("UPDATE gym_members SET goal = 'Bulking', timing = 'Evening', details = 'Hypertrophy training' WHERE name ILIKE 'PUNERVESH'");

        console.log("Updated member details for Pardha and Punervesh");

    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}

run();
