import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export function AddItemForm({ onNewItem, onNewCategory, currentItemsCount }) {
    // State for the first form (Add Item)
    const [newItem, setNewItem] = useState('');
    const [submittingItem, setSubmittingItem] = useState(false);

    // State for the second form (Add Category)
    const [newCategory, setNewCategory] = useState('');
    const [submittingCategory, setSubmittingCategory] = useState(false);

    // Maximum allowed items
    const maxItems = 5;

    // Function to submit the item form
    const submitNewItem = (e) => {
        e.preventDefault();

        // Check if the current number of items has reached the limit
        if (currentItemsCount >= maxItems) {
            alert("You cannot add more than 5 items.");
            return; // Prevent form submission if limit is reached
        }

        setSubmittingItem(true);

        const options = {
            method: 'POST',
            body: JSON.stringify({ name: newItem }),
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/items', options)
            .then((r) => r.json())
            .then((item) => {
                onNewItem(item);
                setSubmittingItem(false);
                setNewItem(''); // Clear input field
            });
    };

    // Function to submit the category form
    const submitNewCategory = (e) => {
        e.preventDefault();
        setSubmittingCategory(true);

        const options = {
            method: 'POST',
            body: JSON.stringify({ category: newCategory }),
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/categories', options)
            .then((r) => r.json())
            .then((category) => {
                onNewCategory(category);
                setSubmittingCategory(false);
                setNewCategory(''); // Clear input field
            });
    };

    return (
        <div>
            {/* Form 1 - Add Item */}
            <Form onSubmit={submitNewItem}>
                <InputGroup className="mb-3">
                    <Form.Control
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        type="text"
                        placeholder="Enter item name"
                        aria-label="enter item"
                    />
                    <Button
                        type="submit"
                        variant="success"
                        disabled={!newItem.length || submittingItem}
                    >
                        {submittingItem ? 'Adding...' : 'Add Item'}
                    </Button>
                </InputGroup>
            </Form>

            {/* Form 2 - Add Category */}
            <Form onSubmit={submitNewCategory}>
                <InputGroup className="mb-3">
                    <Form.Control
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        type="text"
                        placeholder="Enter category name"
                        aria-label="enter category"
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={!newCategory.length || submittingCategory}
                    >
                        {submittingCategory ? 'Adding...' : 'Add Category'}
                    </Button>
                </InputGroup>
            </Form>
        </div>
    );
}

AddItemForm.propTypes = {
    onNewItem: PropTypes.func.isRequired,
    onNewCategory: PropTypes.func.isRequired,
    currentItemsCount: PropTypes.number.isRequired, // Total items currently stored
};