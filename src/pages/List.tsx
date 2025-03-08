import React, { useEffect, useState, useCallback } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import FavoriteItem from '../components/FavoriteItem';
import BackButton from '../components/BackButton';
import '../styles/List.scss';

const List: React.FC = () => {
  const { favorites, addToFavorites } = useAppContext();
  const [items, setItems] = useState<any[]>([]); // Holds the list of items
  const [page, setPage] = useState(1); // Page state for pagination
  const [loading, setLoading] = useState(false); // Loading state to prevent duplicate requests
  const [hasMore, setHasMore] = useState(true); // State to check if there is more data to load

  // Fetch data from the API
  const fetchItems = useCallback(async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${pageNumber}&_limit=10`
      );

      // If no data is returned, stop further loading
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

  // Call the API when the component is mounted or when page changes
  useEffect(() => {
    if (hasMore) {
      fetchItems(page);
    }
  }, [page, fetchItems, hasMore]);

  // Handle the scroll event
  const handleScroll = (e: React.UIEvent) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment the page number to load more data
    }
  };

  return (
    <div className="list" onScroll={handleScroll} style={{ height: '80vh', overflowY: 'auto' }}>
      <BackButton />
      <h1>Item List</h1>
      {items.length === 0 && !loading ? (
        <p>No data found</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <FavoriteItem
                item={item}
                isFavorite={favorites.some((fav) => fav.id === item.id)}
                addToFavorites={addToFavorites}
              />
            </li>
          ))}
        </ul>
      )}
      {loading && <p>Loading...</p>}
      {!hasMore && !loading && <p>No more data to load</p>}
    </div>
  );
};

export default List;
