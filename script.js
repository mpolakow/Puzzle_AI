// DOM Elements
        const gameArea = document.getElementById('gameArea');
        const gameImage = document.getElementById('gameImage'); // Main background scene image
        const messageArea = document.getElementById('messageArea');
        const inventoryList = document.getElementById('inventoryList');
        const restartButton = document.getElementById('restartButton');
        const combineButton = document.getElementById('combineButton'); // Add this line
        const lookAtButton = document.getElementById('lookAtButton'); // Added
        const useButton = document.getElementById('useButton'); // Added

        // Game State
        let gameState = {};

// --- Scene Definitions ---
// IMPORTANT: Replace ALL 'https://placehold.co/...' image URLs with your actual, working image paths/URLs.
// To make a hotspot invisible (transparent div), simply OMIT the `imageUrl` property or set it to null/undefined.
// const gameScenes = { ... }; // Moved to game-data.js

// const combinationRecipes = { ... }; // Moved to game-data.js

// --- Item Descriptions (for "look at" action on inventory items) ---
// const itemDescriptions = { ... }; // Moved to game-data.js

        // --- Interactive Object Definitions ---
        // const interactiveObjects = { ... }; // Moved to game-data.js

        // --- Core Game Logic ---
        function initializeGame() {
            gameState = {
                currentScene: "Gate",
                inventory: [],
                flags: {
			MapObtained: false,
			ChainOpened: false,
			keyObtained: false,
			BedPressed: false,
			MechanismSolved: false,
			Torch1: false,
			Torch2: false,
                    //hasExitKey: false,
		    	BedSearch: 0,
			CultistMobAnnoyance: 0,
		    	CultistAnnoyance: 0, // ADDED: To track mood
			tortureSequenceCompleted: false,
		                    },
                toggledHotspots: {},
                isCombining: false,
                selectedForCombination: [],
                currentAction: "use", // Added for new action mode
                selectedItemForUse: null, // Added for using items on hotspots
            };
            changeScene(gameState.currentScene, true);
            renderInventory();
            restartButton.style.display = 'none';
            if (combineButton) combineButton.style.display = 'inline-block';
            updateActionButtonsUI(); // Initialize button states
        }

        // --- UI Update Functions ---
        function updateActionButtonsUI() {
            if (!lookAtButton || !useButton) {
                console.warn("Action buttons not yet available in DOM for UI update.");
                return;
            }
            // Remove 'selected' class from all action buttons
            lookAtButton.classList.remove('selected');
            useButton.classList.remove('selected');
            // Add 'selected' class to the current action button
            if (gameState.currentAction === "look") {
                lookAtButton.classList.add('selected');
            } else if (gameState.currentAction === "use") {
                useButton.classList.add('selected');
            }
            // Future actions can be added here with else if
        }

        function changeScene(sceneId, isInitialLoad = false) {
            const scene = gameScenes[sceneId];
            if (!scene) {
                console.error("Scene not found:", sceneId);
                messageArea.textContent = "Error: Tried to load an invalid scene.";
                return;
            }

            gameState.currentScene = sceneId;

            if (!isInitialLoad && gameImage.src !== scene.imageUrl) {
                gameImage.style.opacity = '0';
                setTimeout(() => {
                    gameImage.src = scene.imageUrl;
                    gameImage.alt = scene.message;
                    gameImage.onload = () => gameImage.style.opacity = '1';
                    gameImage.onerror = () => {
                        console.error("Failed to load scene background:", scene.imageUrl);
                        gameImage.alt = "Error loading scene background.";
                        gameImage.style.opacity = '1';
                    }
                }, 300);
            } else {
                 gameImage.src = scene.imageUrl;
                 gameImage.alt = scene.message;
                 gameImage.style.opacity = '1';
                 gameImage.onerror = () => {
                        console.error("Failed to load scene background:", scene.imageUrl);
                        gameImage.alt = "Error loading scene background.";
                    }
            }

            updateHotspotsForCurrentScene();

            if(isInitialLoad || gameState.message !== scene.message) {
                 gameState.message = scene.message;
            }
            renderMessage();
        }

	function removeAllHotspots() {
            const existingHotspots = gameArea.querySelectorAll('.hotspot');
            existingHotspots.forEach(hs => hs.remove());
	}

        function updateHotspotsForCurrentScene() {
            const scene = gameScenes[gameState.currentScene];
            if (!scene) {
                console.error("updateHotspots: Current scene not found in gameScenes for ID:", gameState.currentScene);
                return;
            }

            const existingHotspots = gameArea.querySelectorAll('.hotspot');
            existingHotspots.forEach(hs => hs.remove());

            scene.hotspots.forEach(hsData => {
                 if (shouldDisplayHotspot(hsData.objectId, hsData)) {

                    let hotspotEl;
                    // *** MODIFIED LOGIC HERE ***
                    // If an imageUrl is provided, create an <img> element.
                    if (hsData.imageUrl) {
                        hotspotEl = document.createElement('img');
                        hotspotEl.src = hsData.imageUrl;
                        hotspotEl.onerror = () => {
                            console.error("Failed to load hotspot image:", hsData.imageUrl);
                            hotspotEl.alt = `Error: ${hsData.id} image not found`;
                        };
                    } else {
                        // If no imageUrl, create a transparent <div> element.
                        hotspotEl = document.createElement('div');
                    }

                    hotspotEl.classList.add('hotspot');
                    hotspotEl.alt = hsData.id || `hotspot-${hsData.objectId}`;
                    hotspotEl.dataset.objectId = hsData.objectId;

                    for (const [key, value] of Object.entries(hsData.style)) {
                        hotspotEl.style[key] = value;
                    }

                    hotspotEl.addEventListener('click', () => {
                        const sceneAtInteractionTime = gameScenes[gameState.currentScene]; // Capture current scene
                        const objectId = hsData.objectId; // Cache objectId
                        const objectLogic = interactiveObjects[objectId];

                        if (gameState.currentAction === "look") {
                            const hotspotName = hsData.id || objectId; // Use hsData.id for a more user-friendly name if available
                            if (objectLogic && objectLogic.lookDescription) {
                                gameState.message = objectLogic.lookDescription;
                            } else {
                                gameState.message = `You look at ${hotspotName.replace(/_/g, ' ')}. It looks interesting.`; // Fallback
                            }
                            renderMessage();
                        } else if (gameState.currentAction === "use") {
                            if (gameState.selectedItemForUse) {
                                const itemUsed = gameState.selectedItemForUse;
                                const itemName = typeof itemUsed === 'object' ? itemUsed.name : itemUsed;
                                const originalMessage = gameState.message;

                                if (objectLogic && typeof objectLogic.handler === 'function') {
                                    objectLogic.handler();
                                }

                                if (objectLogic && objectLogic.requiredItem === itemName) {
                                    removeItemFromInventory(itemUsed);
                                } else if (originalMessage === gameState.message) {
                                    gameState.message = `You can't use the ${itemName} here.`;
                                }

                                gameState.selectedItemForUse = null; // Deselect item after use attempt
                                renderMessage();
                                renderInventory();
                                updateHotspotsForCurrentScene();
                            } else {
                                // Handle direct "use" action on hotspot (no item selected)
                                if (objectLogic && typeof objectLogic.handler === 'function') {
                                    objectLogic.handler();
                                } else {
                                    console.warn("No handler for objectId:", objectId);
                                    gameState.message = `You try to use ${objectId.replace(/_/g, ' ')}, but nothing happens.`;
                                }
                                renderMessage();
                                renderInventory();
                                if (sceneAtInteractionTime === gameScenes[gameState.currentScene]) {
                                    updateHotspotsForCurrentScene();
                                }
                            }
                        } else {
                            console.warn("Unknown action selected:", gameState.currentAction);
                            gameState.message = "You are unsure what to do.";
                            renderMessage();
                        }
                    });
                    gameArea.appendChild(hotspotEl);
                }
            });
        }

        function shouldDisplayHotspot(objectId, hsData) {
            // New logic for initially hidden hotspots
            if (hsData.initiallyHidden) {
                const visibilityFlag = `hotspot_${gameState.currentScene}_${hsData.id}_visible`;
                if (hsData.toggleable === 'once' && gameState.toggledHotspots[hsData.id]) {
                    return false;
                }
                if (typeof hsData.toggleable === 'number' && (gameState.toggledHotspots[hsData.id] || 0) >= hsData.toggleable) {
                    return false;
                }
                return !!gameState.flags[visibilityFlag]; // Show if flag is true, otherwise hide
            }

            // Existing logic for hotspots that disappear after interaction
            // These apply to hotspots that are NOT initiallyHidden
            if (objectId === "inspect_map" && gameState.flags.MapObtained) return false;
            if (objectId === "torture_exit_nomap" && gameState.flags.MapObtained) return false;
            if (objectId === "inspect_chain" && gameState.flags.ChainOpened) return false;
            if (objectId === "pick_chain_key" && gameState.flags.keyObtained && !hsData.initiallyHidden) return false;
            // If pick_upchest_chest_key is NOT initiallyHidden, this rule would apply.
            // Given it's currently set to initiallyHidden: true for testing,
            // its visibility is governed by the block above.
            // Adding !hsData.initiallyHidden to be explicit that this rule is for non-initiallyHidden items or for after they become visible and obtained.
            if (objectId === "pick_upchest_chest_key" && gameState.flags.keyObtained && !hsData.initiallyHidden) return false;
            if (objectId === "pickup_cloth" && gameState.flags.clothCollected) return false;
            if (objectId === "pickup_oil" && gameState.flags.oilCollected) return false;
	    if (gameState.currentScene === 'Torture_chamber' && gameState.flags.tortureSequenceCompleted) {
		if (objectId === 'inspect_chest' || objectId === 'activate_torture_device') {
		    return false;
		}
	    }

            return true; // Default to show if no other rules hide it
        }

        function renderMessage() {
            messageArea.textContent = gameState.message;
            if (gameState.flags.exitDoorUnlocked || gameState.message.includes("Congratulations")) {
                 restartButton.style.display = 'inline-block';
                 if (combineButton) combineButton.style.display = 'none';
            }
        }
        function renderInventory() {
            inventoryList.innerHTML = '';
            if (gameState.inventory.length === 0) {
                const li = document.createElement('li');
                li.textContent = "(Empty)";
                inventoryList.appendChild(li);
            } else {
                gameState.inventory.forEach(item => {
                    const li = document.createElement('li');
                    const itemName = typeof item === 'object' && item.name ? item.name : item;
                    const itemUses = typeof item === 'object' && item.uses ? ` (${item.uses})` : '';
                    li.textContent = `${itemName}${itemUses}`;

                    if (gameState.isCombining) {
                        li.classList.add('selectable-item');
                        if (gameState.selectedForCombination.includes(item)) {
                            li.classList.add('selected-for-combination');
                        }
                        li.addEventListener('click', () => toggleItemSelectionForCombination(item));
                    } else {
                        li.classList.add('selectable-item');
                        if (gameState.currentAction === "use" && gameState.selectedItemForUse === item) {
                            li.classList.add('selected-for-use');
                        }

                        li.addEventListener('click', () => {
                            if (gameState.currentAction === "look") {
                                const description = itemDescriptions[itemName] || `You examine the ${itemName}. It seems like a normal ${itemName}.`;
                                gameState.message = description;
                                if (gameState.selectedItemForUse) {
                                    gameState.selectedItemForUse = null;
                                    renderInventory();
                                }
                                renderMessage();
                            } else if (gameState.currentAction === "use") {
                                if (gameState.selectedItemForUse === item) {
                                    gameState.selectedItemForUse = null;
                                    gameState.message = "Item deselected.";
                                } else {
                                    gameState.selectedItemForUse = item;
                                    gameState.message = `${itemName} selected. Click on something in the scene to use it on, or click the item again to deselect.`;
                                }
                                renderInventory();
                                renderMessage();
                            }
                        });
                    }
                    inventoryList.appendChild(li);
                });
            }
        }

