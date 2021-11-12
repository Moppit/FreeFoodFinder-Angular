import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-map',
  templateUrl: './food-map.component.html',
  styleUrls: ['./food-map.component.scss']
})
export class FoodMapComponent implements OnInit {

  // CU Boulder coords
  public center: google.maps.LatLngLiteral = {
    lat: 40.007620, lng: -105.265649
  }

  constructor() { }

  ngOnInit(): void {
  }

}
