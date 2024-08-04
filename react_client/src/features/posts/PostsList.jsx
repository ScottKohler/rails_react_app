import { useState, useEffect } from "react";  //hooks
import { Link } from 'react-router-dom';
import { API_URL } from "../../constants";

function PostsList()  {
    const [posts, setPosts] = useState([]);   //posts is my resultant data
    const [, setLoading ]   = useState(true);
    const [, setError ]     = useState(null);
    // fetch posts from api
    //useEffect will run on initial load

    useEffect( () => {
      async function loadPosts() {
        try {
          const response = await fetch(API_URL);
          console.log(response);

          if(response.ok) {
            const json = await response.json();  //data from api

            setPosts(json);
          } else {
            throw response;  
          }
        } catch(e) {
          setError("An error occurred yikes...");
          console.log("an error occurred", e);
        
        } finally {
          setLoading(false);
        }
      
      }
      
      loadPosts();

    }, []);


    const  deletePost = async(id) => {
      try {
        //DELETE request to http://localhost:3000/api/v1/posts/:id
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE", 
        });

        if(response.ok) {
          setPosts(posts.filter((post) => post.id !== id ));
        } else {
          throw response;
        }
      } catch(e) {
        console.error(e);
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
              <button onClick={() => deletePost(post.id)}> Delete above Post </button>
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

