import { Component, OnInit } from '@angular/core';
import {DataService} from '../../service/data.service';
import {Router} from '@angular/router';
declare var bootbox;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        private DataService:DataService,
        private $router:Router
    ) { }
    username="";
    
    ngOnInit() {
        this.username=window.localStorage.getItem('username');
    }

    handleExit(){
        // console.log('exiting')
        this.DataService.Loginoff().subscribe(res=>{
          // console.log(res)
          if(res.success){
              
              bootbox.alert('请重新登陆',()=>{
                  this.$router.navigate(['/login'])
              })
          }
        })
    }

}
