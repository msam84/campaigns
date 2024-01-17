import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';


@Component({
  selector: 'app-main-ui',
  templateUrl: './main-ui.component.html',
  styleUrls: ['./main-ui.component.scss']
})
export class MainUiComponent implements OnInit {

  public searchString = ""
  public startDate = 0;
  public endDate = 0;

  @ViewChild('pickerStart') pickerStart?: MatDatepicker<Date | null>;
  @ViewChild('pickerEnd') pickerEnd?: MatDatepicker<Date | null>;

  constructor() { }

  ngOnInit(): void {
  }

  public searchChanged(): void {
    console.info("searching for "+this.searchString);
  }

  public resetDates(): void {
    this.pickerStart?.select(null);
    this.pickerEnd?.select(null);
  }

}
