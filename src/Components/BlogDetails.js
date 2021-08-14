import useFetch from "./useFetch";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";

const BlogDetails = () => {
    const [isPending, setIsPending] = useState(false); // while deleting blog

    const { id } = useParams(); // to get the parameters from the urls
    const { data: blog, error, isPending: isLoading } = useFetch(
        `http://localhost:5000/blogs/${id}`
    );
    const history = useHistory();

    const handleDelete = () => {
        setIsPending(true);
        setTimeout(() => {
            fetch(`http://localhost:5000/blogs/${id}`, {
                method: "delete",
            }).then(() => {
                history.push("/");
                setIsPending(false);
            });
        }, 300);
    };

    return (
        <div className="blog-details">
            {error && (
                <div style={{ marginTop: "20px", fontSize: "larger" }}>
                    {error}
                </div>
            )}
            {isLoading && (
                <div style={{ marginTop: "20px", fontSize: "larger" }}>
                    Loading...
                    <ImSpinner9 className="spinner" />
                </div>
            )}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleDelete} disabled={isPending}>
                        Delete Blog{" "}
                        {isPending && <ImSpinner9 className="spinner" />}
                    </button>
                </article>
            )}
        </div>
    );
};

export default BlogDetails;
