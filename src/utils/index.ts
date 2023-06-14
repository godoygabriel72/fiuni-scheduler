import { registerDecorator, ValidationOptions } from 'class-validator';
import { startOfDay, endOfDay, format } from 'date-fns';
import { Between } from 'typeorm'

export function IsOnlyDate(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
        name: 'IsOnlyDate',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [],
        options: {
            message: 'Please provide only date like yyyy-mm-dd',
            ...validationOptions,
        },
        validator: {
            validate(value: any) {
            const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
            return typeof value === 'string' && regex.test(value);
            },
        },
        });
    };
}

export const BetweenDates = (from: Date | string, to: Date | string) =>
    Between(
    format(typeof from === 'string' ? new Date(from) : from, 'YYYY-MM-DD HH:MM:SS'),
    format(typeof to === 'string' ? new Date(to) : to, 'YYYY-MM-DD HH:MM:SS'),
);