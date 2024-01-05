import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import service from '../../appwrite/Service';

function PostForm({ post }) {
    const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
        defaultValues: {
            title: post ? title : "",
            slug: post ? slug : "",
            content: post ? content : "",
            status: post ? status : ""
        }
    })
    const userdata = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.UploadFile(data.image[0]) : ""

            if (file) {
                service.deleteFile(post.featuredimage)

            }

            const dbpost = await service.updatePost(post.$id, {
                ...data, featureimage: file ? file.$id : "",
                if(dbpost) { navigate(`/post/${post$id}`) }
            })
        }
        else{
const file = await service.UploadFile(data.image[0])

if(file)
{
    const fileid  = file.$id
    data.featuredimage = fileid

    const dbpost =  await service.createPost({...data , userID : userdata.$id})

    if(dbpost)
    {
        navigate(`/posts/${dbpost.$id}`)
    }
}

        }
    }
    return (
        <div>

        </div>
    );
}

export default PostForm;    