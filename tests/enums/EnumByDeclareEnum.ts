import { Enum } from '../../src';

class EnumByDeclareEnum extends Enum {
  static Admin = 1
  static User = 2

  static labels() {
    return {
      Admin: 'admin',
      User: 'user',
    };
  }

  static descriptions() {
    return {
      Admin: 'Администратор',
      User: 'Пользователь',
    };
  }
}

EnumByDeclareEnum.declareEnum()

export { EnumByDeclareEnum }
