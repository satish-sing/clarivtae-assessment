import React from 'react';

type Props = {
  item: any;
  isFavorite: boolean;
  addToFavorites: (item: any) => void;
};

const FavoriteItem: React.FC<Props> = ({ item, isFavorite, addToFavorites }) => {
  const handleFavoriteClick = () => {
    addToFavorites(item);
  };

  return (
    <div className="favorite-item">
      <img src={item.thumbnailUrl} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <button onClick={handleFavoriteClick}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
      </div>
    </div>
  );
};

export default FavoriteItem;
