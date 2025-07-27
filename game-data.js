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
                        initiallyHidden: true, // Added this line
			toggleable: "once"
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
                requiredItem: "Ring",
                handler: () => {
                    if (gameState.selectedItemForUse === "Ring") {
                        changeScene("END");
                        gameState.message = "You insert the ring and hear a loud clang. Suddenly the wall slides open in front of you, you go through a long tunnel at which end you see a burning castle. \n\nCongratulations! You've passed the cultist!\n\nThanks for playing!";
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
                requiredItem: "Rake",
                handler: () => {
                    if (gameState.selectedItemForUse === "Rake") {
                        gameState.message = "You use the rake to search through the smoldering rubble.";
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
                requiredItem: "Chest Key",
                handler: () => {
                    if (gameState.selectedItemForUse === "Chest Key") {
                        gameState.message = "You use the Chest Key and the chest creaks open. You find a shiny ring... whos it might be. As the lock clicks, you hear a faint sound from the trapdoor area in the city."; // Added a bit of narrative flair
	                addItemToInventory("Ring")
			gameState.flags.chestOpened = true;
                    } else if (gameState.flags.chestOpened) {
                            gameState.message = "The chest is empty.";
                    } else {
                        gameState.message = "The chest is closed shut. You need a key.";
                        if (!gameState.flags.keyObtained) {
                            // ADD THIS LINE to reveal the chest_key in the Storage scene
                            gameState.flags.hotspot_Storage_chest_key_visible = true;
                        }
                    }
                }
            },
            "inspect_rake": {
                requiredItem: "Stone",
                handler: () => {
                    if (gameState.selectedItemForUse === "Stone") {
                        gameState.message = "You throw the stone feeling lucky and you actually are, the rake fall to the ground and you pick it up.";
	                addItemToInventory("Rake")
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
                        gameState.flags.hotspot_chest_key_toggled = true;
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
                    if (!gameState.inventory.includes("Cloth")) {
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
                    if (!gameState.inventory.includes("Oil")) {
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
                requiredItem: "Torch",
                handler: () => {
                    if (gameState.selectedItemForUse === "Torch") {
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
                     if (!gameState.inventory.includes("Cloth")) {
                        gameState.message = "You find a piece of cloth that seems usable.";
                        addItemToInventory("Cloth");
                        gameState.flags.clothCollected = true;
                    } else {
                        gameState.message = "You've already taken the cloth.";
                    }
                }
            }
        };
