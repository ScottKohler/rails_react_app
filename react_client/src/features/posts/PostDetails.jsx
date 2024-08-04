import React, { useEffect, useState  } from "react";
import { useParams, useNavigate, Link  } from "react-router-dom";
import { API_URL } from "../../constants";

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

                console.log("response_string",API_URL);

                const response = await fetch(`${API_URL}/${id}`);

                console.log("_response", response );

                if (response.ok) {
                    console.log("__await fetch/response");
                    const json = await response.json();

                    console.log("__returned json", json);
                    //json is returned correctly, it is just not rendering correctly....

                    setPost(json);  // this should render single post
                } else {
                    console.log("ErroR");
                    throw response;
                }
            } catch(e) {
              console.log('An error has occurred', e);
            }
        };
        fetchCurrentPost();
    }, [ id ]);  //change based on id, so put id in this array
    
    const deletePost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE', 
          });

          if (response.ok) {
            navigate('/');
          } else {
            throw response;  
          }
        } catch( error ) {
          console.error(error);  
        }
        
          
    };

    console.log("post", post)
    if(!post) return <h2>Loading...</h2>

    return ( 
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to="/">Back to Posts</Link>
            {" | "}
            <button onClick={deletePost}>Delete</button>
        </div>
    );
}
export default PostDetails;
