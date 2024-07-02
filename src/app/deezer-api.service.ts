import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeezerApiService {
  private songsDataSubject = new BehaviorSubject<any>(null);
  songsData = this.songsDataSubject.asObservable();
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  getSongs(trackName: string){
    this.apiUrl = `https://api.deezer.com/search?q=track:'${trackName}'`;
    this.http.get<any>(this.apiUrl).subscribe((data) => {
      this.songsDataSubject.next(data);
    })
  }
  


}
