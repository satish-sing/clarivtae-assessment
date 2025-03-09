import React from 'react';
import '../styles/FavoriteItem.scss';

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
            <div className="item-id">
                <h4>ID: {item.id}</h4>
            </div>
            <img src={item.thumbnailUrl} alt={item.title} className="item-image" />
            <div className="item-title">
                <h3>{item.title}</h3>
                <button onClick={handleFavoriteClick} className='button_width'>
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>

    );
};

export default FavoriteItem;
