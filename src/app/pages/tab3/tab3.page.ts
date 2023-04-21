import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  usuario: Usuario;
  
  constructor(private usuarioService:UsuarioService, private uiService: UiService) {}
  
  ngOnInit(){    
    this.usuario = this.usuarioService.getUsuario();                     
  }

 
  async actualizar(form: NgForm) {
    
    if(form.invalid) return;

    const valido = await this.usuarioService.actualizar(this.usuario);
    
    if (valido) {
      this.uiService.presentToast("Se actualizó correctamente!")
    }else {
      this.uiService.presentToast("No se actualizó correctamente!")
    }
}
  logout(){}

}
