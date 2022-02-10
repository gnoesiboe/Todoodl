import {
    format,
    isSameYear,
    isToday,
    isTomorrow,
    parse,
    parseISO,
    startOfDay,
    startOfTomorrow,
    nextMonday,
    nextTuesday,
    nextWednesday,
    nextThursday,
    nextFriday,
    nextSaturday,
    nextSunday,
    isPast,
    isFuture,
    isYesterday,
    isSameDay,
} from 'date-fns';
import nl from 'date-fns/locale/nl';

export function checkIsToday(date: Date): boolean {
    return isToday(date);
}

export function checkIsTodayOrBefore(date: Date): boolean {
    return isToday(date) || isPast(date);
}

export function checkIsFutureDay(date: Date): boolean {
    const startOfDate = startOfDay(date);

    return isFuture(startOfDate);
}

export function resolveDateForIndicator(indicator: string): Date | null {
    const normalizedIndicator = indicator.trim().toLowerCase();

    switch (normalizedIndicator) {
        case 'today':
            return createStartOfToday();

        case 'tomorrow':
            return createStartOfTomorrow();

        case 'monday':
            return nextMonday(new Date());

        case 'tuesday':
            return nextTuesday(new Date());

        case 'wednesday':
            return nextWednesday(new Date());

        case 'thursday':
            return nextThursday(new Date());

        case 'friday':
            return nextFriday(new Date());

        case 'saturday':
            return nextSaturday(new Date());

        case 'sunday':
            return nextSunday(new Date());

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
    if (isYesterday(date)) {
        return 'yesterday';
    }

    if (isToday(date)) {
        return 'today';
    }

    if (isTomorrow(date)) {
        return 'tomorrow';
    }

    if (isSameDay(nextMonday(new Date()), date)) {
        return 'monday';
    }

    if (isSameDay(nextTuesday(new Date()), date)) {
        return 'tuesday';
    }

    if (isSameDay(nextWednesday(new Date()), date)) {
        return 'wednesday';
    }

    if (isSameDay(nextThursday(new Date()), date)) {
        return 'thursday';
    }

    if (isSameDay(nextFriday(new Date()), date)) {
        return 'friday';
    }

    if (isSameDay(nextSaturday(new Date()), date)) {
        return 'saturday';
    }

    if (isSameDay(nextSunday(new Date()), date)) {
        return 'sunday';
    }

    const now = new Date();

    if (isSameYear(now, date)) {
        return format(date, 'd LLL', {
            locale: nl,
        });
    }

    return format(date, 'd LLL yyyy', {
        locale: nl,
    });
}

export function parseISOString(value: string): Date {
    return parseISO(value);
}

export function isPressing(date: Date): boolean {
    return checkIsTodayOrBefore(date);
}

export function isWarning(date: Date): boolean {
    return isTomorrow(date);
}
