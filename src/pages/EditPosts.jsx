import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/conf'
import { useNavigate, useParams } from 'react-router-dom'

function EditPosts() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className="py-8 bg-gray-50">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Post</h1>
                        <p className="text-gray-600">Update your post content</p>
                    </div>
                    <PostForm post={post} />
                </div>
            </Container>
        </div>
    ) : null
}

export default EditPosts