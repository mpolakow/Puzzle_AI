const gameScenes = {
            "Gate": {
                imageUrl: "https://ai.oldwisebear.com/Game2/Images/Cell.jpg",
                message: "You stand in a damp cell, somewhere underground.",
                hotspots: [
                    {
                        id: "gate_torch",
                        style: { left: "75%", top: "30%", width: "5%", height: "15%" },
                        objectId: "inspect_torch" 
                    },
                    {
                        id: "gate_torch2",
                        style: { left: "20%", top: "30%", width: "5%", height: "15%" },
                        objectId: "inspect_torch2" 
                    },
                    {
                        id: "gate_olive",
			imageUrl: "https://ai.oldwisebear.com/Game2/Images/olive.png",
                        style: { left: "15%", top: "80%", width: "10%", height: "5%" },
                        objectId: "inspect_olive" 
                    },
                    {
                        id: "gate_entrance",
                        style: { left: "33%", top: "30%", width: "35%", height: "40%" },
                        objectId: "gate_entrance"
                    },
                    {
                        id: "gate_stone",
                        style: { left: "85%", top: "70%", width: "10%", height: "5%" },
                        objectId: "inspect_stone" //TODO
                    }

                ]
            },
            "Cell_row": {
                imageUrl: "https://ai.oldwisebear.com/Game2/Images/cell_row3.jpg",
                message: "You come out of the cell and hide behind some boxes.",
                hotspots: [
                    { id: "cell_skeleton",
			   style: { left: "25%", top: "30%", width: "18%", height: "25%" },
			   objectId: "inspect_skeleton" }, //TODO
                    { id: "Cultists",
			   style: { left: "58%", top: "30%", width: "17%", height: "25%" },
			   objectId: "talk_to_cultist" }, 
                    { id: "empty_cell",
                           //imageUrl: "https://ai.oldwisebear.com/Game1/Cultist2.png",
			   style: { left: "85%", top: "30%", width: "15%", height: "25%" },
			   objectId: "talk_to_cultist" }, //TODO
                    { id: "bucket",
			   style: { left: "45%", top: "52%", width: "10%", height: "10%" },
		           objectId: "gate_exit" }, //TODO
                    { id: "map",
			   imageUrl: "https://ai.oldwisebear.com/Game2/Images/rolled_map2.png",
			   style: { left: "5%", top: "80%", width: "5%", height: "20%" },
		           objectId: "inspect_map" },
		    { id: "cell_row_exit",
                           //imageUrl: "https://ai.oldwisebear.com/Game2/Images/map.png",
			   style: { left: "2%", top: "25%", width: "10%", height: "30%" },
			   objectId: "cell_row_exit"
		    },
                    {
                        id: "cell_back",
                        //imageUrl: "https://ai.oldwisebear.com/Game2/Images/map.png",
                        style: { left: "85%", top: "80%", width: "10%", height: "15%" },
                        objectId: "exit_celL_back"
                    }

                ]
            },
            "Torture_chamber": {
                imageUrl: "https://ai.oldwisebear.com/Game2/Images/torture_chamber",
                message: "You walk into a room that looks like it was recently used, you hope you won't find out by who.",
                hotspots: [
                    {
                        id: "chest",                        
                        style: { left: "61%", top: "41%", width: "15%", height: "15%" },
                        objectId: "inspect_chest" //TODO
                    },
                    {
                        id: "chain",
                        imageUrl: "https://ai.oldwisebear.com/Game1/rake.png", //To change
                        style: { left: "31%", top: "30%", width: "5%", height: "10%" },
                        objectId: "inspect_chain" 
                    },
                    {
                        id: "torture_device",
                        style: { left: "35%", top: "60%", width: "25%", height: "20%" },
                        objectId: "activate_torture_device"
                    },
		    { 
			id: "map_Exit",
                        imageUrl: "https://ai.oldwisebear.com/Game2/Images/map.png",
			style: { left: "10%", top: "35%", width: "10%", height: "15%" },
			objectId: "torture_exit", //TODO 
                        initiallyHidden: true, // Added this line
                        toggleable: "once" 
		    },
		    { 
			id: "map_Exit_without",
                        //imageUrl: "https://ai.oldwisebear.com/Game2/Images/map.png",
			style: { left: "10%", top: "35%", width: "10%", height: "20%" },
			objectId: "torture_exit_nomap"
		    },
                    {
                        id: "to_cell_exit",
                        //imageUrl: "https://ai.oldwisebear.com/Game1/cloth_item.png", // Needs a placeholder image
                        style: { left: "80%", top: "35%", width: "10%", height: "20%" },
                        objectId: "to_cell_exit"
                    }
                ]
            },
            "Map": {
                imageUrl: "https://ai.oldwisebear.com/Game2/Images/map.png",
                message: "You are in the dark crossroad, you look at the map where should you go next.",
                hotspots: [
                    {
                        id: "torture_map",
			imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_torture2.png",
                        style: { left: "28%", top: "16%", width: "20%", height: "20%" },
                        objectId: "exit_map_torture"
                    },
                    {
                        id: "storage_map",
			imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_storage.png",
                        style: { left: "48%", top: "15%", width: "20%", height: "20%" },
                        objectId: "exit_map_storage"
                    },
                    {
                        id: "stairs_map",
                        imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_stairs2.png",
                        style: { left: "37%", top: "59%", width: "20%", height: "20%" },
                        objectId: "exit_map_stairs"
                    },
                    {
                        id: "treasury_map",
                        imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_treasury2.png",
                        style: { left: "65%", top: "35%", width: "20%", height: "20%" },
                        objectId: "exit_map_treasury"
                    },
                    {
                        id: "sleeping_map",
                        imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_sleeping2.png",
                        style: { left: "9%", top: "35%", width: "20%", height: "20%" },
                        objectId: "exit_map_sleeping"
                    }
                ]
            },
            "Storage": {
                imageUrl: "https://ai.oldwisebear.com/Game2/Images/storage.png",
                message: "You arrive dusty storage room with big cauldron in which someone was doing something not so long ago..",
                hotspots: [
                    {
                        id: "stairs_map",
                        //imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_stairs.png",
                        style: { left: "37%", top: "59%", width: "20%", height: "20%" },
                        objectId: "exit_end_g", //TODO
                        initiallyHidden: true, // Added this line
                        toggleable: "once" 
                    },
                    {
                        id: "cauldron",
                        imageUrl: "https://ai.oldwisebear.com/Game2/Images/cauldron.png",
                        style: { left: "45%", top: "60%", width: "20%", height: "20%" },
                        objectId: "talk_cultis_mob"  //TODO
                    },
                    {
                        id: "map_exit",
                        imageUrl: "https://ai.oldwisebear.com/Game2/Images/map.png",
                        style: { left: "80%", top: "42%", width: "10%", height: "15%" },
                        objectId: "exit_storage"
                    }

                ]
            },

            "Stairs": {
                imageUrl: "https://ai.oldwisebear.com/Game2/Images/Stairs.png",
                message: "You arrive at the foot of the stair to the exit, however a cultist mob is in your way...",
                hotspots: [
                    {
                        id: "stairs_map",
                        //imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_stairs.png",
                        style: { left: "37%", top: "59%", width: "20%", height: "20%" },
                        objectId: "exit_end_g", //TODO
                        initiallyHidden: true, // Added this line
                        toggleable: "once" 
                    },
                    {
                        id: "cultis_mob",
                        imageUrl: "https://ai.oldwisebear.com/Game2/Images/cultist_mob2.png",
                        style: { left: "25%", top: "65%", width: "50%", height: "30%" },
                        objectId: "talk_cultis_mob"  
                    },
                    {
                        id: "map_exit",
                        imageUrl: "https://ai.oldwisebear.com/Game2/Images/map.png",
                        style: { left: "80%", top: "85%", width: "10%", height: "15%" },
                        objectId: "exit_stairs"
                    }

                ]
            },
            "Sleeping_hall": {
                imageUrl: "https://ai.oldwisebear.com/Game2/Images/Sleeping_hallv2.png",
                message: "You are in the dark crossroad, you look at the map where should you go next.",
                hotspots: [
                    {
                        id: "bed1",
			//imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_torture.png",
                        style: { left: "50%", top: "30%", width: "10%", height: "10%" },
                        objectId: "exit_map_torture" //TODO
                    },
                    {
                        id: "bed2",
                        //imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_stairs.png",
                        style: { left: "30%", top: "35%", width: "15%", height: "5%" },
                        objectId: "exit_map_stairs" //TODO
                    },
                    {
                        id: "bed3",
                        //imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_stairs.png",
                        style: { left: "15%", top: "50%", width: "20%", height: "5%" },
                        objectId: "exit_map_stairs" //TODO
                    },
                    {
                        id: "map_exit",
                        imageUrl: "https://ai.oldwisebear.com/Game2/Images/map.png",
                        style: { left: "83%", top: "32%", width: "10%", height: "15%" },
                        objectId: "exit_sleeping_hall"
                    },
                    {
                        id: "bed4",
                        //imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_sleeping.png",
                        style: { left: "45%", top: "80%", width: "16%", height: "12%" },
                        objectId: "exit_map_sleeping" //TODO
                    },
                    {
                        id: "bed5",
                        //imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_sleeping.png",
                        style: { left: "65%", top: "40%", width: "15%", height: "5%" },
                        objectId: "exit_map_sleeping" //TODO
                    },
                    {
                        id: "bed6",
                        //imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_sleeping.png",
                        style: { left: "72%", top: "60%", width: "20%", height: "5%" },
                        objectId: "exit_map_sleeping" //TODO
                    },
                    {
                        id: "bed7",
                        //imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_stairs.png",
                        style: { left: "23%", top: "43%", width: "20%", height: "5%" },
                        objectId: "search_the_c_bed" 
                    },
                    {
                        id: "secret_stash",
                        //imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_stairs.png",
                        style: { left: "10%", top: "65%", width: "25%", height: "15%" },
                        objectId: "exit_map_stairs" //TODO
                    }
                ]
            },
            "Treasury_room": {
                imageUrl: "https://ai.oldwisebear.com/Game2/Images/Treasury_room.png",
                message: "You are in the dark crossroad, you look at the map where should you go next.",
                hotspots: [
                     {
                        id: "steel_bars",
                        //imageUrl: "https://ai.oldwisebear.com/Game2/Images/cultist_mob.png",
                        style: { left: "25%", top: "25%", width: "50%", height: "50%" },
                        objectId: "exit_map_treasury"  //TODO
                    },
                    {
                        id: "chain_key",
                        imageUrl: "https://ai.oldwisebear.com/Game2/Images/chain_key.png", 
                        style: { left: "15%", top: "90%", width: "5%", height: "5%" },
                        objectId: "pick_chain_key",
                        toggleable: "once" 
                    },
                    {
                        id: "map_exit",
                        imageUrl: "https://ai.oldwisebear.com/Game2/Images/map.png",
                        style: { left: "80%", top: "85%", width: "10%", height: "15%" },
                        objectId: "exit_treasury"
                    }

                ]
            },
            "Real_Treasury_room": {
                imageUrl: "https://ai.oldwisebear.com/Game2/Images/real_treasure_room.png",
                message: "You are shocked to the view that welcomes you, where did all of the riches go.",
                hotspots: [
                    {
                        id: "torture_map", //TODO
			imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_torture.png",
                        style: { left: "28%", top: "16%", width: "20%", height: "20%" },
                        objectId: "exit_map_torture"
                    },
                    {
                        id: "stairs_map", //TODO
                        imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_stairs.png",
                        style: { left: "37%", top: "59%", width: "20%", height: "20%" },
                        objectId: "exit_map_stairs"
                    },
                    {
                        id: "treasury_map", //TODO
                        imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_treasury.png",
                        style: { left: "65%", top: "35%", width: "20%", height: "20%" },
                        objectId: "exit_map_treasury"
                    },
                    {
                        id: "sleeping_map", //TODO
                        imageUrl: "https://ai.oldwisebear.com/Game2/Images/map_sleeping.png",
                        style: { left: "9%", top: "35%", width: "20%", height: "20%" },
                        objectId: "exit_map_sleeping"
                    }
                ]
            },
            "Bad_end": {
                imageUrl: "https://ai.oldwisebear.com/Game2/Images/END_b.png",
                message: "Thrown into weird torture device you are left alone till only bones remains.",
                hotspots: [
                    {
                        id: "end",
                        style: { left: "75%", top: "65%", width: "20%", height: "25%" },
                        objectId: "end"
                    }
                ]
            },
            "Bad_end2": {
                imageUrl: "https://ai.oldwisebear.com/Game2/Images/END_b2.png",
                message: "You died.",
                hotspots: [
                    {
                        id: "end",
                        style: { left: "75%", top: "65%", width: "20%", height: "25%" },
                        objectId: "end"
                    }
                ]
            },
            "END": {
                imageUrl: "https://ai.oldwisebear.com/Game2/Images/END_g.png",
                message: "...",
                hotspots: [
                    {
                        id: "end",
                        style: { left: "75%", top: "65%", width: "20%", height: "25%" },
                        objectId: "end"
                    }
                ]
            },
            "SecretEND": {
                imageUrl: "https://ai.oldwisebear.com/Game2/Images/END_g2.png",
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
    //example "torch": { "ingredients": ["stick", "cloth", "oil"], "result": { "name": "Torch", "uses": 3 } }
};

const itemDescriptions = {
    // example "Stone": "A rough, grey stone. It has a nice weight to it, good for throwing perhaps?",
    // Add more items as they are introduced to the game
};

const interactiveObjects = {
            "gate_entrance": {
                lookDescription: "A massive, ancient-looking gate closed with steel bars, that are already rusted",
                handler: () => {
                    changeScene("Cell_row");
                    gameState.message = "You exit the cell slowly, hearing some voices in the distance.";
                }
            },
            "cell_row_exit": {
                lookDescription: "A massive, ancient-looking gate closed with steel bars, that are already rusted",
                handler: () => {
                    changeScene("Torture_chamber");
                    gameState.message = "You enter a room you wish to leave as soon as you arrived.";
                }
            },
            "inspect_map": {
                lookDescription: "Something rolled up and tucked between the boxes ",
                handler: () => {
                    addItemToInventory("Map");
                    gameState.message = "You exit the cell slowly, hearing some voices in the distance.";
		    gameState.flags.MapObtained = true;
                    //gameState.toggledHotspots['map_Exit'] = true;
                    gameState.flags.hotspot_Torture_chamber_map_Exit_visible = true;		
                }
            },
            "torture_exit_nomap": {
                lookDescription: "It's too dark in here, you cannot proceed further without map.",
                handler: () => {
                    gameState.message = "You try to go a bit into the darkness, but turn around as quickly as you started.";	
                }
            },
            "to_cell_exit": {
                lookDescription: "An arch beyond which you hear a silent whispers.",
                handler: () => {
                    changeScene("Cell_row");
                    gameState.message = "You quietly go back.";
                }
            },
            "torture_exit": {
                lookDescription: "An arch beyond which there is darkness.",
                handler: () => {
                    changeScene("Map");
                    gameState.message = "You walk into empty dark crossroad and look at the map in a faint light of a nearby torch.";
                }
            },
            "exit_map_torture": {
                lookDescription: "This room sickens you, but maybe because of that you missed something?",
                handler: () => {
                    changeScene("Torture_chamber");
                    gameState.message = "You come back to the torture room, hoping to leave it as quickly as you arrived";
                }
            },
            "exit_map_stairs": {
                lookDescription: "At the end of the stairs you think you can see a faint light.",
                handler: () => {
                    changeScene("Stairs");
                    gameState.message = "You arrive at the base of the stairs.";
                }
            },
            "exit_map_treasury": {
                lookDescription: "If you only could get all of those treasures.",
                handler: () => {
		    if (gameState.flags.MechanismSolved) {
	                    changeScene("Real_Treasury_room");
	                    gameState.message = "The room changed...";
		    } else {
	                    changeScene("Treasury_room");
	                    gameState.message = "You arrive at the treasury room, the gate is still closed unfortunately";
		    }
                }
            },
            "exit_map_sleeping": {
                lookDescription: "There was a fight here",
                handler: () => {
                    changeScene("Sleeping_hall");
                    gameState.message = "You arrive in the sleeping hall.";
                }
            },
            "exit_map_storage": {
                lookDescription: "Place where all of the potions for torture were held.",
                handler: () => {
                    changeScene("Storage");
                    gameState.message = "You arrive dusty storage room with big cauldron in which someone was doing something not so long ago...";
                }
            },
            "exit_storage": {
                lookDescription: "Way back to the crossroads",
                handler: () => {
                    changeScene("Map");
                    gameState.message = "You take out the map to decide where to go again";
                }
            },
            "exit_sleeping_hall": {
                lookDescription: "Way back to the crossroads",
                handler: () => {
                    changeScene("Map");
                    gameState.message = "You take out the map to decide where to go again";
                }
            },
            "exit_stairs": {
                lookDescription: "Way back to the crossroads",
                handler: () => {
                    changeScene("Map");
                    gameState.message = "You take out the map to decide where to go again";
                }
            },
            "exit_treasury": {
                lookDescription: "Way back to the crossroads",
                handler: () => {
                    changeScene("Map");
                    gameState.message = "You take out the map to decide where to go again";
                }
            },
            "exit_celL_back": {
                lookDescription: "Your open starting cell",
                handler: () => {
                    changeScene("Gate");
                    gameState.message = "You quietly go back behind the boxes to the cell.";
                }
            },
            "talk_to_cultist": {
                lookDescription: "You have two cultist speaking just barely... under the middle of 3 beds... 3 times...",
                handler: () => {
                        // The cultist get more and more annoyed and finally kill the player
                        gameState.flags.CultistAnnoyance++;
                        switch (gameState.flags.CultistAnnoyance) {
                            case 1:
                                gameState.message = "You try to approach them, however as you soon as you start leaving safety of the boxes they react saying 'Whos there?', which makes you hide again";
                                break;
                            default:
                                gameState.message = "Ahhh, how did you escape? No matter come here...";
                                // Kick the player out of the close-up view after a short delay.
                                setTimeout(() => {
                                    // Check if we are still in the closeup scene before changing it.
                                    if (gameState.currentScene === 'Cell_row') {
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
            "talk_cultis_mob": {
                lookDescription: "You see a group of cultist, they seem a bit absent minded, however you can here them repeating something, maybe if you got closer",
                handler: () => {
                        // The cultist get more and more annoyed and finally kill the player
                        gameState.flags.CultistMobAnnoyance++;
                        switch (gameState.flags.CultistMobAnnoyance) {
                            case 1:
                                gameState.message = "which torch... one south...";
                                break;
                            case 2:
                                gameState.message = "one north... treasure room... illusion...";
                                break;
                            default:
                                gameState.message = "'Ah... Maybe he knows something...' They eyes focuse on you 'catch him...'";
                                // Kick the player out of the close-up view after a short delay.
                                setTimeout(() => {
                                    // Check if we are still in the closeup scene before changing it.
                                    if (gameState.currentScene === 'Stairs') {
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
            "inspect_chain": {
		lookDescription: "There is a fishing rod attached to the chain with a small lock on top, if you only had a key.",
                requiredItem: "Chain_Key",
                handler: () => {
                    if (gameState.selectedItemForUse === "Chain_Key") {
                        gameState.message = "You insert a small key a hear a typical clank sound. After that you are able to take to rod.";
	                addItemToInventory("Rod");
			gameState.flags.ChainOpened = true;
                    }  else {
                        gameState.message = "The chain is to strong and too tight for you to take the fishing rod out.";
                    }
                }
            },
            "pick_chain_key": {
                lookDescription: "A small, glinting metal object on the dusty floor. It looks like a key.",
                handler: () => {
                        gameState.message = "You pick up the key from the ground. It vanishes after you take it.";
                        addItemToInventory("Chain_Key");
                        gameState.flags.keyObtained = true;
                        gameState.flags.hotspot_Treasury_room_pick_chain_key_visible = false;
                 }
            },
            "search_the_c_bed": {
                lookDescription: "You see a bed, normal like other around",
                handler: () => {
                        gameState.flags.BedSearch++;
                        switch (gameState.flags.BedSearch) {
                            case 1:
                                gameState.message = "You filp and search the bedding, however you find nothing.";
                                break;
                            case 2:
                                gameState.message = "You rise the mattress, searching deeper.";
                                break;
                            default:
                                gameState.message = "On the third try you decide to look under the bed, finally finding, something that looks like a switch. After pressing it you hear a loud clank, but nothing seems to happen here.";
                        	gameState.flags.BedPressed = true;
				break;                               
                        }
                }
            },
            "search_the_bed": {
                lookDescription: "You see a bed, normal like other around",
                handler: () => {
                        gameState.message = "You filp and search the bedding, however you find nothing.";
                 }
            },
            "inspect_torch": {
                lookDescription: "Standard torch, you wonder how come they are not going out with all that water dripping.",
                handler: () => {
			if (gameState.flags.BedPressed) {
			    if (gameState.flags.Torch1) {
				gameState.message = "You pull the torch and hear a clink. Nothing happens";
	                        gameState.flags.Torch1 = false;
			    } else {
				gameState.message = "You push the torch and hear a clink. Nothing happens";
	                        gameState.flags.Torch1 = true;
			    }
			} else {
				gameState.message = "You try to interact with the torch. Nothing happens";				
			}
                 }
            },
            "inspect_torch2": {
                lookDescription: "Standard torch, you wonder how come they are not going out with all that water dripping.",
                handler: () => {
			if (gameState.flags.BedPressed) {
			    if (gameState.flags.Torch2) {
				gameState.message = "You pull the torch and hear a clink. Nothing happens";
	                        gameState.flags.Torch2 = false;
			    } else {
				gameState.message = "You push the torch and hear a clink. Nothing happens";
	                        gameState.flags.Torch2 = true;
			    }
			} else {
				gameState.message = "You try to interact with the torch. Nothing happens";				
			}
                 }
            },
            "inspect_olive": {
                lookDescription: "Bottle of Olive oil, what's it doing inside a cell?",
                handler: () => {
                        addItemToInventory("Olive");
			gameState.message = "You examine the bottle and decide to take it with you.";
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
                    if (gameState.selectedItemForUse && gameState.selectedItemForUse.name === "Torch") {
                        gameState.message = "You use the torch to light up the dark area. You see a small, almost invisible inscription on the wall! It reads: 'The path is revealed to those who persist.'";
                        // Potentially remove torch if it's a one-time use for this puzzle
                        // removeItemFromInventory("Torch");
                        // gameState.flags.darkAreaInspected = true; // Flag to prevent re-inspection or change message
                    } else {
                        gameState.message = "It's too dark to see anything in this corner. If only you had a light source...";
                    }
                }
            },
            "activate_torture_device": {
                lookDescription: "A menacing-looking device. You're not sure you want to know how it works.",
                handler: () => {
                    gameState.flags.tortureSequenceCompleted = true;
                    gameState.message = "You touch the device. A loud grinding noise echoes, and all the details of the room fade into darkness for a moment...";
                    updateHotspotsForCurrentScene();
                    renderMessage();
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
