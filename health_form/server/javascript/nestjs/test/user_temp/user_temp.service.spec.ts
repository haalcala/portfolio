import { Test, TestingModule } from '@nestjs/testing';
import UserTempRepository from '../../src/user_temp/user-temp-repository';
import { UserTempService } from '../../src/user_temp/user_temp.service';

const mockRepository = {
  LogToDB: jest.fn(),
};

describe('UserTempService', () => {
  let service: UserTempService;
  let repository = mockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTempService, UserTempRepository],
    }).overrideProvider(UserTempRepository).useValue(mockRepository).compile();

    service = module.get<UserTempService>(UserTempService);
  });

  it('should be defined', () => { //
    expect(service).toBeDefined();
  });


  describe('test001 user_temp - with valid inputs', () => {
    const params = ["name", 35.8, false, true]

    const [name, temperature, symptomatic, in_contact] = params

    // console log repository
    console.log("----------------- repository:", repository)

    jest.spyOn(repository, 'LogToDB').mockImplementation(() => true);
    // jest.mock('./user-temp-repository')

    it("init", () => {
      service.LogUserTemp(name, temperature, symptomatic, in_contact)
      // or use the following to be less typish
      // service.LogUserTemp.apply(null, params)
    })

    it("should call the repository accordingly", () => {

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
          const resp = await service.LogUserTemp.apply(null, [null, 35.8, false, true])
        }
        catch (e) {
          expect(e.message).toMatch(/required\s+missing.*'name'/i);
          return
        }

        throw new Error("Should not reach here")
      })

      it("test002b should fail with super long", async () => {
        try {
          const resp = await service.LogUserTemp.apply(null, ["0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789"])
        }
        catch (e) {
          expect(e.message).toMatch(/'name'.*too long/i);
          return
        }

        throw new Error("Should not reach here")
      })
    })
  })
});
