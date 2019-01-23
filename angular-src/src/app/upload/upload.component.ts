import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  selectedFile: File = null;
  date = null;
  actualName : string = "";
  canRender = false;

  constructor(private http: HttpClient, private router: Router) { 
  }

  ngOnInit() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.myPosition = position.coords.latitude;
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  //   console.log("ici")
  //   console.log(this.myPosition)
    // console.log(this.currentLong)
  }

  onFileSelected(event){
    console.log(event)
    this.selectedFile =  <File>event.target.files[0];
  }

  onUpload(){
    this.date=Date.now()
    const myForm = new FormData();
    myForm.append('image', this.selectedFile, this.selectedFile.name)
    myForm.append('date',this.date)
    console.log(this.selectedFile);
    this.http.post('http://localhost:3000/upload-photo',myForm)
      .subscribe(res => {
        console.log(res)
        // Timeout to wait for the server to receive the data
        setTimeout(()=>this.redirectToPhoto(res, this.selectedFile.name, this.date), 2000)
    });
    
    
  }

  redirectToPhoto(res, name, date){
    // Get the photos in order to retrieve the name of the one we just posted
    // to get the endpoint of the associated display-image component 
    this.http.get<any>('http://localhost:3000/api/photos')
      .subscribe(res => {
        for (var i=0; i< res.myPhotos.length; i++){
          // We check all the photos in the register.
          // We want to find a match on the name, but also on the upload epoch 
          // in case we have multiple images with the same name
          if (name == res.myPhotos[i].originalName && date == res.myPhotos[i].uploadEpoch) {
            this.actualName=res.myPhotos[i].actualName ;
            this.router.navigate(['/image'], {queryParams: {imageName: res.myPhotos[i].actualName}})
            break;
          }
        }
      });

  }
}
