import {
  Container,
  Col,
  Card,
  Row,
  Button
} from 'react-bootstrap';

interface ShoppingItem {
  _id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

interface ShoppingListProps {
  shoppingItems?: ShoppingItem[];
}

const ShoppingList: React.FC<ShoppingListProps> = ({ shoppingItems = [] }) => {
  console.log(shoppingItems);
  if (!shoppingItems.length) {
    return <h3>No Shopping Items Yet</h3>;
  }

  return (
    <>
      <Container>
      <div className="ui form">
        {shoppingItems &&
          shoppingItems.map((item) => (
            <div key={shoppingItems._id} className="shoppingItemsContainer">
              <div>
              <Card border='dark'>
                <h2 className="card-header">{item.title}</h2>
                <p className="card-body">Category: {item.category}</p>
                <p className="card-body">Description: {item.description}</p>
                <p className="card-body">Price: {item.price}</p>
                <Card.Img src={item.image}alt={`The cover for ${item.title}`} variant='top' height='300px' width='200px'/>
                </Card>
              </div>
            </div>
          ))}
      </div>
      </Container>
    </>
  );
};

export default ShoppingList;
