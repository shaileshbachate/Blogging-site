import BlogList from "./BlogList";
import useFetch from "./useFetch";
import { ImSpinner2, ImSpinner9 } from "react-icons/im";

const Home = () => {
    const { error, isPending, data: blogs } = useFetch(
        "http://localhost:5000/blogs"
    );

    return (
        <div className="home">
            <h2>Blogs</h2>
            {error && (
                <div style={{ marginTop: "20px", fontSize: "larger" }}>
                    {error}
                </div>
            )}
            {isPending && (
                <div style={{ marginTop: "20px", fontSize: "larger" }}>
                    Loading...
                    <ImSpinner9 className="spinner" />
                </div>
            )}
            {blogs && <BlogList blogs={blogs} />}
        </div>
    );
};

export default Home;
