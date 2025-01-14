import { faker } from "@faker-js/faker";

const generarUsuarios = () => {
    return {
        name: faker.person.firstName(),
        image: faker.image.avatar(),
        password: faker.internet.password(),
        email: faker.internet.email(),
    }
}

export default generarUsuarios;