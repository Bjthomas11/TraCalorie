// Some JS Patterns

// STORAGE CONTROLLER

// ITEM CONTROLLER
// IFFY FUNCTION (RUNS AUTO)
const ItemCtrl = (function() {
  // ITEM CONSTRUCTOR
  const Item = function(id, name, calories) {
    (this.id = id), (this.name = name), (this.calories = calories);
  };

  // DATA STATE (structure)
  const data = {
    items: [
      //   {
      //     id: 0,
      //     name: "Steak",
      //     calories: 1000
      //   },
      //   {
      //     id: 1,
      //     name: "Chicken",
      //     calories: 700
      //   },
      //   {
      //     id: 2,
      //     name: " Eggs",
      //     calories: 300
      //   }
    ],
    currentItem: null,
    totalCalories: 0
  };

  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      // creating id
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      //   parse calories(string) to number
      calories = parseInt(calories);

      //   creating new food item
      newItem = new Item(ID, name, calories);

      //   adding to Items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id) {
      let found = null;

      // loop through food items
      data.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    getTotalCalories: function() {
      let total = 0;

      //   looping through items array and add calories
      data.items.forEach(function(item) {
        // total = total + item.calories
        total += item.calories;
      });

      //   Setting total calories in data state
      data.totalCalories = total;

      //   return total
      return data.totalCalories;
    },
    logData: function() {
      return data;
    }
  };
})();

// UI CONTROLLER
// IFFY FUNCTION (RUNS AUTO)
const UICtrl = (function() {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories"
  };
  return {
    populateItemList: function(items) {
      let html = "";

      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}">
            <strong>${item.name}:</strong> <i>${item.calories} Calories</i>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil-alt"></i>
            </a>
          </li>`;
      });
      //   inserting list items dynamiclly to the html using html variable
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: function(item) {
      // show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // Creating li element
      const li = document.createElement("li");
      //   add class
      li.className = "collection-item";
      // add id
      li.id = `item=${item.id}`;

      //   adding html
      li.innerHTML = `<strong>${item.name}:</strong> <i>${
        item.calories
      } Calories</i>
    <a href="#" class="secondary-content">
      <i class="edit-item fa fa-pencil-alt"></i>
    </a>`;

      // inserting food item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    getSelectors: function() {
      return UISelectors;
    }
  };
})();

// APP CONTROLLER
// IFFY FUNCTION (RUNS AUTO)
const App = (function(ItemCtrl, UICtrl) {
  // load all event Listeners
  const loadEventListeners = function() {
    //   get UI SELECTORS
    const UISelectors = UICtrl.getSelectors();

    // add food item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    //   edit icon clock event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemUpdateSubmit);
  };

  //   add item submit
  const itemAddSubmit = function(e) {
    console.log("add");
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // checking for name and calorie input
    if (input.name !== "" && input.calories !== "") {
      // adding food item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      //   adding item to UI List
      UICtrl.addListItem(newItem);

      //   get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //   add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      //   clear input fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  //   update item submit
  const itemUpdateSubmit = function(e) {
    if (e.target.classList.contains("edit-item")) {
      // Get list item ID (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      //   Break into an array
      const listIdArray = listId.split("=");

      //   get actual id
      const id = parseInt(listIdArray[1]);

      //   get food item
      const itemToEdit = ItemCtrl.getItemById(id);
      console.log(itemToEdit);
    }
    e.preventDefault();
  };

  // return is public methods
  return {
    init: function() {
      console.log("Init App...");

      //   set inital btn state
      UICtrl.clearEditState();

      //   fetching food items from data state
      const items = ItemCtrl.getItems();

      //   checking id any food items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //   populate lists with food items
        UICtrl.populateItemList(items);
      }

      //   get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //   add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      //   console.log(items);

      //   LOAD EVENT LISTENERS
      loadEventListeners();
    }
  };
  //   console.log(ItemCtrl.logData());
})(ItemCtrl, UICtrl);

// INIT APP
App.init();
