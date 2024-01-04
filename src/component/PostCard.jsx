import React from 'react';
import { Link } from 'react-router-dom';
import service from '../appwrite/Service';

function PostCard({$id,title,featuredImage}) {
    return (
        <>
        <Link to={`/post${$id}`}>
            <div className="w-full bg-gray-200 rounded-xl p-4 ">
                <div className="w-full justify-center mb-3  ">

                    <img src={service.getFile(featuredImage)} alt={title} className={`rounded-xl`} />
                </div>
            </div>
            <h2 className='text-2xl text-gray-200'>{title}</h2>
        </Link>
            
        </>
    );
}

export default PostCard;