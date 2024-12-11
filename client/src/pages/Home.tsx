import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Container,
  Col,
  Card,
  Row,
  Button
} from 'react-bootstrap';
import { FormField, Form } from 'semantic-ui-react';
// import AuthService from '../utils/auth.js';
import DropDownCategory from '../components/Dropdowncategory.tsx';
// import { saveItemIds, getSavedItemIds } from '../utils/localStorage';
import type { Item } from '../models/Item.ts';
// import type { FakeAPIItem } from '../models/FakeApiProducts';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth.js';
import { SAVE_ITEM } from '../utils/mutations.ts';
import { useMutation } from '@apollo/client';

const Home = () => {
const [searchedItems, setSearchedItems] = useState<Item[]>([]);
const [selectedCategory, setSelectedCategory] = useState('');
const navigate = useNavigate();
const [saveItem] = useMutation(SAVE_ITEM);


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

const handleSaveitem = async (item: Item) => {
    const token = AuthService.loggedIn() ? AuthService.getToken(): null;

    if (!token) {
        alert('You must be signed in the save items.');
        navigate('/login');
        return;
    }

    const input = {
      title: item.title,
      price: item.price.toString(),
      description: item.description,
      category: item.category,
      image: item.image,
    };

    console.log('Formatted input:', input);

    try {
      const { data } = await saveItem({
        variables: { input },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      console.log('Saved item response:', data);
      alert('Item saved successfully!');
    } catch (err) {
      console.error('Error saving item:', err);
      alert('Failed to save item. Please try again.');
    }
};

return (
  <>
    <div className="Category">
    <h4 className="card-header">Shopping Search</h4>
    <Form className="ShoppingCategoryBox" onSubmit={handleFormSubmit}>
      <Container>
      <h2 className="moving-text">What am I in the mood for...</h2>
        <DropDownCategory onSelectCategory={(category) => setSelectedCategory(category)}/>
        <FormField onSubmit={handleFormSubmit}>
            <button className="Searchbutton" type='submit'>
                Search
            </button>
        </FormField>
      </Container>
      </Form>
    </div>
    <div>
    <FormField>
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
                <Card.Body  className ="ItemCard">
                  <Card.Title>{item.title}</Card.Title>
                  <p className='small'>Price: {item.price}</p>
                  <Card.Text>{item.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleSaveitem(item)}
                >
                    Save Item
                </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
    </FormField>
    </div>
  </>
);
};
export default Home;