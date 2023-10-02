import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";
import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';

import { LogicService } from './logic.service';
import { User } from './models/user';
import { Roles } from './models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = null;
  currentRole = null;
  persistance =  "local";
  changeUser = false;

  constructor(private fireauth: AngularFireAuth, private router:Router,private  logicservice:LogicService ) { 
    

    logicservice.getPersistance().subscribe((per:any) =>{
      this.persistance = per.persistance;

    })
    
  
    
    fireauth.authState.subscribe(async(user:any) =>{
      this.changeUser = true;
      if(user != null)
      {
        

        
        logicservice.getUserRole(user.uid).subscribe((role:Roles) =>
          {
            
            if(this.changeUser)
            {
            this.currentUser = new User(user,role);
  
            console.log(this.currentUser)
            }
            this.changeUser = false;

          })
        
        
      }

    });
  }


  login(email:string, password:string)
  {
    return this.fireauth.setPersistence(this.persistance).then(p =>{
      return this.fireauth.signInWithEmailAndPassword(email,password).then(() =>{
        console.log("tutaj");
        alert("Pomyślnie się zalogowałeś!")
      localStorage.setItem('token','true');
      this.router.navigate(['']);
  
      }, err =>{
        alert("Wystąpił Błąd!")
      })


    })
    
  }


  register(email:string,password:string)
  {
    this.fireauth.createUserWithEmailAndPassword(email,password).then( user=>
    {
      alert("Pomyślnie się zarejstrowałeś!")
      
      this.logicservice.addNewUser(new User(user.user,null));
      this.router.navigate(['']);

    }, err=>{
      alert("Wystąpił Błąd!")
      
    })
  }

  async getUserRole(uid:string)
  {
    await this.logicservice.getUserRole(uid).subscribe((role:Roles) =>
    {
      this.currentRole = role;
      return this.currentRole

    })


  }

  logout()
  {
    this.router.navigate(['']);
    //this.logicservice.
    this.currentUser=null;
    return this.fireauth.signOut();
  
    
  }

  getAuthentication(): any {
    return this.fireauth.authState;
  }
  hasRequiredAdminRole(uid: string):Observable<boolean> {
    
    return this.logicservice.getUserRole(uid).pipe(
      map((userRole: Roles) => userRole.admin
      )
    );

  }

  hasRequiredMenagerRole(uid: string):Observable<boolean> {
    
    return this.logicservice.getUserRole(uid).pipe(
      map((userRole: Roles) => (userRole.menager || userRole.admin)
      )
    );

  }



}
  



