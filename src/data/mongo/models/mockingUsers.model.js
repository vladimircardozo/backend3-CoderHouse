import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const generateUser = async () => {
  const passwordHash = await bcrypt.hash("coder123", 10);

  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: passwordHash,
    role: faker.helpers.arrayElement(["USER", "ADMIN"]),
    pets: [],
  };
};

const generateUsers = async (num) => {
    const users = [];
    for (let i = 0; i < num; i++) {
        users.push(await generateUser());
    }
    return users
}

export default generateUsers;