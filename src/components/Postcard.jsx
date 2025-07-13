import service from '../appwrite/conf'
import { Link } from 'react-router-dom'

function Postcard({
    slug,
    $id,
    title,
    feature_image
}) {
    const url = feature_image ? service.getFileDownload(feature_image) : null
    
    return (
        <Link to={`/post/${slug || $id}`} className="block group">
            <div className='bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden'>
                <div className='aspect-video w-full overflow-hidden'>
                    {url ? (
                        <img 
                            src={url} 
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                    )}
                </div>
                <div className='p-6'>
                    <h2 className='text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300'>
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    )
}

export default Postcard