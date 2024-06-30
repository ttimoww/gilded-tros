import { Item } from '../src/item';
import { GildedTros } from '../src/gilded-tros';

describe('GildedTrosTest', () => {
    it('should update the quality', () => {
        const items: Item[] = [new Item('foo', 0, 0)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].name).toEqual('foo');
    });

    it('should decrease the quality of a normal item', () => {
        const items: Item[] = [new Item('foo', 1, 1)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].quality).toEqual(0);
        expect(app.items[0].sellIn).toEqual(0);
    });

    it('should decrease the quality of a normal item twice as fast once the sell date passed', () => {
        const items: Item[] = [new Item('foo', -1, 2)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].quality).toEqual(0);
        expect(app.items[0].sellIn).toEqual(-2);
    });

    it('should never have a negative quality', () => {
        const items: Item[] = [new Item('foo', 1, 0)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].quality).toEqual(0);
    });

    it('should increase the quality of "Good Wine" but never above 50', () => {
        const items: Item[] = [new Item('Good Wine', 2, 0), new Item('Good Wine', 2, 50)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].quality).toEqual(1);
        expect(app.items[1].quality).toEqual(50);
    })

    it('should never decrease the quality of "B-DAWG Keychain"', () => {
        const items: Item[] = [new Item('B-DAWG Keychain', 0, 80)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].quality).toEqual(80);
    });

    it('should drop the quality of expired conference tickets to 0', () => {
        const items: Item[] = [new Item('Backstage passes for Re:Factor', 0, 20), new Item('Backstage passes for HAXX', 0, 20)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].quality).toEqual(0);
        expect(app.items[1].quality).toEqual(0);
    });

    it('should increase the quality of conference tickets by 2 when there are 10 days or less', () => {
        const items: Item[] = [new Item('Backstage passes for Re:Factor', 10, 20), new Item('Backstage passes for HAXX', 10, 20)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].quality).toEqual(22);
        expect(app.items[1].quality).toEqual(22);
    });

    it('should increase the quality of conference tickets by 3 when there are 5 days or less', () => {
        const items: Item[] = [new Item('Backstage passes for Re:Factor', 5, 20), new Item('Backstage passes for HAXX', 5, 20), new Item('Backstage passes for HAXX', 2, 49)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].quality).toEqual(23);
        expect(app.items[1].quality).toEqual(23);
        expect(app.items[2].quality).toEqual(50);
    });

    it('should keep the quality of legendary items at 80', () => {
        const items: Item[] = [new Item('B-DAWG Keychain', 0, 80)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].quality).toEqual(80);
    });
});
