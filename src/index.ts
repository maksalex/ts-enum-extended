type EnumMemberValue = string | number;
type EnumMemberName = string;

class Enum {
  readonly #value: EnumMemberValue;

  readonly #label: string;

  readonly #name: string;

  readonly #description: string;

  protected static enumMembers: Record<string, EnumMemberValue> = {};

  constructor(value: EnumMemberValue) {
    if (!(this.constructor as typeof Enum).toValues().includes(value)) {
      throw new ReferenceError(`Not exist member in Enum with value ${value}`);
    }
    this.#value = value;
    this.#name = this.takeNameByValue(value);
    this.#label = this.takeLabelByName(this.#name);
    this.#description = this.takeDescriptionByName(this.#name);
  }

  static labels(): Record<string, string> | null {
    return null;
  }

  static descriptions(): Record<string, string> | null {
    return null;
  }

  get value(): EnumMemberValue {
    return this.#value;
  }

  get label(): string {
    return this.#label;
  }

  get description(): string {
    return this.#description;
  }

  static fromValue(value: EnumMemberValue): Enum {
    return new this(value);
  }

  static toValues(): Array<string | number> {
    return Object.values(this.enumMembers);
  }

  static toNames(): string[] {
    return Object.keys(this.enumMembers);
  }

  static all() {
    return Object.values(this.toValues())
      .map((val) => new this(val));
  }

  private takeNameByValue(value: EnumMemberValue): string {
    const values = (this.constructor as typeof Enum).enumMembers;

    return Object.keys(values)
      .find((key) => values[key] === value)!;
  }

  private takeLabelByName(name: string): string {
    const labels = (this.constructor as typeof Enum).labels();
    if (!labels) {
      throw new ReferenceError(`Labels not found. Specify labels for ${this.getKeys().join(', ')}.`);
    }
    if (!labels[name]) {
      throw new ReferenceError(`Label for ${name} not found`);
    }
    return labels[name];
  }

  private getKeys(): string[] {
    return Object.keys((this.constructor as typeof Enum).enumMembers);
  }

  private takeDescriptionByName(name: string): string {
    const descriptions = (this.constructor as typeof Enum).descriptions();
    return (descriptions && descriptions[name]) || '';
  }

  static declareEnum() {
    const enumKeys = Object.keys(this).filter((key) => typeof key !== 'function');

    if (enumKeys.length === 0) {
      throw new ReferenceError('Specify members for Enum');
    }

    enumKeys.forEach((key) => {
      // @ts-ignore
      const value = this[key] as EnumMemberValue;
      this.declareEnumMember(key, value);
    });
  }

  static declareEnumMember(key: EnumMemberName, value: EnumMemberValue) {
    const enumMembers = Reflect.get(this, 'enumMembers');

    if (Object.keys(enumMembers).includes(key)) {
      throw new ReferenceError(`Duplicate Enum member ${key}`);
    }

    Reflect.set(
      this,
      'enumMembers',
      { ...enumMembers, [key]: value },
    );

    if (delete this[key as keyof typeof Enum]) {
      Reflect.defineProperty(this, key, {
        get: () => new this(value),
      });
    }
  }
}

function enumMember(value: EnumMemberValue = 0) {
  function enumMemberDecorator<T extends typeof Enum>(target: T, name: EnumMemberName) {
    target.declareEnumMember(name, value);
  }

  return enumMemberDecorator;
}

export { Enum, enumMember }
