import type {Enum, FieldBase, MapField, Type} from 'protobufjs';

export type Schema = {
    type: 'enum';
    values: string[];
} | {
    type: 'record';
    fields: {
        name: string;
        type: Schema;
        optional: boolean;
    }[];
} | {
    type: 'array';
    elements: Schema;
} | {
    type: 'map';
    elements: Schema;
} | string;

const scalarToSchema = (scalarType: string): string => {
    switch (scalarType) {
        case 'double':
        case 'float':
        case 'int32':
        case 'uint32':
        case 'sint32':
        case 'int64':
        case 'uint64':
        case 'sint64':
            return 'number';
        case 'bool':
            return 'boolean';
        case 'string':
            return 'string';
        default:
            throw new Error(`Unhandled type: ${scalarType}`);
    }
};

const enumToSchema = (pbEnum: Enum, registry: Record<string, Schema>): string => {
    if (!Object.prototype.hasOwnProperty.call(registry, pbEnum.name)) {
        const values = Object.values(pbEnum.valuesById);
        registry[pbEnum.name] = {type: 'enum', values};
    }
    return pbEnum.name;
};

export const typeToSchema = (pbType: Type, registry: Record<string, Schema>): string => {
    if (Object.prototype.hasOwnProperty.call(registry, pbType.name)) {
        return pbType.name;
    }

    const fields: {
        name: string;
        type: Schema;
        doc?: string;
        optional: boolean;
    }[] = [];
    for (const field of pbType.fieldsArray) {
        const resolvedType = field.resolvedType;
        let fieldType;
        if (resolvedType) {
            if ('valuesById' in resolvedType) {
                fieldType = enumToSchema(resolvedType, registry);
            } else {
                fieldType = typeToSchema(resolvedType, registry);
            }
        } else {
            fieldType = scalarToSchema(field.type);
        }
        if (field.map) {
            const mapField = (field as FieldBase as MapField);
            if (mapField.keyType !== 'string') {
                throw new Error(`Unexpected map key type: ${mapField.keyType}`);
            }
            fieldType = {type: 'map', elements: fieldType} as const;
        }
        if (field.repeated) {
            fieldType = {type: 'array', elements: fieldType} as const;
        }
        const tsField = {
            name: field.name,
            doc: field.comment ?? undefined,
            type: fieldType,
            optional: field.optional,
        };
        fields.push(tsField);
    }
    registry[pbType.name] = {
        type: 'record',
        fields,
    };
    return pbType.name;
};

export const schemaToTypescript = (schema: Schema): string => {
    if (typeof schema === 'string') return schema;
    if (schema.type === 'enum') return schema.values.map(v => JSON.stringify(v)).join(' | ');
    if (schema.type === 'array') return `${schemaToTypescript(schema.elements)}[]`;
    if (schema.type === 'map') return `Record<string, ${schemaToTypescript(schema.elements)}>`;
    const fieldsStr = schema.fields.map(({name, type, optional}) =>
        `    ${name}${optional ? '?' : ''}: ${schemaToTypescript(type)};\n`,
    ).join('');
    return `{\n${fieldsStr}}`;
};
