import { useState, useEffect } from "react";  //hooks
import { Link } from 'react-router-dom';
//import { API_URL } from "../../constants";
import { deletePost, fetchAllPosts } from "../../services/postService";

function PostsList()  {
    const [posts, setPosts] = useState([]);   //posts is my resultant data
    const [, setLoading ]   = useState(true);
    const [, setError ]     = useState(null);
    // fetch posts from api
    //useEffect will run on initial load

    useEffect( () => {
      async function loadPosts() {
        try {
          const data = await fetchAllPosts();
          setPosts(data);
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      }
      loadPosts();
      
    }, []);


    const  deletePostHandler = async(id) => {
      try {
        await deletePost(id);  //infinite loop
        
        setPosts(posts.filter((post) => post.id !== id) );
        //setPosts((prevPosts) => prevPosts.filter((posts) => post.id !== id));

      } catch(e) {
        console.error("Failed to delete the post:", e);
      }

    };

    return (
      <div>      
        {posts.map((post) => (
          <div key={post.id} className="post-container">
            <h2>
              <Link to={`/posts/${post.id}`} className="post-title">
                {post.title}
              </Link>
            </h2>

            <div className="post-links">
              <button onClick={() => deletePostHandler(post.id)}> Delete above Post </button>
            </div>
          </div>
        ))}
      </div>         
    );
}  

export default PostsList;


    // //fetch posts from API = API_URL comes from .env.development file - VITE_API_URL
    // useEffect(() => {

    // }, []);
    
    

   // return <>PostsList</>;
  //  return (
  //    <div>
  //     {posts.map((post) => {
  //       <div key={post.id} className="post-container">
  //       <h2>{post.title}</h2>
  //       <p>{post.body}</p>
  //     </div>;
  //   })}
  //  );

//}

