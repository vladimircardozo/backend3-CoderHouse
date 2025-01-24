import { faker } from "@faker-js/faker";

const generatePet = () => {
  return {
    name: faker.animal.dog(),
    species: faker.helpers.arrayElement(["Dog", "Cat", "Bird", "Hamster"]),
    age: faker.number.int({ min: 1, max: 15 }),
    adopted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _id: faker.database.mongodbObjectId(),
  };
};

const generatePets = (num) => {
  return Array.from({ length: num }, () => generatePet());
};

export default generatePets;