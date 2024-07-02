import { Component, ElementRef, ViewChild } from '@angular/core';
import { DeezerApiService } from '../../deezer-api.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  trackName = '';
  possibleSongs: any;
  playList: Array<any> = [];
  audioPlayer: any;
  index = 0;
  curIndex = 0;
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  constructor(private deezerService: DeezerApiService){}
  


  ngOnInit(): void {
    this.deezerService.songsData.subscribe(data => {
      if (data){
        this.possibleSongs = data.data;
        this.audioPlayer = this.audioPlayerRef.nativeElement;
        this.playList;
      }
    })
  }

  reload(){
    this.deezerService.songsData.subscribe(data => {
      if (data){
        data;
        this.possibleSongs = data.data;
        this.audioPlayer = this.audioPlayerRef.nativeElement;
        this.playList;
      }
    })
  }

  retrieveTracks() {
    if (this.trackName != ''){
      this.deezerService.getSongs(this.trackName)
    }
  }

  addTrack(song: any){
    if (song){
      this.playList.push(song);
      console.log(this.playList)
      if (this.playList.length == 1){
        this.loadTrack(song.preview);
      }
      this.possibleSongs = '';
      this.reload();
    }
  }


  loadTrack(trackUrl: string){
    this.audioPlayer.src = trackUrl;
    this.audioPlayer.load();
  }



  play() {
      this.audioPlayer.play();
  }

  pause() {
    this.audioPlayer.pause();
  }

}
