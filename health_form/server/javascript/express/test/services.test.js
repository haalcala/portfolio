describe("services", () => {
    const repository = require('../src/repositories/UserTemp');

    jest.mock('../src/repositories/UserTemp')

    let service = require("../src/services/UserTemp")

    beforeEach(() => {
        // repository.LogToDB.mockReset()
    })

    describe('test001 user_temp - with valid inputs', () => {
        const params = ["name", 35.8, false, true]

        const [name, temperature, symptomatic, in_contact] = params

        it("init", () => {
            service.LogUserTemp(name, temperature, symptomatic, in_contact)
            // or use the following to be less typish
            // service.LogUserTemp.apply(null, params)
        })

        it("should call the repository accordingly", ()=> {

            console.log(repository.LogToDB.mock.calls)

            expect(repository.LogToDB).toHaveBeenCalled()
            expect(repository.LogToDB.mock.calls.length).toBe(1)
            expect(repository.LogToDB.mock.calls[0][0]).toBe(name)
            expect(repository.LogToDB.mock.calls[0][1]).toBe(temperature)
            expect(repository.LogToDB.mock.calls[0][2]).toBe(symptomatic)
            expect(repository.LogToDB.mock.calls[0][3]).toBe(in_contact)
        })
     })

    describe('test002 user_temp - param: name', () => {
        describe('with in invalid value', () => {
            it("test002a should fail with null and undefined", async () => {
                try {
                    const resp = await service.LogUserTemp(null)
                }
                catch (e) {
                    expect(e.message).toMatch(/required\s+missing.*'name'/i);
                    return
                }
                
                throw new Error("Should not reach here")
            })

            it("test002b should fail with super long", async () => {
                try {
                    const resp = await service.LogUserTemp("0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789")
                }
                catch (e) {
                    expect(e.message).toMatch(/'name'.*too long/i);
                    return
                }
                
                throw new Error("Should not reach here")
            })
        })
     })
})