import { Injectable } from '@angular/core';
import { EventEmitter}    from '@angular/core';
declare var bootbox;
@Injectable()
export class CommonService {

    constructor() { }
    /**
     * 获取n天之前的时间，默认7天
     * @param day 
     */
    getEndDay(day?:number){
        var _day=day?day:7;
        var millseconds=Date.now()-_day*24*3600*1000;
        var endTime=new Date(millseconds)
        var year=endTime.getFullYear();
        var month=endTime.getMonth()+1;
        var date=endTime.getDate();

        return year+"-"+month+'-'+date
    }

    transformDate(date,type?){
        if(date==""||date==null||date=="0001-01-01"){return null};
        var t = date;
        var tf = function (i) { return (i < 10 ? '0' : '') + i };
        var ty=function(i){
            var tempStr;
            if(i<10){tempStr='000'+i}
            else if(i<100){tempStr='00'+i;}
            else if(i<1000){tempStr='0'+i}
            else{tempStr=i};
            return tempStr;
        }
        return ty(date.getFullYear())+'-'+tf(date.getMonth()+1)+"-"+tf(date.getDate());
    }
    

    transformTime(time: any, type?: any): void {
        if(time==""||time==null||time=="0001-01-01 00:00:00"){return null};
        var type = type || "yyyy.MM.dd HH:mm:ss"
        var t = new Date(time);
        var tf = function (i) { return (i < 10 ? '0' : '') + i };
        var ty=function(i){
            var tempStr;
            if(i<10){tempStr='000'+i}
            else if(i<100){tempStr='00'+i;}
            else if(i<1000){tempStr='0'+i}
            else{tempStr=i};
            return tempStr;
        }
        return type.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
            switch (a) {
                case 'yyyy':
                    return ty(t.getFullYear());
                case 'MM':
                    return tf(t.getMonth() + 1);
                case 'mm':
                    return tf(t.getMinutes());
                case 'dd':
                    return tf(t.getDate());
                case 'HH':
                    return tf(t.getHours());
                case 'ss':
                    return tf(t.getSeconds());
            }
        });
    }
    /**
     * 获取上个月最后一天
     */
    getLastDayOfPreMonth(){
        let now =new Date();
        let thisYear=now.getFullYear();
        let thisMonth=now.getMonth()+1;
        let theFirstDayOfThisMonth=new Date(thisYear+'-'+thisMonth+'-01');
        let lastDayOfPreMonth=new Date(theFirstDayOfThisMonth.getTime()-24*3600*1000);
        return this.transformDate(lastDayOfPreMonth);

    }
    /**
     * 将带时间的时间字符串仅保留日期
     * @param timeStr 时间字符串，格式类似 2017/6/4 0:00:00
     */
    getDateFromTimeStr(timeStr){
        return timeStr.split(' ')[0]
        
    }


    /**
     * 对某些key-value形式的对象，我们只需要其value值。该方法用于抽取其value值并集成数组返回
     * @param obj 
     */
    getListFromObj(obj){
        let list=[];
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                list.push(obj[key])
            }
        }
        return list;
    }
    /**
     * 从https://tms-web-dev.wilddogio.com/BigData/OrderSaveEventData/路径下获取实时订单
     * @param wilddogSnapShot https://tms-web-dev.wilddogio.com/BigData/OrderSaveEventData/节点下野狗对象的快照
     */
    getOrderSaveEventDataFromWildDog(wilddogSnapShot){
        var tempList=this.getListFromObj(wilddogSnapShot);

        var list=tempList.map(item=>{
            return this.getListFromObj(item)[0];
        })

        return list;
    }
    /**
     * 将元/吨等数字换成万元，万吨，并保留两位小数
     * @param num 原数字
     * @param scale [10,100,1000,1000] 
     */
    numConverse(num,scale):number{
        return Number((num/scale).toFixed(2));
    }

    orderEmit=new EventEmitter<any>();

    /**
     * 数组去重
     * @param list 需要去重的数组
     * @param key1 list对象的键名
     * @param key2 list数组中的键名.如果item1[key1]==item2[key1]&&item1[key2]==item2[key2]，则认为item1=item2
     */
    trimArry(list:any[],key1,key2){
        var existValueList=[];
        var result=[];
        list.forEach(item=>{
            if(item[key1]===item[key2]){
                return;
            }
            let tempValue=item[key1]+item[key2]//把起始地名拼成字符串
            let reverseValue=item[key2]+item[key1]
            if(existValueList.indexOf(tempValue)===-1&&existValueList.indexOf(reverseValue)===-1){
                result.push(item);
                existValueList.push(tempValue);
            }
        })

        return result;
    }
    /**
     * 去掉小数后面的0
     * @param num 必须是字符串
     */
    trimZero(num){
        num=num.toString();
        if(num.indexOf('.')===-1){
            return num;
        }
        num=num.replace(/0{1,4}$/,'');
        if(num.charAt(num.length-1)==='.'){
            num=num+'0'
        }
        return num;


    }

    dateRangeCheck(type,date1,date2){
        date1=new Date(date1);
        date2=new Date(date2);
        switch (Number(type)) {
                case 0:;return true;
                case 1:{
                    if(date1.getFullYear()!==date2.getFullYear()){
                        bootbox.alert("时间单位为'季度'时，起始时间应位于同一年");
                        return false
                    }
                    return true;
                }
                case 2:return true;
                case 3:{
                    var skip=date2.getTime()-date1.getTime();
                    if(skip>365*24*3600*1000){
                        bootbox.alert("时间单位为‘日’时，前后不得超过365天");
                        return false
                    }
                }
                default:return true;
            }
    }

}
