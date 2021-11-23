import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FilterDialogData} from "../food-search/food-search.component";
import {DatabaseService} from "../database-service/database.service";
import {CreateFoodEventReq, EventLocation, GetLocationsRes} from "../models/databse-service.models";
import {databaseServiceProvider} from "../database-service/database.service.provider";
import {ValueConverter} from "@angular/compiler/src/render3/view/template";
import {Filters} from "../free-food-info";
import {KeyVal} from "../filter-dialog/filter-dialog.component";

@Component({
  selector: 'app-add-food-dialog',
  templateUrl: './add-food-dialog.component.html',
  styleUrls: ['./add-food-dialog.component.scss'],
  providers: [databaseServiceProvider]
})
export class AddFoodDialogComponent implements OnInit {

  public locations: EventLocation[];
  public filterKeys: string[] = [];
  public filters: string[] = [];
  public locationOutdoors = true;

  public addFoodForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddFoodDialogComponent>,
              private formBuilder: FormBuilder,
              private dbService: DatabaseService) {
    let controlConfig: KeyVal = {
      foodName: ['', Validators.required],
      foodDesc: ['', Validators.required],
      locationSelect: ['', Validators.required],
      room: [''],
      date: ['', Validators.required],
      time: ['', Validators.required]
    }

    Object.keys(Filters).forEach((key: string) => {
      this.filterKeys.push(key);
      controlConfig[key] = [false];
    })
    Object.values(Filters).forEach((filterVal: string) => {
      this.filters.push(filterVal);
    });
    console.log(this.filterKeys)
    this.addFoodForm = this.formBuilder.group(controlConfig);
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

  submitFoodEvent() {
    if (this.addFoodForm.invalid){
      console.log(this.addFoodForm.value)
    }else{
      const createFoodReq: CreateFoodEventReq = {
        name: this.addFoodForm.get('foodName')!.value,
        desc: this.addFoodForm.get('foodDesc')!.value,
        availableUntil: this.parseDateTime(this.addFoodForm.get('date')!.value, this.addFoodForm.get('time')!.value),
        locationID: this.addFoodForm.get('locationSelect')!.value,
        room: this.addFoodForm.get('room')?.value === null ? '': this.addFoodForm.get('room')?.value ,
        glutenFree: this.addFoodForm.get('GLUTEN_FREE')!.value,
        kosher: this.addFoodForm.get('KOSHER')!.value,
        lactoseFree: this.addFoodForm.get('LACTOSE_FREE')!.value,
        noEggs: this.addFoodForm.get('NO_EGGS')!.value,
        noPeanuts: this.addFoodForm.get('NO_PEANUTS')!.value,
        noSoy: this.addFoodForm.get('NO_SOY')!.value,
        vegan: this.addFoodForm.get('VEGAN')!.value,
        vegetarian: this.addFoodForm.get('VEGETARIAN')!.value
      }

      this.dbService.createEvent(createFoodReq).subscribe(res => {
        this.dialogRef.close();
      });
    }
  }

  private parseDateTime(date: string, time: string) {
    const d = new Date(date);
    const offset = time.substring(time.indexOf(" ") + 1) == "PM" ? 12 : 0;
    const hour = parseInt(time.substring(0, time.indexOf(" ")).split(":")[0]);
    const minute = parseInt(time.substring(0, time.indexOf(" ")).split(":")[1]);
    console.log(hour, offset)
    d.setHours(hour + offset);
    d.setMinutes(minute);
    d.setSeconds(0 - d.getTimezoneOffset());
    return d.toISOString();
  }

}
