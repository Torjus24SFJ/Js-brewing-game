import { ingredients } from './ingredients.js';

document.getElementById("addHerbs").addEventListener("click", () => addIngredient("herbs"));
document.getElementById("addBerries").addEventListener("click", () => addIngredient("berries"));
document.getElementById("addMushrooms").addEventListener("click", () => addIngredient("mushrooms"));
document.getElementById("addWater").addEventListener("click", () => addIngredient("water"));
document.getElementById("addFlowers").addEventListener("click", () => addIngredient("flowers"));
document.getElementById("brew-potion").addEventListener("click", checkPotion);
document.getElementById("reset").addEventListener("click", reset);

const potionIngredients = {};

const healingPotion = {
  herbs: 2,
  berries: 1,
  mushrooms: 1
}

function showMessage(message){
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
  messageElement.classList.add("show");

  setTimeout(() => {
    messageElement.classList.remove("show");
  },3000)
}

function addIngredient(ingredientKey) {
  const ingredient = ingredients[ingredientKey];
  if(ingredient){
    potionIngredients[ingredientKey] = (potionIngredients[ingredientKey] || 0) + 1;
    console.log(`Adding: ${ingredient.ingredientName}`);
    console.log(`Current ingredients:`, potionIngredients);
    showMessage(`You added ${ingredient.ingredientName}!`);
  }
  else 
  {
    console.log("Error");
  }
}

function isPotionMatch(current, recipe){
  for (const key in recipe) {
    if (current[key] !== recipe[key]) {
      return false;
    }
  }
  for (const key in current) {
    if (!recipe[key]) {
      return false;
    }
  }
  return true;
}

function potionType() {
  if (isPotionMatch(potionIngredients, healingPotion)) {
    return "Healing Potion";
  } else if (
    Object.keys(potionIngredients).every(
      (key) => key === "water" && potionIngredients[key] > 0
    )
  ) {
    return "Just add water. Wait, you did! Here's your potion: Simply Water!";
  } else if (
    Object.keys(potionIngredients).every(
      (key) => key === "flowers" && potionIngredients[key] > 0
    )
  ) {
    return "You have made Floral Essence! I hope you're not allergic to bees.";
  } else {
    return "Uh oh. This potion seems... a little suspicious. I wouldn't drink it if I were you.";
  }
}

let canBrew = true;

function checkPotion() {
  if (!canBrew) {
    console.log("You cannot brew another potion until you reset!");
    return;
  }

  console.log(`Brewing potion with:`, potionIngredients);
  const potion = potionType();
  console.log(`Potion type: ${potion}`);
  document.getElementById("potionType").textContent = potion;

  if (potion === "Healing Potion") {
    console.log("You successfully brewed a Healing Potion!");
    canBrew = false;
  }
}

function reset() {
  for (const key in potionIngredients) {
    delete potionIngredients[key]; // Clear all ingredients
  }
  canBrew = true;
  document.getElementById("potionType").textContent = "";
  console.log("Cauldron emptied. You can brew again.");
}







//! Old code using array to store ingredients
// const potionIngredients = [];
// const healingPotion = ["herbs", "herbs", "berries", "mushrooms"];

// function showMessage(message)
// {
//     const messageElement = document.getElementById("message");
//     messageElement.textContent = message;
    
//     messageElement.classList.add("show");

//     setTimeout(() => {
//         messageElement.classList.remove("show");
//     }, 3000);
// }

// function addIngredient(ingredients) {
//   potionIngredients.push(ingredients);
//   console.log(`Adding: ${ingredients}`);
//   console.log(`Current ingredients: ${potionIngredients}`);

//   showMessage(`You added ${ingredients}!`)
// }

// function isEqual(arr1, arr2) {
//   const sortedArr1 = [...arr1].sort();
//   const sortedArr2 = [...arr2].sort();

//   if (sortedArr1.length !== sortedArr2.length) return false;

//   for (let i = 0; i < sortedArr1.length; i++) {
//     if (sortedArr1[i] !== sortedArr2[i]) return false;
//   }
//   return true;
// }

// function potionType() {
//   if (isEqual(potionIngredients, healingPotion)) {
//     return "Healing Potion";
//   } else if (potionIngredients.every((ingredient) => ingredient === "water")) {
//     return "Just add water. Wait, you did! Here's your potion: Simply Water!";
//   } else if (
//     potionIngredients.every((ingredient) => ingredient === "flowers")
//   ) {
//     return "You have made Floral Essence! I hope you're not allergic to bees.";
//   } else {
//     return "Uh oh. This potion seems... a little suspicious. I wouldn't drink it if I were you.";
//   }
// }

// let canBrew = true;

// function checkPotion() {
//   if (!canBrew) {
//     console.log("You cannot brew another potion until you reset!");
//     return;
//   }

//   console.log(`Brewing potion with: ${potionIngredients.join(" ")}`);
//   const potion = potionType();
//   console.log(`Potion type: ${potion}`);
//   document.getElementById("potionType").textContent = potion;

//   if (potion === "Healing Potion") {
//     console.log("You successfully brewed a Healing Potion!");
//     canBrew = false;
//   }
// }

// function reset() {
//   potionIngredients.splice(0);
//   canBrew = true;
//   document.getElementById("potionType").textContent = "";
//   console.log("Cauldron emptied. You can brew again.");
// }
