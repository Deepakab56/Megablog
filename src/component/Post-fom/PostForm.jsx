import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import service from '../../appwrite/Service';
import Button from '../Button'
import Input from '../Input'
import RTE from '../RTE'
import Select from '../Select'


function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
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
                if(dbpost) { navigate(`/post/${post.$id}`) }
            })
        }
        else {
            const file = await service.UploadFile(data.image[0])

            if (file) {
                const fileid = file.$id
                data.featuredimage = fileid

                const dbpost = await service.createPost({ ...data, userID: userdata.$id })

                if (dbpost) {
                    navigate(`/posts/${dbpost.$id}`)
                }
            }

        }
    }

    const slugtranformation = useCallback((value)=>{
        if(value && typeof value =="string")
        {
            return value.trim().toLowerCase().replace(/^[a-zA-Z\d\s]+/g,"-").replace(/\s/g,'-')
        }
        else{
            return ""
        }

    },[])

    React.useEffect(()=>{
        const subscription =watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugtranformation(value.title), { shouldValidate: true });
            }
        });

        return ()=>{
            subscription.unsubscribe()
        }
    },[watch,slugtranformation,setValue])
    return (
        <div>
<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugtranformation(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
        </div>
    );
}

export default PostForm;    