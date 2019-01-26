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
      {
        id: 0,
        name: "Steak",
        calories: 1000
      },
      {
        id: 1,
        name: "Chicken",
        calories: 700
      },
      {
        id: 2,
        name: " Eggs",
        calories: 300
      }
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
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories"
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
    }

    e.preventDefault();
  };
  // return is public methods
  return {
    init: function() {
      console.log("Init App...");
      //   fetching food items from data state
      const items = ItemCtrl.getItems();

      //   populate lists with food items
      UICtrl.populateItemList(items);
      console.log(items);

      //   LOAD EVENT LISTENERS
      loadEventListeners();
    }
  };
  //   console.log(ItemCtrl.logData());
})(ItemCtrl, UICtrl);

// INIT APP
App.init();
