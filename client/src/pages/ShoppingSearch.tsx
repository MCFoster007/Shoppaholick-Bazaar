import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

// import AuthService from '../utils/auth.js';
import DropDownCategory from '../components/Dropdowncategory.tsx';

// import { saveItemIds, getSavedItemIds } from '../utils/localStorage';
import type { Item} from '../models/Item';
// import type { FakeAPIItem } from '../models/FakeApiProducts';

const ShoppingSearch = () => {
const [searchedItems, setSearchedItems] = useState<Item[]>([]);
const [selectedCategory, setSelectedCategory] = useState('');


// create method to search for items and set state on form submit
const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!selectedCategory) {
    alert('Please select a category!');
    return;
  }

  try {
    const apiUrl = `https://fakestoreapi.com/products/category/${selectedCategory}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('something went wrong!');
    }
    console.log(response);

    const items = await response.json();

    setSearchedItems(items);
  } catch (err) {
    console.error(err);
  }
};

return (
  <>
    <div className="Category">
      <Container>
      <h2 className="moving-text">What am I in the mood for...</h2>
        <DropDownCategory onSelectCategory={(category) => setSelectedCategory(category)}/>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={12} md={4}>
              <Button className="Searchbutton" type='submit' variant='success' size='lg'>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
    <div>
    <Container className="ShoppingItemsList">
      <h2 className='pt-5'>
        {searchedItems.length
          ? `Viewing ${searchedItems.length} results:`
          : 'Search for a item to begin'}
      </h2>
      <Row>
        {searchedItems.map((item) => {
          return (
            <Col md="4" key={item.itemId}>
              <Card border='dark'>
                {item.image ? (
                  <Card.Img src={item.image} alt={`The cover for ${item.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <p className='small'>Price: {item.price}</p>
                  <Card.Text>{item.description}</Card.Text>
                  {/* {Auth.loggedIn() && (
                    <Button
                      disabled={savedItemIds?.some((saveditemId: string) => saveditemId === item.itemId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveitem(item.itemId)}>
                      {savedItemIds?.some((saveditemId: string) => saveditemId === item.itemId)
                        ? 'This item has already been saved!'
                        : 'Save this item!'}
                    </Button> */}
                  {/* )} */}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
    </div>
  </>
);
};
export default ShoppingSearch;