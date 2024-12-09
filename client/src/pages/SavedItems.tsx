import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import { getMe, deleteItem } from '../utils/API';
import Auth from '../utils/auth';
import { removeItemId } from '../utils/localStorage';
import type { User } from '../models/User';

const SavedItems = () => {
  const [userData, setUserData] = useState<User>({
    username: '',
    email: '',
    password: '',
    savedItems: [],
  });

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteItem = async (itemId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteItem(itemId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove items id from localStorage
      removeItemId(itemId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved items!</h1>
          ) : (
            <h1>Viewing saved items!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedItems.length
            ? `Viewing ${userData.savedItems.length} saved ${
                userData.savedItems.length === 1 ? 'item' : 'items'
              }:`
            : 'You have no saved items!'}
        </h2>
        <Row>
          {userData.savedItems.map((item) => {
            return (
              <Col md='4'>
                <Card key={item.itemId} border='dark'>
                  {item.image ? (
                    <Card.Img
                      src={item.image}
                      alt={`The cover for ${item.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <p className='small'>Authors: {item.authors}</p>
                    <Card.Text>{item.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteItem(item.itemId)}
                    >
                      Delete this Item!
                    </Button>
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

export default SavedItems;
