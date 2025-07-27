const fs = require("fs");
const vm = require("vm");
const gameDataScript = fs.readFileSync("game-data.js", "utf8");
const scriptScript = fs.readFileSync("script.js", "utf8");
const combinedScript = gameDataScript + "\n" + scriptScript;

// Mock DOM elements
const gameArea = { querySelectorAll: () => [], appendChild: () => {}, addEventListener: () => {} };
const gameImage = { addEventListener: () => {}, style: {} };
const messageArea = { textContent: '' };
const inventoryList = { getElementsByTagName: () => [], innerHTML: '', appendChild: () => {} };
const restartButton = { style: {}, addEventListener: () => {} };
const combineButton = { style: {}, addEventListener: () => {} };
const lookAtButton = { classList: { remove: () => {}, add: () => {} }, addEventListener: () => {} };
const useButton = { classList: { remove: () => {}, add: () => {} }, addEventListener: () => {} };
const document = {
    getElementById: (id) => {
        if (id === "gameArea") return gameArea;
        if (id === "gameImage") return gameImage;
        if (id === "messageArea") return messageArea;
        if (id === "inventoryList") return inventoryList;
        if (id === "restartButton") return restartButton;
        if (id === "combineButton") return combineButton;
        if (id === "lookAtButton") return lookAtButton;
        if (id === "useButton") return useButton;
    },
    addEventListener: () => {},
    createElement: () => ({
        classList: { add: () => {} },
        dataset: {},
        style: {},
        addEventListener: () => {},
        appendChild: () => {}
    })
};

const context = {
    gameArea,
    gameImage,
    messageArea,
    inventoryList,
    restartButton,
    combineButton,
    lookAtButton,
    useButton,
    document,
    gameState: {},
    console,
    setTimeout: (cb) => cb(), // Run setTimeout callbacks immediately
    Image: class {},
    window: {
        addEventListener: () => {}
    }
};

vm.createContext(context);
vm.runInContext(combinedScript, context);
const { initializeGame, addItemToInventory, removeItemFromInventory, toggleCombinationMode, attemptCombination, interactiveObjects, gameState, renderInventory, updateHotspotsForCurrentScene, renderMessage } = context;

initializeGame();
addItemToInventory("Stick");
addItemToInventory("Cloth");
addItemToInventory("Oil");
toggleCombinationMode();
gameState.selectedForCombination = context.gameState.inventory.slice();
attemptCombination();
console.log(JSON.stringify(context.gameState.inventory));

context.gameState.selectedItemForUse = context.gameState.inventory[0];
interactiveObjects.inspect_dark_area_storage.handler();
removeItemFromInventory(context.gameState.selectedItemForUse);
console.log(JSON.stringify(context.gameState.inventory));

context.gameState.selectedItemForUse = context.gameState.inventory[0];
interactiveObjects.inspect_dark_area_storage.handler();
removeItemFromInventory(context.gameState.selectedItemForUse);
console.log(JSON.stringify(context.gameState.inventory));

context.gameState.selectedItemForUse = context.gameState.inventory[0];
interactiveObjects.inspect_dark_area_storage.handler();
removeItemFromInventory(context.gameState.selectedItemForUse);
console.log(JSON.stringify(context.gameState.inventory));
