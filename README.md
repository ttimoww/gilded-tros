# Gilded Tros Refactoring Kata

This Kata is based on the Gilded Rose Kata, originally created by Terry Hughes (http://twitter.com/TerryHughes). It is already on GitHub [here](https://github.com/NotMyself/GildedRose). See also [Bobby Johnson's description of the kata](http://iamnotmyself.com/2011/02/13/refactor-this-the-gilded-rose-kata/) and [this version with multiple languages](https://github.com/emilybache/GildedRose-Refactoring-Kata).
It was slightly rebranded by Axxes IT Consultancy, and renamed to Gilded Tros (with a wink to a local bar near the Axxes HQ ;)).

## How to use this Kata

The simplest way is to just clone the code and start hacking away improving the design. 
Instructions can be found in the GildedTrosRequirements document.


Have fun and good luck!

# Timo

**Step 1**
- Wrote tests
- Found two bugs in `GildedTros` while writing the tests (see commit)

**Step 2**
- Changed index-based-loop to for of loop

**Step 3**
- Split the `updateQuality` method into product specific methods
- Found and implemented some extra test cases while refactoring

**Step 4**
- Added handling for Smelly items using a factor (assuming quality never decreases below 0)

**Notes**
- In the original implementation, when 10 days until a conference are reached, the quality only decrease by 1

- The requirements do not specify if the quality of "Good Wine" increases twice as fast after the sell In date has passed.

- I asummed quality can never go below 0