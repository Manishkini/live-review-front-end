import React from 'react';
import { Link } from 'react-router-dom';
import ReviewTable from '../Table/review-table';

const Main = () => {
  return (
    <div className="main-container">
      <div className="sub-container">
        <Link to="/new">
          <button>Create New Review</button>
        </Link>
        <ReviewTable />
      </div>
    </div>
  );
};

export default Main;
