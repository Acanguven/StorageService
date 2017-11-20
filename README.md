# StorageService
📦 Provides `localStorage` and `sessionStorage` features for unsupported devices and private mode browsing of Safari.

### Browser Support
- IE5+
- Chrome all versions
- Mozilla all versions
- Yandex all versions

If storage type is not supported or disabled(Safari private browsing) creates in memory store for `sessionStorage` and cookie store for `localStorage`. 

If you want to use in memory storage just change the line to.
```javascript
this.sessionStorage = this.isSupported('sessionStorage') ? window.sessionStorage : new MemoryStore();
```
## LocalStorage
- `window.StorageService.localStorage.getItem(name);`
- `window.StorageService.localStorage.setItem(name, value);`
- `window.StorageService.localStorage.removeItem(name);`

## SessionStorage
- `window.StorageService.sessionStorage.getItem(name);`
- `window.StorageService.sessionStorage.setItem(name, value);`
- `window.StorageService.sessionStorage.removeItem(name);`
