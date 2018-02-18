export default class Key {

    private _index: number = 0;

    public next(): number {
        return this._index++;
    }
}