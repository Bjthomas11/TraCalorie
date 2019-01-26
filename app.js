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
    logData: function() {
      return data;
    }
  };
})();

// UI CONTROLLER
// IFFY FUNCTION (RUNS AUTO)
const UICtrl = (function() {
  return {};
})();

// APP CONTROLLER
// IFFY FUNCTION (RUNS AUTO)
const App = (function(ItemCtrl, UICtrl) {
  // return is public methods
  return {
    init: function() {
      console.log("Init App");
    }
  };
  //   console.log(ItemCtrl.logData());
})(ItemCtrl, UICtrl);

// INIT APP
App.init();
