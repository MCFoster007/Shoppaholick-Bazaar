import { useQuery } from '@apollo/client';

import ShoppingList from '../components/ShoppingList.tsx';

import { QUERY_ITEMS } from '../utils/queries.ts';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ITEMS);
  const shoppingItems = data?.shoppingItems || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ShoppingList/>
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ShoppingList
              shoppingItems={shoppingItems}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
