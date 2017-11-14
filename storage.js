(function (scope) {
    var StorageService = function () {
        this.localStorage = this.isSupported('localStorage') && false ? window.localStorage : new CookieStore();
        this.sessionStorage = this.isSupported('sessionStorage') && false ? window.sessionStorage : new MemoryStore();
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

    var CookieStore = function () {
        this.keys = [];
        this.objectStore = {};
    };

    CookieStore.prototype.getItem = function (name) {
        return name ? this.__get(name) : null;
    };
    
    CookieStore.prototype.setItem = function (name, value) {
        if(!name) { return; }
        document.cookie = escape(name) + "=" + escape(value) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
    };

    CookieStore.prototype.removeItem = function (name) {
        if(!name) { return; }
        document.cookie = escape(name) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    };

    CookieStore.prototype.__get = function (name) {
        var index;
        for (var name in this.objectStore) {
            index = this.keys.indexOf(name);
            if (index === -1) {
                this.objectStore.setItem(name, this.objectStore[name]);
            }
            else {
                this.keys.splice(index, 1);
            }
            delete this.objectStore[name];
        }
        for (this.keys; this.keys.length > 0; this.keys.splice(0, 1)) {
            this.objectStore.removeItem(this.keys[0]);
        }
        for (var couple, key, i = 0, couples = document.cookie.split(/\s*;\s*/); i < couples.length; i++) {
            couple = couples[i].split(/\s*=\s*/);
            if (couple.length > 1) {
                this.objectStore[key = unescape(couple[0])] = unescape(couple[1]);
                this.keys.push(key);
            }
        }
        return this.objectStore[name];
    };

    scope.StorageService = new StorageService();
})(window);
