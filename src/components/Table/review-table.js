import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './table.css';

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9630/')
      .then((e) => e.json())
      .then((data) => setReviews(data.data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:9630/delete-review/${id}`)
      .then((e) => e.json())
      .then((data) => console.log(data));
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Content</th>
          <th>Date</th>
          <th>Edit</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {reviews && reviews.length ? (
          reviews.map((review, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{review.title}</td>
              <td>{review.content}</td>
              <td>{moment(review.dateTime).format('DD MMM YYYY')}</td>
              <td>
                <Link to={`/${review._id}`}>
                  <button>Edit</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(review._id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <span>No Reviews found</span>
        )}
      </tbody>
    </table>
  );
};

export default ReviewTable;
