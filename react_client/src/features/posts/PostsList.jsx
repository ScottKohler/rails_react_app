import { useState, useEffect } from "react";
import { API_URL } from "./constants";


function PostsList()  {
    const [posts, setPosts] = useState([]);
    const [, setLoading ] = useState(true);
    const [, setError ] = useState(null);
    // fetch posts from api

    //useEffect will run on initial load

    useEffect( () => {
      async function loadPosts() {
        try {
          const response = await fetch(API_URL);
          

          console.log(response);

          if(response.ok) {
            const json = await response.json();
            
            

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

    return (
      <div>
       
        {posts.map((post) => (
          <div key={post.id} className="post-container">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
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

