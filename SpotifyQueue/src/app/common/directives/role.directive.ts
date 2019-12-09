import { Directive, Input, AfterViewChecked, ElementRef, AfterViewInit } from '@angular/core';
import { QueueService } from '../services/queue.service';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements AfterViewChecked, AfterViewInit {

  queueURL:string = "";

  constructor(private queueService:QueueService,
              private eR:ElementRef,
              private route:ActivatedRoute) {
                  this.route.paramMap.subscribe(params => {
                    this.queueURL = params.get("queueId");
                  });
               }

  @Input() appRole:string;

  ngAfterViewChecked() {
   
  }

  ngAfterViewInit() {
    // if(this.queueService.isOwner(localStorage.getItem("user_id"), this.queueURL))
    this.eR.nativeElement.remove();
    /*
    if(this.queueService.isOwner(localStorage.getItem("user_id"), this.queueURL))
      this.eR.nativeElement.remove();
    else 
      console.log('Is Owner');
    */
  }

}
