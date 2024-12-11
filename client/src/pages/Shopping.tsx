import { useQuery } from '@apollo/client';

import ShoppingList from '../components/ShoppingList.tsx';

import { QUERY_ITEMS } from '../utils/queries.ts';

const Shopping = () => {
  const { loading, data } = useQuery(QUERY_ITEMS);
  const savedItems = data?.savedItems || [];

  // return (
  //   <main>
  //     <div>
  //       <div>
  //       <h4 className="card-header">Shopping List</h4>
  //         <ShoppingList/>
  //       </div>
  //       <div>
  //         {loading ? (
  //           <div>Loading...</div>
  //         ) : (
  //           <ShoppingList
  //             shoppingItems={shoppingItems}
  //           />
  //         )}
  //       </div>
  //     </div>
  //   </main>
  // );

  return (
    <main>
      <div>
        <h4 className="card-header">Shopping List</h4>
        {loading ? (
          <div>Loading...</div>
        ) : savedItems.length > 0 ? (
          <ShoppingList shoppingItems={savedItems} />
        ) : (
          <h3>No saved items yet!</h3>
        )}
      </div>
    </main>
  );
};

export default Shopping;
