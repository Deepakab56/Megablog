import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService {

    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteproject_id)

        this.account = new Account()
    }

    async createAccount({ email, password, name }) {

        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.loginAccount({ email, password })
            }
            else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }


    async loginAccount({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)

        } catch (error) {
            throw error
        }
    }


    async getcurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("appwrite error ", error)
        }
        return null
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {

        }
    }

}


const authservice = new AuthService()

export default authservice