import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UiService } from '../../services/ui.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slideMain') slide : IonSlides;

  loginUser = {
    nombre:'',
    password:'',
    email:''
  }
  
  registroUser:Usuario = {
    nombre:'',
    password:'',
    email:'',
    avatar: 'av-1.png'
  }

  constructor(private userService:UsuarioService,
              private navCtrl:NavController,
              private uiService: UiService) { }

  ngOnInit() {}  
  
  ngAfterViewInit(){
    this.slide.lockSwipes(true);
  }

  async login(form: NgForm){
    if(form.invalid) return;
    
    const valido = await this.userService.login(this.loginUser.email, this.loginUser.password);
    
    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true})
    }else {
      this.uiService.alertaInformativa("usuario/contraseña incorrectos!")
    }
    
  }

  async registro(form: NgForm){
    if(form.invalid) return;
    
    const valido = await this.userService.registro(this.registroUser);
    
    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true})
    }else {
      this.uiService.alertaInformativa("ese correo ya existe!")
    }
  }
  

  moveSlide(i:number){    
    this.slide.lockSwipes(false);
    this.slide.slideTo(i);
    this.slide.lockSwipes(true);
  }

  setAvatar(ev: any){
    this.registroUser.avatar = ev;
  }

}
