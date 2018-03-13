import {Status, Requirements} from './enums/Enums';

var rawTaskList =
  [
    {
      name: "Aberrant Spectre",
      weight: 7,
      requirements: {
        level: 60
      }
    },
    {
      name: "Abyssal Demon",
      weight: 12,
      requirements: {
        level: 85
      }
    },
    {
      name: "Adamant Dragon",
      weight: 2,
      requirements: {
        quest: "Dragon Slayer II"
      }
    },
    {
      name: "Ankou",
      weight: 5
    },
    {
      name: "Aviansie",
      weight: 8,
      requirements: {
        unlock: {
          name : "Watch the birdy ability",
          cost : 80 
        }
      }
    },
    {
      name: "Black Demon",
      weight: 8
    },
    {
      name: "Black dragon",
      weight: 9
    },
    {
      name: "Bloodveld",
      weight: 8,
      requirements: {
        level: 50
      }
    },
    {
      name: "Blue dragon",
      weight: 4
    },
    {
      name: "Boss",
      weight: 12,
      requirements: {
        unlock: {
          name : "Like a boss",
          cost : 200  
        }
      }
    },
    {
      name: "Cave Horror",
      weight: 4,
      requirements: {
        level: 58,
        quest: "Cabin Fever"
      }
    },
    {
      name: "Cave Kraken",
      weight: 9,
      requirements: {
        level: 87
      }
    },
    {
      name: "Dagannoth",
      weight: 9
    },
    {
      name: "Dark Beast",
      weight: 11,
      requirements: {
        level: 90,
        quest: "Mourning's End Part II"
      }
    },
    {
      name: "Dust Devil",
      weight: 5,
      requirements: {
        level: 65,
        quest: "Desert Treasure"
      }
    },
    {
      name: "Elves",
      weight: 4,
      requirements: {
        quest: "Regicide"
      }
    },
    {
      name: "Fire giant",
      weight: 7
    },
    {
      name: "Fossil Island Wyvern",
      weight: 5,
      requirements: {
        level: 66,
        quest: "Bone Voyage"
      }
    },
    {
      name: "Gargoyle",
      weight: 8,
      requirements: {
        level: 75
      }
    },
    {
      name: "Greater Demon",
      weight: 9
    },
    {
      name: "Hellhound",
      weight: 10
    },
    {
      name: "Iron Dragon",
      weight: 5
    },
    {
      name: "Kalphite",
      weight: 9
    },
    {
      name: "Kurask",
      weight: 4,
      requirements: {
        level: 70
      }
    },
    {
      name: "Lizardmen",
      weight: 10,
      requirements: {
        unlock: {
          name : "Reptile got ripped",
          cost : 75 
        }
      }
    },
    {
      name: "Mithril Dragon",
      weight: 10,
      requirements: {
        unlock: {
          name : "I hope you mith me",
          cost : 80 
        }
      }
    },
    {
      name: "Nechryael",
      weight: 9,
      requirements: {
        level: 80
      }
    },
    {
      name: "Red Dragon",
      weight: 8,
      requirements: {
        unlock: {
          name : "Seeing red",
          cost : 50 
        }
      }
    },
    {
      name: "Rune Dragon",
      weight: 2,
      requirements: {
        quest: "Dragon Slayer II"
      }
    },
    {
      name: "Skeletal Wyvern",
      weight: 7,
      requirements: {
        level: 72
      }
    },
    {
      name: "Smoke Devil",
      weight: 9,
      requirements: {
        level: 93
      }
    },
    {
      name: "Spiritual Creatures",
      weight: 7,
      requirements: {
        level: 63,
        quest: "Death Plateau"
      }
    },
    {
      name: "Steel Dragon",
      weight: 7
    },
    {
      name: "Suqah",
      weight: 8,
      requirements: {
        quest: "Lunar Diplomacy"
      }
    },
    {
      name: "Troll",
      weight: 6
    },
    {
      name: "TzHaar",
      weight: 10,
      requirements: {
        unlock: {
          name : "Hot stuff",
          cost : 100  
        }
      }
    },
    {
      name: "Waterfiend",
      weight: 2
    },
    {
      name: "Zygomite",
      weight: 2,
      requirements: {
        level: 57,
        quest: "Lost City"
      }
    }
  ]
  
export var taskList = _addStatus(_addRequirementType(rawTaskList));

function _addRequirementType(taskList) {
  return taskList.map(task => {
    task.reqType = _calcReqType(task);
    return task; 
  });
}

function _addStatus(taskList) {
  return taskList.map(task => {
    task.status = _calcStatus(task);
    return task; 
  }); 
}

function _calcReqType(task) {
  if(task.requirements === undefined)
    return Requirements.NONE;
  
  if(task.requirements.quest !== undefined)
    return Requirements.QUEST;
  
  if(task.requirements.unlock !== undefined)
    return Requirements.UNLOCK;
  
  if(task.requirements.level !== undefined)
    return Requirements.LEVEL;

  return Requirements.NONE;
}

function _calcStatus(task) {
  if(task.reqType === Requirements.NONE)
    return Status.ACTIVE;
  return Status.LOCKED;
}