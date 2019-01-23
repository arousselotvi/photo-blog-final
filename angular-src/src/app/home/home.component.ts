import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface ResponseFormat {
  myPhotos : Array<photosObjectFormat>
}

interface photosObjectFormat {
  photoName : string,
  photoUrl : string,
  uploadEpoch : string,
  uploadDate: string,
  uploadLocation: string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  images: Array<Array<any>> = [];

  constructor(private http: HttpClient, private router: Router) { };

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/api/photos')
      .subscribe(res => {
        console.log(res)
        // let obj = JSON.parse(res.toString());
        console.log(res.myPhotos)
        for (var i=0; i< res.myPhotos.length; i++){
          this.images.push([res.myPhotos[i].actualName, res.myPhotos[i].photoUrl])
        }
      }) 
  };

  onClick(name){
    this.router.navigate(['/image'], {queryParams: {imageName: name}})
  };

}
