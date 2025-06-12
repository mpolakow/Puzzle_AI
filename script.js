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
                        objectId: "pick_upchest_chest_key",
                        initiallyHidden: true // Added this line
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

// --- Item Descriptions (for "look at" action on inventory items) ---
const itemDescriptions = {
    "Stone": "A rough, grey stone. It has a nice weight to it, good for throwing perhaps?",
    "Stick": "A sturdy wooden stick, about the length of your forearm.",
    "Rake": "A long-handled rake with several metal tines. Looks useful for clearing debris.",
    "Cloth": "A piece of thick, absorbent cloth. It's a bit grimy.",
    "Oil": "A small flask containing a viscous, flammable oil.",
    "Torch": "A stick with oil-soaked cloth wrapped around one end. Ready to be lit.",
    "Chest Key": "A small, ornate metal key. Seems designed for a chest.",
    "Ring": "A beautiful, intricately carved ring. It feels warm to the touch."
    // Add more items as they are introduced to the game
};

        // --- Interactive Object Definitions ---
        const interactiveObjects = {
            "gate_entrance": {
                lookDescription: "A massive, ancient-looking gate made of dark wood and reinforced with iron bands. It appears to be the only way into whatever lies beyond.",
                handler: () => {
                    changeScene("City");
                    gameState.message = "You enter the city slowly, not knowing what's inside.";
                }
            },
            "enter_house": {
                lookDescription: "A dilapidated, two-story wooden house. Smoke damage is visible around the windows, and the front door hangs precariously on one hinge.",
                handler: () => {
                    changeScene("House");
                    gameState.message = "You enter the house, hoping it won't collapse at you.";
                }
            },
            "exit_house": {
                lookDescription: "The doorway leading back out of the house into the city square.",
                handler: () => {
                    changeScene("City");
                    gameState.message = "You come back to the city as quietly as possible.";
                }
            },
            "exit_storage": {
                lookDescription: "A sturdy wooden ladder leading back up to the city through a trapdoor.",
                handler: () => {
                    changeScene("City");
                    gameState.message = "You come back to the city as quietly as possible.";
                }
            },
            "gate_exit": {
                lookDescription: "The main gate leading out of the city, back towards where you started.",
                handler: () => {
                    changeScene("Gate");
                    gameState.message = "You are back in front of the gate.";
                }
            },
            "inspect_ring_hole": {
                lookDescription: "A curious, perfectly circular indentation in the stone wall, about the size of a large coin. It seems tailor-made for something round.",
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
                lookDescription: "A pile of charred wood, stones, and debris at the base of the gate. It looks like something collapsed or was destroyed here.",
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
                lookDescription: "A heavy wooden chest, bound with iron. It has a prominent, sturdy lock.",
                handler: () => {
                    if (checkInventory("Chest Key")) {
                        gameState.message = "You use the Chest Key and the chest creaks open. You find a shiny ring... whos it might be. As the lock clicks, you hear a faint sound from the trapdoor area in the city."; // Added a bit of narrative flair
                        removeItemFromInventory("Chest Key");
	                addItemToInventory("Ring")
			gameState.flags.chestOpened = true;
                    } else if (gameState.flags.chestOpened) {
                            gameState.message = "The chest is empty.";
                    } else {
                        gameState.message = "The chest is closed shut. You need a key.";
                        // ADD THIS LINE to reveal the chest_key in the Storage scene
                        gameState.flags.hotspot_Storage_chest_key_visible = true;			    
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
                lookDescription: "A small, glinting metal object on the dusty floor. It looks like a key.",
                handler: () => {
                    // Check if the key is meant to be visible (flag set by opening chest)
                    // AND if it hasn't been obtained yet.
                    if (gameState.flags.hotspot_Storage_chest_key_visible && !gameState.flags.keyObtained) {
                        gameState.message = "You pick up the key from the ground. It vanishes after you take it.";
                        addItemToInventory("Chest Key");
                        gameState.flags.keyObtained = true;
                        // Make the hotspot disappear by resetting its visibility flag
                        gameState.flags.hotspot_Storage_chest_key_visible = false;
                    } else if (gameState.flags.keyObtained) {
                        // This state might be reached if somehow clicked again before redraw,
                        // or if logic changes.
                        gameState.message = "You've already picked up the key from here.";
                    } else {
                        // This case should ideally not be hit if shouldDisplayHotspot works correctly.
                        // It implies the hotspot was visible but its trigger flag wasn't set.
                        gameState.message = "It seems to be just out of reach or not interactive right now.";
                    }
                }
            },
            "talk_to_cultist": {
                lookDescription: "A menacing figure in dark robes, standing guard. They seem focused on something in the distance, occasionally muttering.",
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
                lookDescription: "A imposing figure atop a dark horse, adorned with strange symbols. They exude an aura of unsettling authority.",
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
                lookDescription: "A small, clay flask with a cork stopper. It seems to contain some kind of liquid.", // Assuming this is the hotspot for picking up oil
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
                lookDescription: "A particularly shadowy corner of the storage room. It's hard to make out any details in the gloom.",
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
            // TODO: Add lookDescription for "pickup_cloth" if it's a distinct hotspot.
            // Assuming "pickup_cloth" is an action on a hotspot that might be called "cloth_pile" or similar.
            // If "pickup_cloth" is the ID of the hotspot itself:
            ,"pickup_cloth": { // This assumes "pickup_cloth" is an objectId for a hotspot
                lookDescription: "A piece of discarded cloth lying on the ground.",
                handler: () => {
                     if (!checkInventory("Cloth")) {
                        gameState.message = "You find a piece of cloth that seems usable.";
                        addItemToInventory("Cloth");
                        gameState.flags.clothCollected = true;
                    } else {
                        gameState.message = "You've already taken the cloth.";
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
                                // Handle using selected item on hotspot
                                const itemUsed = gameState.selectedItemForUse;
                                gameState.selectedItemForUse = null; // Reset selected item
                                // TODO: Implement actual item-on-hotspot interaction logic here.
                                // This will likely involve checking itemUsed and objectId against a ruleset.
                                gameState.message = `You try to use ${itemUsed} on ${objectId.replace(/_/g, ' ')}. Nothing specific happens yet.`;
                                renderMessage();
                                renderInventory(); // To remove 'selected-for-use' class
                            } else {
                                // Handle direct "use" action on hotspot (existing logic)
                                if (objectLogic && typeof objectLogic.handler === 'function') {
                                    objectLogic.handler();
                                    renderMessage();
                                    renderInventory();
                                    if (sceneAtInteractionTime === gameScenes[gameState.currentScene]) {
                                        updateHotspotsForCurrentScene();
                                    }
                                } else {
                                    console.warn("No handler for objectId:", objectId);
                                    gameState.message = `You try to use ${objectId.replace(/_/g, ' ')}, but nothing happens.`;
                                    renderMessage();
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
                return !!gameState.flags[visibilityFlag]; // Show if flag is true, otherwise hide
            }

            // Existing logic for hotspots that disappear after interaction
            // These apply to hotspots that are NOT initiallyHidden
            if (objectId === "pickup_red_flower" && gameState.flags.redFlowerTaken) return false;
            if (objectId === "inspect_rake" && gameState.flags.rakeObtained) return false;
            // If pick_upchest_chest_key is NOT initiallyHidden, this rule would apply.
            // Given it's currently set to initiallyHidden: true for testing,
            // its visibility is governed by the block above.
            // Adding !hsData.initiallyHidden to be explicit that this rule is for non-initiallyHidden items or for after they become visible and obtained.
            if (objectId === "pick_upchest_chest_key" && gameState.flags.keyObtained && !hsData.initiallyHidden) return false;
            if (objectId === "pickup_cloth" && gameState.flags.clothCollected) return false;
            if (objectId === "pickup_oil" && gameState.flags.oilCollected) return false;

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
                        // Combination mode logic
                        li.classList.add('selectable-item');
                        if (gameState.selectedForCombination.includes(item)) {
                            li.classList.add('selected-for-combination');
                        }
                        li.addEventListener('click', () => toggleItemSelectionForCombination(item));
                    } else {
                        // Not in combination mode - handle "look" or "use" item selection
                        li.classList.add('selectable-item'); // General styling for clickable inventory items
                        if (gameState.currentAction === "use" && gameState.selectedItemForUse === item) {
                            li.classList.add('selected-for-use');
                        }

                        li.addEventListener('click', () => {
                            if (gameState.currentAction === "look") {
                                if (itemDescriptions[item]) {
                                    gameState.message = itemDescriptions[item];
                                } else {
                                    gameState.message = `You examine the ${item}. It seems like a normal ${item}.`; // Fallback
                                }
                                if (gameState.selectedItemForUse) { // If an item was selected for use, deselect it
                                    gameState.selectedItemForUse = null;
                                    renderInventory(); // Update inventory to remove visual selection
                                }
                                renderMessage();
                            } else if (gameState.currentAction === "use") {
                                if (gameState.selectedItemForUse === item) {
                                    // Item is already selected, so deselect it
                                    gameState.selectedItemForUse = null;
                                    gameState.message = "Item deselected.";
                                } else {
                                    // Select item for use
                                    gameState.selectedItemForUse = item;
                                    gameState.message = `${item} selected. Click on something in the scene to use it on, or click the item again to deselect.`;
                                }
                                renderInventory(); // Re-render to show/hide 'selected-for-use'
                                renderMessage();
                            }
                        });
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
