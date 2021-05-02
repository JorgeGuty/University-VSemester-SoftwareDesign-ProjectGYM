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
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";

/* Angular Forms */
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./Components/Registration/login/login.component";
import { NavbarComponent } from "./Components/General/navbar/navbar.component";
import { HomeComponent } from "./Components/Home/home/home.component";
import { ProfileComponent } from "./Components/Profile/profile/profile.component";
import { ClientDashboardComponent } from "./Components/Dashboards/client-dashboard/client-dashboard.component";
import { AdminDashboardComponent } from "./Components/Dashboards/admin-dashboard/admin-dashboard.component";
import { MatListModule } from "@angular/material/list";

/* Routes Guarding */
import { AuthAdminGuard } from "./Guards/authAdmin.guard";
import { AuthUserGuard } from "./Guards/authUser.guard";
import { AdminCardComponent } from "./Components/Dashboards/admin-card/admin-card.component";
import { ClientCardComponent } from "./Components/Dashboards/client-card/client-card.component";

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
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
  ],
  providers: [AuthUserGuard, AuthAdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
