import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {FilterDialogData} from "../food-search/food-search.component";
import {DatabaseService} from "../database-service/database.service";
import {EventLocation, GetLocationsRes} from "../models/databse-service.models";
import {databaseServiceProvider} from "../database-service/database.service.provider";
import {ValueConverter} from "@angular/compiler/src/render3/view/template";

@Component({
  selector: 'app-add-food-dialog',
  templateUrl: './add-food-dialog.component.html',
  styleUrls: ['./add-food-dialog.component.scss'],
  providers: [databaseServiceProvider]
})
export class AddFoodDialogComponent implements OnInit {

  public locations: EventLocation[];

  public locationOutdoors = true;

  public addFoodForm = this.formBuilder.group({
    foodName: ['', Validators.required],
    foodDesc: ['', Validators.required],
    locationSelect: ['', Validators.required],
    room: ['']
  });

  constructor(public dialogRef: MatDialogRef<AddFoodDialogComponent>,
              private formBuilder: FormBuilder,
              private dbService: DatabaseService) {
  }

  ngOnInit(): void {
    this.dbService.getLocations().subscribe((res: GetLocationsRes) => {
      this.locations = res.locations;
    });

    this.addFoodForm.get('locationSelect')?.valueChanges.subscribe((val) => {
      this.locationChanged(val)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  locationChanged(id: number) {
    const eventLocation = this.getLocationById(id);
    console.log(eventLocation);
    this.locationOutdoors = eventLocation.isOutdoor;
  }

  private getLocationById(id: number) {
    return this.locations.filter((location: EventLocation) => {
      return location.locationID === id;
    })[0];
  }

}
