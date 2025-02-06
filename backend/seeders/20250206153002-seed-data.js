module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("users", [
      {
        username: "admin",
        email: "admin@example.com",
        password_hash: "hashedpassword",
        role: "admin",
        created_at: new Date(),
      },
      {
        username: "beautymaster1",
        email: "beautymaster@example.com",
        password_hash: "hashedpassword",
        role: "beauty_master",
        created_at: new Date(),
      },
      {
        username: "customer1",
        email: "customer@example.com",
        password_hash: "hashedpassword",
        role: "customer",
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
