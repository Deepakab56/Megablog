import React, { useState } from 'react'
import service from '../appwrite/Service'
import Container from '../component/Container/Container'
import PostCard from '../component/PostCard'

export default function Allpost() {
    const[posts,setposts] = useState([])

    service.getposts([]).then((post)=>{
        if(post)
        {
            setposts(post.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            {posts.map((post)=>(
                <PostCard key={post.$id} post={post}/>
            ))}
        </Container>
      
    </div>
  )
}
