import { useQuery } from '@apollo/client';

import ShoppingList from '../components/ShoppingList.tsx';

import { QUERY_ITEMS } from '../utils/queries.ts';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ITEMS);
  const shoppingItems = data?.shoppingItems || [];

  return (
    <main>
      <div>
        <div>
        <h4 className="card-header">Shopping List</h4>
          <ShoppingList/>
        </div>
        <div>
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
