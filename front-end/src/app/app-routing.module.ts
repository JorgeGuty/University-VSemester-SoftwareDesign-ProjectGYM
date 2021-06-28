import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

/* Routes */
import { AdminDashboardComponent } from "./Components/Dashboards/Admin/admin-dashboard/admin-dashboard.component";
import { AdminPreliminaryDashboardComponent } from "./Components/Dashboards/Admin_Preliminary/admin-preliminary-dashboard/admin-preliminary-dashboard.component";
import { ClientDashboardComponent } from "./Components/Dashboards/Client/client-dashboard/client-dashboard.component";
import { HomeComponent } from "./Components/Home/home/home.component";
import { ProfileComponent } from "./Components/Profile/profile/profile.component";
import { LoginComponent } from "./Components/Registration/login/login.component";
import { ClientComponent } from "./Components/Tables/client/client.component";
import { InstructorComponent } from "./Components/Tables/instructor/instructor.component";
import { PrizesComponent } from "./Components/Tables/prizes/prizes.component";
import { ServiceComponent } from "./Components/Tables/service/service.component";

/* Services */
import { AuthAdminGuard } from "./Guards/authAdmin.guard";
import { ClientUserGuard } from "./Guards/authClient.guard";
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
  {
    path: "admin/instructorTable",
    component: InstructorComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: "admin/prizes",
    component: PrizesComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: "admin/serviceTable",
    component: ServiceComponent,
    canActivate: [ClientUserGuard],
  },
  {
    path: "admin/clientTable",
    component: ClientComponent,
    canActivate: [AuthAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
