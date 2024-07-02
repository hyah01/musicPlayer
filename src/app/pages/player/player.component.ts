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

  constructor(private deezerService: DeezerApiService){}


  ngOnInit(): void {
    this.deezerService.songsData.subscribe(data => {
      if (data){
        this.possibleSongs = data.data;
        console.log(this.possibleSongs);
      }
    })
  }

  loadTrack() {
    if (this.trackName != ''){
      this.deezerService.getSongs(this.trackName)
    }
  }



  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  play() {
      const trackUrl = "https://cdns-preview-2.dzcdn.net/stream/c-21f96037bab31c028c62f1cb379cf024-4.mp3";
      const audioPlayer = this.audioPlayerRef.nativeElement;
      audioPlayer.src = trackUrl;
      audioPlayer.load();
      audioPlayer.play();
  }

}
