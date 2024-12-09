export const getSavedItemIds = () => {
  const savedItemIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_items')!)
    : [];

  return savedItemIds;
};

export const saveItemIds = (itemIdArr: string[]) => {
  if (itemIdArr.length) {
    localStorage.setItem('saved_items', JSON.stringify(itemIdArr));
  } else {
    localStorage.removeItem('saved_items');
  }
};

export const removeItemId = (bookId: string) => {
  const savedItems = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_items')!)
    : null;

  if (!savedItemIds) {
    return false;
  }

  const updatedSavedBookIds = savedItemIds?.filter((savedItemId: string) => savedItemId !== itemId);
  localStorage.setItem('saved_items', JSON.stringify(updatedSavedItemIds));

  return true;
};
