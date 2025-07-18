 // Game variables
        let xp = 0;
        let health = 100;
        let gold = 50;
        let currentWeapon = 0;
        let fighting;
        let monsterHealth;
        let inventory = ["STICK"];
        let playerLevel = 1;
        let achievements = [];

        // DOM elements
        const button1 = document.querySelector('#button1');
        const button2 = document.querySelector("#button2");
        const button3 = document.querySelector("#button3");
        const text = document.querySelector("#text");
        const xpText = document.querySelector("#xpText");
        const healthText = document.querySelector("#healthText");
        const goldText = document.querySelector("#goldText");
        const monsterStats = document.querySelector("#monsterStats");
        const monsterName = document.querySelector("#monsterName");
        const monsterHealthText = document.querySelector("#monsterHealth");
        const monsterLevelText = document.querySelector("#monsterLevel");
        const levelIndicator = document.querySelector("#levelIndicator");
        const currentLevelText = document.querySelector("#currentLevel");

        // Retro weapons
        const weapons = [
            { name: 'STICK', power: 5 },
            { name: 'DAGGER', power: 30 },
            { name: 'HAMMER', power: 50 },
            { name: 'SWORD', power: 100 },
            { name: 'DRAGON BLADE', power: 200 }
        ];

        // Classic monsters
        const monsters = [
            { name: "SLIME", level: 2, health: 15 },
            { name: "GOBLIN", level: 4, health: 25 },
            { name: "BEAST", level: 8, health: 60 },
            { name: "ORC", level: 12, health: 90 },
            { name: "DRAGON", level: 20, health: 300 }
        ];

        // Game locations
        const locations = [
            {
                name: "town square",
                "button text": ["GO TO STORE", "GO TO CAVE", "FIGHT DRAGON"],
                "button functions": [goStore, goCave, fightDragon],
                text: "YOU ARE IN THE TOWN SQUARE.<br>THERE IS A STORE TO THE EAST.<br>DARK CAVES LIE TO THE NORTH.<br>THE DRAGON WAITS IN THE MOUNTAINS."
            },
            {
                name: "store",
                "button text": ["BUY HEALTH (10 GOLD)", "BUY WEAPON (30 GOLD)", "BACK TO TOWN"],
                "button functions": [buyHealth, buyWeapon, goTown],
                text: "YOU ENTER THE WEAPON SHOP.<br>THE MERCHANT NODS AT YOU.<br>'WHAT CAN I DO FOR YOU, WARRIOR?'"
            },
            {
                name: "cave",
                "button text": ["FIGHT SLIME", "FIGHT GOBLIN", "BACK TO TOWN"],
                "button functions": [fightSlime, fightGoblin, goTown],
                text: "YOU ENTER THE DARK CAVE.<br>WATER DRIPS FROM THE CEILING.<br>YOU HEAR MONSTERS IN THE SHADOWS."
            },
            {
                name: "deeper cave",
                "button text": ["FIGHT BEAST", "FIGHT ORC", "BACK TO TOWN"],
                "button functions": [fightBeast, fightOrc, goTown],
                text: "YOU GO DEEPER INTO THE CAVE.<br>THE AIR IS THICK AND DANGEROUS.<br>ONLY BRAVE WARRIORS COME HERE."
            },
            {
                name: "fight",
                "button text": ["ATTACK", "DODGE", "RUN AWAY"],
                "button functions": [attack, dodge, goTown],
                text: "COMBAT HAS BEGUN!<br>CHOOSE YOUR ACTION CAREFULLY."
            },
            {
                name: "kill monster",
                "button text": ["BACK TO TOWN", "GO DEEPER", "MYSTERY OPTION"],
                "button functions": [goTown, goDeeper, easterEgg],
                text: "THE MONSTER IS DEFEATED!<br>YOU GAIN EXPERIENCE AND GOLD.<br>YOU FEEL STRONGER."
            },
            {
                name: "lose",
                "button text": ["RESTART GAME", "RESTART GAME", "RESTART GAME"],
                "button functions": [restart, restart, restart],
                text: "*** GAME OVER ***<br><br>YOU HAVE BEEN DEFEATED.<br>BUT HEROES NEVER DIE.<br>TRY AGAIN, WARRIOR!"
            },
            { 
                name: "win", 
                "button text": ["RESTART GAME", "RESTART GAME", "RESTART GAME"], 
                "button functions": [restart, restart, restart], 
                text: "*** VICTORY! ***<br><br>THE DRAGON IS SLAIN!<br>THE VILLAGE IS FREE!<br>YOU ARE A LEGEND!" 
            },
            {
                name: "easter egg",
                "button text": ["PICK 2", "PICK 8", "BACK TO TOWN"],
                "button functions": [pickTwo, pickEight, goTown],
                text: "YOU FOUND A MAGIC SHRINE.<br>ANCIENT RUNES GLOW ON THE WALLS.<br>PICK A NUMBER TO TEST YOUR LUCK."
            }
        ];

        // Initialize game
        function startGame() {
            document.getElementById('intro').style.display = 'none';
            document.getElementById('game').style.display = 'block';
            document.getElementById('levelIndicator').style.display = 'block';
            button1.onclick = goStore;
            button2.onclick = goCave;
            button3.onclick = fightDragon;
            updateLevel();
        }

        // Update player level
        function updateLevel() {
            const newLevel = Math.floor(xp / 10) + 1;
            if (newLevel > playerLevel) {
                playerLevel = newLevel;
                showAchievement("LEVEL UP!");
            }
            currentLevelText.innerText = playerLevel;
        }

        // Show achievement
        function showAchievement(message) {
            const achievement = document.createElement('div');
            achievement.className = 'achievement';
            achievement.innerText = message;
            document.body.appendChild(achievement);
            setTimeout(() => {
                if (document.body.contains(achievement)) {
                    document.body.removeChild(achievement);
                }
            }, 3000);
        }

        // Update function
        function update(location) {
            monsterStats.style.display = "none";
            button1.innerText = location["button text"][0];
            button2.innerText = location["button text"][1];
            button3.innerText = location["button text"][2];
            button1.onclick = location["button functions"][0];
            button2.onclick = location["button functions"][1];
            button3.onclick = location["button functions"][2];
            text.innerHTML = location.text;
        }

        // Navigation functions
        function goTown() {
            update(locations[0]);
        }

        function goStore() {
            update(locations[1]);
        }

        function goCave() {
            update(locations[2]);
        }

        function goDeeper() {
            if (playerLevel >= 5) {
                update(locations[3]);
            } else {
                text.innerHTML = "THE PATH IS BLOCKED.<br>YOU NEED MORE EXPERIENCE<br>TO VENTURE DEEPER.";
            }
        }

        // Shop functions
        function buyHealth() {
            if (gold >= 10) {
                gold -= 10;
                health += 10;
                if (health > 100) health = 100;
                goldText.innerText = gold;
                healthText.innerText = health;
                text.innerHTML = "YOU DRINK A HEALTH POTION.<br>YOU FEEL REFRESHED.";
            } else {
                text.innerHTML = "NOT ENOUGH GOLD<br>FOR HEALTH POTION.";
            }
        }

        function buyWeapon() {
            if (currentWeapon < weapons.length - 1) {
                if (gold >= 30) {
                    gold -= 30;
                    currentWeapon++;
                    goldText.innerText = gold;
                    let newWeapon = weapons[currentWeapon];
                    text.innerHTML = "YOU BOUGHT A " + newWeapon.name + "!<br>INVENTORY: " + inventory.join(", ");
                    inventory.push(newWeapon.name);
                    
                    if (currentWeapon === 1) {
                        showAchievement("FIRST WEAPON!");
                    }
                } else {
                    text.innerHTML = "NOT ENOUGH GOLD<br>FOR WEAPON.";
                }
            } else {
                text.innerHTML = "YOU HAVE THE BEST WEAPON!<br>SELL OLD WEAPONS FOR GOLD.";
                button2.innerText = "SELL WEAPON (15 GOLD)";
                button2.onclick = sellWeapon;
            }
        }

        function sellWeapon() {
            if (inventory.length > 1) {
                gold += 15;
                goldText.innerText = gold;
                let soldWeapon = inventory.shift();
                currentWeapon--;
                text.innerHTML = "YOU SOLD " + soldWeapon + "<br>FOR 15 GOLD.";
            } else {
                text.innerHTML = "CANNOT SELL YOUR<br>ONLY WEAPON!";
            }
        }

        // Combat functions
        function fightSlime() {
            fighting = 0;
            goFight();
        }

        function fightGoblin() {
            fighting = 1;
            goFight();
        }

        function fightBeast() {
            fighting = 2;
            goFight();
        }

        function fightOrc() {
            fighting = 3;
            goFight();
        }

        function fightDragon() {
            fighting = 4;
            goFight();
        }

        function goFight() {
            update(locations[4]);
            monsterHealth = monsters[fighting].health;
            monsterStats.style.display = "block";
            monsterName.innerText = monsters[fighting].name;
            monsterHealthText.innerText = monsterHealth;
            monsterLevelText.innerText = monsters[fighting].level;
        }

        function attack() {
            const monster = monsters[fighting];
            const weapon = weapons[currentWeapon];
            
            text.innerHTML = "THE " + monster.name + " ATTACKS!<br>";
            text.innerHTML += "YOU ATTACK WITH " + weapon.name + "!<br>";
            
            health -= getMonsterAttackValue(monster.level);
            
            if (isMonsterHit()) {
                const damage = weapon.power + Math.floor(Math.random() * xp) + 1;
                monsterHealth -= damage;
                text.innerHTML += "YOU DEAL " + damage + " DAMAGE!";
            } else {
                text.innerHTML += "YOU MISS!";
            }
            
            healthText.innerText = health;
            monsterHealthText.innerText = monsterHealth;
            
            if (health <= 0) {
                lose();
            } else if (monsterHealth <= 0) {
                if (fighting === 4) {
                    winGame();
                } else {
                    defeatMonster();
                }
            }
            
            if (Math.random() <= 0.1 && inventory.length > 1) {
                text.innerHTML += "<br>YOUR " + inventory.pop() + " BREAKS!";
                currentWeapon--;
            }
        }

        function getMonsterAttackValue(level) {
            const hit = (level * 5) - (Math.floor(Math.random() * xp));
            return hit > 0 ? hit : 0;
        }

        function isMonsterHit() {
            return Math.random() > 0.2 || health < 20;
        }

        function dodge() {
            text.innerHTML = "YOU DODGE THE " + monsters[fighting].name + "'S ATTACK!";
        }

        function defeatMonster() {
            const monster = monsters[fighting];
            gold += Math.floor(monster.level * 6.7);
            xp += monster.level;
            goldText.innerText = gold;
            xpText.innerText = xp;
            updateLevel();
            
            if (fighting === 0 && !achievements.includes('first_kill')) {
                achievements.push('first_kill');
                showAchievement("FIRST KILL!");
            }
            
            update(locations[5]);
        }

        function lose() {
            update(locations[6]);
        }

        function winGame() {
            showAchievement("DRAGON SLAYER!");
            update(locations[7]);
        }

        function restart() {
            xp = 0;
            health = 100;
            gold = 50;
            currentWeapon = 0;
            inventory = ["STICK"];
            playerLevel = 1;
            achievements = [];
            goldText.innerText = gold;
            healthText.innerText = health;
            xpText.innerText = xp;
            updateLevel();
            goTown();
        }

        function easterEgg() {
            update(locations[8]);
        }

        function pickTwo() {
            pick(2);
        }

        function pickEight() {
            pick(8);
        }

        function pick(guess) {
            const numbers = [];
            while (numbers.length < 10) {
                numbers.push(Math.floor(Math.random() * 11));
            }
            text.innerHTML = "YOU PICKED " + guess + ".<br>MAGIC NUMBERS: ";
            for (let i = 0; i < 10; i++) {
                text.innerHTML += numbers[i] + " ";
            }
            if (numbers.includes(guess)) {
                text.innerHTML += "<br><br>CORRECT! YOU WIN 20 GOLD!";
                gold += 20;
                goldText.innerText = gold;
                showAchievement("LUCKY!");
            } else {
                text.innerHTML += "<br><br>WRONG! YOU LOSE 10 HEALTH!";
                health -= 10;
                healthText.innerText = health;
                if (health <= 0) {
                    lose();
                }
            }
        }