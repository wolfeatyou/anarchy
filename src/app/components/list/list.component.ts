import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {DataSourceState} from '../../stores/DataSourceState/datasource.state';
import {PartState} from "../../stores/part.state";
import {ListState} from "../../stores/list.state";

declare var agGrid;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  listState: ListState;
  JSON: any;

  constructor(public element: ElementRef) {
    this.JSON = JSON;
  }

  @Input()
  set state(panel: ListState) {
    this.listState = panel;
  }

  get state(): ListState {
    return this.listState;
  }


  ngOnInit() {
    var el = this.element.nativeElement;
    var columnDefs = [
      {headerName: "Contract number", field: "make"},
      {headerName: "Status", field: "make"},
      {headerName: "Expiration date", field: "make"},
      {headerName: "Country", field: "make"},
      {headerName: "Card issued", field: "make"},
      {headerName: "Consumptions", field: "make"}
    ];

    // specify the data
    var rowData = [
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000},
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000},
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000},
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000},
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000},
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000},
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000},
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000},
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000}


    ];



    // let the grid know which columns and what data to use
    var gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData,
      paginationAutoPageSize: true,
      pagination: true,
      rowHeight: 38,
      //onFirstDataRendered: (params) => params.api.sizeColumnsToFit()
    };

    // lookup the container we want the Grid to use
    var eGridDiv = el.querySelector('#myGrid');

    // create the grid passing in the div to use together with the columns & data we want to use
    new agGrid.Grid(eGridDiv, gridOptions);
  }

  selectRow(item: any) {
    this.state.dataSource.setSelectedItem(item);
  }


}
