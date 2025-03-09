import React, { useEffect, useState, useCallback } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import FavoriteItem from '../components/FavoriteItem';
import BackButton from '../components/BackButton';
import '../styles/List.scss';

const List: React.FC = () => {
    const { favorites, addToFavorites } = useAppContext();
    const [items, setItems] = useState<any[]>([]); 
    const [page, setPage] = useState(1); 
    const [loading, setLoading] = useState(false); 
    const [hasMore, setHasMore] = useState(true); 

    
    const fetchItems = useCallback(async (pageNumber: number) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${pageNumber}&_limit=10`
            );

            
            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setItems((prevItems) => [...prevItems, ...response.data]);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
        setLoading(false);
    }, []);

    
    useEffect(() => {
        if (hasMore) {
            fetchItems(page);
        }
    }, [page, fetchItems, hasMore]);

    
    const handleScroll = (e: React.UIEvent) => {
        const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
        if (bottom && !loading && hasMore) {
            setPage((prevPage) => prevPage + 1); 
        }
    };

    return (
        <div className="list" onScroll={handleScroll} style={{ height: '80vh', overflowY: 'auto' }}>
            <BackButton />
            <div className='row list_itm'>
                <h1>Item List</h1>
            </div>
            {items.length === 0 && !loading ? (
                <p>No data found</p>
            ) : (
                <div>
                    <ul className='row list_divs'>
                        {items.map((item) => (

                            <li key={item.id} className='list_div'>
                                <FavoriteItem
                                    item={item}
                                    isFavorite={favorites.some((fav) => fav.id === item.id)}
                                    addToFavorites={addToFavorites}
                                />
                            </li>

                        ))}
                    </ul>
                </div>
            )}
            {loading && <p>Loading...</p>}
            {!hasMore && !loading && <p>No more data to load</p>}
        </div>
    );
};

export default List;
