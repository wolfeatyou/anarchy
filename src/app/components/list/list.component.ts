import {Component, Input, OnInit} from '@angular/core';
import {DataSourceState} from '../../stores/DataSourceState/datasource.state';
import {PartState} from "../../stores/part.state";
import {ListState} from "../../stores/list.state";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  listState: ListState;
  JSON: any;

  constructor() {
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
  }

  selectRow(item: any) {
    this.state.dataSource.setSelectedItem(item);
  }
}
