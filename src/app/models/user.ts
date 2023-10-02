import { LogicService } from "../logic.service";
import { trip } from "./trip";

export interface Roles {
    guest: boolean;
    client: boolean;
    menager: boolean;
    admin: boolean;
    banned: boolean;
  }

  
  export class User {
    email: string;
    roles: Roles;
    uid: string;
  
    constructor(userData: any,role:any) {
      this.email = userData.email;
      this.uid = userData.uid;
      if (role != null) {
        this.roles = role;
      } 
      else{
      
        this.roles = {
          client: true,
          guest: false,
          menager: false,
          admin: false,
          banned: false,
        };
      }
      

    }

    
  }