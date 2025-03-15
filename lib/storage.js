import { Storage, Drivers } from '@ionic/storage';

class OasisStorage {
  constructor() {
    this.storage = null; // Avoid initializing on the server

    if (typeof window !== 'undefined') {
      this.storage = new Storage({
        name: '__oasisdb',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
      });
      this.init();
    }
  }

  async init() {
    if (this.storage) {
      await this.storage.create();
    }
  }

  async set(key, value) {
    if (!this.storage) return;
    return this.storage.set(key, value);
  }

  async get(key) {
    if (!this.storage) return null;
    return this.storage.get(key);
  }

  async remove(key) {
    if (!this.storage) return;
    return this.storage.remove(key);
  }

  async clear() {
    if (!this.storage) return;
    return this.storage.clear();
  }

  async keys() {
    if (!this.storage) return [];
    return this.storage.keys();
  }

  async length() {
    if (!this.storage) return 0;
    return this.storage.length();
  }
}

// Export instance
const oasisStorage = new OasisStorage();
export default oasisStorage;
