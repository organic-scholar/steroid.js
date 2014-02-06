if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(prefix) {
        return this.indexOf(prefix) === 0;
    };
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(suffix) {
        return this.match(suffix + "$") == suffix;
    };
}
if (!String.prototype.interpolate) {
    String.prototype.interpolate = function() {
        values = arguments;
        var result = this;
        this.match(/\{([^{}]*)\}/g).forEach(function(match, index) {
            if (index < values.length)
                result = result.replace(match, values[index]);
        }, this);
        return result;
    };
}