import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
// import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const { favorites } = useAppContext();

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button>
        <Link to="/list">Go to List</Link>
      </button>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
