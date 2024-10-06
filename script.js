// Part One

const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
  companion: {
    name: "Leo",
    type: "Cat",
    companion: {
      name: "Frank",
      type: "Flea",
      inventory: ["small hat", "sunglasses"],
    },
  },
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
  },
};

const itemCount = adventurer.inventory.length;

for (let i = 0; i < itemCount; i++) {
  console.log(adventurer.inventory[i]);
}

adventurer.roll();
adventurer.roll();
adventurer.roll();

class Character {
  static MAX_HEALTH = 100;
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    return result;
    // console.log(`${this.name} rolled a ${result}.`);
  }
}

const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

console.log(robin);

robin.companion.roll();

// Part Three
class Adventurer extends Character {
  static roles = ["Fighter", "Healer", "Wizard", "1st Class SOLDIER"];

  constructor(name, role, ability, rangedAtker, level, experience) {
    super(name);
    // Adventurers have specialized roles.

    if (!Adventurer.roles.includes(role)) {
      console.log("Role doesn't exist.");
    }

    this.role = role;
    // Every adventurer starts with a bed and 50 gold coins.
    this.inventory.push("bedroll", "50 gold coins");
    this.ability = ability;
    this.rangedAtker = rangedAtker;
    this.level = level;
    this.experience = experience;
  }

  // Adventurers have the ability to scout ahead of them.
  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }

  rest() {
    super.health = 100;
  }
  damageTaken() {
    console.log("Damage from enemy");
    super.health -= 5;
  }

  duel(adventurer) {
    let round = 0;
    while (this.health > 50 && adventurer.health > 50) {
      const dueler = super.roll();
      const victim = adventurer.roll();

      if (dueler > victim) {
        this.health -= 1;
        round++;
        console.log(`${this.name} Health: ${this.health}, ${adventurer.name}, heath: ${adventurer.health}
                              Round: ${round}`);
      } else if (dueler < victim) {
        adventurer.health -= 1;
        round++;
        console.log(
          `${this.name} Health: ${this.health}, ${adventurer.name} heath: ${adventurer.health}, Round: ${round}`
        );
      } else {
        round++;
        console.log(`Round: ${round}, Draw`);
      }

      if (this.health === 50) {
        console.log(`Winner is ${adventurer.name}`);
      } else if (adventurer.health === 50) {
        console.log(`Winner is ${this.name}`);
      }
    }
  }
}

class Companion extends Character {
  constructor(name, type, inventory) {
    super(name);
    this.type = type;
    this.inventory = inventory;
  }
  assist(name) {
    console.log(`${this.name} is assisting ${name}`);
  }
}

const robin2 = new Adventurer("Robin", "Wizard", "Fireball", true, 30, 80);

const Jarry = new Adventurer("Jarry", "Fighter", "Uppercut", false, 30, 50);

robin2.duel(Jarry);

const leo = new Companion("Leo", "Cat");
const frank = new Companion("Frank", "Flea", ["small hat", "sunglasses"]);

// // console.log(robin2);
// robin2.roll();
// robin2.scout();
// robin2.damageTaken();

// console.log(leo);
// leo.assist("Robin");
// console.log(frank);

// Part Four
class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }
  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
  }
  findByIndex(index) {
    return this.adventurers[index];
  }
  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

const healers = new AdventurerFactory("Healer");
const aerith_temp = healers.generate("Aerith Gainsborough");
const aerith = healers.findByName("Aerith Gainsborough");
aerith.ability = "healing wind";
aerith.rangedAtker = true;
aerith.level = 45;
aerith.experience = 5000;
console.log(aerith);

const SOLDIER_1ST_CLASS = new AdventurerFactory("1st Class SOLDIER");
const sephiroth_temp = SOLDIER_1ST_CLASS.generate("Sephiroth");
const sephiroth = SOLDIER_1ST_CLASS.findByName("Sephiroth");
sephiroth.ability = "octoslash";
sephiroth.rangedAtker = false;
sephiroth.level = 100;
sephiroth.experience = 100000;
console.log(sephiroth);

aerith.duel(sephiroth);

console.log(`Yay, Aerith survives. Snake, this is a paradox!`);
