import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

/* Routes */
import { AdminDashboardComponent } from "./Components/Dashboards/Admin/admin-dashboard/admin-dashboard.component";
import { AdminPreliminaryDashboardComponent } from "./Components/Dashboards/Admin_Preliminary/admin-preliminary-dashboard/admin-preliminary-dashboard.component";
import { ClientDashboardComponent } from "./Components/Dashboards/Client/client-dashboard/client-dashboard.component";
import { HomeComponent } from "./Components/Home/home/home.component";
import { ProfileComponent } from "./Components/Profile/profile/profile.component";
import { LoginComponent } from "./Components/Registration/login/login.component";

/* Services */
import { AuthAdminGuard } from "./Guards/authAdmin.guard";
import { AuthUserGuard } from "./Guards/authUser.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: "admin/adminDashboard",
    component: AdminDashboardComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: "client/clientDashboard",
    component: ClientDashboardComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: "admin/adminPreliminaryDashboard",
    component: AdminPreliminaryDashboardComponent,
    canActivate: [AuthAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
