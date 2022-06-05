import { EnumByDeclareEnum } from './enums/EnumByDeclareEnum';
import { EnumByDecorators } from './enums/EnumByDecorators';

test('Enum can create', () => {
    const instance = EnumByDecorators.Client;
    expect(instance).toBeInstanceOf(EnumByDecorators);
})

test('Enum can create and declare by declareEnum()', () => {
    const instance = EnumByDeclareEnum.Admin;
    expect(instance).toBeInstanceOf(EnumByDeclareEnum)
})

test('Enum can create by value', () => {
    const memberFromValue = EnumByDecorators.fromValue(1);
    expect(memberFromValue).toBeInstanceOf(EnumByDecorators);
    expect(memberFromValue.value).toBe(1);
})

test('Enum can return value', () => {
    expect(EnumByDecorators.Client.value).toBe(1);
})

test('Enum can return label', () => {
    expect(EnumByDecorators.Client.label).toBe('client');
})

test('Enum can return description', () => {
    expect(EnumByDecorators.Client.description).toBe('Клиент сайта');
})

test('Enum can return all values', () => {
    expect(EnumByDecorators.toValues()).toEqual([1, 2]);
})

test('Enum can return all names', () => {
    expect(EnumByDecorators.toNames()).toEqual(['Client', 'Manager']);
})

test('Enum can return all members', () => {
    expect(EnumByDecorators.all().every((member) => member instanceof EnumByDecorators)).toBe(true);
})
