import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import {AppRoutesModule} from './app.router';
import { OrderTableComponent } from './order-table/order-table.component';
import { PriceStatisticsComponent } from './price-statistics/price-statistics.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ClientOrderComponent } from './client-order/client-order.component';
import { TradeStatisticsComponent } from './trade-statistics/trade-statistics.component';

import { MainChartComponent } from './main-chart/main-chart.component';

import { HotRoutePriceComponent } from './hot-route-price/hot-route-price.component';
import { HotRouteTradeTimesComponent } from './hot-route-trade-times/hot-route-trade-times.component';

//service

import {RouteService} from './service/route.service';//交易统计
import {DataService} from './service/data.service';
import {CommonService} from './service/common.service';
import { LoginComponent } from './login/login.component';
import { configInterceptor } from './service/config.Interceptor';
import {InterceptorService} from '../vendor/angular2-interceptors-master/index.js';
import { XHRBackend, RequestOptions } from '@angular/http';
export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, configInterceptor:configInterceptor){ // Add it here
  let service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(configInterceptor); // Add it here
  return service;
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    OrderTableComponent,
    PriceStatisticsComponent,
    WithdrawComponent,
    ClientOrderComponent,
    TradeStatisticsComponent,
    MainChartComponent,
    HotRoutePriceComponent,
    HotRouteTradeTimesComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutesModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
      RouteService,
      DataService,
      CommonService,
      configInterceptor,
      {
      provide: InterceptorService,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, configInterceptor]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
