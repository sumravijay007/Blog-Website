// import "./Hero.css";

// function Hero() {
//   return (
//     <section className="hero">
//       <div className="hero-content">
//         <h1>Welcome to Blogs </h1>
//         <p>
//           Discover amazing stories, tutorials, and ideas shared by creators
//           around the world. Read, write, and grow your knowledge every day.
//         </p>

//         <div className="hero-buttons">
//           <button className="btn-primary">Create Blog</button>
//         </div>
//       </div>

//       <div className="hero-image">
//         <img
//           src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
//           alt="Blog Writing"
//         />
//       </div>
//     </section>
//   );
// }

// export default Hero;


import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  const handleCreateBlog = () => {
    navigate("/create-blog"); // 👈 your route for create blog page
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Blogs</h1>

        <p>
          Discover amazing stories, tutorials, and ideas shared by creators
          around the world. Read, write, and grow your knowledge every day.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleCreateBlog}>
            Create Blog
          </button>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Blog Writing"
        />
      </div>
    </section>
  );
}

export default Hero;