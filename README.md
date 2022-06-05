# Enums for TypeScript/JavaScript

This package offers typed enums for TypeScript/JavaScript

```javascript
class User extends Enum {
    @enumMember(1)
    static Client: User;

    @enumMember(2)
    static Manager: User

    static labels() {
        return {
            Client: 'client',
            Manager: 'manager',
        };
    }

    static descriptions() {
        return {
            Client: 'Site client',
            Manager: 'Sales manager',
        };
    }
}

User.Manager instanceof User; // true

User.Client.value // 1
User.Client.label // client
User.Client.description // Site client

User.fromValue(2) // User.Manager
User.toValues() // [1, 2]
User.toNames() // ['Client', 'Manager']
User.all() // [User.Client, User.Manager]
```

## Installation

### Yarn:
```bash
yarn add ts-enum
```

### NPM:
```bash
npm i ts-enum
```

## Usage

You can choose one of two ways to define enumeration members.

### Using decorator:
```javascript
class User extends Enum {
    @enumMember(1)
    static Client: User;

    @enumMember(2)
    static Manager: User

    static labels() {
        return {
            Client: 'client',
            Manager: 'manager',
        };
    }

    static descriptions() {
        return {
            Client: 'Site client',
            Manager: 'Sales manager',
        };
    }
}

export { User }
```

> :warning: **If you decide to use decorator to declare enumeration members,**
> you need to set up decorator support in your project
> #### TS:
> To enable experimental support for decorators, you must enable the experimentalDecorators compiler option in your ```tsconfig.json```:
> ```json
> {
>  "compilerOptions": {
>    "target": "ES5",
>    "experimentalDecorators": true
>  }
>}
>```
> #### JS:
> To enable decorators, you must add ```@babel/plugin-proposal-decorators``` in your ```babel.config.json```
>```json
>{
>  "plugins": ["@babel/plugin-proposal-decorators"]
>}
>```

### Using declareEnum() method:

If you don't want to install additional dependencies, you can call the method ```declareEnum()``` before exporting the class.
```javascript
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
            Admin: 'Administrator',
            User: 'Site user',
        };
    }
}

EnumByDeclareEnum.declareEnum()

export { EnumByDeclareEnum }
```

> :warning: **This method is recommended to be used ONLY in projects using Javascript.**
> Using the method ```declareEnum()``` to declare members can cause type errors in TypeScript


## Testing

```bash
yarn install
yarn run test:unit
```
