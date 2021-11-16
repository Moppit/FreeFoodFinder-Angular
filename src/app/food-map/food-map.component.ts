import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../database-service/database.service";
import {databaseServiceProvider} from "../database-service/database.service.provider";
import {FoodEvent, GetAllEventsRes} from "../models/databse-service.models";

@Component({
  selector: 'app-food-map',
  templateUrl: './food-map.component.html',
  styleUrls: ['./food-map.component.scss'],
  providers: [databaseServiceProvider]
})
export class FoodMapComponent implements OnInit {


  public mapOptions: google.maps.MapOptions = {
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

  public markerOptions: google.maps.MarkerOptions[] = [];

  public foodEvents: FoodEvent[];

  constructor(private databaseService: DatabaseService
  ) {
  }

  ngOnInit()
    :
    void {
    this.databaseService.getAllEvents().subscribe((res: GetAllEventsRes) => {
      this.foodEvents = res.events;
      res.events.forEach((event: FoodEvent) => {
        this.markerOptions.push({
          position: {
            lat: event.locationID.latitude,
            lng: event.locationID.longitude
          } as google.maps.LatLngLiteral,
          title: event.foodName,
          clickable: true,
        } as google.maps.MarkerOptions);
      });
    }, error => {
      // TODO: better error handling
      console.log(error)
    });
  }

}
