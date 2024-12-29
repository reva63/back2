import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';

export const IsBuffer = (validationOptions?: ValidationOptions) => {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isBuffer',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return Buffer.isBuffer(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a Buffer`;
                },
            },
        });
    };
};
