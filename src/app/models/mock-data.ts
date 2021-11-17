import {EventLocation, FoodEvent, GetAllEventsRes, GetLocationsRes} from "./databse-service.models";
import {Utils} from "../utils";

export const cuLocations: EventLocation[] = [
  {
    "locationID":1,
    "locationName":"Engineering Center",
    "latitude":40.007229,
    "longitude":-105.262077,//-105.2625,
    "isOutdoor":false,
    "address": "Test address"
  },
  {
    "locationID":2,
    "locationName":"Mathematics Building",
    "latitude":40.008,
    "longitude":-105.2645,
    "isOutdoor":false,
    "address": "Test address"
  },
  {
    "locationID":3,
    "locationName":"University Memorial Center (UMC)",
    "latitude":40.007092,
    "longitude":-105.272057,
    "isOutdoor":false,
    "address": "Test address"
  },
  {
    "locationID":2,
    "locationName":"Farrand Field",
    "latitude":20.50,
    "longitude":30.20,
    "isOutdoor":true,
    "address": "Test address"
  },
  {
    "locationID":3,
    "locationName":"UMC",
    "latitude":20.50,
    "longitude":30.20,
    "isOutdoor":false,
    "address": "Test address"
  }
];

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
  "locationID": cuLocations[0]
},
  {
    "eventID":2,
    "foodName":"pizza",
    "availableUntil": Utils.getDateInFuture(2).toISOString(),
    "foodDescription":"Celebrate Math Festival!",
    "roomNumber":"Lobby",
    "restrictionID": {
      "restrictionID":1,
      "glutenFree":false,
      "vegan":true,
      "vegetarian":true,
      "noPeanut":false,
      "lactoseFree":true,
      "kosher":true,
      "noEgg":true,
      "noSoy":false
    },
    "locationID": cuLocations[1]
  },
  {
    "eventID":3,
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
    "locationID": cuLocations[2]
  },
]

export const getAllEventsResponses: GetAllEventsRes[] = [
  {
    "events": events
  }
];

export const getLocationsResponses: GetLocationsRes[] = [
  {
    locations: cuLocations,
  }
];
