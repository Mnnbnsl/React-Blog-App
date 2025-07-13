import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import service from '../../appwrite/conf'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

            if (file) {
                service.deleteFile(post.feature_image)
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                feature_image: file ? file.$id : undefined,
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await service.uploadFile(data.image[0])

            if (file) {
                const fileId = file.$id
                data.feature_image = fileId
                const dbPost = await service.createPost({ ...data, user_id: userData.$id })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")

        return ""
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8">
            <form onSubmit={handleSubmit(submit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Title"
                        placeholder="Enter post title"
                        {...register("title", { required: "Title is required" })}
                        error={errors.title?.message}
                    />
                    <Input
                        label="Slug"
                        placeholder="Post slug"
                        {...register("slug", { required: "Slug is required" })}
                        error={errors.slug?.message}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                        }}
                    />
                </div>

                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Featured Image"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                        error={errors.image?.message}
                    />
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        {...register("status", { required: true })}
                        error={errors.status?.message}
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit" variant="primary" size="lg">
                        {post ? "Update Post" : "Create Post"}
                    </Button>
                </div>
            </form>
        </div>
    )
}