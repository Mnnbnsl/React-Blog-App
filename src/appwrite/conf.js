/* eslint-disable no-useless-catch */
import config from "../config/conf";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL) 
            .setProject(config.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, feature_image, status, user_id}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title : title,
                    content : content,
                    feature_image : feature_image,
                    status : status,
                    user_id : user_id,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title, content, feature_image, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    feature_image,
                    status,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
            )
        } catch (error) {
            throw error;
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries,
            )
        } catch (error) {
            throw error;
        }
    }

    // file upload service

    async uploadFile(feature_image){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                feature_image,
                [ Permission.read(Role.any()) ]
            )
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(feature_image){
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketID,
                feature_image
            )
            return true;
        } catch (error) {
            throw error;
        }
    }

    getFileDownload(feature_image) {
    if (!feature_image){
        console.log("returning")
        return null;
    } 
        
    try {
        const url = this.bucket.getFileView(
            config.appwriteBucketID,
            feature_image
        );
        return url;
    } catch (error) {
        console.error("Error fetching file download URL:", error);
        throw error;
    }
}

}

const service = new Service();

export default service;