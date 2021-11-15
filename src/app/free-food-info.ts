export enum Filters {
  GLUTEN_FREE = "Gluten Free",
  LACTOSE_FREE = "Lactose Free",
  VEGAN = "Vegan",
  KOSHER = "Kosher",
  VEGETARIAN = "Vegetarian",
  NO_EGGS = "No Eggs",
  NO_PEANUTS = "No Peanuts",
  NO_SOY = "No Soy"
}

export interface LocationInfo {
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
}

export const cuLocations: LocationInfo[] = [
  {
    name: "Engineering Center",
    latitude: 40.0067851,
    longitude: -105.2628907,
    address: "1111 Engineering Dr, Boulder, CO 80309",
  },
  {
    name: "Farrand Hall",
    latitude: 40.0060543,
    longitude: -105.2659049,
    address: "2200 Baker Dr, Boulder, CO 80310"
  },
  {
    name: "University Memorial Center (UMC)",
    latitude: 40.0067708,
    longitude: -105.2723964,
    address: "1669 Euclid Ave, Boulder, CO 80309"
  }
];
