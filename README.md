# StorageService
📦 Provides `localStorage` and `sessionStorage` features for unsupported devices and private mode browsing of Safari.

### Browser Support
- IE5+
- Chrome all versions
- Mozilla all versions
- Yandex all versions

If storage type is not supported or disabled(Safari private browsing) creates in memory store for `sessionStorage` and cookie store for `localStorage`. Designed to use with single page applications.

If you want to use it with non SPA apps, just change this line. MemoryStore() -> CookieStore(true)
```javascript
this.sessionStorage = this.isSupported('sessionStorage') ? window.sessionStorage : new CookieStore(true);
```
## LocalStorage
- `window.StorageService.localStorage.getItem(name);`
- `window.StorageService.localStorage.setItem(name, value);`
- `window.StorageService.localStorage.removeItem(name);`

## SessionStorage
- `window.StorageService.sessionStorage.getItem(name);`
- `window.StorageService.sessionStorage.setItem(name, value);`
- `window.StorageService.sessionStorage.removeItem(name);`
