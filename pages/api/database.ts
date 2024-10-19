import mysql from 'mysql2/promise';

const HOST = 'svc-11e1642f-7df2-4df7-a5fd-314f70e6e071-dml.aws-oregon-3.svc.singlestore.com';
const USER = 'admin';
const PASSWORD = '5clJh7dsITRiDi6scX30j9E80EZqrhsN';
const DATABASE = 'UserDB';

// // Function to establish a connection to SingleStore
// function connectToDatabase() {
//   console.log("in connect")

//   const connection = mysql.createConnection({
//     host: HOST,
//     user: 'admin',
//     password: PASSWORD,
//     database: DATABASE
//   });

//   console.log("post connect")
//   return connection;
// }

//Modify the connection details to match the details specified while
//deploying the SingleStore workspace:

// main is run at the end
async function main() {
    let singleStoreConnection;
    try {
        singleStoreConnection = await mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE
        });

        const id = await createUser({1, content: 'New message has been logged.'});
        console.log(`Inserted row id is: ${id}`);
  
        console.log("You have successfully connected to SingleStore.");
    } catch (err) { 
        console.error('ERROR', err);
        process.exit(1);
    } finally {
        if (singleStoreConnection) {
            await singleStoreConnection.end();
        }
    }


}

main();

// export async function createUser(email: string/*, username: string, resume: string*/) {
//   const connection = await connectToDatabase();
//   console.log("post connection")
//   connection.on
//   const [result] = await connection.execute(
//       'INSERT INTO Users (Email, Username, Resume) VALUES (?)',
//       ["a", "b", "c"/*, username, resume*/]
//   );

//   const insertResult = result as mysql.ResultSetHeader;
//   return insertResult.insertId; // Return the inserted row's ID
// }

export async function createUser({conn, content}) {
  const [results] = await conn.execute(
      'INSERT INTO Users (Email, Username, Resume) VALUES (?)',
       ["a", "b", "c"/*, username, resume*/]
  );
 return results.insertId;
};

main();

/*export async function getUser(email: string) {
    const connection = await connectToDatabase();
    try {
      const [rows] = await connection.execute(
        'SELECT Email, Username, Resume FROM Users WHERE Email = ?',
        [email]
      );
      return [rows][0]; // Return the first row (if any)
    } finally {
      connection.end();
    }
}*/
  