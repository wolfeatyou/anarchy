import {Component, Input, OnInit} from '@angular/core';
import {DataSourceState} from '../../stores/DataSourceState/datasource.state';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  dataSource: DataSourceState;
  JSON: any;

  constructor() {
    this.JSON = JSON;
  }

  @Input()
  set dataSourceState(dataSource: DataSourceState) {
    this.dataSource = dataSource;
  }

  getItems() {
    return this.dataSource ? this.dataSource.data : null;
  }

  selectRow(item: any) {
    this.dataSource.setSelectedItem(item);
  }

  ngOnInit() {
  }

}
