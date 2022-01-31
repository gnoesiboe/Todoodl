export function sortObjectByKey<ObjectType extends Record<string, unknown>>(
    object: ObjectType,
): ObjectType {
    const out: Record<string, unknown> = {};

    const sortedKeys = Object.keys(object).sort();

    sortedKeys.forEach((key) => {
        out[key] = object[key];
    });

    return out as ObjectType;
}
