import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants"


function EditPostForm() {
  const [post, setPost] = useState(null);
  const{ id }           = useParams();
  const [, setLoading]  = useState(true);
  const [, setError]    = useState(null);
  const navigate        = useNavigate();

  useEffect(() => {
    //fetch the current post by id
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if(response.ok) {

          console.log("response:", response);

          const json = await response.json();
          setPost(json);
        } else{
          throw response;
        }
      } catch(e) {
        console.log("Error occurred:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchCurrentPost();
  }, [id]);


  //define handleSubmit
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT', 
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: post.title,
          body: post.body,
        }),

      });

      if (response.ok) {
        const json= await response.json();
        console.log("Success", json);
        navigate(`/posts/${id}`);


      } else {
        throw response;
      }
    }
    catch(e){
      console.log("an error has occurred", e);
      
    }

  };

  if(!post) return<h2>Loading...</h2>;

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="post-title" >Title</label>
          <br/>
          
          <input 
            type="text"
            id="post-title"
            value={post.title}  //? checks for existence of post
            onChange={(e) => setPost({...post, title: e.target.value})}
          />
        </div>

        <div>
          <label htmlFor="post-body">Body</label>
          <br />
          <textarea
            id="post-body"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value})}  //destructs post
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  ); 
  //return(<div><h2>Edit Post</h2></div>);
}

export default EditPostForm;

/* 
note: double render
  Started GET "/api/v1/posts/93" for ::1 at 2024-08-04 05:29:56 -0400
  Processing by Api::V1::PostsController#show as
    Parameters: {"id"=>"93"}
    (0.1ms)  SELECT sqlite_version(*)
    ↳ app/controllers/api/v1/posts_controller.rb:47:in `set_post'
    Post Load (0.3ms)  SELECT "posts".* FROM "posts" WHERE "posts"."id" = ? LIMIT ?  [["id", 93], ["LIMIT", 1]]
    ↳ app/controllers/api/v1/posts_controller.rb:47:in `set_post'
  Completed 200 OK in 2014ms (Views: 1.6ms | ActiveRecord: 0.6ms | Allocations: 1129)


  Started GET "/api/v1/posts/93" for ::1 at 2024-08-04 05:29:58 -0400
  Processing by Api::V1::PostsController#show as 
    Parameters: {"id"=>"93"}
    Post Load (0.2ms)  SELECT "posts".* FROM "posts" WHERE "posts"."id" = ? LIMIT ?  [["id", 93], ["LIMIT", 1]]
    ↳ app/controllers/api/v1/posts_controller.rb:47:in `set_post'
  Completed 200 OK in 2013ms (Views: 1.6ms | ActiveRecord: 0.2ms | Allocations: 661)

  --additional trip tp api is no good...
*/