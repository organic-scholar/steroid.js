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