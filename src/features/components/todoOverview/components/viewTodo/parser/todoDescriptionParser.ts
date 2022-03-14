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
    return value.replace(
        /^\[([a-z0-9]+)]/i,
        '<strong class="lowercase">$1</strong>&nbsp;&nbsp;<span class="text-gray-400"> | </span>&nbsp;',
    );
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

const toLinkWithLabelTransformer: Transformer = (value) => {
    return value.replace(
        /\[([^\]]+)]\(([^\s]+)\)/gi,
        '<a href="$2" target="_blank" rel="nofollow noreferrer" class="underline">$1</a>',
    );
};

const toLinkWithoutLabelTransformer: Transformer = (value) => {
    return value.replace(
        /(?<!")(https:\/\/[^\s]+)/gi,
        '<a href="$1" target="_blank" rel="nofollow noreferrer"  class="underline">$1</a>',
    );
};

const toCodeTransformer: Transformer = (value) => {
    return value.replace(
        /`([^`]+)`/g,
        '<code class="inline italic font-mono bg-gray-600 text-white opacity-60 px-1 rounded text-xm">$1</code>',
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
        toCodeTransformer,
        toLinkWithLabelTransformer,
        toLinkWithoutLabelTransformer, // Beware! Execute this one after toLinkWithLabelTransformer
    ]);

    const parsedOtherLines = otherLines
        .filter((otherLine) => !!otherLine.trim())
        .map((otherLine) => {
            return compose(otherLine, [
                toStrongTransformer,
                toLineThroughTransformer,
                toOpenTodoListItemTransformer,
                toDoneTodoListItemTransformer,
                toCodeTransformer,
                toLinkWithLabelTransformer,
                toLinkWithoutLabelTransformer, // Beware! Execute this one after toLinkWithLabelTransformer
            ]);
        });

    return [parsedSummary, ...parsedOtherLines];
}
