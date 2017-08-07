import { Component, OnInit } from '@angular/core';
import {DataService} from '../service/data.service';
import {Router} from '@angular/router';

declare var bootbox:any;
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private DataService:DataService,private $router:Router) {  }

  loginObj={
    username:"",
    password:""
  }  
  //是否勾选
  remenber:boolean


  ngOnInit() {

    this.remenber=true;

    let loginObj=this.DataService.getLoginCookie();
      if(loginObj){
          this.loginObj.username=loginObj.userName;
          this.loginObj.password=loginObj.password;
      }
  }


    login(){
          if(!(this.loginObj.username&&this.loginObj.password)){
              bootbox.alert('请输入用户名和密码');
          }else{
              

              // let loginObj={
              //     userName:this.loginObj.username,
              //     password:this.loginObj.password
              // }
              
              this.DataService.Login(this.loginObj.username,this.loginObj.password).subscribe(res=>{
                // console.log(res)
                if(res.success){
                    this.$router.navigate(['home']);
                    window.localStorage.setItem('username',this.loginObj.username);
                    if(this.remenber){
                        this.DataService.setLoginCookie(this.loginObj.username,this.loginObj.password);
                    }
                      
                  }else{
                      bootbox.alert('用户名或密码错误');
                  }
  
              })
          }
        }

        toggleCheck(){
            $('.login-checked').toggleClass('login-check');//login-checked
            this.remenber=!this.remenber;
        }

}
