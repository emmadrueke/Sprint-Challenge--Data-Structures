/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LinkedList, LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');
//  ## Challenge
//  If you take a look at the hash-table.js file you'll notice that
//  it has solution code in it. You'll also notice that if you run the
//  tests, they all pass. Your job is to refactor this hash table solution
//  to use **linked lists** for buckets instead of arrays. You're welcome
//  to add another class to the helper file, following the pattern used
//  with LimitedArray.
class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  resize() {
    this.limit *= 2;
    const oldStorage = this.storage;
    this.storage = new LinkedList(this.limit);
    oldStorage.each((bucket) => {
      if (!bucket) return;
      bucket.forEach((pair) => {
        this.insert(pair[0], pair[1]);
      });
    });
  }

  capacityIsFull() {
    let fullCells = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });
    return fullCells / this.limit >= 0.75;
  }

  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    if (this.capacityIsFull()) this.resize();
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = new LinkedList(); // the bucket would be a new LinkedList

    bucket = bucket.filter(item => item[0] !== key);
    bucket.push({ key, value });
    this.storage.set(index, bucket); // have to access addToTail method on the LinkedList class.
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage.get(index);

    if (bucket) {
      bucket = bucket.filter(item => item[0] !== key);
      this.storage.set(index, bucket);
    }
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    let retrieved;
    if (bucket) {
      retrieved = bucket.filter(item => item[0] === key)[0];
    }

    return retrieved ? retrieved[1] : undefined;
  }
}
// I didn't change hardly any of the code, but my thought process was to create a LinkedList class in the hash-table-helper
// From there I believe that changing the bucket to a linked list is where this is going.
// How I'm envisioning the hash table is that we are sending data through a hashing function
// which then assigns an address to the data and then the coder needs to place that data into an array?
// and then if there is a collision the coder needs to create a linked list off that data[0] item
// what I'm still unclear on is if with a bucket this code would need resize and capacityIsFull method

module.exports = HashTable;
