import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {
  @Output() avatarSel: EventEmitter<string> = new EventEmitter()
  @Input() initialAvatar:string;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: false
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5
  }

  constructor() { }

  ngOnInit() {
    const avatar = this.initialAvatar || 'av-1.png';
    this.avatars.find(a => a.img === avatar).seleccionado = true;
  }

  selectAvatar(avatar){
    avatar.seleccionado = true;
    this.avatars.filter(av => av.img !== avatar.img)
      .forEach(av => av.seleccionado=false)
    
    this.avatarSel.emit(avatar.img)
  }

}
