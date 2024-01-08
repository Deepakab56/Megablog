import React, { useEffect, useState } from 'react';
import service from '../appwrite/Service';
import PostCard from '../component/PostCard';
import Container from '../component/Container/Container';

function Home(props) {
    const[post,setpost] = useState()

    useEffect(()=>{
        service.getposts([]).then((post)=>{
            if(post)
            {
                setpost(post.documents)
            }
        })
    },[])
    if (post.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <div className="flex flex-wr'">
                {
                    post.map((post)=>(
                        <div className="p-2 w-1/2 " key={post.$id}>
                            <PostCard {...post}/>
                        </div>
                    ))
                }
            </div>
            
        </div>
    );
}

export default Home;    