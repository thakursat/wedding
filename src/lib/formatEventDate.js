/**
 * Formats an ISO date string in English or Hindi.
 * Supports 'full', 'short', and 'time' formats for reuse across the UI.
 * @param {string} isoString - The ISO date string to format
 * @param {('full'|'short'|'time')} [format='full'] - The format type to use
 * @param {('en'|'hi')} [language='en'] - The language to format in
 * @returns {string} The formatted date string
 */
export const formatEventDate = (isoString, format = 'full', language = 'en') => {
    const date = new Date(isoString);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    const formatConfigs = {
        full: {
            options: {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Kolkata'
            },
            locale: 'en-US'
        },
        short: {
            options: {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'Asia/Kolkata'
            },
            locale: 'en-US'
        },
        time: {
            options: {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Kolkata'
            },
            locale: 'en-US'
        },
        dayMonthYear: {
            options: {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'Asia/Kolkata'
            },
            locale: 'en-GB'
        }
    };

    const activeFormat = formatConfigs[format] ?? formatConfigs.full;
    const hasOptionsObject = typeof activeFormat.options === 'object';
    const options = hasOptionsObject ? activeFormat.options : activeFormat;
    const englishLocale = hasOptionsObject ? activeFormat.locale ?? 'en-US' : 'en-US';
    const locale = language === 'hi' ? 'hi-IN' : englishLocale;
    const formatter = new Intl.DateTimeFormat(locale, options);

    return formatter.format(date);
};