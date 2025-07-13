import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
    return (
        <div className="py-8 bg-gray-50">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
                        <p className="text-gray-600">Share your thoughts with the world</p>
                    </div>
                    <PostForm />
                </div>
            </Container>
        </div>
    )
}

export default AddPost