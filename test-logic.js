const assert = require('assert');

// Mock game data
const combinationRecipes = {
    "torch": { "ingredients": ["stick", "cloth", "oil"], "result": { "name": "Torch", "uses": 3 } }
};

const itemDescriptions = {
    "Torch": "A stick with oil-soaked cloth wrapped around one end. Ready to be lit.",
};

// Functions to test
let gameState;

function initializeGame() {
    gameState = {
        inventory: [],
        selectedForCombination: [],
        toggledHotspots: {},
        flags: {
            tortureSequenceActive: false,
            tortureSequenceFinished: false,
            playerIsHiding: false,
        },
    };
}

function addItemToInventory(item) {
    const existingItem = gameState.inventory.find(i => (i.name || i) === (item.name || item));
    if (existingItem && existingItem.uses) {
        existingItem.uses += item.uses || 0;
    } else if (!existingItem) {
        gameState.inventory.push(item);
    }
}

function removeItemFromInventory(item) {
    const itemToRemove = typeof item === 'string' ? gameState.inventory.find(i => (i.name || i) === item) : item;

    if (itemToRemove && itemToRemove.uses) {
        itemToRemove.uses--;
        if (itemToRemove.uses <= 0) {
            gameState.inventory = gameState.inventory.filter(i => i !== itemToRemove);
        }
    } else {
         gameState.inventory = gameState.inventory.filter(i => i !== itemToRemove);
    }
}

function attemptCombination() {
    let combinationMade = false;
    for (const recipeName in combinationRecipes) {
        const recipe = combinationRecipes[recipeName];
        const result = recipe.result;

        const selectedLowercase = gameState.selectedForCombination.map(item => (item.name || item).toLowerCase());
        const ingredientsLowercase = recipe.ingredients.map(item => item.toLowerCase());

        if (ingredientsLowercase.length === selectedLowercase.length &&
            ingredientsLowercase.every(ingLC => selectedLowercase.includes(ingLC)) &&
            selectedLowercase.every(selIngLC => ingredientsLowercase.includes(selIngLC))) {

            gameState.selectedForCombination.forEach(ingredientToRemove => {
                removeItemFromInventory(ingredientToRemove);
            });
            addItemToInventory(recipe.result);

            combinationMade = true;
            break;
        }
    }
    return combinationMade;
}

function shouldDisplayHotspot(objectId, hsData) {
    if (hsData.initiallyHidden) {
        const visibilityFlag = `hotspot_${gameState.currentScene}_${hsData.id}_visible`;
        if (hsData.toggleable === 'once' && gameState.toggledHotspots[hsData.id]) {
            return false;
        }
        if (typeof hsData.toggleable === 'number' && (gameState.toggledHotspots[hsData.id] || 0) >= hsData.toggleable) {
            return false;
        }
        return !!gameState.flags[visibilityFlag];
    }
    if (gameState.currentScene === 'Torture_chamber') {
        if (gameState.flags.tortureSequenceActive) {
            return objectId === 'inspect_chest';
        }
        if (gameState.flags.tortureSequenceFinished) {
            return objectId !== 'activate_torture_device';
        }
    }
    return true;
}

// Tests
try {
    // Test 1: Crafting a torch
    initializeGame();
    addItemToInventory("Stick");
    addItemToInventory("Cloth");
    addItemToInventory("Oil");
    gameState.selectedForCombination = ["Stick", "Cloth", "Oil"];
    const combinationResult = attemptCombination();
    assert.strictEqual(combinationResult, true, 'Test 1 Failed: Combination should be successful');
    assert.strictEqual(gameState.inventory.length, 1, 'Test 1 Failed: Inventory should have 1 item');
    assert.deepStrictEqual(gameState.inventory[0], { name: 'Torch', uses: 3 }, 'Test 1 Failed: Torch object is incorrect');
    console.log('Test 1 Passed: Torch crafted successfully');

    // Test 2: Using the torch
    removeItemFromInventory(gameState.inventory[0]);
    assert.strictEqual(gameState.inventory[0].uses, 2, 'Test 2 Failed: Torch should have 2 uses left');
    console.log('Test 2 Passed: Torch uses decremented');

    // Test 3: Using the torch again
    removeItemFromInventory(gameState.inventory[0]);
    assert.strictEqual(gameState.inventory[0].uses, 1, 'Test 3 Failed: Torch should have 1 use left');
    console.log('Test 3 Passed: Torch uses decremented again');

    // Test 4: Using the torch for the last time
    removeItemFromInventory(gameState.inventory[0]);
    assert.strictEqual(gameState.inventory.length, 0, 'Test 4 Failed: Inventory should be empty');
    console.log('Test 4 Passed: Torch removed from inventory');

    // Test 5: Toggleable hotspot
    initializeGame();
    gameState.currentScene = 'Storage';
    gameState.flags.hotspot_Storage_chest_key_visible = true;
    const hsData = { id: 'chest_key', initiallyHidden: true, toggleable: 2 };

    // First appearance
    assert.strictEqual(shouldDisplayHotspot('pick_upchest_chest_key', hsData), true, 'Test 5.1 Failed: Hotspot should be visible');

    // First interaction
    gameState.toggledHotspots['chest_key'] = (gameState.toggledHotspots['chest_key'] || 0) + 1;
    assert.strictEqual(shouldDisplayHotspot('pick_upchest_chest_key', hsData), true, 'Test 5.2 Failed: Hotspot should still be visible');

    // Second interaction
    gameState.toggledHotspots['chest_key'] = (gameState.toggledHotspots['chest_key'] || 0) + 1;
    assert.strictEqual(shouldDisplayHotspot('pick_upchest_chest_key', hsData), false, 'Test 5.3 Failed: Hotspot should be hidden');
    console.log('Test 5 Passed: Toggleable hotspot logic is correct');

    // Test 6: Torture chamber event
    initializeGame();
    gameState.currentScene = 'Torture_chamber';
    assert.strictEqual(shouldDisplayHotspot('inspect_chest', {}), true, 'Test 6.1 Failed: Chest should be visible initially');
    assert.strictEqual(shouldDisplayHotspot('activate_torture_device', {}), true, 'Test 6.2 Failed: Torture device should be visible initially');

    gameState.flags.tortureSequenceActive = true;
    assert.strictEqual(shouldDisplayHotspot('inspect_chest', {}), true, 'Test 6.3 Failed: Chest should be visible during sequence');
    assert.strictEqual(shouldDisplayHotspot('activate_torture_device', {}), false, 'Test 6.4 Failed: Torture device should be hidden during sequence');

    gameState.flags.tortureSequenceActive = false;
    gameState.flags.tortureSequenceFinished = true;
    assert.strictEqual(shouldDisplayHotspot('inspect_chest', {}), true, 'Test 6.5 Failed: Chest should be visible after sequence');
    assert.strictEqual(shouldDisplayHotspot('activate_torture_device', {}), false, 'Test 6.6 Failed: Torture device should be hidden after sequence');
    console.log('Test 6 Passed: Torture chamber event logic is correct');

    console.log('All tests passed!');
} catch (error) {
    console.error(error.message);
}
