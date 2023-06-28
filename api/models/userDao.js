const dataSource = require('./dataSource');

const getUserByEmail = async(email) => {
  try {
    const [user] = await dataSource.query(
      `
      SELECT 
        id, 
        email, 
        password, 
        name, 
        phone_number as phoneNumber
      FROM users
      where email = ?
      `,
      [email]
    )
    return user;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
}

module.exports = {
  getUserByEmail
}