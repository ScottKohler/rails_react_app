//import { useState } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import PostsList from "./features/posts/PostsList";
import NavBar from "./components/NavBar";
import AppRoutes from "./components/AppRoutes";

function App() {

  return (
    <Router>
      <div className="app">
        <h1>React on Rails Blog</h1>
        <p>Find this application layout in client/src/App.jsx</p>
        <NavBar />
        {/* <PostsList/> */}
        <AppRoutes/>
        
      </div>
    
    </Router >
  );
}

export default App;
