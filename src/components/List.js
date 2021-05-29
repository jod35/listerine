import React from 'react';
import Item from './Item'

const List=({list})=>{

    return (
        <div className="list-group">
            {
                list.map((item,index)=>{
                    return <Item title={item.title} description={item.description} key={index}/>
                })
            }
        </div>
    )
}

export default List;