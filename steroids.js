var Class = {
	create: function(parent, properties) {
		var func = this.createFunction();

		if (typeof parent === "object") {
			properties = parent;
		} else if (typeof parent === "function") {
			this.inheritProperties(func, parent);
		}
		this.setFirstContructor(func, properties);
		this.applyProperties(func, properties);
		return func;
	},
	createFunction: function() {
		return function() {
			this.construct.apply(this, arguments);
		};
	},
	setFirstContructor: function(func, properties) {
		if (!properties.hasOwnProperty("construct")) {
			func.prototype.construct = function() {};
		}
	},
	applyProperties: function(func, properties) {
		for (var property in properties) {
			this.specifyProperty(func, property, properties[property]);
		}
	},
	inheritProperties: function(func, parent) {
		for (var property in parent.prototype) {
			if (property !== "contruct" && property !== "constructor")
				this.specifyProperty(func, property, parent.prototype[property]);
		}
		func.prototype.parent = parent.prototype.construct;
	},
	specifyProperty: function(func, propertyName, value) {
		Object.defineProperty(func.prototype, propertyName, {
			value: value,
			writable: true,
			enumerable: true,
			configurable: true
		});
	}
};
if (!Array.prototype.first) {
	Array.prototype.first = function() {
		return this[0];
	};
}
if (!Array.prototype.last) {
	Array.prototype.last = function() {
		return this[this.length - 1];
	};
}
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