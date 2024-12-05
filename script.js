const potionIngredients = [];
const healingPotion = ["herbs", "herbs", "berries", "mushrooms"];

function showMessage(message)
{
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    
    messageElement.classList.add("show");

    setTimeout(() => {
        messageElement.classList.remove("show");
    }, 3000);
}

function addIngredient(ingredients) {
  potionIngredients.push(ingredients);
  console.log(`Adding: ${ingredients}`);
  console.log(`Current ingredients: ${potionIngredients}`);

  showMessage(`You added ${ingredients}!`)
}

function isEqual(arr1, arr2) {
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();

  if (sortedArr1.length !== sortedArr2.length) return false;

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) return false;
  }
  return true;
}

function potionType() {
  if (isEqual(potionIngredients, healingPotion)) {
    return "Healing Potion";
  } else if (potionIngredients.every((ingredient) => ingredient === "water")) {
    return "Just add water. Wait, you did! Here's your potion: Simply Water!";
  } else if (
    potionIngredients.every((ingredient) => ingredient === "flowers")
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

  console.log(`Brewing potion with: ${potionIngredients.join(" ")}`);
  const potion = potionType();
  console.log(`Potion type: ${potion}`);
  document.getElementById("potionType").textContent = potion;

  if (potion === "Healing Potion") {
    console.log("You successfully brewed a Healing Potion!");
    canBrew = false;
  }
}

function reset() {
  potionIngredients.splice(0);
  canBrew = true;
  document.getElementById("potionType").textContent = "";
  console.log("Cauldron emptied. You can brew again.");
}
