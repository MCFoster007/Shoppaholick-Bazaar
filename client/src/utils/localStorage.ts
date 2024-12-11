// import SavedItems from "./pages/SavedItems";

export const getSavedItemIds = () => {
  const savedItemIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_items')!)
    : [];

  return savedItemIds;
};

export const savedItemIds = (itemIdArr: string[]) => {
  if (itemIdArr.length) {
    localStorage.setItem('saved_items', JSON.stringify(itemIdArr));
  } else {
    localStorage.removeItem('saved_items');
  }
};

export const removeItemId = (itemId: string) => {
  const SavedItems = localStorage.getItem('saved_items')
    ? JSON.parse(localStorage.getItem('saved_items')!)
    : null;

  if (!getSavedItemIds) {
    return false;
  }

  const updatedSavedItemIds = SavedItems?.filter((savedItemId: string) => savedItemId !== itemId);
  localStorage.setItem('saved_items', JSON.stringify(updatedSavedItemIds));

  return true;
};
