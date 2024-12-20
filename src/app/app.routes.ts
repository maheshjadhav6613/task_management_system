import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskComponent } from './components/task/task.component';
import { MainBodyComponent } from './components/main-body/main-body.component';
import { StutesComponent } from './components/stutes/stutes.component';
import { ProjectComponent } from './components/project/project.component';
import { CalenderComponent } from './components/calender/calender.component';
import { RoleComponent } from './components/role/role.component';
import { UsersComponent } from './components/users/users.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';

export const routes: Routes = [
  {
    path:"",
    redirectTo:"nav",
    pathMatch:"full",
  },



  {
    path:"nav",
    component:NavbarComponent,
    children:[
      {
        path: '',
        component: MainBodyComponent, // Default view under navbar
      },
      {
        path:"task",
        component:TaskComponent,
      },
      {
        path:'stutes',
        component:StutesComponent,
      },
      {
        path:'project',
        component:ProjectComponent,
      },
      {
        path:'calendar',
        component:CalenderComponent,
      },
      {
        path:'role',
        component:RoleComponent,
      },
      {
        path:'users',
        component:UsersComponent,
      },
      {
        path:'home',
        component:MainBodyComponent,
      },
    ]
  }


    // {
    //   path: "",
    //   redirectTo: "login",
    //   pathMatch: "full",
    // },
    // {
    //   path: "login",
    //   component: LoginSignupComponent, // Login/Signup component
    // },
    // {
    //   path: "nav",
    //   component: NavbarComponent,
    //   children: [
    //     {
    //       path: "",
    //       redirectTo: "mainBody",
    //       pathMatch: "full",
    //     },
    //     {
    //       path: "mainBody",
    //       component: MainBodyComponent, // Default view under navbar
    //     },
    //     {
    //       path: "task",
    //       component: TaskComponent,
    //     },
    //     {
    //       path: "stutes",
    //       component: StutesComponent,
    //     },
    //     {
    //       path: "project",
    //       component: ProjectComponent,
    //     },
    //     {
    //       path: "calendar",
    //       component: CalenderComponent,
    //     },
    //     {
    //       path: "role",
    //       component: RoleComponent,
    //     },
    //     {
    //       path: "users",
    //       component: UsersComponent,
    //     },
    //     {
    //       path: "home",
    //       component: MainBodyComponent,
    //     },
    //   ],
    // },


  ];


