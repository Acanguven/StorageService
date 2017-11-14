(function (scope) {
    var StorageService = function () {
        this.localStorage = this.isSupported('localStorage') ? window.localStorage : new CookieStore();
        this.sessionStorage = this.isSupported('sessionStorage') ? window.sessionStorage : new CookieStore(true);
    };

    StorageService.prototype.isSupported = function (type) {
        var testKey = '__isSupported', storage = window[type];
        try {
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
        }
        catch (error) {
            return false;
        }
    };

    var MemoryStore = function () {
        this.store = {};
    };
    MemoryStore.prototype.getItem = function (name) {
        return this.store[name] || null;
    };
    MemoryStore.prototype.setItem = function (name, value) {
        this.store[name] = value;
    };
    MemoryStore.prototype.removeItem = function (name) {
        delete this.store[name];
    };

    var CookieStore = function (isSessionStorage) {
        this.objectStore = {};
        this.expireDate = isSessionStorage ? "; path=/" : "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
    };

    CookieStore.prototype.getItem = function (name) {
        return name ? this.objectStore[name] : null;
    };

    CookieStore.prototype.setItem = function (name, value) {
        if(!name) { return; }
        document.cookie = escape(name) + "=" + escape(value) + this.expireDate;
        this.updateObject();
    };

    CookieStore.prototype.removeItem = function (name) {
        if(!name) { return; }
        document.cookie = escape(name) + this.expireDate;
        delete this.objectStore[name];
    };

    CookieStore.prototype.updateObject = function () {
        for (var couple, key, i = 0, couples = document.cookie.split(/\s*;\s*/); i < couples.length; i++) {
            couple = couples[i].split(/\s*=\s*/);
            if (couple.length > 1) {
                this.objectStore[key = unescape(couple[0])] = unescape(couple[1]);
            }
        }
    };

    scope.StorageService = new StorageService();
})(window);
