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
  report_count: number,
}

export interface GetEventsRes {
  events: FoodEvent[]
}

export interface GetLocationsRes {
  locations: EventLocation[];
}

export interface CreateFoodEventReq {
  name: string;
  desc: string;
  locationID: number;
  room: string; //TODO check to make sure valid request without room
  availableUntil: string;
  glutenFree: boolean;
  lactoseFree: boolean;
  vegan: boolean;
  kosher: boolean;
  vegetarian: boolean;
  noEggs: boolean;
  noPeanuts: boolean;
  noSoy: boolean;
}

export interface FilterReq {
  searchTerm?: string;
  locationID?: number;
  filters?: string[];
}
