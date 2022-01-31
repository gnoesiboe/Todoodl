import { format, isSameYear, isToday, isTomorrow, parse, startOfDay, startOfTomorrow } from 'date-fns';
import nl from 'date-fns/locale/nl';

export function resolveDateForIndicator(indicator: string): Date | null {
    const normalizedIndicator = indicator.trim().toLowerCase();

    switch (normalizedIndicator) {
        case 'today':
            return createStartOfToday();

        case 'tomorrow':
            return createStartOfTomorrow();

        case '':
            return null;

        default:
            try {
                return parseDate(normalizedIndicator);
            } catch (error) {
                console.warn(error);

                return null;
            }
    }
}

function parseDate(value: string): Date | null {
    return parse(value, 'dd-LL-yyyy', new Date(), {
        locale: nl,
        weekStartsOn: 1,
    });
}

function createStartOfTomorrow(): Date {
    return startOfTomorrow();
}

function createStartOfToday(): Date {
    return createStartOfDay(new Date());
}

function createStartOfDay(date: Date): Date {
    return startOfDay(date);
}
export function formatRelativeDate(date: Date): string {
    if (isToday(date)) {
        return 'today';
    }

    if (isTomorrow(date)) {
        return 'tomorrow';
    }

    const now = new Date();

    if (isSameYear(now, date)) {
        return format(date, 'd LLL');
    }

    return format(date, 'd LLL yyyy');
}
