import React from 'react';
import { Link } from 'react-router-dom';

const BackButton: React.FC = () => {
  return (
    <div>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
};

export default BackButton;
