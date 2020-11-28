import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "./../_services/auth.service";

import { NotificationsService } from 'angular2-notifications';



@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
auth:any
closeResult: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private _service: NotificationsService) { }
  
    public options = {
    position: ["bottom", "right"],
    timeOut: 3000,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    lastOnBottom: false,
    preventDuplicates: true,
    animate: "scale",  
    maxLength: 400
  };
  
  create(text) {
         this._service.error('Error!','Ha ocurrido un error.'+text)
  
  }
  toast(text){
    // Get the snackbar DIV
    var x = document.getElementById("toast")
    
        // Add the "show" class to DIV
        x.innerHTML=text;
        x.className = "show bg-danger";
        
    
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  login(formValue:any){
   //console.log(`user: ${formValue.username} pass: ${formValue.password}`)
    
   $('#Loading').css('display','block')
   $('#Loading').addClass('in')
   
    this.authenticationService.Authentication(formValue)
      .then(response => {
        this.auth = response
        
        // console.log(response.username)
        let type:string = null;
        localStorage.setItem('currentUser', response.username);
        localStorage.setItem('currentEmail', response.email);
        localStorage.setItem('currentFirstName', response.firstname);
        localStorage.setItem('currentLastName', response.lastname);
        localStorage.setItem('currentId', response.id);
        localStorage.setItem('currentPicture', response.picture);
        localStorage.setItem('currentState', response.state);

        if(response.tutors!=null){
          localStorage.setItem('currentIdTutor', response.tutors.id);
          localStorage.setItem('currentAuthTutor', response.tutors.autorization);
        }

        if(response.teachers!=null){
          localStorage.setItem('currentIdTeacher', response.teachers.id);
        }

        if(response.students!=null){
          localStorage.setItem('currentIdStudent', response.students.id);
        }

        if(response.student){
          type = 'estudiante'
        }else

        if(response.teacher){
          type = 'maestro'
        }else

        if(response.tutor){
          type = 'tutor'
        }else{
          type = 'admin'
        }

        localStorage.setItem('currentType', type);
        //console.log(type)
        console.clear
        this.router.navigate([`colegio/${type}`])
      }).catch(error => {
        console.clear
   $('#Loading').css('display','none')
   
        this.create(error)
        this.toast(error)
        
      })

    
  }
  ngOnInit() {
  }
  
}
