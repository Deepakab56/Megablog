import { Client, Databases, ID, Query , Storage } from "appwrite";
import conf from "../config/conf";

export class Service{

    client = new Client()
    database
    storage

    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteproject_id)

        this.database=new Databases(this.client)
        this.storage=new Storage(this.client)
    }



    async createPost({title,slug,content,featureimage,userID,status}){
       try {
       return  await this.database.createDocument(conf.appwrite_database_id,conf.appwrite_collection_id,slug,{
            title,
            content,
            featureimage,
            status,
            userID

        })

       } catch (error) {
        
       }

    }


    async updatePost(slug,{title,content,featureimage,userID,status}){
       try {
        return await this.database.updateDocument(conf.appwrite_database_id,conf.appwrite_collection_id,slug,{
            title,content,featureimage,userID,status
        })
       } catch (error) {
        throw error
       }

    }

    async deletePost(slug){
       try {
           await this.database.deleteDocument(conf.appwrite_database_id,conf.appwrite_collection_id,slug)
        return true
       } catch (error) {
        console.log("appwrite deletepost error" )
        return false
       }

    }

    async getPost(slug){
       try {
        return await  this.database.getDocument(conf.appwrite_database_id,conf.appwrite_collection_id,slug)
       } catch (error) {
        console.log("appwrite getpost error " ,error)
        return false
       }
    }


    async getposts(queries = [Query.equal("status" , "active")]){
        try {
            return await this.database.listDocuments(conf.appwrite_database_id,conf.appwrite_collection_id)
        } catch (error) {
            console.log("appwrite getposts error")
        }
    }


    //----------> file uploader service

    async UploadFile(file){
      try {
        return await this.storage.createFile(ID.unique(),conf.appwrite_bucket_id,file)
      } catch (error) {
        console.log("appwrite error ")
        
      }

    }


    async deleteFile(fileID)
    {
       try {
        await this.storage.deleteFile(conf.appwrite_bucket_id,fileID)
        return true
       } catch (error) {
        console.log("appwrite error deletefuile" ,error)
       }
    }

    async getFile(fileID){
        try {
            return await this.storage.getFile(conf.appwrite_bucket_id, fileID)
        } catch (error) {
            console.log("appwrite error ")
        }
    }
}