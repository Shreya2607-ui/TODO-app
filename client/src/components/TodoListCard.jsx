import { useCallback, useEffect, useState } from 'react';
import { AddItemForm } from './AddNewItemForm';
import { ItemDisplay } from './ItemDisplay';

export function TodoListCard() {
    const [items, setItems] = useState(null);

    useEffect(() => {
        fetch('/api/items')
            .then((r) => r.json())
            .then(setItems);
    }, []);

    // Limit of 5 items
    const maxItems = 5;

    // Callback for adding a new item
    const onNewItem = useCallback(
        (newItem) => {
            if (items.length >= maxItems) {
                alert('You cannot add more than 5 items.');
                return; // Do nothing if the limit is reached
            }
            setItems([...items, newItem]);
        },
        [items], // Recreate callback when items change
    );

    // Callback for updating an item
    const onItemUpdate = useCallback(
        (item) => {
            const index = items.findIndex((i) => i.id === item.id);
            setItems([
                ...items.slice(0, index),
                item,
                ...items.slice(index + 1),
            ]);
        },
        [items], // Recreate callback when items change
    );

    // Callback for removing an item
    const onItemRemoval = useCallback(
        (item) => {
            const index = items.findIndex((i) => i.id === item.id);
            setItems([...items.slice(0, index), ...items.slice(index + 1)]);
        },
        [items], // Recreate callback when items change
    );

    // If items are not loaded, show loading message
    if (items === null) return 'Loading...';

    return (
        <>
            {/* Add Item Form */}
            <AddItemForm onNewItem={onNewItem} disabled={items.length >= maxItems} />

            {/* Display message when no items are present */}
            {items.length === 0 && (
                <p className="text-center">No items yet! Add one above!</p>
            )}

            {/* List of items */}
            {items.map((item) => (
                <ItemDisplay
                    key={item.id}
                    item={item}
                    onItemUpdate={onItemUpdate}
                    onItemRemoval={onItemRemoval}
                />
            ))}

            {/* Display alert when there are 5 items */}
            {items.length >= maxItems && (
                <p className="text-center text-danger">
                    You have reached the maximum number of items (5).
                </p>
            )}
        </>
    );
}