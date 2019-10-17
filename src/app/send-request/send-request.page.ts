import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute } from "@angular/router";
import { NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.page.html',
  styleUrls: ['./send-request.page.scss'],
})
export class SendRequestPage implements OnInit {

  private imageUrl: any;
  src1: string;
  src2:string;
  textValue:string;
  aType: string;
  appointment: any = new Date();
  applianceId: number;

  constructor(private camera: Camera, public nav:NavController,private route: ActivatedRoute,private http: HttpClient) { }
  ngOnInit() {
    this.src1 = null;
    this.src2=null;
    this.textValue=null;
    this.appointment = new Date().toISOString();
    this.aType = this.route.snapshot.paramMap.get('aType');
    this.applianceId = this.getApplianceId(this.aType);
    
  }

  takePhoto(sourceType:number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  fromCamera(){
    this.takePhoto(1);
  }

  fromCamera1(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:1,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.src1 = base64Image;
    }, (err) => {
      // Handle error
    });
  }

  fromCamera2(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:1,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.src2 = base64Image;
    }, (err) => {
      // Handle error
    });
  }
  

  fromGallery(){
    this.takePhoto(0);
  }

  goHome(){
    this.nav.navigateForward('home');
  }

  submit(){
    var requestData=[];

    var params={
      "consumerId": 1,
      "applianceId": this.applianceId,
      "images": [this.src1,this.src2],
      "description": this.textValue,
      "appointmentDateTime": this.appointment,
      "yelpKeyWord": this.aType
    }

    requestData.push(params);

    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };

    //pass it if you can't modify web api
    var v= this.http.post("http://localhost:5000/api/Audit/", requestData, httpOptions)
    .subscribe(data => 
    {alert('ok');},
     error => 
     {alert("Error");}
    );
  }

  getApplianceId(aType: string): number{
      if(aType == 'Micro Wave') return 1;
      if(aType == 'Plumbing') return 2;
      if(aType == 'Air Conditioner')  return 3;
      if(aType == 'Television') return 4;
      if(aType == 'Washing Machine')  return 5;
      if(aType == 'Water Heater') return 6;
  }
}
