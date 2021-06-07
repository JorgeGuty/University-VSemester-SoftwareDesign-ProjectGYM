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
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

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
import { IdFormDialogComponent } from "./Components/Dashboards/Admin/id-form-dialog/id-form-dialog.component";
import { InstructorComponent } from "./Components/Tables/instructor/instructor.component";
import { ServiceComponent } from "./Components/Tables/service/service.component";
import { ServiceTableComponent } from "./Components/Tables/service-table/service-table.component";
import { InstructorTableComponent } from "./Components/Tables/instructor-table/instructor-table.component";
import { InstructorDialogueComponent } from "./Components/Tables/instructor-dialogue/instructor-dialogue.component";
import { ServiceDialogueComponent } from "./Components/Tables/service-dialogue/service-dialogue.component";
import { ClientTableComponent } from "./Components/Tables/client-table/client-table.component";
import { ClientComponent } from "./Components/Tables/client/client.component";
import { ClientDialogueComponent } from "./Components/Tables/client-dialogue/client-dialogue.component";
import { ClientPaymentDialogueComponent } from "./Components/Tables/client-payment-dialogue/client-payment-dialogue.component";
import { AdminDialogueChangeComponent } from "./Components/Dashboards/Admin/admin-dialogue-change/admin-dialogue-change.component";
import { ServiceMaxSpacesUpdateDialogueComponent } from './Components/Tables/service-max-spaces-update-dialogue/service-max-spaces-update-dialogue.component';
import { AdminRoomDialogueComponent } from './Components/Dashboards/Admin_Preliminary/admin-room-dialogue/admin-room-dialogue.component';
import { InstructorDetailsComponent } from './Components/Tables/instructor-details/instructor-details.component';

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
    ServiceTableComponent,
    InstructorTableComponent,
    InstructorDialogueComponent,
    ServiceDialogueComponent,
    ClientTableComponent,
    ClientComponent,
    ClientDialogueComponent,
    ClientPaymentDialogueComponent,
    AdminDialogueChangeComponent,
    ServiceMaxSpacesUpdateDialogueComponent,
    AdminRoomDialogueComponent,
    InstructorDetailsComponent,
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
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  providers: [AuthUserGuard, AuthAdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
