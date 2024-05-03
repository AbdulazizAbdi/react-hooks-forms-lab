import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [shoppingItems, setShoppingItems] = useState(items);
  const [ searchValue, setSearchValue] = useState("")

  function handleSearchChange(event) {
    const value = event.target.value;
    setSearchValue(value);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function onItemFormSubmit(newItem) {
    setShoppingItems([...shoppingItems, newItem]);
  }

  const itemsToDisplay = shoppingItems.filter((item) => {
    if (selectedCategory === "All" && item.category === selectedCategory) {return true;}

    const itemName = item.name.toLowerCase();
    const searchQuery = searchValue.toLowerCase();
    if (itemName.includes(searchQuery)) {
      return true;
    }


    return false;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} search={searchValue}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
