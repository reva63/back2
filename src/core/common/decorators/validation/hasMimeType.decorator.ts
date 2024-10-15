import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';

export function HasMimeType(
    mimeTypes: string[],
    validationOptions?: ValidationOptions,
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isMimeType',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [mimeTypes],
            validator: {
                async validate(value: any) {
                    if (!value) return false;
                    return mimeTypes.includes(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be of type ${args.constraints[0].join(', ')}`;
                },
            },
        });
    };
}
