import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './_shared/user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { DashboardNavComponent } from './nav/dashboard-nav/dashboard-nav.component';
import { ReceivedGiftsComponent } from './utilities/received-gifts/received-gifts.component';
import { RequestGiftModalComponent } from './utilities/received-gifts/request-gift-modal/request-gift-modal.component';
import { GivingHubComponent } from './utilities/giving-hub/giving-hub.component';
import { GivenGiftComponent } from './utilities/giving-hub/given-gift/given-gift.component';
import { FriendComponent } from './utilities/giving-hub/friend/friend.component';
import { FriendGivingComponent } from './utilities/giving-hub/friend-giving/friend-giving.component';
import { FriendManagementComponent } from './utilities/friend-management/friend-management.component';
import { FriendGiftsComponent } from './utilities/giving-hub/friend-giving/friend-gifts/friend-gifts.component';
import { GiveFriendGiftComponent } from './utilities/giving-hub/friend-giving/give-friend-gift/give-friend-gift.component';
import { SentRequestsComponent } from './utilities/friend-management/sent-requests/sent-requests.component';
import { IncomingRequestsComponent } from './utilities/friend-management/incoming-requests/incoming-requests.component';
import { UserSearchComponent } from './utilities/friend-management/user-search/user-search.component';
import { YourGiftsComponent } from './utilities/received-gifts/your-gifts/your-gifts.component';
import { YourRequestsComponent } from './utilities/received-gifts/your-requests/your-requests.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent,
    DashboardNavComponent,
    ReceivedGiftsComponent,
    RequestGiftModalComponent,
    GivingHubComponent,
    GivenGiftComponent,
    FriendComponent,
    FriendGivingComponent,
    FriendManagementComponent,
    FriendGiftsComponent,
    GiveFriendGiftComponent,
    SentRequestsComponent,
    IncomingRequestsComponent,
    UserSearchComponent,
    YourGiftsComponent,
    YourRequestsComponent,
    AlertComponent
  ],
  entryComponents: [RequestGiftModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [UserService, {
    // this is for the auth interceptor
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: NgbDateAdapter,
    useClass: NgbDateNativeAdapter
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
