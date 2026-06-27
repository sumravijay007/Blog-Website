// import { useState } from "react";
// import API from "../services/api";
// import "./Comments.css";

// function Comments({ blogId, comments, refreshBlog }) {
//   const [text, setText] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!text.trim()) {
//       setError("Comment cannot be empty.");
//       return;
//     }

//     if (!user) {
//       setError("Please log in to post a comment.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await API.post(`/blogs/comment/${blogId}`, { text: text.trim() });
//       setText("");
//       await refreshBlog();
//     } catch (err) {
//       console.error("Error posting comment:", err);
//       setError("Failed to post comment. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }

//   };
//   const [userDets, setUserDets] = useState({})

//   const fetchUser = async (id) => {
//     try {
//       const fetchedUser = await API.get(`/auth/user/${id}`)
//       console.log("fetched user ", fetchedUser)
//       setUserDets(fetchedUser.data.dbUser)
//     } catch (err) {
//       console.error("Error fetching user:", err);
//       setError("Failed to get user. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <div className="cm-root">

//       {/* Comment list */}
//       <div className="cm-list">
//         {comments && comments.length > 0 ? (
//           comments.map((c) => {
//             fetchUser(c.user).then((res) => {
//               console.log("data = ", res)
//             })
//             return (
//               <div key={c._id} className="cm-item">
//                 <div className="cm-item__avatar">
//                   {/* {userDets.username && userDets.username.charAt(0).toUpperCase()} */}
//                 </div>
//                 <div className="cm-item__body">
//                   <span className="cm-item__author">{c.user.username}</span>
//                   <p className="cm-item__text">{c.text}</p>
//                 </div>
//               </div>
//             )
//           })
//         ) : (
//           <div className="cm-empty">
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//             </svg>
//             <p>No comments yet — start the conversation.</p>
//           </div>
//         )}
//       </div>

//       {/* Compose form */}
//       <form className="cm-form" onSubmit={handleSubmit}>
//         {user && (
//           <div className="cm-form__avatar">
//             {user.username.charAt(0).toUpperCase()}
//           </div>
//         )}
//         <div className="cm-form__field">
//           <textarea
//             className="cm-form__input"
//             placeholder={user ? "Add a comment…" : "Log in to comment…"}
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             disabled={isSubmitting || !user}
//             rows={2}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSubmit(e);
//               }
//             }}
//           />
//           {error && <p className="cm-form__error">{error}</p>}
//           <div className="cm-form__actions">
//             {text.trim() && (
//               <button
//                 type="button"
//                 className="cm-form__cancel"
//                 onClick={() => { setText(""); setError(""); }}
//               >
//                 Cancel
//               </button>
//             )}
//             <button
//               type="submit"
//               className="cm-form__submit"
//               disabled={isSubmitting || !text.trim() || !user}
//             >
//               {isSubmitting ? (
//                 <>
//                   <span className="cm-form__spinner" />
//                   Posting…
//                 </>
//               ) : (
//                 <>
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <line x1="22" y1="2" x2="11" y2="13" />
//                     <polygon points="22 2 15 22 11 13 2 9 22 2" />
//                   </svg>
//                   Post
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </form>

//     </div>
//   );
// }

// export default Comments;



import { useState, useEffect } from "react";
import API from "../services/api";
import "./Comments.css";

function Comments({ blogId, comments, refreshBlog }) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch all users for comments
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userMap = {};

        await Promise.all(
          comments.map(async (comment) => {
            // Skip if already fetched
            if (userMap[comment.user]) return;

            const res = await API.get(`/auth/user/${comment.user}`);

            userMap[comment.user] = res.data.dbUser;
          })
        );

        setUsers(userMap);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    if (comments && comments.length > 0) {
      fetchUsers();
    }
  }, [comments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!text.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    if (!user) {
      setError("Please log in to post a comment.");
      return;
    }

    setIsSubmitting(true);

    try {
      await API.post(`/blogs/comment/${blogId}`, {
        text: text.trim(),
      });

      setText("");
      await refreshBlog();
    } catch (err) {
      console.error("Error posting comment:", err);
      setError("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cm-root">
      {/* Comments List */}
      <div className="cm-list">
        {comments && comments.length > 0 ? (
          comments.map((c) => {
            const commentUser = users[c.user];

            return (
              <div key={c._id} className="cm-item">
                <div className="cm-item__avatar">
                  {commentUser?.username
                    ? commentUser.username.charAt(0).toUpperCase()
                    : "?"}
                </div>

                <div className="cm-item__body">
                  <span className="cm-item__author">
                    {commentUser?.username || "Loading..."}
                  </span>

                  <p className="cm-item__text">{c.text}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="cm-empty">
            <p>No comments yet — start the conversation.</p>
          </div>
        )}
      </div>

      {/* Comment Form */}
      <form className="cm-form" onSubmit={handleSubmit}>
        {user && (
          <div className="cm-form__avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="cm-form__field">
          <textarea
            className="cm-form__input"
            placeholder={
              user ? "Add a comment..." : "Log in to comment..."
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitting || !user}
            rows={2}
          />

          {error && <p className="cm-form__error">{error}</p>}

          <div className="cm-form__actions">

            <button
              type="submit"
              className="cm-form__submit"
              disabled={isSubmitting || !text.trim() || !user}
            >
              {isSubmitting ? (
                <>
                  <span className="cm-form__spinner" />
                  Posting…
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Post
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Comments;