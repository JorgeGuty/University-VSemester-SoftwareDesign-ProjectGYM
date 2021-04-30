import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/* Angular Material */
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";

/* Angular Forms */
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./Components/Registration/login/login.component";
import { NavbarComponent } from "./Components/General/navbar/navbar.component";
import { HomeComponent } from "./Components/Home/home/home.component";
import { ProfileComponent } from "./Components/Profile/profile/profile.component";
import { ClientDashboardComponent } from "./Components/Dashboards/client-dashboard/client-dashboard.component";
import { AdminDashboardComponent } from "./Components/Dashboards/admin-dashboard/admin-dashboard.component";

/* Routes Guarding */
import { AuthAdminGuard } from "./Guards/authAdmin.guard";
import { AuthUserGuard } from "./Guards/authUser.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    ClientDashboardComponent,
    AdminDashboardComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
  ],
  providers: [AuthUserGuard, AuthAdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
