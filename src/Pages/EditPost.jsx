import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/Service';
import Container from '../component/Container/Container';
import PostForm from '../component/Post-fom/PostForm';

function EditPost(props) {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [post, setpost] = useState()
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setpost(post)
                }
                else{
                    navigate("/")
                }
            })
        }

    }, [slug, navigate])
    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>

    ) : ""
}

export default EditPost;