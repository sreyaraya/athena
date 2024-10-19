import mysql from 'mysql2/promise';

//Modify the connection details to match the details specified while
//deploying the SingleStore workspace:
const HOST = 'svc-11e1642f-7df2-4df7-a5fd-314f70e6e071-dml.aws-oregon-3.svc.singlestore.com';
const USER = 'admin';
const PASSWORD = '5clJh7dsITRiDi6scX30j9E80EZqrhsN';
const DATABASE = 'UserDB';

// main is run at the end
async function main() {
    let singleStoreConnection;
    let id;
    try {
        singleStoreConnection = await mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE
        }).then(
        console.log("You have successfully connected to SingleStore."),
        id = await create({singleStoreConnection, content: 'New message has been logged.'}),
        console.log(`Inserted row id is: ${id}`)
        )
        

  
    } catch (err) { 
        console.error('ERROR', err);
        process.exit(1);
    } finally {
        if (singleStoreConnection) {
            await singleStoreConnection.end();
        }
    }
}

async function create({conn, content}) {
    const [results] = await conn.execute(
        'INSERT INTO messages (content) VALUES (?)',
        [content]
    );
 	return results.insertId;
};

;

// async function readN({conn, id}) {
//     const [rows] = await conn.execute(
//         'SELECT id, content, createdate FROM messages WHERE id = ?',
//          [id]
//     );
//     return rows[0];
// };

// const msg = await readN({conn, id:1});
//     console.log('Read one row:');
//     if (msg == null) {
//         console.log('No message entry with this ID.');
//     } else {
//         console.log(`${msg.id}, ${msg.content}, ${msg.createdate}`);
// }

main();