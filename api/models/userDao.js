const { appDataSource } = require("./dataSource");

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
module.exports = { createUser, userExistByEmail, userExistByPhoneNumber };
