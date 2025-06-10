// DOM Elements
        const gameArea = document.getElementById('gameArea');
        const gameImage = document.getElementById('gameImage'); // Main background scene image
        const messageArea = document.getElementById('messageArea');
        const inventoryList = document.getElementById('inventoryList');
        const restartButton = document.getElementById('restartButton');
        const combineButton = document.getElementById('combineButton'); // Add this line

        // Game State
        let gameState = {};

        // --- Scene Definitions ---
        // IMPORTANT: Replace ALL 'https://placehold.co/...' image URLs with your actual, working image paths/URLs.
        // To make a hotspot invisible (transparent div), simply OMIT the `imageUrl` property or set it to null/undefined.
        const gameScenes = {
            "Gate": {
                imageUrl: "https://ai.oldwisebear.com/Game1/Gate.jpg",
                message: "You stand in front of the castle gate finally, however there is noone outside... why?.",
                hotspots: [
                    {
                        id: "gate_rubble",
                        style: { left: "75%", top: "65%", width: "20%", height: "25%" },
                        objectId: "inspect_rubble"
                    },
                    {
                        id: "gate_entrance",
                        style: { left: "20%", top: "60%", width: "15%", height: "25%" },
                        objectId: "gate_entrance"
                    }
                ]
            },
            "City": {
                imageUrl: "https://ai.oldwisebear.com/Game1/background_image.jpg",
                message: "You come into a city and notice it was burned down not that long ago. She has to be somewhere here...",
                hotspots: [
                    { id: "house",
			   style: { left: "30%", top: "55%", width: "25%", height: "15%" },
			   objectId: "enter_house" },
                    { id: "Cultist_leader",
                           imageUrl: "https://ai.oldwisebear.com/Game1/Cultist_horse.png",
			   style: { left: "35%", top: "40%", width: "10%", height: "10%" },
			   objectId: "talk_to_cultist_leader" },
                    { id: "Cultist1",
                           imageUrl: "https://ai.oldwisebear.com/Game1/Cultist2.png",
			   style: { left: "70%", top: "40%", width: "10%", height: "10%" },
			   objectId: "talk_to_cultist" },
                    { id: "Cultist2",
                           imageUrl: "https://ai.oldwisebear.com/Game1/Cultist2.png",
			   style: { left: "55%", top: "80%", width: "10%", height: "10%" },
			   objectId: "talk_to_cultist" },
                    { id: "gate_exit",
			   style: { left: "10%", top: "80%", width: "15%", height: "15%" },
		           objectId: "gate_exit" },
		    { id: "fire_rubble",
                           imageUrl: "https://ai.oldwisebear.com/Game1/Wooden_ruble.png",
			   style: { left: "5%", top: "50%", width: "10%", height: "10%" },
			   objectId: "inspect_fire_rubble" }
                ]
            },
            "House": {
                imageUrl: "https://ai.oldwisebear.com/Game1/inside_building.jpg",
                message: "The building is still a burning a bit, however you see someone left a chest inside.",
                hotspots: [
                    {
                        id: "chest",
                        imageUrl: "https://ai.oldwisebear.com/Game1/chest.png",
                        style: { left: "65%", top: "80%", width: "20%", height: "15%" },
                        objectId: "inspect_chest"
                    },
                    {
                        id: "rake",
                        imageUrl: "https://ai.oldwisebear.com/Game1/rake.png",
                        style: { left: "25%", top: "35%", width: "5%", height: "10%" },
                        objectId: "inspect_rake"
                    },
                    {
                        id: "house_exit",
                        style: { left: "50%", top: "70%", width: "10%", height: "20%" },
                        objectId: "exit_house"
                    },
                    {
                        id: "pickup_cloth",
                        imageUrl: "https://ai.oldwisebear.com/Game1/cloth_item.png", // Needs a placeholder image
                        style: { left: "10%", top: "70%", width: "10%", height: "10%" },
                        objectId: "pickup_cloth"
                    }
                ]
            },
            "Storage": {
                imageUrl: "https://ai.oldwisebear.com/Game1/Storage.jpg",
                message: "You walk down the ladder to a weird small storage room... what for was it used?.",
                hotspots: [
                    {
                        id: "city_trapdoor",
                        style: { left: "40%", top: "10%", width: "20%", height: "20%" },
                        objectId: "exit_storage"
                    },
                    {
                        id: "ring_hole",
                        imageUrl: "https://ai.oldwisebear.com/Game1/ring_hole.png",
                        style: { left: "80%", top: "60%", width: "10%", height: "10%" },
                        objectId: "inspect_ring_hole"
                    },
                    {
                        id: "chest_key",
                        imageUrl: "https://ai.oldwisebear.com/Game1/chest_key.png",
                        style: { left: "20%", top: "80%", width: "10%", height: "5%" },
                        objectId: "pick_upchest_chest_key"
                    },
                    {
                        id: "pickup_oil",
                        imageUrl: "https://ai.oldwisebear.com/Game1/oil_item.png", // Needs a placeholder image
                        style: { left: "5%", top: "80%", width: "10%", height: "10%" },
                        objectId: "pickup_oil"
                    },
                    {
                        id: "dark_area_storage",
                        // No imageUrl for dark area, it's an interaction spot
                        style: { left: "60%", top: "30%", width: "20%", height: "30%" },
                        objectId: "inspect_dark_area_storage"
                    }
                ]
            },
            "Bad_end": {
                imageUrl: "https://ai.oldwisebear.com/Game1/bad_end1.jpg",
                message: "You died.",
                hotspots: [
                    {
                        id: "end",
                        style: { left: "75%", top: "65%", width: "20%", height: "25%" },
                        objectId: "end"
                    }
                ]
            },
            "Bad_end2": {
                imageUrl: "https://ai.oldwisebear.com/Game1/bad_end2.jpg",
                message: "You joined to cult, your story will continue as a mindless slave.",
                hotspots: [
                    {
                        id: "end",
                        style: { left: "75%", top: "65%", width: "20%", height: "25%" },
                        objectId: "end"
                    }
                ]
            },
            "END": {
                imageUrl: "https://ai.oldwisebear.com/Game1/Castle_END.jpg",
                message: "...",
                hotspots: [
                    {
                        id: "end",
                        style: { left: "75%", top: "65%", width: "20%", height: "25%" },
                        objectId: "end"
                    }
                ]
            }
        };

