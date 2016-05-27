import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../firebase';
import { OrderDetail } from '../order-detail';
import { OrderList } from '../order-list';
import {OrderEvent} from "../models/OrderEvent";

@Component({
  moduleId: module.id,
  selector: 'order-board',
  template: require('./orderboard.component.html'),
  directives: [ OrderDetail, OrderList]
})

export class OrderBoard implements OnInit, OnDestroy, OnChanges {

  @Input("order_status") orderStatus:string = "OPEN";
  @Output() orderCountChange:EventEmitter<any> = new EventEmitter();
  @Output() orderAddedEvent:EventEmitter<OrderEvent> = new EventEmitter();
  @Output() orderRemovedEvent:EventEmitter<OrderEvent> = new EventEmitter();

  public orderList: any[] = [];
  private selectedOrder: any;
  private ordersRef: any;
  private hasInitialLoad: boolean = false;

  constructor(private _firebase: FirebaseService) {
    // this.ordersRef = this._firebase.getRootDatabase().ref('orders').orderByChild('status').equalTo("OPEN");

  }

  ngOnInit() {
  }
  ngOnChanges(changes:{}) {

    if(this.orderStatus == null) {
      this.orderStatus = "OPEN";
    }

  /*    this.ordersRef.off();
      this.ordersRef = this._firebase.getRootDatabase().ref('orders').orderByChild('status').equalTo(this.orderStatus);

      var that = this;
      this.ordersRef.once('value').then(function (snapshot) {

        snapshot.forEach((childSnapshot) => {
          that.orderList.unshift(childSnapshot.val());
        });

        // set selectedOrder to first item
        that.selectedOrder = that.orderList[0];
        // indicate that initially data has loaded
        that.hasInitialLoad = true;
      });*/


  }

  selectOrder(order) {
    this.selectedOrder = order;
  }

  ngOnDestroy() {
    // remove listener
    // this.ordersRef.off();
    console.log("On destroy orderboard");
  }


  onOrderCountChange(event) {
    this.orderCountChange.emit(event);
  }
  
  onOrderAdded(event) {
    this.orderAddedEvent.emit(event);
  }
  
  onOrderRemoved(event) {
    this.orderRemovedEvent.emit(event);
  }


}