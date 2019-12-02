import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateQueueComponent } from './create-queue/create-queue.component';
import { HomeComponent } from './home/home.component';
import { JoinQueueComponent } from './join-queue/join-queue.component';
import { QueueViewComponent } from './queue-view/queue-view.component';
import { AuthGuard } from './common/guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateQueueComponent },
  { path: 'join', component: JoinQueueComponent, canActivate: [AuthGuard]},
  { path: 'queue', component: QueueViewComponent },
  { path: 'queue/:queueId', component: QueueViewComponent, canActivate: [AuthGuard] }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
