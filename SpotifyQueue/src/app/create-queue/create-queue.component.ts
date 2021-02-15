import { Component, OnInit } from '@angular/core';
import { QueueService } from '../common/services/queue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-queue',
  templateUrl: './create-queue.component.html',
  styleUrls: ['./create-queue.component.css']
})
export class CreateQueueComponent implements OnInit {

  nameQueue:string = "";
  textQueue:string = "";
  joinQueueId:string="";

  constructor(private queueService:QueueService,
              private router:Router) { }

  ngOnInit() {
  }

  createQueue() {
    this.queueService.createQueue(this.nameQueue, this.textQueue).then((res) => {
      if(res != undefined) {
        this.router.navigate([`queue/${res.queueUrl}`]);
      } else {
        console.log(res);
      }
    });

  }

  joinQueue() {
    this.router.navigate(["queue",this.joinQueueId]);
  }

}
