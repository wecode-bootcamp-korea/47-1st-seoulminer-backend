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

module.exports = { createUser };