function toggleItemSelectionForCombination(item) {
    if (!gameState.isCombining) {
        return;
    }

    const index = gameState.selectedForCombination.indexOf(item);
    if (index > -1) {
        gameState.selectedForCombination.splice(index, 1);
    } else {
        gameState.selectedForCombination.push(item);
    }

    renderInventory();
    const selectedNames = gameState.selectedForCombination.map(i => i.name || i);
    gameState.message = `Selected for combination: ${selectedNames.join(', ') || 'None'}. Click 'Cancel Combination' to attempt.`;
    renderMessage();
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

function toggleCombinationMode() {
    console.log("toggleCombinationMode called"); // DEBUG
    gameState.isCombining = !gameState.isCombining;
    console.log("gameState.isCombining is now:", gameState.isCombining); // DEBUG
    const combineButton = document.getElementById('combineButton');

    if (gameState.isCombining) { // Entering combination mode
        combineButton.textContent = 'Cancel Combination';
        console.log("Combine button text set to: Cancel Combination");
        gameState.message = "Select items from your inventory to combine. Click an item to select or deselect it. Click 'Cancel Combination' again to attempt to combine selected items.";
        gameState.selectedForCombination = [];
        renderMessage(); // Update message
        renderInventory(); // Render inventory for selection
    } else { // Exiting combination mode
        combineButton.textContent = 'Combine';
        console.log("Combine button text set to: Combine");
        if (gameState.selectedForCombination.length > 0) {
            attemptCombination(); // This function handles its own messages and inventory rendering
        } else {
             gameState.message = "Combination cancelled.";
             renderMessage(); // Update message
             renderInventory(); // Render inventory in normal state
        }
    }
}

function attemptCombination() {
    if (gameState.selectedForCombination.length === 0) {
        gameState.message = "No items selected to combine.";
        // Reset combination mode (done by toggleCombinationMode or manually if needed)
        gameState.isCombining = false;
        document.getElementById('combineButton').textContent = 'Combine';
        renderMessage();
        return;
    }

    let combinationMade = false;
    for (const recipeName in combinationRecipes) {
        const recipe = combinationRecipes[recipeName];
        // const ingredients = recipe.ingredients; // Keep original casing for adding result
        const result = recipe.result;

        const selectedLowercase = gameState.selectedForCombination.map(item => (item.name || item).toLowerCase());
        const ingredientsLowercase = recipe.ingredients.map(item => item.toLowerCase());

        // Check if selected items (converted to lowercase) match the ingredients list (converted to lowercase)
        // Order doesn't matter, count matters.
        if (ingredientsLowercase.length === selectedLowercase.length &&
            ingredientsLowercase.every(ingLC => selectedLowercase.includes(ingLC)) &&
            selectedLowercase.every(selIngLC => ingredientsLowercase.includes(selIngLC))) {

            // All ingredients are present. Perform combination.
            // IMPORTANT: When removing items, use the original casing from gameState.selectedForCombination

            // gameState.selectedForCombination contains the items with their original casing from inventory.
            gameState.selectedForCombination.forEach(ingredientToRemove => {
                removeItemFromInventory(ingredientToRemove);
            });
            addItemToInventory(recipe.result); // recipe.result provides the casing for the new item.

            gameState.message = `Successfully combined items to create: ${recipe.result}!`;
            combinationMade = true;
            break;
        }
    }

    if (!combinationMade) {
        gameState.message = "Nothing happened. The selected items don't seem to combine into anything useful.";
    }

    // Reset combination mode and selected items
    gameState.isCombining = false;
    document.getElementById('combineButton').textContent = 'Combine';
    gameState.selectedForCombination = [];
    renderMessage();
    renderInventory();
    updateHotspotsForCurrentScene(); // In case the new item unlocks something
}

        // Event Listeners
        restartButton.addEventListener('click', initializeGame);

        if (combineButton) {
            combineButton.addEventListener('click', toggleCombinationMode);
        } else {
            console.error("Combine button not found in DOM");
        }

        if (lookAtButton) {
            lookAtButton.addEventListener('click', () => {
                if (gameState.selectedItemForUse) {
                    gameState.selectedItemForUse = null;
                    // gameState.message = "Item use cancelled due to action mode change."; // Optional message
                    renderInventory(); // Update to remove selection class
                    // renderMessage(); // Optional
                }
                gameState.currentAction = "look";
                updateActionButtonsUI();
            });
        } else {
            console.error("Look At button not found in DOM");
        }

        if (useButton) {
            useButton.addEventListener('click', () => {
                // If switching to "use" mode, we don't necessarily clear selectedItemForUse,
                // as the user might have selected "use", then an item, then clicked "use" button again.
                // However, if they were in "look" and had an item selected (which shouldn't happen with current logic, but for safety):
                if (gameState.currentAction !== "use" && gameState.selectedItemForUse) {
                     gameState.selectedItemForUse = null;
                     renderInventory();
                }
                gameState.currentAction = "use";
                updateActionButtonsUI();
            });
        } else {
            console.error("Use button not found in DOM");
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            const initialSceneBg = new Image();
            initialSceneBg.onload = () => {
                 if (gameImage.complete || gameImage.naturalWidth > 0) {
                    initializeGame();
                } else {
                    gameImage.onload = initializeGame;
                    gameImage.onerror = () => {
                        messageArea.textContent = "Error: Could not load the initial game scene background. Please check image URLs.";
                    }
                }
            };
            initialSceneBg.onerror = () => {
                 messageArea.textContent = "Error: Preloading initial scene background failed. Check console.";
                 initializeGame();
            };
            if (gameScenes.Gate && gameScenes.Gate.imageUrl) {
                initialSceneBg.src = gameScenes.Gate.imageUrl;
            } else {
                messageArea.textContent = "Error: Initial scene configuration is missing. Cannot start game.";
                console.error("Initial scene 'Gate' or its imageUrl is not defined in gameScenes.");
            }

            // Add event listener for clicking on the game background (gameImage)
            if (gameImage) {
                gameImage.addEventListener('click', (event) => {
                    // Ensure the click is directly on the gameImage and not a hotspot (child element)
                    if (event.target === gameImage) {
                        if (gameState.currentAction === "look") {
                            const currentSceneData = gameScenes[gameState.currentScene];
                            if (currentSceneData && currentSceneData.message) {
                                gameState.message = currentSceneData.message;
                            } else {
                                gameState.message = "You look around. Nothing else of note here."; // Fallback message
                            }
                            renderMessage();
                        }
                        // In "use" mode, clicking the background does nothing unless an item is selected
                        // and a specific interaction for "item on background" is defined, which is not the case here.
                        // If an item is selected for use, clicking the background should probably deselect it or give a message.
                        else if (gameState.currentAction === "use" && gameState.selectedItemForUse) {
                            // Optional: Deselect item or provide feedback
                            // gameState.selectedItemForUse = null;
                            // gameState.message = `${gameState.selectedItemForUse} cannot be used on the general surroundings.`;
                            // renderInventory();
                            // renderMessage();
                            // For now, let's do nothing specific, to avoid accidental deselection.
                            // The user has to click the item again in inventory to deselect.
                        }
                    }
                });
            } else {
                console.error("gameImage element not found for background click listener.");
            }
        });