const combinationRecipes = {
    "torch": { "ingredients": ["stick", "cloth", "oil"], "result": "Torch" } // Changed "torch" to "Torch"
};

        // --- Interactive Object Definitions ---
        const interactiveObjects = {
            "gate_entrance": {
                handler: () => {
                    changeScene("City");
                    gameState.message = "You enter the city slowly, not knowing what's inside.";
                }
            },
            "enter_house": {
                handler: () => {
                    changeScene("House");
                    gameState.message = "You enter the house, hoping it won't collapse at you.";
                }
            },
            "exit_house": {
                handler: () => {
                    changeScene("City");
                    gameState.message = "You come back to the city as quietly as possible.";
                }
            },
            "exit_storage": {
                handler: () => {
                    changeScene("City");
                    gameState.message = "You come back to the city as quietly as possible.";
                }
            },
            "gate_exit": {
                handler: () => {
                    changeScene("Gate");
                    gameState.message = "You are back in front of the gate.";
                }
            },
            "inspect_ring_hole": {
                handler: () => {
                    if (checkInventory("Ring")) {
                        changeScene("END");
                        gameState.message = "You insert the ring and hear a loud clang. Suddenly the wall slides open in front of you, you go through a long tunnel at which end you see a burning castle. \n\nCongratulations! You've passed the cultist!\n\nThanks for playing!";
                        removeItemFromInventory("Ring");
                        const existingHotspots = gameArea.querySelectorAll('.hotspot');
                        existingHotspots.forEach(hs => hs.remove());
                        restartButton.style.display = 'inline-block';
                        if (combineButton) combineButton.style.display = 'none';
                    } else {
                        gameState.message = "There a werid ring shaped hole in the wall, I wonder where does it go.";
                    }
                }
            },
            "inspect_rubble": {
                 handler: () => {
                    if (!gameState.flags.stoneCollected) {
                        gameState.message = "You look through the rubble, find some stones and a sturdy-looking stick. You take one of each.";
                        addItemToInventory("Stone");
                        addItemToInventory("Stick"); // Add stick
                        gameState.flags.stoneCollected = true; // Assuming this flag means "rubble searched"
                        gameState.flags.stickCollected = true; // Add a new flag for the stick
                    } else if (!gameState.flags.stickCollected) {
                        // If stone was collected but not stick (e.g. if logic changes later)
                        gameState.message = "Searching the rubble again, you find a sturdy-looking stick.";
                        addItemToInventory("Stick");
                        gameState.flags.stickCollected = true;
                    }
                    else {
                        gameState.message = "You've already looked through this. There is nothing else interesting here.";
                    }
                }
            },
            "inspect_fire_rubble": {
                handler: () => {
                    if (checkInventory("Rake")) {
                        gameState.message = "You use the rake to search through the smoldering rubble.";
                        removeItemFromInventory("Rake");
			changeScene("Storage");
			gameState.flags.trapdoor_unlocked = true;
                    } else if (gameState.flags.trapdoor_unlocked) {
                            gameState.message = "You enter the trapdoor again.";
			    changeScene("Storage");
                    } else {
                        gameState.message = "Burning rubble, there might be something hidden in it...";
                    }
                }
            },
            "inspect_chest": {
                handler: () => {
                    if (checkInventory("Chest Key")) {
                        gameState.message = "You use the Chest Key and the chest creaks open. You find a shiny ring... whos it might be.";
                        removeItemFromInventory("Chest Key");
	                addItemToInventory("Ring")
			gameState.flags.chestOpened = true;
                    } else if (gameState.flags.chestOpened) {
                            gameState.message = "The chest is empty.";
                    } else {
                        gameState.message = "The chest is closed shut. You need a key.";
                    }
                }
            },
            "inspect_rake": {
                handler: () => {
                    if (checkInventory("Stone")) {
                        gameState.message = "You throw the stone feeling lucky and you actually are, the rake fall to the ground and you pick it up.";
	                addItemToInventory("Rake")
                        removeItemFromInventory("Stone");
			gameState.flags.rakeObtained = true;
                    }  else {
                        gameState.message = "The rake is too far up to reach.";
                    }
                }
            },
            "pick_upchest_chest_key": {
                handler: () => {
                    if (!gameState.flags.keyObtained) {
                        gameState.message = "You look at the ground and find a key laying around.";
	                addItemToInventory("Chest Key")
			gameState.flags.keyObtained = true;
                    }  else {
                        gameState.message = "The key is just laying there.";
                    }
                }
            },
            "talk_to_cultist": {
                handler: () => {
                        // The cultist get more and more annoyed and finally kill the player
                        gameState.flags.CultistAnnoyance++;
                        switch (gameState.flags.CultistAnnoyance) {
                            case 1:
                                gameState.message = "The cultist looks into the sky, not paying you any attention, however you can't move past him.";
                                break;
                            case 2:
                                gameState.message = "The cultist looks at you for a moment and then goes back to looking into the sky.";
                                break;
                            case 3:
                                gameState.message = "Cultist looks at you again and say 'Mmmm, who are you?', but goes back to looking into the sky without wating for the anwser";
                                break;
                            default:
                                gameState.message = "'Stop disturbing me.' he says and after a second you start feeling a pain in the chest, when you look at it you realized you have been stabbed.";
                                // Kick the player out of the close-up view after a short delay.
                                setTimeout(() => {
                                    // Check if we are still in the closeup scene before changing it.
                                    if (gameState.currentScene === 'City') {
                                        changeScene("Bad_end");
		                        const existingHotspots = gameArea.querySelectorAll('.hotspot');
		                        existingHotspots.forEach(hs => hs.remove());
		                        restartButton.style.display = 'inline-block';
                                        if (combineButton) combineButton.style.display = 'none';
                                    }
                                }, 2000); // 2-second delay
                                break;
                        }                }
            },
            "talk_to_cultist_leader": {
                handler: () => {
                        // The cultist get more and more annoyed and finally kill the player
                        gameState.flags.CultistLeaderAnnoyance++;
                        switch (gameState.flags.CultistLeaderAnnoyance) {
                            case 1:
                                gameState.message = "'Huh, who are you' says the cultist at the horse, however he does nothing apart from staring at you.";
                                break;
                            case 2:
                                gameState.message = "'Are you one of us? Why are dressed so weirdly', he starts to chant something.";
                                break;
                            default:
                                gameState.message = "'Doesn't matter you are one us now.' he says and after a second you start feeling your consciousness is leaving you";
                                // Kick the player out of the close-up view after a short delay.
                                setTimeout(() => {
                                    // Check if we are still in the closeup scene before changing it.
                                    if (gameState.currentScene === 'City') {
                                        changeScene("Bad_end2");
		                        const existingHotspots = gameArea.querySelectorAll('.hotspot');
		                        existingHotspots.forEach(hs => hs.remove());
		                        restartButton.style.display = 'inline-block';
                                        if (combineButton) combineButton.style.display = 'none';
                                    }
                                }, 2000); // 2-second delay
                                break;
                        }                }
            },
            "pickup_cloth": {
                handler: () => {
                    if (!checkInventory("Cloth")) {
                        gameState.message = "You find a piece of cloth that seems usable.";
                        addItemToInventory("Cloth");
                        gameState.flags.clothCollected = true; // Add flag
                        // Remove hotspot after pickup by updating shouldDisplayHotspot
                    } else {
                        gameState.message = "You've already taken the cloth.";
                    }
                }
            },
            "pickup_oil": {
                handler: () => {
                    if (!checkInventory("Oil")) {
                        gameState.message = "You find a small flask of oil.";
                        addItemToInventory("Oil");
                        gameState.flags.oilCollected = true; // Add flag
                    } else {
                        gameState.message = "You've already taken the oil.";
                    }
                }
            },
            "inspect_dark_area_storage": {
                handler: () => {
                    if (checkInventory("Torch")) {
                        gameState.message = "You use the torch to light up the dark area. You see a small, almost invisible inscription on the wall! It reads: 'The path is revealed to those who persist.'";
                        // Potentially remove torch if it's a one-time use for this puzzle
                        // removeItemFromInventory("Torch");
                        // gameState.flags.darkAreaInspected = true; // Flag to prevent re-inspection or change message
                    } else {
                        gameState.message = "It's too dark to see anything in this corner. If only you had a light source...";
                    }
                }
            }
        };

        // --- Core Game Logic ---
        function initializeGame() {
            gameState = {
                currentScene: "Gate",
                inventory: [],
                flags: {
                    hasExitKey: false,
                    exitDoorUnlocked: false,
                    trapdoor_unlocked: false,
                    stoneCollected: false,
                    chestOpened: false,
                    keyObtained: false,
		    rakeObtained: false,
		    CultistAnnoyance: 0, // ADDED: To track mood
		    CultistLeaderAnnoyance: 0, // ADDED: To track mood
                    stickCollected: false,
                    clothCollected: false,
                    oilCollected: false,
                },
                isCombining: false,
                selectedForCombination: [],
            };
            changeScene(gameState.currentScene, true);
            renderInventory();
            restartButton.style.display = 'none';
            if (combineButton) combineButton.style.display = 'inline-block';
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
                        const sceneAtInteractionTime = gameScenes[gameState.currentScene];
                        const objectLogic = interactiveObjects[hsData.objectId];
                        if (objectLogic && typeof objectLogic.handler === 'function') {
                            objectLogic.handler();
                            renderMessage();
                            renderInventory();

                            if (sceneAtInteractionTime === gameScenes[gameState.currentScene]) {
                                updateHotspotsForCurrentScene();
                            }
                        } else {
                            console.warn("No handler for objectId:", hsData.objectId);
                        }
                    });
                    gameArea.appendChild(hotspotEl);
                }
            });
        }

        function shouldDisplayHotspot(objectId, hsData) {
            if (objectId === "pickup_red_flower" && gameState.flags.redFlowerTaken) return false;
            // if (objectId === "pickup_red_flower" && gameState.flags.redFlowerTaken) return false; // Duplicate line removed for clarity
            if (objectId === "inspect_rake" && gameState.flags.rakeObtained) return false;
            if (objectId === "pick_upchest_chest_key" && gameState.flags.keyObtained) return false;
            if (objectId === "pickup_cloth" && gameState.flags.clothCollected) return false;
            if (objectId === "pickup_oil" && gameState.flags.oilCollected) return false;
            // For inspect_rubble, the existing stoneCollected flag (and potentially stickCollected) in its handler
            // should determine if it continues to show or what message it gives.
            // If the hotspot itself (gate_rubble) should disappear after full looting,
            // we might need to adjust based on hsData.id, but the current objectId based logic is fine.
            return true;
        }

        function renderMessage() {
            messageArea.textContent = gameState.message;
            if (gameState.flags.exitDoorUnlocked || gameState.message.includes("Congratulations")) {
                 restartButton.style.display = 'inline-block';
                 if (combineButton) combineButton.style.display = 'none';
            }
        }
        function renderInventory() {
            console.log("renderInventory called. gameState.isCombining:", gameState.isCombining); // DEBUG
            inventoryList.innerHTML = '';
            if (gameState.inventory.length === 0) {
                const li = document.createElement('li');
                li.textContent = "(Empty)";
                inventoryList.appendChild(li);
            } else {
                gameState.inventory.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    // console.log("Processing item for inventory display:", item); // Optional: very verbose
                    if (gameState.isCombining) {
                        console.log("renderInventory: In 'isCombining' mode for item:", item); // DEBUG
                        li.classList.add('selectable-item');
                        if (gameState.selectedForCombination.includes(item)) {
                            li.classList.add('selected-for-combination');
                        }
                        li.addEventListener('click', () => toggleItemSelectionForCombination(item));
                        console.log("renderInventory: Added click listener for item:", item); // DEBUG
                    }
                    inventoryList.appendChild(li);
                });
            }
        }

