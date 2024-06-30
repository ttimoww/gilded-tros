import { Item } from './item';

export class GildedTros {

    constructor(public items: Array<Item>) {

    }

    /**
     * Update the quality of a "Good Wine" item.
     * The quality of a "Good Wine" item increases by 1 each day.
     * @param item The item to update
     */
    private updateGoodWine(item: Item): void {
        item.sellIn = item.sellIn - 1;

        if (item.quality < 49) {
            item.quality = item.quality + 1;
            return
        }

        item.quality = 50;
    }

    /**
     * Update the quality of a "Backstage passes" item
     * The quality of a "Backstage passes" item increases by 1 each day.
     * When there are 10 days or less, the quality increases by 2.
     * When there are 5 days or less, the quality increases by 3.
     * When the sellIn date has passed, the quality drops to 0.
     * @param item The item to update
     */
    private updateBackstagePasses(item: Item): void {
        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0) {
            item.quality = 0;
            return
        }

        if (item.sellIn < 6) {
            if (item.quality < 48) {
                item.quality = item.quality + 3;
                return
            }

            item.quality = 50;
            return
        }

        if (item.sellIn < 11) {
            if (item.quality < 49) {
                item.quality = item.quality + 2;
                return
            }

            item.quality = 50;
            return
        }

        if (item.quality < 50) {
            item.quality = item.quality + 1;
        }
    }

    /**
     * Update the quality of a "B-DAWG Keychain" item
     * The quality of a "B-DAWG Keychain" item never decreases.
     * @param item The item to update
     */
    private updateBDawgKeychain(item: Item): void {
        // Void
    }

    /**
     * Update the quality of a default item
     * The quality of a default item decreases by 1 each day.
     * @param item The item to update
     * @param factor The factor to decrease the quality by
     */
    private updateDefaultItem(item: Item, factor = 1): void {
        item.sellIn = item.sellIn - 1;

        if (item.quality > 0) {
            if (item.sellIn < 0) {
                item.quality = item.quality - 2 * factor;
                return
            }

            item.quality = item.quality - 1 * factor;
        }
    }

    public updateQuality(): void {
        for (const item of this.items) {
            switch (item.name) {
                case 'Good Wine':
                    this.updateGoodWine(item);
                    break;

                case 'Backstage passes for Re:Factor':
                case 'Backstage passes for HAXX':
                    this.updateBackstagePasses(item);
                    break;

                case 'B-DAWG Keychain':
                    this.updateBDawgKeychain(item);
                    break;

                case 'Duplicate Code':
                case 'Long Methods':
                case 'Ugly Variable Names':
                    this.updateDefaultItem(item, 2);
                    break;

                default:
                    this.updateDefaultItem(item);
                    break;
            }
        }
    }

}

