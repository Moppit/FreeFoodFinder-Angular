import {Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {DatabaseService} from "../database-service/database.service";
import {databaseServiceProvider} from "../database-service/database.service.provider";
import {FoodEvent, GetEventsRes} from "../models/databse-service.models";
import {MapInfoWindow, MapMarker} from "@angular/google-maps";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-food-map',
  templateUrl: './food-map.component.html',
  styleUrls: ['./food-map.component.scss'],
  providers: [databaseServiceProvider]
})
export class FoodMapComponent implements OnInit, OnChanges {


  public mapOptions: google.maps.MapOptions;
  public markerOptions: google.maps.MarkerOptions[] = [];
  public hasBeenReported: boolean[] = [];
  public infoWindows: google.maps.InfoWindow[] = [];
  @ViewChildren(MapInfoWindow) infoWindowsView: QueryList<MapInfoWindow>;
  @ViewChildren(MapMarker) markersView: QueryList<MapMarker>;

  @Input() foodEvents: FoodEvent[] = [];

  /**
   *
   *  DEPENDENCY INJECTION
   *
   *  Here we inject the DatabaseService into the component.
   *  We assist the Angular framework by giving it a provider
   *  (seen at the top of the class)
   *
   */
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
    this.markerOptions = [];
    /**
     *
     *  OBSERVER
     *
     *  We are making use of the observer implementation provided by the
     *  library RxJs. databaseService.getAllEvents returns a subject that
     *  the client proceeds to subscribe to. All messages published by
     *  the subject (in this case just a singular http response body, or
     *  error) are passed on to all clients. This allows for asynchronous
     *  behavior and decoupling.
     *
     */
    this.databaseService.getAllEvents().subscribe((res: GetEventsRes) => {
      this.foodEvents = res.events;
      console.log(res.events);
      res.events.forEach((event: FoodEvent) => {

        const options: google.maps.MarkerOptions = {
          position: {
            lat: event.locationID.latitude + this.getRandomOffset(),
            lng: event.locationID.longitude - this.getRandomOffset()
          },
          title: event.foodName,
          clickable: true,
        };

        this.markerOptions.push(options);
        this.hasBeenReported.push(false);
      });
    });
  };

  ngOnChanges(changes: SimpleChanges) {
    console.log("CHANGES")
    console.log(changes)
    this.markerOptions = [];
    this.hasBeenReported = [];
    this.foodEvents = changes['foodEvents']?.currentValue;
    if (!this.foodEvents) {
      this.foodEvents = [];
    }
    this.foodEvents.forEach((event: FoodEvent) => {

      const options: google.maps.MarkerOptions = {
        position: {
          lat: event.locationID.latitude,
          lng: event.locationID.longitude
        },
        title: event.foodName,
        clickable: true,
      };

      this.markerOptions.push(options);
      this.hasBeenReported.push(false);
    });
  }

  openInfoWindow(windowIndex: number) {
    this.infoWindowsView.get(windowIndex)!.open(this.markersView.get(windowIndex));
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }

  reportFoodEvent(id: number){
    this.databaseService.increaseReport(id).subscribe(_ => {
      const event = this.foodEvents.filter(f => f.eventID === id)[0]
      event.reports++;
      this.hasBeenReported[this.foodEvents.indexOf(event)] = true;
    });
  }

  getRandomOffset(): number{
    return (Math.random() * (0.0003 - 0.00002) + 0.00002);
  }
}
