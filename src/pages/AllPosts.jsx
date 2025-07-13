import React, { useEffect, useState } from 'react'
import service from "../appwrite/conf"
import { Postcard, Container } from "../components"

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        service.getAllPosts([]).then((posts) => {
            if (posts) setPosts(posts.documents)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div className="w-full py-16 bg-gray-50">
                <Container>
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading posts...</p>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8 bg-gray-50'>
            <Container>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">All Posts</h1>
                    <p className="text-gray-600">Browse through all our articles ({posts.length} posts)</p>
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <Postcard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts