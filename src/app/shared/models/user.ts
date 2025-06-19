export class User{
    firstName:string='';
    lastName:string='';
}

export interface Register{
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    password:string;
}
export interface Login{
    username:string; //could be phone or email
    password:string;
}
export interface ChangePassword{
    currentPassword:string;
    newPassword:string;
    confirmNewPassword:string;
}