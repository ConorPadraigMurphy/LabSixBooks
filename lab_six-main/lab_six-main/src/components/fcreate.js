import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function FCreate(props) {
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [author, setAuthor] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setTitle('');
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();


        const newBook = {
            title: title,
            cover: cover,
            author: author
        }
        axios.post('http://localhost:4000/api/books', newBook)
            .then((response) => {
                navigate('/read');
            })
            .catch(() => { });

    }

    return (
        <div>
            <h1>Good Morning!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Add Book Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    ></input>
                    <label>Add cover</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => { setCover(e.target.value) }}
                    ></input>
                    <label>Add Author</label>
                    <input
                        type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => { setAuthor(e.target.value) }}
                    ></input>
                </div>
                <div>
                    <input type="Submit" value="Add Book"></input>
                </div>


            </form>
        </div>
    );
}