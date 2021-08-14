import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const [isPending, setIsPending] = useState(false);

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        const blog = { title, body, author };

        setTimeout(() => {
            fetch("http://localhost:5000/blogs", {
                method: "post",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(blog),
            })
                .then((res) => {
                    setIsPending(false);
                    history.push("/");
                    return res.json();
                })
                .then((data) => console.log(data));
        }, 300);
    };

    return (
        <div className="create">
            <h2
                style={{
                    textAlign: "center",
                    color: "#007bff",
                    marginBottom: "20px",
                }}
            >
                Create Blog
            </h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label htmlFor="body">Body:</label>
                <textarea
                    id="body"
                    rows="10"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                ></textarea>
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                {!isPending && <button type="submit">Add Blog</button>}
                {isPending && (
                    <button type="submit" disabled>
                        Adding Blog...
                        <ImSpinner9 className="spinner" />
                    </button>
                )}
            </form>
        </div>
    );
};

export default Create;
