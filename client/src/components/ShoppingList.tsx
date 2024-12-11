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
          shoppingItems.map((item) => (
            <div key={shoppingItems._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">{item.title}</h5>
                <p className="card-body">Category: {item.category}</p>
                <p className="card-body">Description: {item.description}</p>
                <p className="card-body">Price: {item.price}</p>
                <p className="card-body">Image: {item.image}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ShoppingList;
