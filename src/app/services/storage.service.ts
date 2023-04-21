import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class StorageService{
  private _storage: Storage | null = null;
  
  
  constructor(private storage: Storage) {
    this.init();
  }
  
  async init() {
    if(!this._storage){
      const storage = await this.storage.create();    
      this._storage = storage;
    }
  }
  
  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any) {
    await this.init();
    await this._storage?.set(key, value);
  }

  async get(key: string){
    const token = await this._storage?.get(key);    
    return this._storage?.get(key);
  }

  clear(){
    this._storage?.clear()
  }

  async remove(key:string){
    await this._storage?.remove(key)
  }

  async getToken(){
    await this.init();
    const token = await this.get('token');    
    return token;
  }


}
