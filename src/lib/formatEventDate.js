/**
 * Formats an ISO date string and returns an English date string.
 * Supports 'full', 'short', and 'time' formats for reuse across the UI.
 * @param {string} isoString - The ISO date string to format
 * @param {('full'|'short'|'time')} [format='full'] - The format type to use
 * @returns {string} The formatted date string (English localization)
 */
export const formatEventDate = (isoString, format = 'full') => {
    const date = new Date(isoString);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    const formats = {
        full: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Kolkata'
        },
        short: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Kolkata'
        },
        time: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        }
    };

    const options = formats[format] ?? formats.full;
    const formatter = new Intl.DateTimeFormat('en-US', options);

    return formatter.format(date);
};