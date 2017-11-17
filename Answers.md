## Questions
1. What are the order of insertions/removals for the following data structures?
   - **Stack**
   Last in First out, .push to add, .pop to remove
   - **Queue**
   First in First out, .push to add, .shift to remove

2. What is the retreival time complexity for the following data structures?
   - **Linked List**
    lookups are O(N), O(N) means it's proportional to the number of items.
   - **Hash Table**
    lookups are O(1), O(1) is in constant time
   - **Binary Search Trees**
    lookups are O(1)

2. What are some advantages to using a Hash Tables over an array in JavaScript?
With a large amount of data having a Hash Table allows for quick retrieval of information. The
data will be sent through a Hashing Function, and the Hashing Function will spit out an address where the data can be found. This allows for quick retrieval.