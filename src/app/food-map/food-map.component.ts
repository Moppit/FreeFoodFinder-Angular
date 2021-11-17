import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DatabaseService} from "../database-service/database.service";
import {databaseServiceProvider} from "../database-service/database.service.provider";
import {FoodEvent, GetAllEventsRes} from "../models/databse-service.models";
import {MapInfoWindow, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-food-map',
  templateUrl: './food-map.component.html',
  styleUrls: ['./food-map.component.scss'],
  providers: [databaseServiceProvider]
})
export class FoodMapComponent implements OnInit {


  public mapOptions: google.maps.MapOptions;
  public markerOptions: google.maps.MarkerOptions[] = [];
  public foodEvents: FoodEvent[];
  public infoWindows: google.maps.InfoWindow[] = [];

  @ViewChildren(MapInfoWindow) infoWindowsView: QueryList<MapInfoWindow>;
  @ViewChildren(MapMarker) markersView: QueryList<MapMarker>;

  constructor(private databaseService: DatabaseService) {
    this.mapOptions = {
      center: {
        lat: 40.007620, lng: -105.265649
      },
      restriction: {
        latLngBounds: {
          east: -105.235225,
          north: 40.018363,
          south: 39.998582,
          west: -105.291545
        }
      }
    }
  }

  ngOnInit(): void {
    this.databaseService.getAllEvents().subscribe((res: GetAllEventsRes) => {
      this.foodEvents = res.events;
      console.log(res.events);
      res.events.forEach((event: FoodEvent) => {

        const options: google.maps.MarkerOptions = {
          position: {
            lat: event.locationID.latitude,
            lng: event.locationID.longitude
          },
          title: event.foodName,
          clickable: true,
        };

        this.markerOptions.push(options);

      });
    });
  };

  openInfoWindow(windowIndex: number) {
    this.infoWindowsView.get(windowIndex)!.open(this.markersView.get(windowIndex));
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }
}
