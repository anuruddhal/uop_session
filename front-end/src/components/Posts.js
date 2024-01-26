import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Nav from "./PostsNav";
import Notification from "./Notification";
import {LineWave} from 'react-loader-spinner';

const Posts = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [notify, setNotify] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkUser = () => {
            if (!localStorage.getItem("_id")) {
                setLoadingState(true);
                navigate("/");
            }
        };
        checkUser();
    }, [navigate]);

    const createPost = () => {
        let url = "http://localhost:4000/api/users/" + localStorage.getItem("_id") + "/posts";
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
                "timestamp": new Date().toISOString(),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.status === 201 | res.status === 403 | res.status === 404) {
                    setLoadingState(false);
                    return res.json();
                }
                throw new Error("Something went wrong", res.json());
            })
            .then((data) => {
                if (data.error_message) {
                    setError(true);
                    setNotify(true);
                    setLoadingState(false);
                    setMessage(data.error_message);
                } else {
                    setNotify(true);
                    setLoadingState(false);
                    setMessage(data.message);
                }
            })
            .catch((err) => {
                setNotify(true);
                setError(true);
                setMessage("Something went wrong");
                setLoadingState(false);
                console.error(err);
            });
    };

    const setLoadingState = (state) => {
        setLoading(state);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        createPost();
        setLoadingState(true);
        setTitle("");
        setDescription("");
    };
    const handleNotification = () => {
        setNotify(false);
        setMessage("");
        if (!error) {
            setLoadingState(true);
            navigate("/dashboard");
        }
        setError(false);
    }
    return (
        <div>
            <Nav logoPath="images/bal.svg" />
            {notify && <Notification message={message} handle={handleNotification} error={error} />}
            <div className='home'>
                <h2 className='homeTitle'>Create a Post</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className='home__container'>
                        <label htmlFor='title'>Title</label>
                        <input
                            type='text'
                            name='title'
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor='description'>Description</label>
                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            name='description'
                            required
                            className='modalInput'
                        />
                        <LineWave
                            height="100"
                            width="100"
                            color="#20b6b0"
                            ariaLabel="line-wave-loading"
                            wrapperClass=""
                            visible={loading}
                        />
                    </div>
                    <button className='homeBtn'>POST</button>
                </form>
            </div>
        </div>
    );
};

export default Posts;
