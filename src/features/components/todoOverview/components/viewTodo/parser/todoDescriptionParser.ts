type Transformer = (value: string) => string;

const toStrongTransformer: Transformer = (value) => {
    return value.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
};

const toLineThroughTransformer: Transformer = (value) => {
    return value.replace(/~~([^*]+)~~/g, '<span class="line-through">$1</span>');
};

const toTagTransformer: Transformer = (value) => {
    return value.replace(/#([^ ]+)/gi, '<span class="text-blue-500 italic">#$1</span>');
};

const toProjectTransformer: Transformer = (value) => {
    return value.replace(/^\[([a-z0-9]+)]/i, '<strong class="uppercase">[$1]</strong> → ');
};

const toOpenTodoListItemTransformer: Transformer = (value) => {
    // noinspection RegExpRedundantEscape
    return value.replace(
        /^\* \[ \](.*)$/,
        `<label class="flex gap-2 items-center first:mt-4">
            <input type="checkbox" disabled class="text-blue-300" />$1
        </label>`,
    );
};

const toDoneTodoListItemTransformer: Transformer = (value) => {
    // noinspection RegExpRedundantEscape
    return value.replace(
        /^\* \[x\](.*)$/i,
        `<label class="flex gap-2 items-center line-through text-gray-400">
            <input type="checkbox" disabled="disabled" checked="checked" class="text-gray-300" /> $1
        </label>`,
    );
};

function compose(value: string, composers: Transformer[]): string {
    let newValue: string = value;

    composers.forEach((composer) => {
        newValue = composer(newValue);
    });

    return newValue;
}

export function parseDescription(description: string): string[] {
    const [summary, ...otherLines] = description.split('\n');

    const parsedSummary = compose(summary, [
        toProjectTransformer,
        toStrongTransformer,
        toLineThroughTransformer,
        toTagTransformer,
    ]);

    const parsedOtherLines = otherLines
        .filter((otherLine) => !!otherLine.trim())
        .map((otherLine) => {
            return compose(otherLine, [
                toStrongTransformer,
                toLineThroughTransformer,
                toOpenTodoListItemTransformer,
                toDoneTodoListItemTransformer,
            ]);
        });

    return [parsedSummary, ...parsedOtherLines];
}
