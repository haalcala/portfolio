
import { UserRepository } from "../repositories/UserRepository";

jest.mock("../repositories/UserRepository");

import { UserService } from "../services/UserServices";

describe("001 UserService", () => {
    describe("001a registerer", () => {
        describe("001ab with valid input", () => {
            it("001ab1 should register a new user", async () => {

                // @ts-ignore
                const mockUser_save = jest.fn<({ a: string, b: string }) => void>();
                // @ts-ignore
                const mockUser_findByEmail = jest.fn<(a: string, b: string) => void>();

                jest.mocked(UserRepository).mockImplementation(() => {
                    return {
                        users: [],

                        save: mockUser_save,

                        findByEmail: mockUser_findByEmail
                    };
                });

                const userService = new UserService();

                userService.register("admin", "admin");

                // @ts-ignore
                console.log(mockUser_save.mock);

                expect(mockUser_save).toHaveBeenCalledTimes(1);
            });
        });
    });
});
