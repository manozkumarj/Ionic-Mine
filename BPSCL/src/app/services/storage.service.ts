import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor(public storage: Storage) {
    console.log("Your storage provider is working here !");
  }

  // set a key/value object
  async setObject(key: string, object: Object) {
    console.log("Storable key -> " + key);
    console.log("Storable object -> " + JSON.stringify(object));
    try {
      const result = await this.storage.set(key, JSON.stringify(object));
      console.log("set Object in storage: " + result);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }

  // get a key/value object
  async getObject(key: string): Promise<any> {
    try {
      const result = await this.storage.get(key);
      if (result != null) {
        return JSON.parse(result);
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  // remove a single key value:
  remove(key: string) {
    this.storage.remove(key);
  }

  //  delete all data from your application:
  clear() {
    this.storage.clear();
  }
}
