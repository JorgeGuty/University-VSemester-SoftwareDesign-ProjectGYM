import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

/* Angular Material */
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";

/* Angular Forms */
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./Components/Registration/login/login.component";
import { NavbarComponent } from "./Components/General/navbar/navbar.component";
import { HomeComponent } from "./Components/Home/home/home.component";
import { ProfileComponent } from "./Components/Profile/profile/profile.component";
import { ClientDashboardComponent } from "./Components/Dashboards/Client/client-dashboard/client-dashboard.component";
import { AdminDashboardComponent } from "./Components/Dashboards/Admin/admin-dashboard/admin-dashboard.component";

/* Routes Guarding */
import { AuthAdminGuard } from "./Guards/authAdmin.guard";
import { AuthUserGuard } from "./Guards/authUser.guard";
import { AdminCardComponent } from "./Components/Dashboards/Admin/admin-card/admin-card.component";
import { ClientCardComponent } from "./Components/Dashboards/Client/client-card/client-card.component";
import { AdminPreliminaryDashboardComponent } from "./Components/Dashboards/Admin_Preliminary/admin-preliminary-dashboard/admin-preliminary-dashboard.component";
import { AdminPreliminaryCardComponent } from "./Components/Dashboards/Admin_Preliminary/admin-preliminary-card/admin-preliminary-card.component";
import { AdminPreliminaryDialogComponent } from "./Components/Dashboards/Admin_Preliminary/admin-preliminary-dialog/admin-preliminary-dialog.component";
import { AdminPreliminaryDatePickerComponent } from "./Components/Dashboards/Admin_Preliminary/admin-preliminary-date-picker/admin-preliminary-date-picker.component";
import { AdminPreliminaryInformationCardsComponent } from "./Components/Dashboards/Admin_Preliminary/admin-preliminary-information-cards/admin-preliminary-information-cards.component";
import { IdFormDialogComponent } from './Components/Dashboards/Admin/id-form-dialog/id-form-dialog.component';
import { InstructorComponent } from './Components/Tables/instructor/instructor.component';
import { ServiceComponent } from './Components/Tables/service/service.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    ClientDashboardComponent,
    AdminDashboardComponent,
    AdminCardComponent,
    ClientCardComponent,
    AdminPreliminaryDashboardComponent,
    AdminPreliminaryCardComponent,
    AdminPreliminaryDialogComponent,
    AdminPreliminaryDatePickerComponent,
    AdminPreliminaryInformationCardsComponent,
    IdFormDialogComponent,
    InstructorComponent,
    ServiceComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
  ],
  providers: [AuthUserGuard, AuthAdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
