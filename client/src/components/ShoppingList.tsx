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
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Shopping Items
      </h3>
      <div className="flex-row my-4">
        {shoppingItems &&
          shoppingItems.map((shoppingItems) => (
            <div key={shoppingItems._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">{shoppingItems.title}</h5>
                <p className="card-body">Category: {shoppingItems.category}</p>
                <p className="card-body">Description: {shoppingItems.description}</p>
                <p className="card-body">Price: {shoppingItems.price}</p>
                <p className="card-body">Price: {shoppingItems.image}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ShoppingList;
