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
}