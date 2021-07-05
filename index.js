const adminUser = {
  printRole() {
    console.log("admin");
  },
};

const managerUser = {
  printRole() {
    console.log("manager");
  },
};

const user = {};

const users = [adminUser, managerUser, user];

users.forEach((u) => {
  u.printRole?.();
});

console.log(user?.["printRole"]);