function toggleItemSelectionForCombination(itemName) {
    console.log("toggleItemSelectionForCombination called with item:", itemName); // DEBUG
    if (!gameState.isCombining) {
        console.log("toggleItemSelectionForCombination: Not in combining mode, exiting."); // DEBUG
        return;
    }

    console.log("Before selection change, selectedForCombination:", JSON.stringify(gameState.selectedForCombination)); // DEBUG
    const index = gameState.selectedForCombination.indexOf(itemName);
    if (index > -1) {
        gameState.selectedForCombination.splice(index, 1);
        console.log("Item deselected:", itemName); // DEBUG
    } else {
        gameState.selectedForCombination.push(itemName);
        console.log("Item selected:", itemName); // DEBUG
    }
    console.log("After selection change, selectedForCombination:", JSON.stringify(gameState.selectedForCombination)); // DEBUG

    // Update the visual state of the item in the list directly
    const listItems = inventoryList.getElementsByTagName('li');
    for (let li of listItems) {
        if (li.textContent === itemName) {
            if (gameState.selectedForCombination.includes(itemName)) {
                li.classList.add('selected-for-combination');
            } else {
                li.classList.remove('selected-for-combination');
            }
            break; // Found the item, no need to continue loop
        }
    }

    gameState.message = `Selected for combination: ${gameState.selectedForCombination.join(', ') || 'None'}. Click 'Cancel Combination' to attempt.`;
    renderMessage(); // renderMessage is fine, it doesn't destroy inventory items
}
        function addItemToInventory(item) {
            if (!gameState.inventory.includes(item)) gameState.inventory.push(item);
        }
        function removeItemFromInventory(item) {
            gameState.inventory = gameState.inventory.filter(i => i !== item);
        }
        function checkInventory(item) {
            return gameState.inventory.includes(item);
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

        const selectedLowercase = gameState.selectedForCombination.map(item => item.toLowerCase());
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
        // Add this:
        // const combineButton = document.getElementById('combineButton'); // Ensure it's defined // Already declared globally
        if (combineButton) { // Check if button exists
            combineButton.addEventListener('click', toggleCombinationMode);
        } else {
            console.error("Combine button not found in DOM");
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
        });
