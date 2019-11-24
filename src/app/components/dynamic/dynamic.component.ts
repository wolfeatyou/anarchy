import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';



@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.less']
})
export class DynamicComponent implements OnInit {

  @ViewChild('template', null) template;


  @Input()
  set state(state: any) {
    //this._state = state;
  }

  constructor(
    /*private viewContainerRef: ViewContainerRef*/
  ) { }

  ngOnInit() {
    if(this.template) {
   //   console.log(11111111111)
      //this.viewContainerRef.createEmbeddedView(this.template);
    }
  }

}
