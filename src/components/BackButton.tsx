import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.scss';

const BackButton: React.FC = () => {
  return (
    <div>
      <Link to="/"  className='back_btn'>Back to Dashboard</Link>
    </div>
  );
};

export default BackButton;
