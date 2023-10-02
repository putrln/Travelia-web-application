import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LogicService } from '../logic.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {


  persistance = ""
  users = []
  constructor(private  logicservice:LogicService, private auth:AuthService)
  {
    this.logicservice.getPersistance().subscribe((per:any)=>{
      this.persistance = per.persistance;


    })

    this.logicservice.getUsers().subscribe((user:any) =>{
      this.users = []
      for (const key in user) {
        this.users.push({
          email:user[key].email,
          roles:user[key].roles,
          uid:key

        })
      }
      console.log(this.users)

    })
    
  }

  checkRoles(roles)
  {
    let i =0;
    for(const key in roles)
    {
      if (roles[key] == true)
      {
        i+=1
      }
    }
    console.log(i);
    if (i >= 2)
      return true

    else return false
  }

  changePersistence(per:string)
  {
    
    this.logicservice.setPersistance(per);

  }



  onAdminChange(uid:string,id:number,event)
  {
    console.log("UID " + uid + " id " + id)
    console.log(this.users);
    let roles = this.users[id].roles;
    
    if(this.checkRoles(roles) || !roles.admin)
    {
    roles.admin = !roles.admin
    this.logicservice.setRole(uid,roles)
    }
    else
    {
      alert("Konto musi posiadać przynajmniej jedną role!")
      event.target.checked = true;
    }
    
  }
  onManangerChange(uid:string,id:number,event)
  {

    let roles = this.users[id].roles;
    if(this.checkRoles(roles) || !roles.menager)
    {
      roles.menager = !roles.menager
      this.logicservice.setRole(uid,roles)
    }
    else
    {
      alert("Konto musi posiadać przynajmniej jedną role!")
      event.target.checked = true;
    }
  }
  onUserChange(uid:string,id:number,event)
  {
    let roles = this.users[id].roles;
    console.log(this.users[id].roles.client);
    if(this.checkRoles(roles) || !roles.client)
    {
    roles.client = !roles.client
    this.logicservice.setRole(uid,roles)
    }
    else
    {
      alert("Konto musi posiadać przynajmniej jedną role!")
      event.target.checked = true;
    }

  }

  banUser(uid:string,id:number)
  {
    let roles = this.users[id].roles;
    roles.banned = !roles.banned;
    this.logicservice.setRole(uid,roles);

  }
  // getPersistance()
  // {
  //   return this.auth.getPersistence();
  // }

}
