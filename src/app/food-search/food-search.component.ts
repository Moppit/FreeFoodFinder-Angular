import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";
import {cuLocations, LocationInfo} from "../free-food-info";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.scss']
})
export class FoodSearchComponent implements OnInit {

  public locations: string[] = this.getLocationNames();
  public filteredLocations: Observable<string[]>;

  public foodSearchForm: FormGroup = this.formBuilder.group({
    search: [''],
    location: ['']
  });

  public filters: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.filteredLocations = this.foodSearchForm.get('location')!.valueChanges.pipe(startWith(''), map(value => this.filter(value)));
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

  private getLocationNames(): string[] {
    const locationNames: string[] = [];
    cuLocations.forEach((loc: LocationInfo) => {
      locationNames.push(loc.name);
    });
    return locationNames;
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.locations.filter(option => option.toLowerCase().includes(filterValue));
  }
}

export interface FilterDialogData {
  filters: string[];
}

