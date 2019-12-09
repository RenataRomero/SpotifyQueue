import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { QueueService } from '../common/services/queue.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-queue-view',
  templateUrl: './queue-view.component.html',
  styleUrls: ['./queue-view.component.css']
})
export class QueueViewComponent implements OnInit, AfterViewInit {
  ngAfterViewInit() {
    console.log("inside afterview");
    this.queueService.getPlaylistId(this.queueId).then((res:any) => {
      this.playlist_id = res.playlist_id;
      this.owner_access_token = res.access_token;
      this.element.nativeElement.querySelector('iframe').src = this.baseURL + res.playlist_id;
    });
  }

  baseURL = "https://open.spotify.com/embed/playlist/";
  songName:string = "";
  songArtist:string = "";
  queueId:string = "";
  playlist_id:string = "";
  owner_access_token:string = "";
  results=[];
  constructor(private queueService:QueueService,
              private route:ActivatedRoute,
              private element:ElementRef) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.queueId = params.get("queueId");
    });
  }

  addToQueue(song_id:string){
    let song_uri="spotify:track:"+song_id;
    this.queueService.getPlaylistId(this.queueId).then((res:any) => {
      console.log(this.owner_access_token);
      // console.log(res.playlist_id); //NECESARIO PARA QUE AGREGUE LA FUNCION NO SE QUE CHINGADOS
      this.queueService.addSong(song_uri, res.playlist_id, this.owner_access_token).then((res) => {
          console.log(res);
          this.element.nativeElement.querySelector('iframe').src = this.baseURL + this.playlist_id;
      });
    })
  }

  searchSong() {
    this.queueService.searchSong(this.songName).then((res:any) => {
      for(let i in res.tracks.items){
        let track=res.tracks.items[i]
        this.results.push(track);
      }
    })
  }

}
