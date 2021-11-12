import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.scss']
})
export class FoodSearchComponent implements OnInit {

  locations: string[] = [
    'UMC',
    'Engineering Lobby'
  ];

  public foodSearchForm: FormGroup = this.formBuilder.group({
    search: [''],
    location: ['']
  });

  public filters: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
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
}

export interface FilterDialogData {
  filters: string[];
}

