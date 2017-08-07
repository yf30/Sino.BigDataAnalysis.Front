import { Component, OnInit } from '@angular/core';
import {DataService} from '../service/data.service';
import {CommonService} from '../service/common.service';
import * as wilddog from 'wilddog';
declare var $:any;
declare var BMap:any;
@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {

    constructor(
        private DataService:DataService,
        private CommonService:CommonService
    ) { }

    orderList=[
     
    ]
    
    ngOnInit() {
        
         const config = {
            
            syncURL: "https://tms-web-dev.wilddogio.com/" //tms野狗地址
            // syncURL: "https://tmslizhijun.wilddogio.com/" //tms野狗地址
            // syncURL: 'https://wild-hare-72826.wilddogio.com' // tms dev野狗地址
        };
        wilddog.initializeApp(config);
        const ref = wilddog.sync().ref('BigData');
        // const ref_child=ref.child();
        ref.orderByKey().limitToLast(20).on('value', snapshot => {
            // console.log('snap',snapshot.val());
            ref.set(snapshot.val());
            var list=this.CommonService.getListFromObj(snapshot.val());
            
            var orderList=[];
            // list=list.sort(function(item1,item2){
            //     item1.OrderTime=item1.CreationTime?item1.CreationTime:item1.CarrierOrderTime;
            //     item2.OrderTime=item2.CreationTime?item2.CreationTime:item2.CarrierOrderTime;
            //     if(item1.OrderTime>item2.OrderTime){
            //         return -1;
            //     }else if(item1.OrderTime<item2.OrderTime){
            //         return 1
            //     }else{
            //         return 0;
            //     }
            // })
            // list=list.slice(0,10);
            list.reverse();
            list.forEach((item,index)=>{
                if(typeof item!='object'){return}
                item.OrderTime=item.CreationTime?item.CreationTime:item.CarrierOrderTime;
                item.Date=item.OrderTime.split(' ')[0].replace(/-/g,'/');
                item.Time=item.OrderTime.split(' ')[1];
                item.StartProvince=item.OriginCode.replace(item.OriginCityName,'');
                item.EndProvince=item.DestinationCode.replace(item.DestinationCityName,'');
                item.QuantityOfGoods=this.CommonService.trimZero(item.QuantityOfGoods)
                let miniNum=item.QuantityOfGoods.toString().split('.')[1];
                if(miniNum&&miniNum.length>=4){
                    item.QuantityOfGoods=Number(item.QuantityOfGoods).toFixed(4);
                    //保留四位后可能出现12.0000这样的情况
                    item.QuantityOfGoods=this.CommonService.trimZero(item.QuantityOfGoods)
                   

                }
                if(orderList.length<10){
                    orderList.push(item);
                }
            })
            // console.log(list)
            if(orderList.length===10){
                orderList[9].index=9
            }
            this.orderList=orderList;
            this.CommonService.orderEmit.emit(orderList)
            
        });

  
    }
}
