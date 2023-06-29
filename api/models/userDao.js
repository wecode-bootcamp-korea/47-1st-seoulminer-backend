const dataSource = require("./dataSource");

const createUser = async (email, hashedPassword, name, phoneNumber) => {
  return await appDataSource.query(
    `
      INSERT INTO users(
        email,
        password,
        name,
        phone_number
      ) VALUES (
        ?,
        ?,
        ?,
        ?
      );
      `,
    [email, hashedPassword, name, phoneNumber]
  );
};

const userExistByEmail = async (email) => {
  const [userExistsByEmail] = await appDataSource.query(
    `
    SELECT EXISTS (
      SELECT *
      FROM users
      WHERE email = ?
    ) exist
  `,
    [email]
  );
  return userExistsByEmail;
};

const userExistByPhoneNumber = async (phoneNumber) => {
  const [userExistsByPhoneNumber] = await appDataSource.query(
    `
    SELECT EXISTS (
      SELECT *
      FROM users
      WHERE phone_number = ?
      ) exist
  `,
    [phoneNumber]
  );
  return userExistsByPhoneNumber;
};

const getUserByEmail = async (email) => {
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
    );
    return user;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { createUser, userExistByEmail, userExistByPhoneNumber, getUserByEmail };
