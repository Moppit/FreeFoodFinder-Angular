import { Component, OnInit } from '@angular/core';
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddFoodDialogComponent} from "../add-food-dialog/add-food-dialog.component";

@Component({
  selector: 'app-add-food-button',
  templateUrl: './add-food-button.component.html',
  styleUrls: ['./add-food-button.component.scss']
})
export class AddFoodButtonComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddFoodDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log();
    });
  }

}
