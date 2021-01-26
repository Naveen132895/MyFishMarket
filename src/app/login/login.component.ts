import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  state=1;
  count=0
 email:string
 password:string
  constructor(private formBuilder: FormBuilder,private router: Router,private toastr: ToastrService) { }
  data =
  [
  {
    email: "admin@gmail.com", 
    password:"Admin@123" 
  },
  {
    email: "admin1@gmail.com", 
    password:"Admin@123" 
  },
  {
    email: "admin2@gmail.com", 
    password:"Admin@123" 
  }
]

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      },

    );
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.toastr.warning('Email and Password is required',"Hey !!",{timeOut: 2000});;

      return;

    }
    this.email=this.registerForm.value.email
    this.password=this.registerForm.value.password
   console.log(this.email)
   console.log(this.password)

    this.data.forEach((e)=>{
      if(e.email==this.email && e.password==this.password)
      {
        this.state=0;
        this.toastr.success('Login Successful',"Hey !!",{timeOut: 2000});;
        this.router.navigate(['/home']);
    
        }
        this.count++;
       console.log(this.count)
       
       
    })
    this.registerForm.reset();
    if(this.count==3 &&this.state==1 ){
      this.toastr.error('Invaild Email & Password', "Hey !!", {
        timeOut: 3000
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
