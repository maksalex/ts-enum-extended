/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

var _Enum_value, _Enum_label, _Enum_name, _Enum_description;
class Enum {
    constructor(value) {
        _Enum_value.set(this, void 0);
        _Enum_label.set(this, void 0);
        _Enum_name.set(this, void 0);
        _Enum_description.set(this, void 0);
        if (!this.constructor.toValues().includes(value)) {
            throw new ReferenceError(`Not exist member in Enum with value ${value}`);
        }
        __classPrivateFieldSet(this, _Enum_value, value, "f");
        __classPrivateFieldSet(this, _Enum_name, this.takeNameByValue(value), "f");
        __classPrivateFieldSet(this, _Enum_label, this.takeLabelByName(__classPrivateFieldGet(this, _Enum_name, "f")), "f");
        __classPrivateFieldSet(this, _Enum_description, this.takeDescriptionByName(__classPrivateFieldGet(this, _Enum_name, "f")), "f");
    }
    static labels() {
        return null;
    }
    static descriptions() {
        return null;
    }
    get value() {
        return __classPrivateFieldGet(this, _Enum_value, "f");
    }
    get label() {
        return __classPrivateFieldGet(this, _Enum_label, "f");
    }
    get description() {
        return __classPrivateFieldGet(this, _Enum_description, "f");
    }
    static fromValue(value) {
        return new this(value);
    }
    static toValues() {
        return Object.values(this.enumMembers);
    }
    static toNames() {
        return Object.keys(this.enumMembers);
    }
    static all() {
        return Object.values(this.toValues())
            .map((val) => new this(val));
    }
    takeNameByValue(value) {
        const values = this.constructor.enumMembers;
        return Object.keys(values)
            .find((key) => values[key] === value);
    }
    takeLabelByName(name) {
        const labels = this.constructor.labels();
        if (!labels) {
            throw new ReferenceError(`Labels not found. Specify labels for ${this.getKeys().join(', ')}.`);
        }
        if (!labels[name]) {
            throw new ReferenceError(`Label for ${name} not found`);
        }
        return labels[name];
    }
    getKeys() {
        return Object.keys(this.constructor.enumMembers);
    }
    takeDescriptionByName(name) {
        const descriptions = this.constructor.descriptions();
        return (descriptions && descriptions[name]) || '';
    }
    static declareEnum() {
        const enumKeys = Object.keys(this).filter((key) => typeof key !== 'function');
        if (enumKeys.length === 0) {
            throw new ReferenceError('Specify members for Enum');
        }
        enumKeys.forEach((key) => {
            // @ts-ignore
            const value = this[key];
            this.declareEnumMember(key, value);
        });
    }
    static declareEnumMember(key, value) {
        const enumMembers = Reflect.get(this, 'enumMembers');
        if (Object.keys(enumMembers).includes(key)) {
            throw new ReferenceError(`Duplicate Enum member ${key}`);
        }
        Reflect.set(this, 'enumMembers', Object.assign(Object.assign({}, enumMembers), { [key]: value }));
        if (delete this[key]) {
            Reflect.defineProperty(this, key, {
                get: () => new this(value),
            });
        }
    }
}
_Enum_value = new WeakMap(), _Enum_label = new WeakMap(), _Enum_name = new WeakMap(), _Enum_description = new WeakMap();
Enum.enumMembers = {};
function enumMember(value = 0) {
    function enumMemberDecorator(target, name) {
        target.declareEnumMember(name, value);
    }
    return enumMemberDecorator;
}

export { Enum, enumMember };
