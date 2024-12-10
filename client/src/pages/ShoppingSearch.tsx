import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveItem, searchFakeApiProducts } from '../utils/API';
import { saveItemIds, getSavedItemIds } from '../utils/localStorage';
import type { Item} from '../models/Item';
import type { FakeAPIItem } from '../models/FakeApiProducts';

const ShoppingSearch = () => {
// create state for holding returned google api data
const [searchedItems, setSearchedItems] = useState<Item[]>([]);
// create state for holding our search field data
const [searchInput, setSearchInput] = useState('');

// create state to hold saved itemId values
const [savedItemIds, setSavedItemIds] = useState(getSavedItemIds());

// set up useEffect hook to save `saveditemIds` list to localStorage on component unmount
// learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
// useEffect(() => {
//   return () => saveItemIds(savedItemIds);
// });

// create method to search for items and set state on form submit
const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!searchInput) {
    return false;
  }

  try {
    const response = await searchFakeApiProducts(searchInput);

    if (!response.ok) {
      throw new Error('something went wrong!');
    }
    console.log(response);

    const items = await response.json();

    const itemData = items.map((item: FakeAPIItem) => ({
      itemId: item.id,
      price: item.volumeInfo.price || ['No to display'],
      title: item.volumeInfo.title,
      description: item.volumeInfo.description,
      image: item.volumeInfo.imageLinks?.thumbnail || '',
    }));
    console.log(itemData);
    setSearchedItems(itemData);
    setSearchInput('');
  } catch (err) {
    console.error(err);
  }
};

// create function to handle saving a item to our database
const handleSaveitem = async (itemId: string) => {
  // find the item in `searcheditems` state by the matching id
  const itemToSave: Item = searchedItems.find((item) => item.itemId === itemId)!;

  // get token
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return false;
  }

  try {
    const response = await saveItem(itemToSave, token);

    if (!response.ok) {
      throw new Error('something went wrong!');
    }

    // if item successfully saves to user's account, save item id to state
    setSavedItemIds([...savedItemIds, itemToSave.itemId]);
  } catch (err) {
    console.error(err);
  }
};

return (
  <>
    <div className="text-light bg-dark p-5">
      <Container>
        <h1>What am I in the mood for...</h1>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={12} md={8}>
              <Form.Control
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type='text'
                size='lg'
                placeholder='Search for a item'
              />
            </Col>
            <Col xs={12} md={4}>
              <Button type='submit' variant='success' size='lg'>
                Search Away
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>

    <Container>
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
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedItemIds?.some((saveditemId: string) => saveditemId === item.itemId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveitem(item.itemId)}>
                      {savedItemIds?.some((saveditemId: string) => saveditemId === item.itemId)
                        ? 'This item has already been saved!'
                        : 'Save this item!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  </>
);
};
export default ShoppingSearch;