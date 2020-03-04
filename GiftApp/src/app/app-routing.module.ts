import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_auth/auth.guard';
import { ReceivedGiftsComponent } from './utilities/received-gifts/received-gifts.component';
import { GivingHubComponent } from './utilities/giving-hub/giving-hub.component';
import { FriendGivingComponent } from './utilities/giving-hub/friend-giving/friend-giving.component';
import { FriendManagementComponent } from './utilities/friend-management/friend-management.component';

const routes: Routes = [
  { path: '', component: UserComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
  children: [
    { path: 'givengifts', component: GivingHubComponent, canActivate: [AuthGuard] },
    { path: 'receivedgifts', component: ReceivedGiftsComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
    { path: 'friends', component: FriendManagementComponent, canActivate: [AuthGuard] }
  ] },
  { path: 'friend', component: FriendGivingComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
