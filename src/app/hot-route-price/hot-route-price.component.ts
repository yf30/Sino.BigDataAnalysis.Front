import { Component, OnInit } from '@angular/core';
import {DataService} from '../service/data.service';
import {CommonService} from '../service/common.service';
declare var echarts:any;
declare var $:any;
@Component({
  selector: 'app-hot-route-price',
  templateUrl: './hot-route-price.component.html',
  styleUrls: ['./hot-route-price.component.css']
})
export class HotRoutePriceComponent implements OnInit {

    constructor(
        private DataService:DataService,
        private CommonService:CommonService
    ) { }
    myChart=null;
    route_box_color=['#ff0000','#ffff00','#00ffff','#ff6600','#00ff00','#ff00ff']
    hotRouteList=["江苏镇江-广东广州","江苏镇江-广东广州","江苏镇江-广东广州","江苏镇江-广东广州","江苏镇江-广东广州","江苏镇江-广东广州"]
    option = {
        color:['#ff0000','#ffff00','#00ffff','#ff6600','#00ff00','#ff00ff'],
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        // legend: {
        //     data:['江苏镇江--广东广州','江苏镇江--广东深圳','江苏镇江--广东珠海','江苏镇江--广东东莞','江苏镇江--广东佛山','江苏镇江--广东茂名'],
        //     textStyle:{
        //         color:'#fff'
        //     }
        // },
        grid: {
            
            left: '7%',
            right: '1%',
            bottom: '1%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine:{
                lineStyle:{
                    color:'#0075a1'
                }
            },
            axisLabel : {
                show : true,
                textStyle : {
                    color : '#fff'
                },
            },
           
        },
        yAxis: {
            offset:0,
            // min:0,
            // max:1500,
            type: 'value',
            show:true,
            axisTick: {show: false},
            axisLine:{
                show :false,
                lineStyle:{
                    color:'#fff'
                }
                
            },
            nameTextStyle:{
                color:'#fff',
                // fontSize:16
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:['#0075a1']
                }
            }
        },
        series: [
            {
                name:'江苏镇江--广东广州',
                type:'line',
                smooth: true,
                stack: '总量1',
                data:[120, 130, 100, 130, 900, 230, 210],
                
            },
            {
                name:'江苏镇江--广东深圳',
                type:'line',
                stack: '总量2',
                smooth: true,
                data:[220, 180, 190, 230, 290, 330, 310],
            },
            {
                name:'江苏镇江--广东珠海',
                type:'line',
                stack: '总量3',
                smooth: true,
                data:[150, 230, 200, 150, 190, 330, 410],
                
            },
            {
                name:'江苏镇江--广东东莞',
                type:'line',
                stack: '总量4',
                smooth: true,
                data:[320, 330, 300, 330, 390, 330, 320],
                
            },
            {
                name:'江苏镇江--广东佛山',
                type:'line',
                stack: '总量5',
                smooth: true,
                data:[820, 930, 900, 930, 850, 650, 400],
                
            },
            {
                name:'江苏镇江--广东茂名',
                type:'line',
                stack: '总量6',
                smooth: true,
                data:[450, 100, 700, 650, 130, 100, 650],
                
            }
        ]
    };
    
    ngOnInit() {
        var scale=$('body').width()/1920;
        $('.route-box').width(8*scale+'px').height(8*scale+'px');
        this.route_box_color.forEach((item,index)=>{
            $(`.rbx0${index}`).css({'backgroundColor':item});
        })
        // this.render();
        this.loadData();
        setInterval(()=>{
            this.loadData()
        },5*60*1000)
    }

    render(){
        var dom = document.getElementById("hot-route-chart");
        var scale=$('body').width()/1920;
        $(dom).css({'width':420*scale+'px','height':250*scale+'px'});
        if(!this.myChart){
            this.myChart = echarts.init(dom);
        }
        this.myChart.clear();
        if (this.option && typeof this.option === "object") {
            this.myChart.setOption(this.option, true);
           
        }
    }

    loadData(){
         var now=new Date()
        var endDate=this.CommonService.getLastDayOfPreMonth();
        

        var thisMonth=now.getMonth()+1;
        var thisYear=now.getFullYear()
        var startMonth=thisMonth>6?thisMonth-6:thisMonth+6;
        var startYear=thisMonth>6?thisYear:thisYear-1;
        var startDate=startYear+'-'+startMonth+'-01';




        this.DataService.getFreightRateChart(2,11,startDate,endDate,0,-1).subscribe(res=>{
            this.option.xAxis.data=[];
            
            var list=res.data;
            // list.pop();
            this.hotRouteList=[];
            this.option.series.forEach(item=>{
                item.data=[];
            })
            // list.reverse();
            // console.log('list i s',list);
            list.forEach(item=>{
                item.value.reverse();
            })
            list[0].value.forEach((item,index)=>{
                
                this.option.xAxis.data.push({
                    value:item.time,
                    textStyle: {align:'right'}
                });
            })
            list.forEach((item,index) => {
                
                this.hotRouteList[index]=item.key;
                
                this.option.series[index].name=item.key;
                item.value.forEach((it,ind) => {
                    this.option.series[index].data.push(it.feeAmount.toFixed(1));
                });
            
            });
            this.hotRouteList= this.hotRouteList.map(item=>{
                
               
                return item.replace(/((北京|上海|重庆|天津)辖县)|(自治州)/g,'');
            })
            
            this.render();
        })
    }

}
