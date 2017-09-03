declare global {
    interface Window { attachEvent(event: string, f: Function): void; }
}

interface Document {
    [index: string]: any;
}

export default class Util {
    static ready(a: Function): void {
        const w: Window = window;
        const d: Document = document;
        const c = 'addEventListener';
        d[c] ? d[c]('DOMContentLoaded', a) : w.attachEvent('onload', a);
    }

    static toYYYYMMDD(date: Date): string {
        return date.getFullYear() + '-'
            + Util.twoDigits(date.getMonth() + 1) + '-'
            + Util.twoDigits(date.getDate());
    }

    static toUTC(date: Date): Date {
        const newDate = new Date(date.getTime());
        newDate.setHours(newDate.getHours() - newDate.getTimezoneOffset() / 60);
        newDate.setMinutes(newDate.getMinutes() - (newDate.getTimezoneOffset() % 60));
        return newDate;
    }

    static twoDigits(num: number): string {
        return ('0' + num).slice(-2);
    }
}