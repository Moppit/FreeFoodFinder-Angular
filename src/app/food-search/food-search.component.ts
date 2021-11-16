import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";
import {map, Observable, startWith} from "rxjs";
import {DatabaseService} from "../database-service/database.service";
import {databaseServiceProvider} from "../database-service/database.service.provider";
import {EventLocation, GetLocationsRes} from "../models/databse-service.models";

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.scss'],
  providers: [databaseServiceProvider]
})
export class FoodSearchComponent implements OnInit {

  public locations: string[] = [];
  public filteredLocations: Observable<string[]>;

  public foodSearchForm: FormGroup = this.formBuilder.group({
    search: [''],
    location: ['']
  });

  public filters: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private dbService: DatabaseService) {
  }

  ngOnInit(): void {
    this.dbService.getLocations().subscribe((res: GetLocationsRes) => {
      res.locations.forEach((loc: EventLocation) => {
        this.locations.push(loc.locationName);
      });
      this.filteredLocations = this.foodSearchForm.get('location')!.valueChanges.pipe(startWith(''), map(value => this.filter(value)));
    });
  }

  public search() {
    console.log(this.foodSearchForm.value)
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
    return this.locations.filter(option => option.toLowerCase().includes(filterValue));
  }
}

export interface FilterDialogData {
  filters: string[];
}

