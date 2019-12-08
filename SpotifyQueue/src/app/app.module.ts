import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateQueueComponent } from './create-queue/create-queue.component';
import { HomeComponent } from './home/home.component';
import { JoinQueueComponent } from './join-queue/join-queue.component';
import { RoleDirective } from './common/directives/role.directive';
import { QueueViewComponent } from './queue-view/queue-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateQueueComponent,
    HomeComponent,
    JoinQueueComponent,
    RoleDirective,
    QueueViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
