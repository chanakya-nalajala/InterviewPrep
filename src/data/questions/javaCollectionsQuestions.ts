import { CategoryData } from "../types";

export const javaCollectionsQuestions: CategoryData = {
  id: "java-collections",
  name: "2. Collections Framework",
  icon: "📦",
  color: "var(--blue)",
  description:
    "List, Set, Queue, Map, Iterators, Comparable, equals/hashCode contract",
  sections: [
    {
      id: "collections-list",
      name: "2.1 List, Set, Queue",
      interviewQuestions: [
        {
          id: "java-coll-1",
          type: "interview",
          question: "What is the difference between ArrayList and LinkedList?",
          hint: "ArrayList = dynamic array (random access O(1), insert O(n)). LinkedList = doubly-linked (insert O(1), access O(n)). Memory overhead for LinkedList.",
        },
        {
          id: "java-coll-2",
          type: "interview",
          question:
            "How does ArrayList resize internally? What is the growth factor?",
          hint: "Grows when full, new capacity = old * 1.5. Copies elements to new array. ensureCapacity() pre-sizes. Initial capacity 10.",
        },
        {
          id: "java-coll-3",
          type: "interview",
          question: "What is CopyOnWriteArrayList and when should you use it?",
          hint: "Thread-safe, every write copies the array — O(n). Reads are lock-free (snapshot). Use for event listeners, rarely-changed lists.",
        },
        {
          id: "java-coll-4",
          type: "interview",
          question: "What is the difference between HashSet and LinkedHashSet?",
          hint: "HashSet = unordered, backed by HashMap. LinkedHashSet = insertion order preserved, doubly-linked list + hash table. O(1) lookup for both.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-coll-s1",
          type: "scenario",
          question:
            "Your app iterates a List with 1M items frequently. ArrayList or LinkedList?",
          hint: "ArrayList — iteration is O(1) per element with cache locality. LinkedList has poor cache performance due to pointer chasing.",
        },
        {
          id: "java-coll-s2",
          type: "scenario",
          question:
            "An ArrayList is shared across threads. One thread iterates while another removes an element. ConcurrentModificationException is thrown. How do you fix?",
          hint: "CopyOnWriteArrayList (for rare writes), Collections.synchronizedList() + manual sync on iteration, or use Iterator.remove().",
        },
        {
          id: "java-coll-s3",
          type: "scenario",
          question:
            "You need to frequently check if an element exists in a large collection. List or Set?",
          hint: "Set (HashSet/LinkedHashSet) — O(1) contains(). List.contains() = O(n). TreeSet = O(log n) but sorted.",
        },
        {
          id: "java-coll-s4",
          type: "scenario",
          question:
            "A PriorityQueue processes tasks. New urgent tasks should be processed first. How do you implement priority?",
          hint: "Custom Comparator for PriorityQueue (min-heap by default). Urgent tasks = lower priority value. poll() gets highest priority.",
        },
        {
          id: "java-coll-s5",
          type: "scenario",
          question:
            "ArrayList.remove(int index) in a loop causes performance issues. Why and how to fix?",
          hint: "Shifts elements left on each remove — O(n) per remove. Use Iterator.remove(), or removeIf(), or traverse backward.",
        },
        {
          id: "java-coll-s6",
          type: "scenario",
          question:
            "You need a stack data structure. Should you use Stack class?",
          hint: "No — Stack extends Vector (legacy, synchronized overhead). Use ArrayDeque (faster, no sync). push()/pop()/peek().",
        },
      ],
    },
    {
      id: "collections-map",
      name: "2.2 Map Interface & Implementations",
      interviewQuestions: [
        {
          id: "java-map-1",
          type: "interview",
          question: "How does HashMap work internally in Java 8?",
          hint: "Array of buckets (Node[]). Hash code → bucket index. Collision: linked list → tree (treeified at 8+ elements). Load factor 0.75, resize doubles capacity.",
        },
        {
          id: "java-map-2",
          type: "interview",
          question: "What is the equals() and hashCode() contract?",
          hint: "If equals() is true, hashCode() must be same. Violating this breaks HashMap/HashSet. Override both or neither.",
        },
        {
          id: "java-map-3",
          type: "interview",
          question:
            "What is ConcurrentHashMap and how does it achieve thread safety?",
          hint: "Segment-based locking (Java 7), CAS + synchronized per bucket (Java 8). No global lock. Concurrent reads without blocking. weakly consistent.",
        },
        {
          id: "java-map-4",
          type: "interview",
          question: "What is LinkedHashMap and what are its two modes?",
          hint: "Extends HashMap + doubly-linked list. Modes: insertion-order (default), access-order (for LRU cache). removeEldestEntry() for eviction.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-map-s1",
          type: "scenario",
          question:
            "A HashMap key is a mutable object. Someone changes the key's field after insertion. What happens?",
          hint: "hashCode() changes → wrong bucket → get() returns null. Never use mutable objects as keys. Use immutable types or defensive copy.",
        },
        {
          id: "java-map-s2",
          type: "scenario",
          question:
            "You need an LRU cache with max size 100. How do you implement it efficiently?",
          hint: "LinkedHashMap with access-order (true), override removeEldestEntry() to check size > 100. Or use Caffeine library.",
        },
        {
          id: "java-map-s3",
          type: "scenario",
          question:
            "ConcurrentHashMap.size() returns different values on consecutive calls under load. Is this a bug?",
          hint: "No — size() is weakly consistent (approximate). Use mappingCount() for better accuracy. Accept eventual consistency.",
        },
        {
          id: "java-map-s4",
          type: "scenario",
          question:
            "You need to compute a value only if the key is absent. HashMap.get() + put() has a race. How to fix?",
          hint: "ConcurrentHashMap.computeIfAbsent(key, k -> expensiveCompute(k)). Atomic operation, prevents duplicate computation.",
        },
        {
          id: "java-map-s5",
          type: "scenario",
          question:
            "A HashMap has null keys and values but ConcurrentHashMap doesn't allow them. Why?",
          hint: "HashMap = single-threaded, null has meaning. CHM = concurrent, null ambiguous (absent vs mapped to null). Use Optional or sentinel.",
        },
        {
          id: "java-map-s6",
          type: "scenario",
          question: "TreeMap vs HashMap — when to use which?",
          hint: "HashMap = O(1) average, unordered. TreeMap = O(log n), sorted by key, NavigableMap (ceilingKey, floorKey, subMap). Use TreeMap for range queries.",
        },
      ],
    },
    {
      id: "collections-iterators",
      name: "2.3 Iterators & Comparable",
      interviewQuestions: [
        {
          id: "java-iter-1",
          type: "interview",
          question:
            "What is the difference between fail-fast and fail-safe iterators?",
          hint: "Fail-fast (ArrayList, HashMap) throws ConcurrentModificationException on modification. Fail-safe (CopyOnWriteArrayList, CHM) works on snapshot/copy.",
        },
        {
          id: "java-iter-2",
          type: "interview",
          question: "What is Comparable vs Comparator?",
          hint: "Comparable = natural ordering (compareTo in class). Comparator = external comparison logic (compare method). Use Comparator for multiple sort orders.",
        },
        {
          id: "java-iter-3",
          type: "interview",
          question: "How do you chain multiple Comparators in Java 8+?",
          hint: "Comparator.comparing(User::getLastName).thenComparing(User::getFirstName). Reads like SQL ORDER BY.",
        },
        {
          id: "java-iter-4",
          type: "interview",
          question: "What is the contract of equals() and hashCode()?",
          hint: "equals() == true → same hashCode(). Not reflexive reverse (same hash ≠ equals). Used in HashMap/HashSet. Violate = broken collections.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-iter-s1",
          type: "scenario",
          question:
            "You iterate a HashMap and remove elements directly: map.remove(key). ConcurrentModificationException is thrown. How to fix?",
          hint: "Use Iterator.remove(), or map.entrySet().removeIf(predicate), or collect keys then remove outside iteration.",
        },
        {
          id: "java-iter-s2",
          type: "scenario",
          question:
            "Two objects have same content but different hashCode(). What breaks?",
          hint: "HashMap.get() fails to find them even though equals() is true. Violates contract. Always override both or neither.",
        },
        {
          id: "java-iter-s3",
          type: "scenario",
          question:
            "You need to sort a List<Employee> by salary descending, then by name ascending. How?",
          hint: "Comparator.comparing(Employee::getSalary).reversed().thenComparing(Employee::getName). Or custom Comparator logic.",
        },
        {
          id: "java-iter-s4",
          type: "scenario",
          question:
            "A class implements Comparable but you need a different sort order for a specific use case. How?",
          hint: "Pass a custom Comparator to Collections.sort(list, comparator) or list.sort(comparator). Doesn't change natural order.",
        },
        {
          id: "java-iter-s5",
          type: "scenario",
          question:
            "You add an object to HashSet, then modify a field used in hashCode(). Contains() returns false. Why?",
          hint: "hashCode() changed → wrong bucket → not found. Never mutate objects used as set elements or map keys.",
        },
        {
          id: "java-iter-s6",
          type: "scenario",
          question:
            "ConcurrentHashMap iteration doesn't throw exceptions but reflects recent updates. Explain.",
          hint: "Fail-safe: works on weakly consistent snapshot. May reflect some updates during iteration. No strict snapshot isolation.",
        },
      ],
    },
    {
      id: "collections-queue",
      name: "2.4 Queue, Deque & PriorityQueue",
      interviewQuestions: [
        {
          id: "java-queue-1",
          type: "interview",
          question: "Difference between Queue, Deque, and Stack in Java?",
          hint: "Queue = FIFO (offer/poll/peek). Deque = double-ended (can act as stack or queue). Stack class is legacy — use ArrayDeque.",
        },
        {
          id: "java-queue-2",
          type: "interview",
          question:
            "How does PriorityQueue work? What is its time complexity for add and poll?",
          hint: "Min-heap (binary heap array). add()/offer() = O(log n). poll() = O(log n). peek() = O(1). Not thread-safe.",
        },
        {
          id: "java-queue-3",
          type: "interview",
          question: "What is BlockingQueue and name its key implementations?",
          hint: "Thread-safe, blocks on take() (empty) and put() (full). LinkedBlockingQueue, ArrayBlockingQueue, SynchronousQueue, PriorityBlockingQueue.",
        },
        {
          id: "java-queue-4",
          type: "interview",
          question:
            "When would you use ArrayDeque over LinkedList as a stack/queue?",
          hint: "ArrayDeque is faster (no node allocation overhead, cache-friendly). LinkedList wastes memory with prev/next pointers.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-queue-s1",
          type: "scenario",
          question:
            "Design a task scheduler where higher-priority tasks execute first.",
          hint: "PriorityBlockingQueue<Task> with Task implements Comparable<Task>. Worker threads take() from queue.",
        },
        {
          id: "java-queue-s2",
          type: "scenario",
          question:
            "Implement a fixed-size sliding window for rate limiting using a Queue.",
          hint: "ArrayDeque<Long> of timestamps. On each request, remove entries older than window. Reject if size ≥ limit.",
        },
        {
          id: "java-queue-s3",
          type: "scenario",
          question:
            "You need to process events in FIFO order across threads. What blocking queue and why?",
          hint: "LinkedBlockingQueue (unbounded or bounded). ArrayBlockingQueue for strict memory bounds. SynchronousQueue for direct handoff.",
        },
        {
          id: "java-queue-s4",
          type: "scenario",
          question:
            "Implement BFS for a graph in Java. What collection do you use?",
          hint: "Queue<Node> (use ArrayDeque). offer() neighbors, poll() current. Set<Node> for visited tracking.",
        },
        {
          id: "java-queue-s5",
          type: "scenario",
          question:
            "A bounded queue is full and a producer is blocked. How do you add a timeout and handle the failure case?",
          hint: "queue.offer(item, timeout, TimeUnit) returns false on timeout. Handle: log, apply backpressure, or drop with dead-letter logic.",
        },
        {
          id: "java-queue-s6",
          type: "scenario",
          question:
            "You're building a message deduplication system. Messages arrive out of order. What data structure helps?",
          hint: "PriorityQueue for ordering by sequence number, HashSet for seen IDs. Drain in order once gaps filled.",
        },
      ],
    },
    {
      id: "collections-iter-cme",
      name: "2.5 Iterators & ConcurrentModificationException",
      interviewQuestions: [
        {
          id: "java-iter-cme-1",
          type: "interview",
          question:
            "What is ConcurrentModificationException and why does it occur?",
          hint: "Fail-fast iterator detects structural modification (modCount check) during iteration. Not thread-safety issue per se — single-thread CME possible.",
        },
        {
          id: "java-iter-cme-2",
          type: "interview",
          question: "Difference between fail-fast and fail-safe iterators?",
          hint: "Fail-fast: throws CME on modification (ArrayList, HashMap). Fail-safe: iterates on snapshot (CopyOnWriteArrayList, ConcurrentHashMap).",
        },
        {
          id: "java-iter-cme-3",
          type: "interview",
          question:
            "How do you safely remove elements from a Map while iterating?",
          hint: "entrySet().iterator().remove(), or map.entrySet().removeIf(), or collect keys to remove and call map.keySet().removeAll().",
        },
        {
          id: "java-iter-cme-4",
          type: "interview",
          question:
            "What is ListIterator and what extra capabilities does it offer over Iterator?",
          hint: "Bidirectional (hasPrevious, previous), add(), set(), current index via nextIndex()/previousIndex().",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-iter-cme-s1",
          type: "scenario",
          question:
            "You get CME in production on a HashMap. It's single-threaded code. How is this possible?",
          hint: "Modification inside enhanced for-loop or stream. E.g., calling map.put() inside map.forEach(). Use entrySet().removeIf() instead.",
        },
        {
          id: "java-iter-cme-s2",
          type: "scenario",
          question:
            "A large dataset needs filtered results. Should you use Stream.filter() or Iterator.remove()? What are the trade-offs?",
          hint: "Streams = functional, readable, lazy, doesn't modify original. Iterator.remove() = modifies in place, less memory. Depends on mutation needs.",
        },
        {
          id: "java-iter-cme-s3",
          type: "scenario",
          question:
            "Multiple threads iterate over a shared ArrayList. You need no locking. What's your approach?",
          hint: "CopyOnWriteArrayList — safe concurrent iteration. Writes expensive (copy). Or use immutable snapshot pattern.",
        },
        {
          id: "java-iter-cme-s4",
          type: "scenario",
          question:
            "You need to iterate a Map and update values (not keys). What's the safest approach?",
          hint: "map.replaceAll((k, v) -> newValue), or entrySet().iterator() with entry.setValue(). Avoid put() during iteration.",
        },
        {
          id: "java-iter-cme-s5",
          type: "scenario",
          question:
            "Explain how ConcurrentHashMap.forEach() works without throwing CME.",
          hint: "Weakly consistent iterator. Reads without full lock, sees some-but-maybe-not-all concurrent modifications. Trades consistency for performance.",
        },
        {
          id: "java-iter-cme-s6",
          type: "scenario",
          question:
            "You need to build a custom iterable domain object. How do you implement it correctly?",
          hint: "Implement Iterable<T>, return Iterator<T> with hasNext() and next(). Track index, guard against NoSuchElementException.",
        },
      ],
    },
    {
      id: "collections-comparable",
      name: "2.6 Comparable vs Comparator",
      interviewQuestions: [
        {
          id: "java-comp-1",
          type: "interview",
          question: "What is the difference between Comparable and Comparator?",
          hint: "Comparable = natural ordering (in the class itself, compareTo). Comparator = external ordering, multiple strategies, lambda-friendly.",
        },
        {
          id: "java-comp-2",
          type: "interview",
          question: "How do you sort a list of objects by multiple fields?",
          hint: "Comparator.comparing(Employee::getDept).thenComparing(Employee::getSalary). Chaining with thenComparing().",
        },
        {
          id: "java-comp-3",
          type: "interview",
          question:
            "What happens when compareTo() is inconsistent with equals()?",
          hint: "TreeSet/TreeMap behavior is inconsistent — considers objects 'equal' that equals() says are not. Always keep them consistent.",
        },
        {
          id: "java-comp-4",
          type: "interview",
          question: "How does Collections.sort() work internally in Java?",
          hint: "Arrays.sort() on backing array — TimSort (O(n log n) stable). Stable sort preserves equal element order.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-comp-s1",
          type: "scenario",
          question:
            "You need to sort employees by salary descending, then by name ascending. Write it.",
          hint: "Comparator.comparingInt(Employee::getSalary).reversed().thenComparing(Employee::getName).",
        },
        {
          id: "java-comp-s2",
          type: "scenario",
          question:
            "A TreeMap is losing entries you just put in. The compareTo() returns 0 for non-equal keys. What's wrong?",
          hint: "TreeMap uses comparator/compareTo for equality — if 0, keys are considered duplicate. Fix compareTo() to differentiate correctly.",
        },
        {
          id: "java-comp-s3",
          type: "scenario",
          question:
            "You need a Comparator for null-safe sorting (nulls last). How?",
          hint: "Comparator.nullsLast(Comparator.naturalOrder()) or Comparator.comparing(fn, Comparator.nullsLast(...)).",
        },
        {
          id: "java-comp-s4",
          type: "scenario",
          question:
            "A colleague implements compareTo using subtraction of ints (return a - b). Why is this wrong?",
          hint: "Integer overflow. Integer.MIN_VALUE - 1 wraps to positive. Use Integer.compare(a, b) instead.",
        },
        {
          id: "java-comp-s5",
          type: "scenario",
          question:
            "You have a list of mixed-language strings that need locale-aware sorting. How?",
          hint: "Collator.getInstance(Locale) as a Comparator. RuleBasedCollator for custom rules. Java's String.compareTo() is not locale-aware.",
        },
        {
          id: "java-comp-s6",
          type: "scenario",
          question:
            "Sort a stream of objects but maintain insertion order for equal elements. Is Stream.sorted() stable?",
          hint: "Yes — Stream.sorted() is stable (per spec for sequential streams). Parallel streams are also stable but implementation may differ.",
        },
      ],
    },
  ],
};
