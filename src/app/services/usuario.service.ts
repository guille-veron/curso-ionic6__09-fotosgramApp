import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario;

  constructor(private storageService: StorageService,
              private http: HttpClient,
              private navCtrl: NavController) { }

  login(email:string, password:string){
    return new Promise(resolve =>{
      const data = {email, password};
      this.http.post(`${URL}/user/login`,data)
        .subscribe(async (resp: any) => {
          if(resp.ok){
            this.token = resp.token;
            await this.storageService.set('token',resp.token);
          } else {
            this.token = null;
            await this.storageService.remove('token')
          }
          resolve(resp.ok)
        })

    })      
  }

  registro(user: Usuario){
    return new Promise(resolve =>{     
      this.http.post(`${URL}/user/create`,user)
        .subscribe(async (resp: any) => {
          if(resp.ok){
            this.token = resp.token;
            await this.storageService.set('token',resp.token);
          } else {
            this.token = null;
            await this.storageService.remove('token')
          }
          resolve(resp.ok)
        })

    })    
  }

  validaToken():Promise<boolean>{
    return new Promise<boolean>(async resolve => {

      const token = await this.storageService.getToken() || '';
    
      if (!token) {
        this.navCtrl.navigateRoot('/login');
        resolve(false);
      }
      const headers = new HttpHeaders({
        "x-token": token
      });
      
      this.http.get(`${URL}/user`,{headers})
        .subscribe((resp:any) => {
          if(resp.ok){
            this.usuario = resp.usuario;
          }else{
            this.navCtrl.navigateRoot('/login');
          }
          resolve(resp.ok)
        })
    })
  }

  getUsuario(){
    if (!this.usuario._id) {
      this.validaToken();
    }
    return {...this.usuario}
  }

  async actualizar(usuario: Usuario) {
    const token = await this.storageService.getToken() || '';    
  
    const headers = new HttpHeaders({
      "x-token": token
    });
    
    return new Promise(resolve => {

      this.http.post(`${URL}/user/update`,usuario,{headers})
        .subscribe(async (resp:any) => {
          if(resp.ok){
            this.token = resp.token;
            await this.storageService.set('token',resp.token);
          } 
          
          resolve(resp.ok);
  
        })
    })
  }
}
