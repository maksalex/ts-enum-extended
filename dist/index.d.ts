declare type EnumMemberValue = string | number;
declare type EnumMemberName = string;
declare class Enum {
    #private;
    protected static enumMembers: Record<string, EnumMemberValue>;
    constructor(value: EnumMemberValue);
    static labels(): Record<string, string> | null;
    static descriptions(): Record<string, string> | null;
    get value(): EnumMemberValue;
    get label(): string;
    get description(): string;
    static fromValue(value: EnumMemberValue): Enum;
    static toValues(): Array<string | number>;
    static toNames(): string[];
    static all(): Enum[];
    private takeNameByValue;
    private takeLabelByName;
    private getKeys;
    private takeDescriptionByName;
    static declareEnum(): void;
    static declareEnumMember(key: EnumMemberName, value: EnumMemberValue): void;
}
declare function enumMember(value?: EnumMemberValue): <T extends typeof Enum>(target: T, name: EnumMemberName) => void;
export { Enum, enumMember };
