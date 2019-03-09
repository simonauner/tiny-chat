export function humanReadableTimeDistanceFuzzy(timeStamp) {
    const now = Date.now();
    const oneMinute = 60 * 1000;
    const oneHour = 60 * oneMinute;

    if (now - timeStamp < oneMinute) {
        return 'a few seconds ago';
    }

    if (now - timeStamp < oneHour) {
        const minutesAgo = Math.ceil((Date.now() - timeStamp) / oneMinute);
        return `about ${minutesAgo} ${plural('minute', minutesAgo)} ago`;
    }

    if (now - timeStamp < 2 * oneHour) {
        const hoursAgo = Math.round((Date.now() - timeStamp) / oneHour);
        return `about ${hoursAgo} ${plural('hour', hoursAgo)} ago`;
    }

    const dateNow = new Date(now);
    const dateTimeStamp = new Date(timeStamp);

    const isToday = isSameDate(dateNow, dateTimeStamp);

    if (isToday) {
        return `today ${leadingZero(dateTimeStamp.getHours())}:${leadingZero(
            dateTimeStamp.getMinutes()
        )}`;
    }

    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    const isYesterday = isSameDate(yesterday, dateTimeStamp);

    if (isYesterday) {
        return `yesterday ${leadingZero(
            dateTimeStamp.getHours()
        )}:${leadingZero(dateTimeStamp.getMinutes())}`;
    }

    return `${dateTimeStamp.getFullYear()}-${leadingZero(
        dateTimeStamp.getMonth() + 1
    )}-${leadingZero(dateTimeStamp.getDate())}`;
}

export function humanReadableTimeDistanceExact(timeStamp) {
    const dateNow = new Date();
    const dateTimeStamp = new Date(timeStamp);

    const isToday = isSameDate(dateNow, dateTimeStamp);

    if (isToday) {
        return `${leadingZero(dateTimeStamp.getHours())}:${leadingZero(
            dateTimeStamp.getMinutes()
        )}`;
    }

    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    const isYesterday = isSameDate(yesterday, dateTimeStamp);

    if (isYesterday) {
        return `yesterday ${leadingZero(
            dateTimeStamp.getHours()
        )}:${leadingZero(dateTimeStamp.getMinutes())}`;
    }

    return `${dateTimeStamp.getFullYear()}-${leadingZero(
        dateTimeStamp.getMonth() + 1
    )}-${leadingZero(dateTimeStamp.getDate())} ${leadingZero(
        dateTimeStamp.getHours()
    )}:${leadingZero(dateTimeStamp.getMinutes())}`;
}

function isSameDate(d1, d2) {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

function plural(word, count) {
    if (count > 1) {
        return `${word}s`;
    }
    return word;
}

function leadingZero(number) {
    if (number < 10) {
        return `0${number}`;
    }
    return number;
}
