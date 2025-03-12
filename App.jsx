import React, { useState } from "react";
import "./app.css"; // Import the CSS file

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "junior_anna",
      content:
        "Had an amazing time at the Tech Fest last week! Loved the coding challenges and workshops. Special thanks to the seniors for their guidance. Can't wait for the next event!",
      likes: 15,
      comments: [
        {
          username: "senior_john",
          comment:
            "Glad you enjoyed it, Anna! Keep participating in these events, they're great for learning.",
        },
        {
          username: "junior_mike",
          comment: "Same here! The hackathon was intense but fun.",
        },
      ],
      imageUrl: "path/to/tech-fest-image.jpg",
    },
    {
      id: 2,
      username: "senior_emily",
      content:
        "To all juniors: Don't hesitate to ask about anything related to placements or course selections. We seniors are here to help you out. Also, here's a recap of the Cultural Fest. It was a blast!",
      likes: 20,
      comments: [
        {
          username: "junior_nina",
          comment:
            "Thanks for the offer, Emily! What's the best way to prepare for campus interviews?",
        },
        {
          username: "senior_emily",
          comment:
            "Nina, focus on your technical skills and soft skills. Practice coding problems and work on your resume.",
        },
      ],
      imageUrl: "path/to/cultural-fest-image.jpg",
    },
  ]);
  const [username, setUsername] = useState("");
  const [view, setView] = useState("login"); // Manage view state

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
    setView("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setView("login");
  };

  const handlePostSubmit = (postContent) => {
    setPosts([
      ...posts,
      {
        id: Date.now(),
        username,
        content: postContent,
        likes: 0,
        comments: [],
      },
    ]);
  };

  const handleSignUp = () => {
    setView("signup");
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId, comment) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, { username, comment }] }
          : post
      )
    );
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <div>
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onSignUp={handleSignUp}
      />
      {view === "login" && !isAuthenticated && (
        <LoginForm onLogin={handleLogin} onSignUp={handleSignUp} />
      )}
      {view === "signup" && (
        <SignUpForm onSignUpSuccess={() => setView("login")} />
      )}
      {view === "dashboard" && isAuthenticated && (
        <Dashboard
          posts={posts}
          onPostSubmit={handlePostSubmit}
          onLike={handleLike}
          onComment={handleComment}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

function Navbar({ isAuthenticated, onLogout, onSignUp }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Campus LinkHub
      </a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              About
            </a>
          </li>
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sign Up
                </a>
              </li>
            </>
          )}
        </ul>
        {isAuthenticated && (
          <button
            className="btn btn-outline-danger my-2 my-sm-0"
            onClick={onLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

function LoginForm({ onLogin, onSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
      <button type="button" className="btn btn-link" onClick={onSignUp}>
        Sign Up
      </button>
    </form>
  );
}

function SignUpForm({ onSignUpSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle sign up logic here, e.g., save the user data
    onSignUpSuccess(); // Redirect to login after successful sign up
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="rollNo">Roll No</label>
        <input
          type="text"
          className="form-control"
          id="rollNo"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone No</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
}

function Dashboard({ posts, onPostSubmit, onLike, onComment, onDelete }) {
  const [newPost, setNewPost] = useState("");
  const [comment, setComment] = useState("");

  const handlePostChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    onPostSubmit(newPost);
    setNewPost("");
  };

  return (
    <div className="container">
      <h2>Welcome to Campus LinkHub!</h2>
      <form onSubmit={handlePostSubmit}>
        <div className="form-group">
          <label htmlFor="newPost">New Post</label>
          <textarea
            className="form-control"
            id="newPost"
            value={newPost}
            onChange={handlePostChange}
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">
          Post
        </button>
      </form>
      <div className="mt-4">
        <h4>Posts</h4>
        {posts.map((post, index) => (
          <div key={index} className="card mb-2">
            <div className="card-body">
              <h5 className="card-title">{post.username}</h5>
              <p className="card-text">{post.content}</p>
              <button
                className="btn btn-outline-primary"
                onClick={() => onLike(post.id)}
              >
                Like ({post.likes})
              </button>
              <button
                className="btn btn-outline-danger ml-2"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </button>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onComment(post.id, comment);
                  setComment("");
                }}
              >
                <div className="form-group mt-2">
                  <input
                    type="text"
                    className="form-control"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Comment
                </button>
              </form>
              {post.comments.map((c, i) => (
                <div key={i} className="mt-2">
                  <strong>{c.username}:</strong> {c.comment}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
