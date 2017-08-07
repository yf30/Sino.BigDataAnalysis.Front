import {  Router,RoutesRecognized } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(){
      window.onresize=()=>{
            
            if(window.location.href.indexOf('/home')>-1){
                
                window.location.reload(true);
            }
            
        }
  }
}
