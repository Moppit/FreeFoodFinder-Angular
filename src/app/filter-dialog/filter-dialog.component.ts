import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FilterDialogData} from "../food-search/food-search.component";
import {Filters} from "../models"
import {FormBuilder, FormGroup} from "@angular/forms";

export interface KeyVal {
  [key: string]: any;
}

export interface FormObj {
  [key: string]: boolean;
}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {

  public filterKeys: string[] = [];
  public filters: string[] = [];
  public filtersForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: FilterDialogData,) {

    let controlConfig: KeyVal = {};

    Object.keys(Filters).forEach((key: string) => {
      this.filterKeys.push(key);

      // Persist values that are entered in (previously selected filters should still be selected).
      controlConfig[key] = this.data.filters.indexOf(key) == -1 ? [false] : [true];
    })

    Object.values(Filters).forEach((filterVal: string) => {
      this.filters.push(filterVal);
    });

    this.filtersForm = this.formBuilder.group(controlConfig);

    // Listen for form changes
    this.onFormChanges();

  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFormChanges() {
    this.filtersForm.valueChanges.subscribe(val => {
      // Need to do it this way to maintain the reference instead of setting a new list as the reference
      // this.data = {filters: <REFERENCE TO FILTERS VAR IN OTHER FILE>} so we don't want to destroy this reference
      FilterDialogComponent.clearList(this.data.filters);
      FilterDialogComponent.addToList(this.data.filters, this.buildFilterListFromFormVal(val));
    });
  }

  private static clearList(list: string[]) {
    const initLen = list.length;
    for (let i = 0; i < initLen; i++) {
      list.pop();
    }
  }

  private static addToList(list: string[], newList: string[]) {
    newList.forEach((val) => {
      list.push(val);
    })
  }

  private buildFilterListFromFormVal(val: FormObj): string[] {
    let filterList: string[] = [];
    Object.keys(val).forEach((key: string) => {
      if (val[key]) {
        filterList.push(key);
      }
    });
    return filterList;
  }

}
