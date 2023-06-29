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
  return await appDataSource.query(
    `
    SELECT count(*) count
    FROM users
    WHERE email = ?
  `,
    [email]
  );
};

const userExistByPhoneNumber = async (phoneNumber) => {
  return await appDataSource.query(
    `
    SELECT count(*) count
    FROM users
    WHERE phone_number = ?
  `,
    [phoneNumber]
  );
};
module.exports = { createUser, userExistByEmail, userExistByPhoneNumber };
