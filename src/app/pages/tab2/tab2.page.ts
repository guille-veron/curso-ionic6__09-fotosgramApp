import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../../services/ui.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera, CameraOptions } from "@awesome-cordova-plugins/camera/ngx";

declare var window: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tempImages: string[] =[];

  loadingGeo = false;

  post = this.initPost();

 
  constructor(private postService: PostsService,
              private navCtrl:NavController,
              private uiService: UiService,
              private geo: Geolocation,
              private camera: Camera) {}

  async crearPost(){
    const creado = await this.postService.create(this.post);
    if(creado){
      this.post = this.initPost();
      this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
    }else{
      this.uiService.presentToast('No se pudo crear el Post');
    }
  }

  getGeo(){
    console.log(this.post);
    if (!this.post.posicion) {
      this.loadingGeo = false;
      return;
    } else {
      this.loadingGeo = true;
      this.geo.getCurrentPosition()
        .then((resp) => {          
          this.post.coords = `${resp.coords.longitude},${resp.coords.latitude}`;
          this.loadingGeo = false;          
       }).catch((error) => {
        this.loadingGeo = false;
         console.log('Error getting location', error);
       });
       
    }
  }

  initPost(){
    return {
      mensaje: '',
      coords: null,
     posicion: false
    }
  }

  tomarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA

    }
    
    this.camera.getPicture(options).then((imageData) => {
      
      const img = window.Ionic.WebView.convertFileSrc( imageData);

      this.tempImages.push(img);
     
      console.log(img);      

    }, (err) => {
     console.log(err);
    });
  }

}
