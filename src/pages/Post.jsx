import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import service from '../appwrite/conf'
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
    const [post, setPost] = useState(null);
    const {slug} = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.user_id === userData.$id : false;
    
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post)
                else navigate('/')
            })
        } else navigate('/')
    }, [slug, navigate])

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.feature_image)
                navigate('/')
            }
        })
    }
    
    return post ? (
        <div className="py-8 bg-gray-50 min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Featured Image Section */}
                    <div className="relative mb-8 bg-white rounded-2xl shadow-sm overflow-hidden">
                        {post.feature_image && (
                            <div className="aspect-video w-full">
                                <img
                                    src={service.getFileDownload(post.feature_image)}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        
                        {/* Action Buttons Overlay */}
                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button variant="success" size="sm">
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant="danger" size="sm" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Title Section */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                            {post.title}
                        </h1>
                    </div>

                    {/* Blog Content Section */}
                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <div className="prose prose-lg prose-gray max-w-none">
                            <div className="blog-content">
                                {parse(post.content)}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post