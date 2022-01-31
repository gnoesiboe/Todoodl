export function groupArrayByCallback<
    ItemType,
    KeyType extends string = 'string',
>(
    array: Array<ItemType>,
    determineGroupName: (item: ItemType) => KeyType,
): Record<KeyType, Array<ItemType>> {
    let out: Record<string, Array<ItemType>> = {};

    array.forEach((item) => {
        const groupName = determineGroupName(item);

        if (out[groupName] === undefined) {
            out[groupName] = [];
        }

        out[groupName].push(item);
    });

    return out;
}
