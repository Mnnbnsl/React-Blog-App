import React, { useEffect, useState } from 'react'
import service from '../appwrite/conf'
import { Container, Postcard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        service.getAllPosts().then((posts) => {
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

    if (posts.length === 0) {
        return (
            <div className="w-full py-16 bg-gray-50">
                <Container>
                    <div className="text-center bg-white rounded-2xl shadow-sm p-12">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            No posts available
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Login to read posts or check back later for new content.
                        </p>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8 bg-gray-50'>
            <Container>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Latest Posts</h1>
                    <p className="text-gray-600">Discover our latest articles and stories</p>
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

export default Home