import React, { useCallback, useState } from 'react'

function ItemList() {
    const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

    const removeItem = useCallback((itemToRemove) => {
        const filteredItems = items.filter(item=> item!=itemToRemove);
        setItems(filteredItems);
    },[]);
  return (
    <div>
        {
            items.map(item => {
                return (
                    <div>
                        {item}
                        <button onClick={()=> removeItem(item)}>Remove</button>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ItemList