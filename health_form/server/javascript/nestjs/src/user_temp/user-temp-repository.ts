import { Injectable } from "@nestjs/common";

@Injectable()
export default class UserTempRepository {
    LogToDB(name, temperature, symptomatic, in_contact) {
        console.log("********************* LogToDB", name, temperature, symptomatic, in_contact)
    }
}