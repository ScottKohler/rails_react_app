import React, { useEffect, useState  } from "react";
import { useParams, useNavigate, Link  } from "react-router-dom";
import { API_URL } from "../../constants";
import { deletePost /*as DeletePostService*/, fetchPost, } from "../../services/postService";

function PostDetails() {
    const [post, setPost] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    console.log("ID is: ", {id})
    console.log("in PostDetails..")
    // similar to index page:

    useEffect(() => {       
        const fetchCurrentPost = async () => {
            try {
                const json = await fetchPost(id);
                setPost(json);            
            } catch(e) {
                console.log("An error has occurred", e);
            }
        };
        fetchCurrentPost();
    }, [id]);

    
    /* deletePost */
    const deletePostHandler = async () => {
      try {
        await deletePost(post.id);    //overfloew cause   
        navigate("/");
      } catch (error) {
        console.error ("Failed to delete the post", error);
      }          
    };


    console.log("post", post)
    if(!post) return <h2>Loading...</h2>

    return ( 
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link> 
            {" | "}
            <Link to="/">Back to Posts</Link>
            {" | "}
            <button onClick={deletePostHandler}>Delete</button>
        </div>
    );
}
export default PostDetails;
