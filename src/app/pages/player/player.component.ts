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
  curPlaying: any = '';
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
        this.loadTrack(song);
      }
      //this.possibleSongs = [];
      //this.trackName= '';
    }
  }


  loadTrack(track: any){
    this.audioPlayer.src = track.preview;
    this.audioPlayer.load();
    this.audioPlayer.volume = 0.1;
    this.curPlaying = track;
  }


  play() {
      this.audioPlayer.play();
  }

  pause() {
    this.audioPlayer.pause();
  }

  getTime(song: any){
    let minute = Math.floor(song / 60);
    let second = song - minute * 60;

    return `${minute}:${(second < 10)? "0"+second:second}`;
  }
}
