const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function main() {
  const email = 'abdullahsyed574@gmail.com';
  const password = 'Syed@2003';
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  console.log("Connecting to database...");
  const connection = await mysql.createConnection({
    host: 'srv669.hstgr.io',
    user: 'u531590317_disha_arts',
    password: 'DishaArts09',
    database: 'u531590317_dishaarts',
  });
  
  try {
    const [rows] = await connection.execute('SELECT * FROM admins WHERE email = ?', [email]);
    if (rows.length > 0) {
      console.log('Admin already exists. Updating password...');
      await connection.execute('UPDATE admins SET password = ? WHERE email = ?', [hashedPassword, email]);
      console.log('Admin password updated successfully');
    } else {
      await connection.execute('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hashedPassword]);
      console.log('Admin created successfully:', email);
    }
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await connection.end();
  }
}

main().catch(console.error);
