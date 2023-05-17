
export class UserRepository {
    users: any[];

    constructor() {
        this.users = [];
    }

    async save(user) {
        this.users.push(user);
    }

    async findByEmail(email) {
        return this.users.find((user) => user.email === email);
    }
}