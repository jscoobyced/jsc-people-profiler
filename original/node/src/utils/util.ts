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

    static toYYYYMMDDHHMMSS(date: Date, timeSeparator: string = 'T'): string {
        return date.getFullYear() + '-'
            + Util.twoDigits(date.getMonth() + 1) + '-'
            + Util.twoDigits(date.getDate()) + timeSeparator
            + Util.twoDigits(date.getHours()) + ':'
            + Util.twoDigits(date.getMinutes()) + ':'
            + Util.twoDigits(date.getSeconds());
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

    static handleNetworkResponse(response: Response): void {
        switch (response.status) {
            case 404:
                throw new Error('Feature not implemented.');
            case 500:
                throw new Error('The server returned an error.');
            default:
                break;
        }
    }
}