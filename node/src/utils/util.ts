declare global {
    interface Window { attachEvent(event: string, f: Function): void; }
}

interface Document {
    [index: string]: any;
}

export default class Util {
    static ready(a: Function): void {
        let w: Window = window;
        let d: Document = document;
        let c = 'addEventListener';
        d[c] ? d[c]('DOMContentLoaded', a) : w.attachEvent('onload', a);
    }

    static toYYYYMMDD(date: Date): string {
        return date.getFullYear() + '-'
            + Util.twoDigits(date.getMonth() + 1) + '-'
            + Util.twoDigits(date.getDate());
    }

    static twoDigits(num: number): string {
        return ('0' + num).slice(-2);
    }
}