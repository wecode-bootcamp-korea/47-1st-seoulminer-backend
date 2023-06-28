const dataSource = require('./dataSource');

const getUserByEmail = async(email) => {
  try {
    const [user] = await dataSource.query(
      `
      SELECT * FROM users
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