const { appDataSource } = require("./dataSource");

const confirmInsiderByEmail = async (email) => {
  const [confirmedInsider] = await appDataSource.query(
    `
    SELECT EXISTS (
      SELECT id
      FROM insider_emails
      WHERE email = ?
    ) exist
    `,
    [email]
  );
  return !!parseInt(confirmedInsider.exist);
};

const adminUserExistsByAccountName = async (accountName) => {
  const [adminUserExistsByAccountName] = await appDataSource.query(
    `
    SELECT EXISTS (
      SELECT *
      FROM admin_users
      WHERE account_name = ?
    ) exist
  `,
    [accountName]
  );
  return adminUserExistsByAccountName;
};

const adminUserExistsByEmail = async (email) => {
  const [adminUserExistsByEmail] = await appDataSource.query(
    `
    SELECT EXISTS (
      SELECT *
      FROM admin_users
      WHERE email = ?
    ) exist
    `,
    [email]
  );
  return adminUserExistsByEmail;
};

const adminUserExistsByPhoneNumber = async (phoneNumber) => {
  const [adminUserExistsByPhoneNumber] = await appDataSource.query(
    `
    SELECT EXISTS (
      SELECT *
      FROM admin_users
      WHERE phone_number = ?
    ) exist
    `,
    [phoneNumber]
  );
  return adminUserExistsByPhoneNumber;
};

const createAdminUser = async (
  accountName,
  hashedPassword,
  personalCode,
  name,
  email,
  phoneNumber
) => {
  return await appDataSource.query(
    `
      INSERT INTO admin_users(
        account_name,
        password,
        personal_code,
        name,
        email,
        phone_number
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      );
      `,
    [accountName, hashedPassword, personalCode, name, email, phoneNumber]
  );
};

module.exports = {
  confirmInsiderByEmail,
  adminUserExistsByAccountName,
  adminUserExistsByEmail,
  adminUserExistsByPhoneNumber,
  createAdminUser,
};
