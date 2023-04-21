import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';

declare var mapboxgl: any;
const MAPBOX = environment.mapbox;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords:string;
  @ViewChild('mapa') mapa;

  constructor() { }

  ngOnInit() {   
  }
  
  ngAfterViewInit(){
    
    mapboxgl.accessToken = MAPBOX;
    const coords = this.coords?.split(',').map(value => Number(value)) || [];
    
    if(coords.length === 0 ) return;
    
    var map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coords,
      zoom: 15      
    });
  
    const marker = new mapboxgl.Marker()
    .setLngLat(coords)
    .addTo(map);
  }

}
