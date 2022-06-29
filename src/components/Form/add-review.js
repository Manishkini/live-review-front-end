import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Layout/header';
import Footer from '../Layout/footer';

import './review.css';

const AddReviewForm = () => {
  const { id } = useParams();

  const [title, setTitle] = useState(undefined);
  const [content, setContent] = useState(undefined);

  const [isCreate, setIsCreate] = useState(true);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (id === 'new') {
      setIsCreate(true);
    } else {
      fetch(`http://localhost:9630/getReview/${id}`)
        .then((e) => e.json())
        .then((data) => {
          if (data.responseCode === 102) {
            setIsError(true);
          } else if (data.responseCode === 100) {
            if (data.data.title) setTitle(data.data.title);
            if (data.data.content) setContent(data.data.content);
            setIsCreate(false);
          }
        });
    }
  }, id);

  const handleSubmit = () => {
    let endPoint, data;
    if (isCreate) {
      endPoint = 'create-review';
      data = {
        title,
        content,
        dateTime: new Date(),
      };
    } else {
      endPoint = 'update-review';
      data = {
        id,
        title,
        content,
      };
    }

    fetch(`http://localhost:9630/${endPoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((e) => e.json())
      .then((data) => console.log(data));
  };

  const handleReset = () => {
    setTitle('');
    setContent('');
  };

  if (isError) return <span>User Not Found</span>;

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="review-form">
          <div>
            <Link to="/">
              <button>Cancle</button>
            </Link>
          </div>
          <div className="input-box">
            <label for="title">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
            />
          </div>
          <div className="input-box">
            <label for="content">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              id="content"
            ></textarea>
          </div>
          <div className="input-box">
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AddReviewForm;
