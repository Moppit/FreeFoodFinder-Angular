import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";
import {map, Observable, startWith} from "rxjs";
import {DatabaseService} from "../database-service/database.service";
import {databaseServiceProvider} from "../database-service/database.service.provider";
import {EventLocation, FilterReq, FoodEvent, GetEventsRes, GetLocationsRes} from "../models/databse-service.models";

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.scss'],
  providers: [databaseServiceProvider]
})
export class FoodSearchComponent implements OnInit {

  public locationNames: string[] = [];
  public locations: EventLocation[] = [];
  public filteredLocations: Observable<string[]>;

  public foodSearchForm: FormGroup = this.formBuilder.group({
    search: [''],
    location: ['']
  });

  public filters: string[] = [];

  @Output() newFoodEventResults: EventEmitter<FoodEvent[]> = new EventEmitter<FoodEvent[]>();

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private dbService: DatabaseService) {
  }

  ngOnInit(): void {
    this.dbService.getLocations().subscribe((res: GetLocationsRes) => {
      res.locations.forEach((loc: EventLocation) => {
        this.locationNames.push(loc.locationName);
      });
      this.locations = res.locations;
      this.filteredLocations = this.foodSearchForm.get('location')!.valueChanges.pipe(startWith(''), map(value => this.filter(value)));
    });
  }

  public search() {
    const searchTerm: undefined | string = this.foodSearchForm.get('search')?.value.length == 0
      ? undefined :
      this.foodSearchForm.get('search')?.value;

    let locationId: undefined | number = undefined;
    const matchingLocations = this.locations.filter(
      l => l.locationName == this.foodSearchForm.get('location')?.value
    );
    if(matchingLocations.length > 0){
      locationId = matchingLocations[0].locationID;
    }

    const filterParam: undefined | string[] = this.filters.length === 0 ? undefined : this.filters;

    const filterReq: FilterReq = {
      searchTerm: searchTerm,
      locationID: locationId,
      filters: filterParam,
    }

    this.dbService.getFilteredEvents(filterReq).subscribe((res: GetEventsRes) => {
      this.newFoodEventResults.emit(res.events);
    })
  }

  public openFilterDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '500px',
      data: {filters: this.filters},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(this.filters);
    });

  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.locationNames.filter(option => option.toLowerCase().includes(filterValue));
  }
}

export interface FilterDialogData {
  filters: string[];
}

/**
 * https://material.angular.io/components/autocomplete/overview
 */
