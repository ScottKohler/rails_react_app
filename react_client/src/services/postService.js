import { API_URL } from "../constants";

async function fetchAllPosts() {
    const response = await fetch(`${API_URL}`);
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function fetchPost(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if(!response.ok){
    throw new Error(response.statusText);
  }
  return response.json();
}


//
//revist as there are holes in this logic
//

async function deletePost(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE", 
    });

    if(!response.ok) {
        throw new Error(response.statusText);
    }

    if(response.status === 204){ //204 is no content status codee
      return null;
    } 
    return response.json(); 
}


export {deletePost, fetchAllPosts, fetchPost};