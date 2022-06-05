import { Enum, enumMember } from '../../src';

export class EnumByDecorators extends Enum {
  @enumMember(1)
  static Client: EnumByDecorators;

  @enumMember(2)
  static Manager: EnumByDecorators

  static labels() {
    return {
      Client: 'client',
      Manager: 'manager',
    };
  }

  static descriptions() {
    return {
      Client: 'Клиент сайта',
      Manager: 'Менеджер продаж',
    };
  }
}
