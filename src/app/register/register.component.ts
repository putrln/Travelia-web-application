import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(private auth : AuthService) {}
  email : string = '';
  password: string = '';

  register()
    {
      if(this.email == '')
      {
        alert("Wprowadz adres email!");
        return;
      }

      if(this.password == '')
      {
        alert("Wprowadz hasło!");
        return;
      }

      this.auth.register(this.email,this.password);
      this.email = '';
      this.password = '';


    }
}
