//This is the database of items for CYOA
//Items are stored as objects in a parent array

//Weapons
var Weapons = [
  {
    name: "Sword",
    type: "melee",
    atk: 4,
    spd: 5
  },
  {
    name: "Bow",
    type: "ranged",
    atk: 3,
    spd: 6
  },
  {
    name: "Axe",
    type: "melee",
    atk: 5,
    spd: 3
  },
  {
    name: "Frying Pan",
    type: "melee",
    atk: 1,
    spd: 6
  },
  {
    name: "Greatsword",
    type: "melee",
    atk: 7,
    spd: 1
  },
  {
    name: "Pixie Blast",
    type: "magic",
    atk: 3,
    spd: 8
  },
  {
    name: "Tinder Box",
    type: "magic",
    atk: 4,
    spd: 4
  },
  {
    name: "Side Sword",
    type: "melee",
    atk: 3,
    spd: 7
  },
  {
    name: "Spiked Club",
    type: "melee",
    atk: 6,
    spd: 2
  },
  {
    name: "Throwing Knife",
    type: "ranged",
    atk: 3,
    spd: 8
  },
  {
    name: "Infused Staff",
    type: "magic",
    atk: 4,
    spd: 6
  },
  {
    name: "Fireball",
    type: "magic",
    atk: 7,
    spd: 5
  },
  {
    name: "Sling",
    type: "ranged",
    atk: 4,
    spd: 5
  },
  {
    name: "Spear",
    type: "melee",
    atk: 4,
    spd: 7
  },
  {
    name: "Poleaxe",
    type: "melee",
    atk: 7,
    spd: 6
  },
  {
    name: "Scimitar",
    type: "melee",
    atk: 5,
    spd: 5
  },
  {
    name: "Mace",
    type: "melee",
    atk: 6,
    spd: 3
  },
  {
    name: "Rainbow of Doom, Destruction, Death and Despair",
    type: "magic",
    atk: 7,
    spd: 6
  },
  {
    name: "Poison Barb",
    type: "ranged",
    atk: 4,
    spd: 6
  },
  {
    name: "Magic Skewer",
    type: "melee",
    atk: 4,
    spd: 7
  },
];


//Boss moves/weapons
var BossWeapons = [
  {
    name: "Sword Tail",
    type: "melee",
    atk: 8,
    spd: 11
  },
  {
    name: "Fireball",
    type: "ranged",
    atk: 11,
    spd: 6
  },
  {
    name: "Atomic Blast",
    type: "magic",
    atk: 10,
    spd: 9
  },
];


//Armour
var Armour = [
  {
    name: "none",
    type: "basic",
    tough: 0,
    magDef: 0,
    weight: 0
  },
  {
    name: "Steel Plate",
    type: "basic",
    tough: 7,
    magDef: 0,
    weight: 3
  },
  {
    name: "Leather",
    type: "basic",
    tough: 3,
    magDef: 2,
    weight: 1
  },
  {
    name: "Bark",
    type: "magic",
    tough: 2,
    magDef: 5,
    weight: 1
  },
  {
    name: "Mail",
    type: "basic",
    tough: 5,
    magDef: 0,
    weight: 2
  },
  {
    name: "Gambeson",
    type: "basic",
    tough: 3,
    magDef: 2,
    weight: 1
  },
  {
    name: "Hoplite",
    type: "basic",
    tough: 7,
    magDef: 0,
    weight: 3
  },
  {
    name: "Magic Coat",
    type: "magic",
    tough: 1,
    magDef: 7,
    weight: 1
  },
];

//Book titles for finding xp in chests
var Books = [
  "'The Rogue's Encyclopedia, Volume Two: Traps and Contraptions'",
  "'The Seventy Maxims of Highly Effective Mercenaries'",
];