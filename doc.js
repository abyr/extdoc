(function () {
    var Doc = function (s) {
        if (!s || s === document) {
            return document;
        }
        if (typeof s === 'function') {
            document.ready(s);
        }
        if (typeof s === 'object') {
            return s;
        };
        this.init = function (s) {
            if (s === document) {
                return s;
            }
            if (s === 'html') {
                return document.documentElement;
            }
            if (s === 'head') {
                return document.head;
            }
            if (s === 'body') {
                return document.body;
            }
            return this.all(s);
        };

        this.all = function (s) {
            return document.querySelectorAll(s);
        };

        return this.init(s);
    };

    HTMLDocument.prototype.ready = function (fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    };

    Element.prototype.html = function (v) {
        if (typeof v === 'undefined') {
            return this.innerHTML;
        }
        this.innerHTML = '' + v;
        return this;
    };

    Element.prototype.val = function (v) {
        if (typeof v === 'undefined') {
            return this.value;
        }
        this.value = v;
        return this;
    };

    Element.prototype.attr = function (k, v) {
        if (typeof v === 'undefined') {
            return this.getAttribute(k);
        }
        this.setAttribute(k, v);
        return this;
    };
    NodeList.prototype.attr = function (k, v) {
        if (typeof v === 'undefined') {
            return this[0].attr();
        }
        Array.prototype.forEach.call(this, function (el) {
            el.attr(k, v);
        });
        return this;
    };

    Element.prototype.removeAttr = function (k) {
        this.removeAttribute(k);
    };
    NodeList.prototype.removeAttr = function (k) {
        Array.prototype.forEach.call(this, function (el) {
            el.removeAttr(k);
        });
        return this;
    };

    Element.prototype.text = function (v) {
        if (typeof v === 'undefined') {
            return this.textContent;
        }
        this.textContent = v;
        return this;
    };
    NodeList.prototype.text = function (v) {
        if (typeof v === 'undefined') {
            return this[0].text();
        }
        Array.prototype.forEach.call(this, function (el) {
            el.text(v);
        });
        return this;
    };

    Element.prototype.clear = function () {
        while (this.firstChild) {
            this.firstChild.remove();
        }
        return this;
    };
    NodeList.prototype.clear = function () {
        Array.prototype.forEach.call(this, function (el) {
            el.clear();
        });
        return this;
    };

    Element.prototype.hasClass = function (c) {
        return this.className.split(' ').indexOf(c) !== -1;
    };

    Element.prototype.addClass = function (c) {
        this.className += ' ' + c + ' ';
        return this;
    };
    NodeList.prototype.addClass = function (c) {
        Array.prototype.forEach.call(this, function (el) {
            el.addClass(c);
        });
        return this;
    };

    Element.prototype.removeClass = function (c) {
        var r = new RegExp("\\s" + c + '\\s?', 'gi');

        this.className = (' ' + this.className).replace(r, '');
        if (this.className[0] === ' ') {
            this.className = this.className.substr(1);
        }
        return this;
    };
    NodeList.prototype.removeClass = function (c) {
        Array.prototype.forEach.call(this, function (el) {
            el.removeClass(c);
        });
        return this;
    };

    Element.prototype.toggleClass = function (className) {
        var el = this,
            classes,
            existingIndex;

        if (this.classList) {
            this.classList.toggle(className);
        } else {
            classes = this.className.split(' ');
            existingIndex = classes.indexOf(className);

            if (existingIndex >= 0) {
                classes.splice(existingIndex, 1);
            } else {
                classes.push(className);
            }

            this.className = classes.join(' ');
        }
        return this;
    };

    NodeList.prototype.toggleClass = function (c) {
        Array.prototype.forEach.call(this, function (el) {
            el.toggleClass(c);
        });
        return this;
    };

    Element.prototype.show = function () {
        return this.style.display = 'inherit';
    };
    NodeList.prototype.show = function () {
        Array.prototype.forEach.call(this, function (el) {
            el.show();
        });
        return this;
    };

    Element.prototype.hide = function () {
        return this.style.display = 'none';
    };
    NodeList.prototype.hide = function () {
        Array.prototype.forEach.call(this, function (el) {
            el.hide();
        });
        return this;
    };

    Element.prototype.css = function (k, v) {
        if (!k) {
            return this.style;
        }
        if (!v) {
            if (this.style.hasOwnProperty(k)) {
                return this.style[k];
            }
        }
        k = k.toCamelCase();
        if (this.style.hasOwnProperty(k)) {
            this.style[k] = v;
        }
        return this;
    };
    NodeList.prototype.css = function (k, v) {
        if (typeof v === 'undefined') {
            return this[0].css(k);
        }
        Array.prototype.forEach.call(this, function (el) {
            el.css(k, v);
        });
        return this;
    };

    String.prototype.toCamelCase = function () {
        return this.toLowerCase().replace(/-(.)/g, function(m, g) {
            return g.toUpperCase();
        });
    };

    Element.prototype.on = function (evt, callback) {
        this.addEventListener(evt, callback);
        return this;
    };

    NodeList.prototype.on = function (evt, callback) {
        Array.prototype.forEach.call(this, function (el) {
            el.addEventListener(evt, callback);
        });
        return this;
    };

    window.Doc = Doc;

}).call(this);