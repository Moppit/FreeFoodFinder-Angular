import { Component } from '@angular/core';
import {FoodEvent} from "./models/databse-service.models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FreeFoodFinderAngular';
  foodEvents: FoodEvent[];

  receivedFoodEvents(events: FoodEvent[]): void {
    this.foodEvents = events;
    console.log(events)
  }
}
