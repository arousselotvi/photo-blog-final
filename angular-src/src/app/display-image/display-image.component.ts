/// <reference types="@types/googlemaps"/>
import { Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display-image',
  templateUrl: './display-image.component.html',
  styleUrls: ['./display-image.component.css']
})
export class DisplayImageComponent implements OnInit {
  imageName: string = "";
  photoUrl: string = ""
  uploadDate: string = "";
  uploadHour: string = "";
  marker: google.maps.Marker;
  map: google.maps.Map;
  @ViewChild('gmap') gmapElement: any;

  constructor(private activatedRoute: ActivatedRoute, private http:HttpClient) {
    // subscribe to router event
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.imageName=params.imageName
    });
  };
  
  ngOnInit() {
    // Retrieve infos about the photo from backend server
    this.http.get<any>('http://localhost:3000/api/photos')
      .subscribe(res => {
        for (var i=0; i< res.myPhotos.length; i++){
          if (this.imageName == res.myPhotos[i].actualName){
            this.photoUrl = res.myPhotos[i].photoUrl;
            this.uploadDate = res.myPhotos[i].uploadDate.substring(0, res.myPhotos[i].uploadDate.indexOf('T'))
            // We manipulate our date string so that we have a more useable format
            this.uploadDate = this.uploadDate.substring(this.uploadDate.length - 2 ,this.uploadDate.length) + "/"
                              + this.uploadDate.substring(this.uploadDate.length - 5 ,this.uploadDate.length - 3) + "/"
                              + this.uploadDate.substring(0, 4);
            this.uploadHour = res.myPhotos[i].uploadDate.substring(res.myPhotos[i].uploadDate.indexOf('T') + 1 , res.myPhotos[i].uploadDate.length - 8);
            break;
          }
        }
      });  
      // Create a map for google maps api
      var mapProp = {
        center: new google.maps.LatLng(43.295578, 5.374395),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

}
