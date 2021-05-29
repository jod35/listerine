import React from 'react';

const Item=({title,description})=>{

    return (
        <div className="list-group-item">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )


};

export default Item;