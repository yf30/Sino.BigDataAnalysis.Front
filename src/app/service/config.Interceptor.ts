import { Response } from '@angular/http';
import { Headers, } from '@angular/http';
import { Router } from '@angular/router';
import {Injectable} from '@angular/core';
import { Interceptor, InterceptedRequest, InterceptedResponse } from '../../vendor/angular2-interceptors-master/index.js';
declare var $:any;
declare var bootbox;

@Injectable()
export class configInterceptor implements Interceptor {
    constructor(private Router:Router){}

    alerting=false;

    public interceptBefore(request: InterceptedRequest): InterceptedRequest {
        request.options.withCredentials = true;
        return request;
    }

    public interceptAfter(response: InterceptedResponse): InterceptedResponse {
        let Response = response.response.json();
       //判断是否登录
        if( !Response.success && Response.errorCode == "100001"){
            this.Router.navigate(["/login"]);
            if(!this.alerting){
                this.alerting=true;
                bootbox.alert(Response.errorMessage,()=>{
                    this.alerting=false;
                })

            }
            
            throw response;
        }else if( !Response.success && Response.errorCode !== "100001"){
            if(!this.alerting){
                this.alerting=true;
                bootbox.alert(Response.errorMessage,()=>{
                    this.alerting=false;
                })

            }
            throw response;
        }
        //标准化
        // response.response["_body"] = response.response.json().data;
        return response;
    }
}
