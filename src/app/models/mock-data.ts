import {FoodEvent, GetAllEventsRes} from "./databse-service.models";
import {Utils} from "../utils";

export const events: FoodEvent[] =  [{
  "eventID":1,
  "foodName":"cookies",
  "availableUntil": Utils.getDateInFuture(2).toISOString(),
  "foodDescription":"Freshman Welcome!",
  "roomNumber":"ECCE 188",
  "restrictionID": {
    "restrictionID":1,
    "glutenFree":false,
    "vegan":true,
    "vegetarian":true,
    "noPeanut":false,
    "lactoseFree":true,
    "kosher":false,
    "noEgg":false,
    "noSoy":false
  },
  "locationID": {
    "locationID":1,
    "locationName":"Engineering Center",
    "latitude":20.50,
    "longitude":30.20,
    "inOrOutDoor":false
  }
},
]

export const getAllEventsResponses: GetAllEventsRes[] = [
  {
    "events": events
  }
];

