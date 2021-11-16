export interface Restriction {
  restrictionID: number;
  glutenFree: boolean;
  vegan: boolean;
  vegetarian: boolean;
  noPeanut: boolean;
  lactoseFree: boolean;
  kosher: boolean;
  noEgg: boolean;
  noSoy: boolean;
}

export interface EventLocation {
  locationID: number;
  locationName: string;
  latitude: number;
  longitude: number;
  isOutdoor: boolean;
  address?: string;
}

export interface FoodEvent {
  eventID: number;
  foodName: string;
  availableUntil: string;
  foodDescription: string;
  roomNumber: string;
  restrictionID: Restriction;
  locationID: EventLocation;
}

export interface GetAllEventsRes {
  events: FoodEvent[]
}

export interface GetLocationsRes {
  locations: EventLocation[];
}
