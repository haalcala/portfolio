import { UserRepository } from "../repositories/UserRepository";



export class UserService {
    async register(email, password) {
        const userRepository = new UserRepository();
        const userExists = await userRepository.findByEmail(email);

        if (userExists) {
            throw new Error("User already exists");
        }

        const user = {
            email,
            password,
        };

        console.log("Calling userRepository.save:: user", user);

        await userRepository.save(user);
    }
}