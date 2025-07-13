import service from '../appwrite/conf'
import { Link } from 'react-router-dom'

function Postcard({
    slug,
    $id,
    title,
    feature_image
}) {
    const url = feature_image? service.getFileDownload(feature_image) : null
    return (
        <Link to = {`/post/${slug || $id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    
                    <img src={url ? url : ""}
                    alt={title}
                    className="w-full h-52 object-cover rounded-xl"
                    />
                    
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default Postcard