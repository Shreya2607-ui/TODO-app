import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { TodoListCard } from './components/TodoListCard';
import { Greeting } from './components/Greeting';

function App() {
    // State to track the list of items
    const [items, setItems] = useState([]);

    // Function to handle adding a new item
    const handleNewItem = (newItem) => {
        if (items.length >= 5) {
            alert("You cannot add more than 5 items.");
            return;  // Do nothing if the limit is reached
        }
        setItems((prevItems) => [...prevItems, newItem]);
    };

    return (
        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <Greeting />
                    <TodoListCard items={items} onNewItem={handleNewItem} />
                </Col>
            </Row>
        </Container>
    );
}

export default App;