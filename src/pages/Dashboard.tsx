import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../styles/Dashboard.scss';

const Dashboard: React.FC = () => {
    const { favorites } = useAppContext();

    return (
        <>
            <div className="dashboard">
                <div className='row'>
                    <h1>Dashboard</h1>
                </div>
                <button className='list_btn'>
                    <Link to="/list">Go to List</Link>
                </button>
                <div className='row fav'>
                    <h2>Favorites List</h2>
                </div>

                <ul className='fav_list'>
                    {favorites.map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Dashboard;
