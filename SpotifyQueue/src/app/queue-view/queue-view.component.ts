import { Component, OnInit } from '@angular/core';
import { QueueService } from '../common/services/queue.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-queue-view',
  templateUrl: './queue-view.component.html',
  styleUrls: ['./queue-view.component.css']
})
export class QueueViewComponent implements OnInit {

  songName:string = "";
  songArtist:string = "";
  queueId:string = "";

  constructor(private queueService:QueueService,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.queueId = params.get("queueId");
    })
  }

  searchSong() {
    this.queueService.searchSong(this.songName).then((res:any) => {
      // console.log(res.tracks.items[0].uri);
      let song_uri = res.tracks.items[0].uri;
      if(res != undefined) {
        this.queueService.getPlaylistId(this.queueId).then((res:any) => {
          // console.log(res.playlist_id); //NECESARIO PARA QUE AGREGUE LA FUNCION NO SE QUE CHINGADOS
          this.queueService.addSong(song_uri, res.playlist_id).then((res) => {
              console.log(res);
          });
        }) ;
      }
    })
  }

}
