import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-queue',
  templateUrl: './join-queue.component.html',
  styleUrls: ['./join-queue.component.css']
})
export class JoinQueueComponent implements OnInit {

  queueId:string = "";

  constructor(private route:Router) { }

  ngOnInit() {
  }

  joinQueue() {
    this.route.navigate(['queue',this.queueId]);
  }

}
