import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private alertCtrl: AlertController, private toastCtrl:ToastController) { }

  async alertaInformativa(msj: string){
    const alert = await this.alertCtrl.create({
      message: msj,
      buttons: ['OK'],
      animated: true
    })

    await alert.present();
  }

  async presentToast(msg:string){
    const toast = await this.toastCtrl.create({
      message:msg,
      duration: 1500
    });

    toast.present();
  }
}
