import { CategoryData } from "../types";

export const javaQuestions: CategoryData = {
  id: "java",
  name: "Java Fundamentals",
  icon: "☕",
  color: "var(--amber)",
  description:
    "Core Java, Collections, Concurrency, JVM, Modern Java (8/11/17/21)",
  sections: [
    {
      id: "strings",
      name: "1.1 Strings",
      interviewQuestions: [
        {
          id: "java-str-1",
          type: "interview",
          question: "What is the String Pool and how does it work in Java?",
          hint: "SCP in heap, `intern()`, literals vs `new String()`, Java 7+ moved pool from PermGen to heap.",
        },
        {
          id: "java-str-2",
          type: "interview",
          question: "Why is String immutable in Java? What are the benefits?",
          hint: "final class, char[] field, security (class loading), thread safety, hashcode caching, String pool feasibility.",
        },
        {
          id: "java-str-3",
          type: "interview",
          question:
            "Difference between `String`, `StringBuilder`, and `StringBuffer`?",
          hint: "immutability, thread-safety (StringBuffer synchronized), performance benchmarks, use-case guidance.",
        },
        {
          id: "java-str-4",
          type: "interview",
          question:
            "What does `String.intern()` do and when should you use it?",
          hint: "moves string to pool, memory savings for repeated strings, performance cost of intern lookup.",
        },
        {
          id: "java-str-5",
          type: "interview",
          question: "How does `String.equals()` differ from `==` for Strings?",
          hint: "`==` compares references, `equals()` compares content, pool literals may pass `==` but it's not reliable.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-str-s1",
          type: "scenario",
          question:
            "Your application concatenates thousands of strings in a loop and you observe high GC activity. How do you fix it?",
          hint: "Replace `+` in loop with `StringBuilder`, pre-size with `new StringBuilder(capacity)`, avoid repeated object creation.",
        },
        {
          id: "java-str-s2",
          type: "scenario",
          question:
            "Two microservices serialize/deserialize the same String-heavy payload. Memory usage is high. What do you investigate?",
          hint: "String deduplication (JVM flag `-XX:+UseStringDeduplication` with G1GC), intern for repeated keys, compression.",
        },
        {
          id: "java-str-s3",
          type: "scenario",
          question:
            "A security audit flags that you're using `String` to store passwords. What's the fix and why?",
          hint: "Use `char[]`, wipe after use. String stays in pool/memory until GC; char[] can be zeroed immediately.",
        },
        {
          id: "java-str-s4",
          type: "scenario",
          question:
            "`String.format()` vs `MessageFormat` vs `StringBuilder` — which do you pick for a high-throughput logging path?",
          hint: "`String.format()` uses regex internally — slow. Prefer `StringBuilder` or parameterized logger (`{}` style).",
        },
        {
          id: "java-str-s5",
          type: "scenario",
          question:
            "You notice `String.substring()` behavior changed between Java 6 and Java 7. Explain the change and its impact.",
          hint: "Java 6 shared backing char[], causing memory leaks. Java 7 copies — safe but slightly slower.",
        },
        {
          id: "java-str-s6",
          type: "scenario",
          question:
            "A colleague stores user IDs as `String` in a `HashMap`. Keys are always numeric. Any concerns?",
          hint: "Hashcode consistency fine, but consider `Integer` for memory, auto-unboxing traps, or whether string interning applies.",
        },
      ],
    },
    {
      id: "oop",
      name: "1.2 Object-Oriented Programming (OOP)",
      interviewQuestions: [
        {
          id: "java-oop-1",
          type: "interview",
          question:
            "Explain the four pillars of OOP with a real-world Java example for each.",
          hint: "Encapsulation (getters/setters), Inheritance (extends), Polymorphism (overriding/overloading), Abstraction (interface/abstract).",
        },
        {
          id: "java-oop-2",
          type: "interview",
          question:
            "What is the difference between method overloading and method overriding?",
          hint: "Overloading = compile-time (static dispatch), Overriding = runtime (dynamic dispatch), covariant return types, `@Override`.",
        },
        {
          id: "java-oop-3",
          type: "interview",
          question:
            "Can you override a static method in Java? What about hiding?",
          hint: "No overriding for static — it's method hiding. Resolved by reference type, not object type.",
        },
        {
          id: "java-oop-4",
          type: "interview",
          question:
            "What is the Liskov Substitution Principle and how does it affect your design?",
          hint: "Subtypes must be substitutable. Violations: strengthening preconditions, weakening postconditions. Example: Square vs Rectangle.",
        },
        {
          id: "java-oop-5",
          type: "interview",
          question: "When would you prefer composition over inheritance?",
          hint: "Fragile base class problem, tight coupling with inheritance, composition = 'has-a' flexibility, delegation pattern.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-oop-s1",
          type: "scenario",
          question:
            "You have a `Vehicle` base class with a `refuel()` method. Now electric vehicles join your system. How do you refactor?",
          hint: "Extract `Refuelable` interface, introduce `Chargeable`, or use strategy pattern. Avoid forcing `refuel()` on EVs.",
        },
        {
          id: "java-oop-s2",
          type: "scenario",
          question:
            "A junior dev creates 10 subclasses of a `Report` base class, each overriding `generate()`. Every new report type means a new class. How do you improve this?",
          hint: "Template Method Pattern (base defines skeleton), or Strategy Pattern (inject behavior). Reduces class explosion.",
        },
        {
          id: "java-oop-s3",
          type: "scenario",
          question:
            "You inherit a codebase where all classes use `instanceof` checks heavily. What design problem does this indicate and how do you fix it?",
          hint: "Violation of polymorphism. Replace with polymorphic dispatch, visitor pattern, or sealed types + pattern matching (Java 17+).",
        },
      ],
    },
    {
      id: "exceptions",
      name: "1.3 Exception Handling",
      interviewQuestions: [
        {
          id: "java-exc-1",
          type: "interview",
          question:
            "What is the difference between checked and unchecked exceptions?",
          hint: "Checked = compile-time check (extends Exception), Unchecked = runtime (extends RuntimeException). Use cases: recoverable vs programming errors.",
        },
        {
          id: "java-exc-2",
          type: "interview",
          question: "When should you create a custom exception?",
          hint: "Domain-specific errors, better stack trace context, wrap third-party exceptions. Extend RuntimeException or Exception based on recoverability.",
        },
        {
          id: "java-exc-3",
          type: "interview",
          question: "What is try-with-resources and what does it solve?",
          hint: "Java 7+, AutoCloseable interface, automatic resource cleanup, prevents resource leaks, replaces finally block for closing.",
        },
        {
          id: "java-exc-4",
          type: "interview",
          question: "What is a suppressed exception?",
          hint: "When exception thrown in try-with-resources close(), original exception preserved, suppressed added via addSuppressed(), retrieve with getSuppressed().",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-exc-s1",
          type: "scenario",
          question:
            "A method declares `throws Exception`. Code reviewers flag it. What's wrong and how do you fix?",
          hint: "Too broad — hides actual exceptions. Declare specific exceptions or use unchecked. Violates principle of least surprise.",
        },
        {
          id: "java-exc-s2",
          type: "scenario",
          question:
            "You catch an exception, log it, and rethrow. The stack trace shows the rethrow location, not the origin. How do you preserve the original stack?",
          hint: "Don't create new exception — rethrow same instance. Or use `throw new CustomException('msg', originalException)` to chain.",
        },
        {
          id: "java-exc-s3",
          type: "scenario",
          question:
            "A REST controller returns 500 for all exceptions. How do you differentiate between client errors (400) and server errors (500)?",
          hint: "@ControllerAdvice with multiple @ExceptionHandler methods. Map IllegalArgumentException → 400, others → 500. Use custom exception hierarchy.",
        },
      ],
    },
    {
      id: "generics",
      name: "1.4 Generics",
      interviewQuestions: [
        {
          id: "java-gen-1",
          type: "interview",
          question: "What is type erasure in Java generics?",
          hint: "Compiler removes generic type info at runtime, replaces with bounds/Object, maintains backward compatibility with pre-Java 5 code.",
        },
        {
          id: "java-gen-2",
          type: "interview",
          question: "Explain PECS rule (Producer Extends, Consumer Super).",
          hint: "`? extends T` for reading (producer), `? super T` for writing (consumer). Wildcards for flexibility in APIs.",
        },
        {
          id: "java-gen-3",
          type: "interview",
          question:
            "Can you create an array of a generic type? Why or why not?",
          hint: "No: `new T[]` illegal. Type erasure + array covariance = runtime type safety violation. Use `List<T>` or `(T[]) new Object[size]` with warning.",
        },
        {
          id: "java-gen-4",
          type: "interview",
          question: "What is a bounded type parameter?",
          hint: "`<T extends Number>` restricts T to Number and subclasses. `<T extends Comparable<T>>` for sortable types. Multiple bounds: `<T extends A & B>`.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-gen-s1",
          type: "scenario",
          question:
            "You have `List<Integer>` and `List<Number>`. Can you assign the former to the latter? Why?",
          hint: "No — generics are invariant. `List<Integer>` is NOT a subtype of `List<Number>`. Use `List<? extends Number>` to read from both.",
        },
        {
          id: "java-gen-s2",
          type: "scenario",
          question:
            "A generic method needs to accept both `List<String>` and `List<Integer>` and process them uniformly. How?",
          hint: "`<T> void process(List<T> list)` or `void process(List<?> list)` for unbounded wildcard. Access elements as Object if no operations needed.",
        },
      ],
    },
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
      id: "concurrency-basics",
      name: "3.1 Threads & Concurrency Basics",
      interviewQuestions: [
        {
          id: "java-conc-1",
          type: "interview",
          question: "What are the different ways to create a thread in Java?",
          hint: "Extend Thread class, implement Runnable, Callable with ExecutorService, lambda with Runnable, Thread.ofVirtual() in Java 21.",
        },
        {
          id: "java-conc-2",
          type: "interview",
          question: "What is the difference between sleep() and wait()?",
          hint: "sleep() = Thread class, doesn't release lock, time-based. wait() = Object class, releases lock, notify/notifyAll to wake.",
        },
        {
          id: "java-conc-3",
          type: "interview",
          question: "What is a daemon thread?",
          hint: "Background thread (GC, finalization). JVM exits when only daemon threads remain. setDaemon(true) before start(). Don't use for I/O tasks.",
        },
        {
          id: "java-conc-4",
          type: "interview",
          question: "What is the thread lifecycle in Java?",
          hint: "NEW → RUNNABLE → RUNNING → BLOCKED/WAITING/TIMED_WAITING → TERMINATED. getState() returns Thread.State.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-conc-s1",
          type: "scenario",
          question:
            "An application creates 1000 threads for concurrent tasks. It crashes with OutOfMemoryError. How do you fix it?",
          hint: "Use ExecutorService with fixed thread pool (bounded). Or use virtual threads (Java 21) — lightweight, scales to millions.",
        },
        {
          id: "java-conc-s2",
          type: "scenario",
          question:
            "A thread is stuck in BLOCKED state. What could cause this and how do you diagnose?",
          hint: "Waiting for a lock (synchronized). Thread dump shows monitor owner. Check for deadlock, long critical section, or missing unlock.",
        },
        {
          id: "java-conc-s3",
          type: "scenario",
          question:
            "You call wait() without synchronized. IllegalMonitorStateException. Why?",
          hint: "wait() requires owning the monitor (synchronized on same object). Call inside synchronized(object) { object.wait(); }.",
        },
        {
          id: "java-conc-s4",
          type: "scenario",
          question:
            "A daemon thread is performing file writes. JVM exits before writes complete. How do you fix?",
          hint: "Don't use daemon threads for critical work. Use regular threads or shutdown hooks. Daemon threads are abruptly terminated.",
        },
        {
          id: "java-conc-s5",
          type: "scenario",
          question:
            "You create threads in a loop: for(i=0; i<1000; i++) new Thread(...).start(). What's wrong?",
          hint: "Unbounded thread creation = resource exhaustion. Use ExecutorService with thread pool. Reuses threads, bounded concurrency.",
        },
        {
          id: "java-conc-s6",
          type: "scenario",
          question:
            "Thread.stop() is deprecated. How do you gracefully stop a thread?",
          hint: "Use volatile boolean flag checked in loop. Or Thread.interrupt() + catch InterruptedException. Cooperative cancellation.",
        },
      ],
    },
    {
      id: "concurrency-locks",
      name: "3.2 Locks & Synchronization",
      interviewQuestions: [
        {
          id: "java-lock-1",
          type: "interview",
          question:
            "What is the difference between synchronized and ReentrantLock?",
          hint: "synchronized = implicit, automatic release. ReentrantLock = explicit lock()/unlock(), tryLock(), fairness, Condition support. More flexible.",
        },
        {
          id: "java-lock-2",
          type: "interview",
          question: "What is ReadWriteLock and when should you use it?",
          hint: "Multiple readers OR one writer. ReentrantReadWriteLock. Use for read-heavy workloads (cache). Write lock blocks all, read lock allows concurrent reads.",
        },
        {
          id: "java-lock-3",
          type: "interview",
          question: "What is StampedLock?",
          hint: "Java 8+. Optimistic read lock (no blocking), write lock, read lock. tryOptimisticRead() → validate(). Faster than RWLock for read-mostly scenarios.",
        },
        {
          id: "java-lock-4",
          type: "interview",
          question: "What is lock fairness and what's the trade-off?",
          hint: "Fair lock: FIFO ordering (no starvation). Unfair: throughput higher but threads can starve. ReentrantLock(true) for fairness. Performance cost.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-lock-s1",
          type: "scenario",
          question:
            "A thread acquires a ReentrantLock but crashes before unlock(). Other threads block forever. How do you prevent this?",
          hint: "Always use try-finally: lock.lock(); try { ... } finally { lock.unlock(); }. Ensures unlock even on exception.",
        },
        {
          id: "java-lock-s2",
          type: "scenario",
          question:
            "You have a cache read 1000x/sec, written 1x/min. synchronized blocks readers. How to optimize?",
          hint: "ReadWriteLock — concurrent reads, exclusive write. Or StampedLock with optimistic read. Don't block reads unnecessarily.",
        },
        {
          id: "java-lock-s3",
          type: "scenario",
          question:
            "tryLock(timeout) times out. How do you handle this gracefully?",
          hint: "Retry with backoff, fail-fast (throw exception), or queue the task. Don't spin-wait indefinitely — wastes CPU.",
        },
        {
          id: "java-lock-s4",
          type: "scenario",
          question:
            "A fair lock causes lower throughput. When should you still use it?",
          hint: "When starvation is unacceptable (SLA requirements), or order matters. Trade throughput for predictability.",
        },
        {
          id: "java-lock-s5",
          type: "scenario",
          question:
            "StampedLock optimistic read returns stale data. Is this a bug?",
          hint: "No — optimistic read doesn't block writes. Validate stamp after read. If invalid, retry with read lock. Accept occasional retry.",
        },
        {
          id: "java-lock-s6",
          type: "scenario",
          question:
            "How do you prevent deadlock when multiple locks are needed?",
          hint: "Always acquire locks in same global order (e.g., by hashCode). Or use tryLock() with timeout + retry. Or lock hierarchy.",
        },
      ],
    },
    {
      id: "concurrency-atomic",
      name: "3.3 Atomic Variables & volatile",
      interviewQuestions: [
        {
          id: "java-atomic-1",
          type: "interview",
          question: "What is volatile and how does it ensure visibility?",
          hint: "Prevents caching in CPU registers, ensures happens-before relationship. Reads/writes go to main memory. No atomicity for compound operations.",
        },
        {
          id: "java-atomic-2",
          type: "interview",
          question: "What is AtomicInteger and how does it work?",
          hint: "Lock-free thread-safe counter using CAS (Compare-And-Swap). incrementAndGet(), compareAndSet(). Internally uses Unsafe class.",
        },
        {
          id: "java-atomic-3",
          type: "interview",
          question: "What is LongAdder and when is it better than AtomicLong?",
          hint: "High-contention counters. Striped cells reduce contention. sum() aggregates. Better throughput than AtomicLong under heavy updates.",
        },
        {
          id: "java-atomic-4",
          type: "interview",
          question:
            "What is the ABA problem and how does AtomicStampedReference solve it?",
          hint: "CAS sees A→B→A as unchanged. AtomicStampedReference adds version stamp. compareAndSet checks both value and stamp.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-atomic-s1",
          type: "scenario",
          question:
            "A shared counter is incremented by multiple threads. count++ causes lost updates. How to fix?",
          hint: "AtomicInteger.incrementAndGet() or synchronized block. count++ is not atomic (read-modify-write).",
        },
        {
          id: "java-atomic-s2",
          type: "scenario",
          question:
            "You use volatile for a 64-bit long. Is this enough for thread safety?",
          hint: "volatile ensures visibility but not atomicity. long write is 2 operations (32-bit chunks). Use AtomicLong or synchronized.",
        },
        {
          id: "java-atomic-s3",
          type: "scenario",
          question:
            "AtomicInteger.compareAndSet() fails in a loop. Should you retry?",
          hint: "CAS loop is standard pattern. Retry with updated value: while (!atomic.compareAndSet(current, next)) { current = atomic.get(); }.",
        },
        {
          id: "java-atomic-s4",
          type: "scenario",
          question:
            "LongAdder shows better performance than AtomicLong in load tests. Explain why.",
          hint: "AtomicLong = single memory location (contention). LongAdder = striped cells (less contention). Trade: sum() is more expensive.",
        },
        {
          id: "java-atomic-s5",
          type: "scenario",
          question:
            "You need atomic update of two variables together. AtomicInteger doesn't work. How?",
          hint: "AtomicReference<ImmutablePair> with CAS, or synchronized block, or StampedLock. Can't atomically update separate atomics.",
        },
        {
          id: "java-atomic-s6",
          type: "scenario",
          question:
            "A boolean flag stops a loop: while(!stopped). Thread doesn't stop. Why?",
          hint: "stopped not volatile — cached in CPU. Other thread's write not visible. Make stopped volatile or use AtomicBoolean.",
        },
      ],
    },
    {
      id: "concurrency-executor",
      name: "3.4 ExecutorService & Thread Pools",
      interviewQuestions: [
        {
          id: "java-exec-1",
          type: "interview",
          question: "What are the common types of thread pools in Java?",
          hint: "newFixedThreadPool (bounded), newCachedThreadPool (unbounded, 60s idle timeout), newScheduledThreadPool, newWorkStealingPool (ForkJoin).",
        },
        {
          id: "java-exec-2",
          type: "interview",
          question:
            "What is the difference between submit() and execute() in ExecutorService?",
          hint: "execute(Runnable) = no return value. submit(Callable/Runnable) = returns Future for result/exception.",
        },
        {
          id: "java-exec-3",
          type: "interview",
          question:
            "What are the ThreadPoolExecutor parameters (core, max, queue, rejection policy)?",
          hint: "corePoolSize (always alive), maxPoolSize (scale up), BlockingQueue (task queue), RejectedExecutionHandler (when full).",
        },
        {
          id: "java-exec-4",
          type: "interview",
          question:
            "What are the rejection policies for a full ThreadPoolExecutor?",
          hint: "AbortPolicy (throws, default), CallerRunsPolicy (caller thread runs it), DiscardPolicy (silent drop), DiscardOldestPolicy (drop oldest).",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-exec-s1",
          type: "scenario",
          question:
            "A thread pool with corePoolSize=5, maxPoolSize=10, queue=100 is overloaded. When do new threads get created?",
          hint: "Only after queue is full (>100 tasks). Order: core → queue → max. Not intuitive. Use SynchronousQueue for immediate scale-up.",
        },
        {
          id: "java-exec-s2",
          type: "scenario",
          question:
            "Tasks submitted to ExecutorService never execute. The pool seems stuck. What could be wrong?",
          hint: "Core pool size 0 + bounded queue. Or shutdown() called. Or tasks throw exceptions silently. Check pool state, queue size.",
        },
        {
          id: "java-exec-s3",
          type: "scenario",
          question:
            "An application uses Executors.newCachedThreadPool(). Under load, thousands of threads are created. How to fix?",
          hint: "CachedThreadPool = unbounded. Use newFixedThreadPool(n) or custom ThreadPoolExecutor with bounded max and queue.",
        },
        {
          id: "java-exec-s4",
          type: "scenario",
          question:
            "You submit tasks to ExecutorService but don't call shutdown(). What happens?",
          hint: "Threads keep JVM alive (non-daemon). JVM never exits. Always shutdown() or shutdownNow() when done.",
        },
        {
          id: "java-exec-s5",
          type: "scenario",
          question:
            "A task throws an exception. It's lost silently. How do you handle exceptions in ExecutorService?",
          hint: "submit() returns Future — call get() to see exception. Or use UncaughtExceptionHandler on ThreadFactory. Or wrap tasks in try-catch.",
        },
        {
          id: "java-exec-s6",
          type: "scenario",
          question:
            "How do you gracefully shut down a thread pool and wait for tasks to complete?",
          hint: "shutdown() (no new tasks) + awaitTermination(timeout, unit). Or shutdownNow() (interrupt all) for force stop.",
        },
      ],
    },
    {
      id: "concurrency-completable",
      name: "3.5 CompletableFuture",
      interviewQuestions: [
        {
          id: "java-cf-1",
          type: "interview",
          question:
            "What is CompletableFuture and how is it different from Future?",
          hint: "Future = blocking get(). CompletableFuture = non-blocking, composable (thenApply, thenCompose), multiple completion stages.",
        },
        {
          id: "java-cf-2",
          type: "interview",
          question:
            "What is the difference between thenApply() and thenCompose()?",
          hint: "thenApply(fn) = transform result (map). thenCompose(fn) = flatMap (fn returns CompletableFuture). Like map vs flatMap in streams.",
        },
        {
          id: "java-cf-3",
          type: "interview",
          question: "What is allOf() vs anyOf() in CompletableFuture?",
          hint: "allOf() = completes when all futures complete. anyOf() = completes when any one completes. Used for parallel async ops.",
        },
        {
          id: "java-cf-4",
          type: "interview",
          question:
            "What is the difference between thenApply() and thenApplyAsync()?",
          hint: "thenApply() = same thread as previous stage. thenApplyAsync() = executes on ForkJoinPool.commonPool() or custom executor.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-cf-s1",
          type: "scenario",
          question:
            "Three API calls must run in parallel and results combined. How do you implement with CompletableFuture?",
          hint: "CompletableFuture.allOf(cf1, cf2, cf3).thenApply(v -> combine(cf1.join(), cf2.join(), cf3.join())). Or thenCombine for two.",
        },
        {
          id: "java-cf-s2",
          type: "scenario",
          question:
            "A CompletableFuture chain has an exception but it's not logged. How do you handle errors?",
          hint: "exceptionally(), handle(), whenComplete(). Or thenApply().exceptionally(). Exceptions propagate through chain if unhandled.",
        },
        {
          id: "java-cf-s3",
          type: "scenario",
          question:
            "CompletableFuture never completes and blocks indefinitely. How do you add timeout?",
          hint: "orTimeout(duration) (Java 9+), or completeOnTimeout(defaultValue, duration). Or CompletableFuture.anyOf with delay future.",
        },
        {
          id: "java-cf-s4",
          type: "scenario",
          question:
            "You chain 10 thenApply() calls. Which thread executes each stage?",
          hint: "Same thread unless Async variant used. If first stage on thread A, non-async stages continue on A. Async variants use ForkJoinPool.",
        },
        {
          id: "java-cf-s5",
          type: "scenario",
          question:
            "How do you run N tasks in parallel with limited concurrency (max 5 at a time)?",
          hint: "Custom executor with fixed pool (5 threads) + supplyAsync(task, executor). Or Semaphore to limit concurrent starts.",
        },
        {
          id: "java-cf-s6",
          type: "scenario",
          question: "CompletableFuture.join() vs get() — which to use?",
          hint: "join() = unchecked exception. get() = checked (ExecutionException, InterruptedException). Use join() in stream pipelines.",
        },
      ],
    },
    {
      id: "concurrency-concurrent-collections",
      name: "3.6 Concurrent Collections",
      interviewQuestions: [
        {
          id: "java-cc-1",
          type: "interview",
          question:
            "What is the difference between ConcurrentHashMap and Collections.synchronizedMap()?",
          hint: "CHM: fine-grained locking (per bucket CAS in Java 8), concurrent reads without blocking. synchronizedMap: coarse lock on every operation.",
        },
        {
          id: "java-cc-2",
          type: "interview",
          question:
            "What is CopyOnWriteArrayList and why should writes be rare?",
          hint: "Every write copies the entire array — O(n). Reads are lock-free (snapshot). Use for event listeners, rarely-changed lists.",
        },
        {
          id: "java-cc-3",
          type: "interview",
          question:
            "How does ConcurrentLinkedQueue achieve thread safety without locks?",
          hint: "Non-blocking CAS-based algorithm. Lock-free FIFO. High throughput for multi-producer/consumer. No blocking, no capacity bounds.",
        },
        {
          id: "java-cc-4",
          type: "interview",
          question:
            "What is the purpose of BlockingDeque? Name an implementation.",
          hint: "Double-ended blocking queue — supports FIFO and LIFO. LinkedBlockingDeque. Used in work-stealing (add/remove from both ends).",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-cc-s1",
          type: "scenario",
          question:
            "You need to cache computation results across threads. Which map and what pattern?",
          hint: "ConcurrentHashMap.computeIfAbsent() — atomic compute-if-absent. Prevents duplicate computation. For expensive compute, add future-based memoization.",
        },
        {
          id: "java-cc-s2",
          type: "scenario",
          question:
            "A ConcurrentHashMap.size() in your code gives incorrect results under load. How?",
          hint: "size() is approximate in high-concurrency. Use mappingCount() for better accuracy. Accept eventual consistency or use atomic counter separately.",
        },
        {
          id: "java-cc-s3",
          type: "scenario",
          question:
            "You need publish-subscribe within a JVM with multiple threads. What do you use?",
          hint: "LinkedBlockingQueue or Disruptor (high performance). Spring's ApplicationEventPublisher. Flow.Publisher/Subscriber (Java 9).",
        },
        {
          id: "java-cc-s4",
          type: "scenario",
          question:
            "Your ConcurrentHashMap has hot-key contention (millions of writes to same key). How do you reduce this?",
          hint: "Key sharding (distribute writes across N keys, aggregate reads), LongAdder for counter keys, local accumulation + periodic flush.",
        },
        {
          id: "java-cc-s5",
          type: "scenario",
          question:
            "Design a producer-consumer system with multiple producers and a single slow consumer. What backpressure mechanism?",
          hint: "ArrayBlockingQueue (bounded) — producers block on full. Or offer() with timeout + rejection. CallerRunsPolicy for executor-based.",
        },
        {
          id: "java-cc-s6",
          type: "scenario",
          question:
            "Explain the memory ordering guarantees of ConcurrentHashMap — do reads see the latest puts?",
          hint: "Reads of values written before the put are guaranteed visible (happens-before via volatile). Reads concurrent with puts may not see them — weakly consistent.",
        },
      ],
    },
    {
      id: "concurrency-deadlock",
      name: "3.7 Deadlock, Livelock & Starvation",
      interviewQuestions: [
        {
          id: "java-deadlock-1",
          type: "interview",
          question:
            "What are the four conditions for a deadlock (Coffman conditions)?",
          hint: "Mutual exclusion, Hold and Wait, No preemption, Circular wait. All four must hold. Remove any one to prevent deadlock.",
        },
        {
          id: "java-deadlock-2",
          type: "interview",
          question:
            "What is the difference between deadlock, livelock, and starvation?",
          hint: "Deadlock = stopped forever. Livelock = active but no progress (threads yield to each other). Starvation = thread never gets CPU/lock due to priority.",
        },
        {
          id: "java-deadlock-3",
          type: "interview",
          question: "How do you detect a deadlock in a running JVM?",
          hint: "jstack / jcmd Thread.print. Look for 'Found X Java-level deadlock' section. VisualVM, MBean ThreadMXBean.findDeadlockedThreads().",
        },
        {
          id: "java-deadlock-4",
          type: "interview",
          question: "What strategies do you use to prevent deadlocks?",
          hint: "Lock ordering (always acquire in same order), tryLock() with timeout, minimize lock scope, use lock-free structures, avoid nested locks.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-deadlock-s1",
          type: "scenario",
          question:
            "Your service has a deadlock once per day in production. How do you diagnose and permanently fix it?",
          hint: "Enable thread dumps on SIGQUIT, correlate with logs, find circular wait, apply lock ordering or switch to tryLock(timeout). Add ThreadMXBean monitoring.",
        },
        {
          id: "java-deadlock-s2",
          type: "scenario",
          question:
            "Two bank transfer threads deadlock: thread A locks account 1 then 2, thread B locks account 2 then 1. How do you fix?",
          hint: "Order by account ID always — both acquire lower ID first. Or use single global lock for transfers (lower throughput). Or tryLock with backoff.",
        },
        {
          id: "java-deadlock-s3",
          type: "scenario",
          question:
            "A thread pool with 4 threads submits tasks that each wait for another task in the same pool to complete. What happens?",
          hint: "Thread pool deadlock — all 4 threads blocked waiting. Tasks can't run — no free threads. Solution: ForkJoinPool.commonPool(), or increase pool size.",
        },
        {
          id: "java-deadlock-s4",
          type: "scenario",
          question:
            "Two services in a microservices system call each other synchronously. Under load both time out waiting. Is this a deadlock?",
          hint: "Distributed deadlock / circular dependency. Break cycle: async event-driven, or one service becomes consumer only. Circuit breaker to fail fast.",
        },
        {
          id: "java-deadlock-s5",
          type: "scenario",
          question:
            "You observe 100% CPU but no progress (livelock). How do you identify and break the cycle?",
          hint: "Thread dumps show threads running but no useful work. Random backoff + retry, jitter in retry intervals. Move to queue-based coordination.",
        },
        {
          id: "java-deadlock-s6",
          type: "scenario",
          question:
            "A low-priority thread is starving because high-priority threads monopolize the lock. How do you fix this?",
          hint: "new ReentrantLock(true) — fair lock (FIFO queue). Trade: lower throughput. Or use LockSupport.unpark() for explicit scheduling.",
        },
      ],
    },
    {
      id: "concurrency-threadlocal",
      name: "3.8 ThreadLocal",
      interviewQuestions: [
        {
          id: "java-tl-1",
          type: "interview",
          question: "What is ThreadLocal and what are its use cases?",
          hint: "Per-thread storage. Use cases: user context, transaction ID, SimpleDateFormat (non-thread-safe). Avoid sharing state between threads.",
        },
        {
          id: "java-tl-2",
          type: "interview",
          question: "What is a ThreadLocal memory leak and how does it happen?",
          hint: "Thread pools reuse threads — ThreadLocal not cleared → memory leak. Always remove() after use. Weak references in ThreadLocalMap help but not enough.",
        },
        {
          id: "java-tl-3",
          type: "interview",
          question: "What is InheritableThreadLocal?",
          hint: "Child threads inherit parent's ThreadLocal value. Useful for request context propagation. But not for thread pools (threads reused).",
        },
        {
          id: "java-tl-4",
          type: "interview",
          question: "What is MDC in logging and how does it work?",
          hint: "Mapped Diagnostic Context (Logback/Log4j2). ThreadLocal-based key-value map for logging context (user ID, trace ID). MDC.put(), MDC.clear().",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-tl-s1",
          type: "scenario",
          question:
            "A web app uses ThreadLocal to store user context. Memory grows over time. What's happening?",
          hint: "Servlet container uses thread pools — threads reused but ThreadLocal not cleared. Add filter to MDC.clear() after each request.",
        },
        {
          id: "java-tl-s2",
          type: "scenario",
          question:
            "You use @Async with ThreadLocal. Context is lost in async method. How to propagate?",
          hint: "TaskDecorator to copy ThreadLocal to new thread. Or use Spring's RequestContextHolder (ThreadLocal wrapper). Or pass context explicitly.",
        },
        {
          id: "java-tl-s3",
          type: "scenario",
          question:
            "Logs from parallel streams don't have MDC context. How do you fix?",
          hint: "Parallel streams use ForkJoinPool — different threads. Capture MDC map before stream, set in each operation, clear after. Or avoid parallel.",
        },
        {
          id: "java-tl-s4",
          type: "scenario",
          question:
            "You store a large object in ThreadLocal for performance. Heap dumps show high memory. Why?",
          hint: "Thread pool + large ThreadLocal = high memory × thread count. Consider WeakReference, smaller object, or per-request allocation.",
        },
        {
          id: "java-tl-s5",
          type: "scenario",
          question:
            "InheritableThreadLocal doesn't work with ExecutorService. Why?",
          hint: "Executor reuses threads (not child of caller). InheritableThreadLocal copies only at new Thread() creation. Use custom context propagation.",
        },
        {
          id: "java-tl-s6",
          type: "scenario",
          question:
            "How do you propagate trace ID across async boundaries (CompletableFuture, @Async)?",
          hint: "Capture ThreadLocal before async, set in async thread (thenApplyAsync with custom executor). Or use Context Propagation libraries.",
        },
      ],
    },
    {
      id: "jvm-architecture",
      name: "4.1 JVM Architecture",
      interviewQuestions: [
        {
          id: "java-jvm-1",
          type: "interview",
          question: "Explain the main components of JVM architecture.",
          hint: "ClassLoader (loading/linking/init), Runtime Data Areas (Heap, Stack, Method Area, PC register, Native stack), Execution Engine (interpreter, JIT, GC).",
        },
        {
          id: "java-jvm-2",
          type: "interview",
          question:
            "What is JIT compilation and how does it improve performance?",
          hint: "HotSpot identifies hot methods, compiles bytecode to native code. C1 (client) fast compile, C2 (server) aggressive optimize. Tiered compilation (Java 7+).",
        },
        {
          id: "java-jvm-3",
          type: "interview",
          question: "What is the difference between JDK, JRE, and JVM?",
          hint: "JVM = runtime engine. JRE = JVM + standard libraries. JDK = JRE + dev tools (javac, jar, jlink). Java 11+: JRE no longer bundled separately.",
        },
        {
          id: "java-jvm-4",
          type: "interview",
          question: "What are the three phases of class loading?",
          hint: "Loading (find .class, load bytes), Linking (verify bytecode, prepare static fields, resolve symbolic refs), Initialization (run static initializers).",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-jvm-s1",
          type: "scenario",
          question:
            "Application startup is slow (30+ seconds). How do you improve JVM startup time?",
          hint: "AppCDS (class data sharing), -XX:TieredStopAtLevel=1 (no C2 at startup), GraalVM native image, reduce classpath scanning, lazy initialization.",
        },
        {
          id: "java-jvm-s2",
          type: "scenario",
          question:
            "NoClassDefFoundError vs ClassNotFoundException — what's the difference?",
          hint: "ClassNotFoundException = class not on classpath (checked exception). NoClassDefFoundError = was present at compile time, missing at runtime.",
        },
        {
          id: "java-jvm-s3",
          type: "scenario",
          question:
            "A class is loaded by two different classloaders. Can they be cast to each other?",
          hint: "No — ClassCastException. Each classloader creates separate class identity. Common in app servers/OSGi. Use parent-first delegation.",
        },
        {
          id: "java-jvm-s4",
          type: "scenario",
          question:
            "Spring Boot fat JAR loads slowly. What optimizations exist?",
          hint: "Spring Boot 3 CDS support, spring-context-indexer, narrow component scan, lazy bean init (spring.main.lazy-initialization=true).",
        },
        {
          id: "java-jvm-s5",
          type: "scenario",
          question:
            "How does JVM handle circular static initialization dependencies?",
          hint: "Static initializers run once. Circular can cause partially-initialized state. JVM proceeds with partial init — leads to subtle bugs.",
        },
        {
          id: "java-jvm-s6",
          type: "scenario",
          question:
            "A Java agent modifies bytecode at runtime. How does it work?",
          hint: "java.lang.instrument.Instrumentation, ClassFileTransformer, -javaagent flag or VirtualMachine.attach(). Can retransform loaded classes.",
        },
      ],
    },
    {
      id: "jvm-memory",
      name: "4.2 Heap, Stack & Memory Areas",
      interviewQuestions: [
        {
          id: "java-mem-1",
          type: "interview",
          question: "What is stored in Heap vs Stack?",
          hint: "Heap = objects, instance vars, class data (shared). Stack = method frames, local primitives, object references (not objects). Stack per thread.",
        },
        {
          id: "java-mem-2",
          type: "interview",
          question: "What is Metaspace and how does it differ from PermGen?",
          hint: "Java 8 replaced PermGen with Metaspace. Metaspace uses native memory (outside heap), auto-grows. -XX:MaxMetaspaceSize to cap.",
        },
        {
          id: "java-mem-3",
          type: "interview",
          question: "What causes StackOverflowError?",
          hint: "Deep recursion fills thread's stack frames. Fix: increase -Xss stack size, convert to iterative, or tail-call (no TCO in Java).",
        },
        {
          id: "java-mem-4",
          type: "interview",
          question:
            "Difference between 'Java heap space' and 'GC overhead limit exceeded' OutOfMemoryError?",
          hint: "Heap space = no memory for allocation. GC overhead = JVM spending >98% time in GC with <2% memory recovered — effective OOM.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-mem-s1",
          type: "scenario",
          question:
            "Your app gradually consumes more heap and eventually OOMEs. How do you find the memory leak?",
          hint: "Heap dump (-XX:+HeapDumpOnOutOfMemoryError), analyze with Eclipse MAT or VisualVM. Find dominator tree, growing object counts.",
        },
        {
          id: "java-mem-s2",
          type: "scenario",
          question:
            "A microservice has stable traffic but increasing memory every hour. What do you investigate?",
          hint: "Heap dump analysis, unbounded caches (Ehcache/ConcurrentHashMap), static collections, event listeners not deregistered, ThreadLocal leaks.",
        },
        {
          id: "java-mem-s3",
          type: "scenario",
          question:
            "Metaspace is growing. What could cause this in production?",
          hint: "Dynamic class generation (reflection proxies, CGLIB, Groovy scripts), classloader leaks in hot-deploy. Set -XX:MaxMetaspaceSize.",
        },
        {
          id: "java-mem-s4",
          type: "scenario",
          question: "You need to process a 10GB file in Java without OOM. How?",
          hint: "Stream processing (BufferedReader, Files.lines()), avoid loading entire file. Memory-mapped files for random access. Off-heap with ByteBuffer.",
        },
        {
          id: "java-mem-s5",
          type: "scenario",
          question:
            "Heap is fine but memory keeps growing. What else could it be?",
          hint: "Off-heap (DirectByteBuffer), Metaspace (class gen), native memory (JNI, thread stacks). Use NMT (-XX:NativeMemoryTracking=detail).",
        },
        {
          id: "java-mem-s6",
          type: "scenario",
          question:
            "How do you tune heap size for containerized Java apps (Docker/K8s)?",
          hint: "Java 10+ container-awareness (-XX:MaxRAMPercentage). Don't use -Xmx larger than container limit. Reserve memory for Metaspace, native, GC.",
        },
      ],
    },
    {
      id: "jvm-gc",
      name: "4.3 Garbage Collection",
      interviewQuestions: [
        {
          id: "java-gc-1",
          type: "interview",
          question: "Explain the generational garbage collection model.",
          hint: "Young gen (Eden + S0/S1) for short-lived. Old gen for long-lived. Minor GC on young gen (fast). Major/Full GC on old gen (stop-the-world).",
        },
        {
          id: "java-gc-2",
          type: "interview",
          question: "Compare G1GC, ParallelGC, ZGC, and Shenandoah.",
          hint: "ParallelGC: throughput, stop-the-world. G1GC: balanced, region-based, predictable pause. ZGC/Shenandoah: sub-ms pauses, concurrent.",
        },
        {
          id: "java-gc-3",
          type: "interview",
          question: "What triggers a Full GC and why is it a problem?",
          hint: "Old gen full, explicit System.gc(), Metaspace full, concurrent GC failure. Full GC = stop-the-world = latency spike.",
        },
        {
          id: "java-gc-4",
          type: "interview",
          question: "What are soft, weak, and phantom references?",
          hint: "Soft: cleared before OOM (caches). Weak: cleared when no strong ref (WeakHashMap). Phantom: post-finalization (resource cleanup).",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-gc-s1",
          type: "scenario",
          question:
            "Consistent 100ms latency spikes every 30 seconds. GC logs show Minor GC pauses. How to reduce?",
          hint: "Increase young gen size (-Xmn), switch to G1GC, tune survivor ratios. Profile allocation rate — reduce short-lived object creation.",
        },
        {
          id: "java-gc-s2",
          type: "scenario",
          question:
            "App runs fine for hours then has a 10-second Full GC pause. Investigation and fix?",
          hint: "GC log analysis (-Xlog:gc*), find what triggered Full GC (old gen pressure, humongous allocations in G1). Tune heap sizing.",
        },
        {
          id: "java-gc-s3",
          type: "scenario",
          question: "G1GC logs show 'to-space exhausted'. What does this mean?",
          hint: "G1 can't complete evacuation — old gen too full. Increase heap, reduce object promotion rate, tune -XX:G1ReservePercent.",
        },
        {
          id: "java-gc-s4",
          type: "scenario",
          question:
            "A cache using HashMap<String, BigObject> causes GC pressure. How to fix?",
          hint: "Use WeakHashMap (entries GC'd when key unreferenced), or SoftReference values, or Caffeine with size/time eviction.",
        },
        {
          id: "java-gc-s5",
          type: "scenario",
          question:
            "How do you read and interpret GC logs for performance diagnosis?",
          hint: "Enable with -Xlog:gc*:file=gc.log. Use GCeasy.io, GCViewer. Look for pause time, frequency, heap usage trends.",
        },
        {
          id: "java-gc-s6",
          type: "scenario",
          question:
            "A team member says 'we should call System.gc() before a large batch job.' How do you respond?",
          hint: "System.gc() is a hint — JVM may ignore. Can cause premature Full GC, interfere with GC heuristics. Better: tune heap, profile allocation.",
        },
      ],
    },
    {
      id: "jvm-memory-model",
      name: "4.4 Java Memory Model (JMM)",
      interviewQuestions: [
        {
          id: "java-jmm-1",
          type: "interview",
          question: "What is the Java Memory Model and why does it exist?",
          hint: "Defines how threads interact through memory — visibility, ordering, atomicity rules. Abstracts over different CPU architectures' memory models.",
        },
        {
          id: "java-jmm-2",
          type: "interview",
          question: "What does 'happens-before' mean in JMM?",
          hint: "If A happens-before B, B sees all writes of A. Key relationships: monitor unlock→lock, volatile write→read, thread start/join.",
        },
        {
          id: "java-jmm-3",
          type: "interview",
          question: "What is a data race and how do you prevent it?",
          hint: "Two threads access same variable, at least one writes, no synchronization. Prevention: volatile, synchronized, atomic variables, immutable objects.",
        },
        {
          id: "java-jmm-4",
          type: "interview",
          question:
            "Explain instruction reordering and how volatile prevents it.",
          hint: "Compiler/CPU reorders for optimization. volatile inserts memory barrier — no reorder before/after volatile read/write. Ensures visibility.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-jmm-s1",
          type: "scenario",
          question:
            "Double-checked locking singleton failed before Java 5. Why? How is it fixed?",
          hint: "Without volatile, partially constructed object visible (reorder: alloc → assign ref → init). volatile keyword fixes visibility.",
        },
        {
          id: "java-jmm-s2",
          type: "scenario",
          question:
            "Thread A writes to HashMap, Thread B reads. No synchronization. What can go wrong?",
          hint: "Stale reads (B sees old value), structural corruption (partial write visible), infinite loop in Java 6 resize. Use CHM or synchronize.",
        },
        {
          id: "java-jmm-s3",
          type: "scenario",
          question:
            "You publish an object to shared reference. Is it safe for another thread to read without synchronization?",
          hint: "No — JMM allows reader to see old value (no happens-before). Use volatile field, synchronized, AtomicReference, or final fields.",
        },
        {
          id: "java-jmm-s4",
          type: "scenario",
          question: "final fields guarantee safe publication. Explain why.",
          hint: "JMM guarantees: after constructor completes, all final fields visible to all threads without synchronization (freeze action).",
        },
        {
          id: "java-jmm-s5",
          type: "scenario",
          question:
            "A flag 'while (!done)' loop never exits even though another thread sets done = true. Why?",
          hint: "No visibility guarantee — reading thread caches done. Fix: volatile boolean done, or synchronized, or AtomicBoolean.",
        },
        {
          id: "java-jmm-s6",
          type: "scenario",
          question:
            "Explain the safe publication idiom for thread-safe object sharing.",
          hint: "Safe publication: via static initializer, volatile field, AtomicReference, synchronized block, or all-final fields. Unsafe: plain field assignment.",
        },
      ],
    },
    {
      id: "modern-lambdas",
      name: "5.1 Lambda Expressions & Functional Interfaces",
      interviewQuestions: [
        {
          id: "java-lambda-1",
          type: "interview",
          question:
            "What is a lambda expression and what are its requirements?",
          hint: "Anonymous function, target must be functional interface (exactly one abstract method). Can capture effectively final variables.",
        },
        {
          id: "java-lambda-2",
          type: "interview",
          question:
            "What are the built-in functional interfaces in java.util.function?",
          hint: "Function<T,R>, Predicate<T>, Consumer<T>, Supplier<T>, BiFunction<T,U,R>, UnaryOperator<T>, BinaryOperator<T>. Compose with andThen, compose.",
        },
        {
          id: "java-lambda-3",
          type: "interview",
          question: "What is an effectively final variable?",
          hint: "Not declared final but never reassigned after first assignment. Lambda captures variable value — mutable capture would require closure semantics.",
        },
        {
          id: "java-lambda-4",
          type: "interview",
          question: "What is a method reference and what are the types?",
          hint: "Method ref shorthand: String::toUpperCase == s -> s.toUpperCase(). Types: static, instance, instance-on-arg, constructor ref.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-lambda-s1",
          type: "scenario",
          question:
            "You need to compose multiple validation rules dynamically. How do you use Predicate?",
          hint: "Predicate.and(), or(), negate(). Build list of predicates, reduce with predicates.stream().reduce(x -> true, Predicate::and).",
        },
        {
          id: "java-lambda-s2",
          type: "scenario",
          question:
            "A lambda captures a counter variable and increments it. Compiler rejects. How to fix?",
          hint: "Can't capture mutable variable. Use AtomicInteger and capture the reference (effectively final), call incrementAndGet().",
        },
        {
          id: "java-lambda-s3",
          type: "scenario",
          question:
            "You want to implement retry mechanism using Supplier<T>. How?",
          hint: "Wrap operation in Supplier, loop with retry count, catch exceptions, re-invoke supplier.get() on failure, throw after max retries.",
        },
        {
          id: "java-lambda-s4",
          type: "scenario",
          question:
            "A Function<String,String> pipeline processes user input. How to add logging between each step?",
          hint: "Wrap each function: Function<T,T> logged(Function<T,T> f) { return t -> { log(t); T r = f.apply(t); log(r); return r; }; }.",
        },
        {
          id: "java-lambda-s5",
          type: "scenario",
          question: "Lambda vs anonymous inner class — performance overhead?",
          hint: "Lambda uses invokedynamic (resolved at first call, cached). Slightly slower first invocation. Anonymous class = always new object.",
        },
        {
          id: "java-lambda-s6",
          type: "scenario",
          question:
            "Refactoring strategy pattern with functional interfaces. Benefits and trade-offs?",
          hint: "Simpler syntax, no extra classes, easy composition. Trade-off: less explicit contract, harder to debug (no class name in stack trace).",
        },
      ],
    },
    {
      id: "modern-streams",
      name: "5.2 Streams API",
      interviewQuestions: [
        {
          id: "java-stream-1",
          type: "interview",
          question:
            "What is the difference between intermediate and terminal operations?",
          hint: "Intermediate: lazy, return Stream (filter, map, flatMap, sorted). Terminal: eager, trigger processing (collect, forEach, reduce, count).",
        },
        {
          id: "java-stream-2",
          type: "interview",
          question: "What is flatMap() and when do you use it?",
          hint: "Flattens nested structure. Stream<List<T>> → Stream<T>. Example: list of orders each with items → flat stream of all items.",
        },
        {
          id: "java-stream-3",
          type: "interview",
          question:
            "What are groupingBy(), partitioningBy(), and toMap() collectors?",
          hint: "groupingBy = Map<K, List<T>>. partitioningBy = Map<Boolean, List<T>>. toMap = Map<K, V> (handle duplicate keys with merge function).",
        },
        {
          id: "java-stream-4",
          type: "interview",
          question: "What is findFirst() vs findAny()?",
          hint: "findFirst() deterministic (returns first in encounter order). findAny() may return any — better for parallel streams. Both return Optional.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-stream-s1",
          type: "scenario",
          question:
            "A stream pipeline calls sorted() followed by filter(). How do you optimize?",
          hint: "Move filter() before sorted() — reduce elements before expensive sort. Short-circuit operations after limit further reduce work.",
        },
        {
          id: "java-stream-s2",
          type: "scenario",
          question: "When should you NOT use parallel streams?",
          hint: "Small collections, ordered/sequential operations, I/O operations, operations with shared mutable state, forEachOrdered — hurt or unsafe in parallel.",
        },
        {
          id: "java-stream-s3",
          type: "scenario",
          question:
            "Stream.toMap() throws IllegalStateException on duplicate keys. How to handle?",
          hint: "Provide merge function: Collectors.toMap(key, value, (v1, v2) -> v1) to keep first. Or groupingBy for multiple values per key.",
        },
        {
          id: "java-stream-s4",
          type: "scenario",
          question:
            "Build Map<String, Long> of word frequencies from large text file without loading all into memory.",
          hint: "Files.lines(path) (lazy), flatMap(line -> Arrays.stream(line.split(' '))), collect(groupingBy(identity(), counting())).",
        },
        {
          id: "java-stream-s5",
          type: "scenario",
          question:
            "Why can't a stream be reused? What if you need to iterate twice?",
          hint: "Streams are single-use (terminal op consumes). Collect to List first, then stream twice. Or use Supplier<Stream<T>> factory.",
        },
        {
          id: "java-stream-s6",
          type: "scenario",
          question:
            "stream().map().collect() inside a loop called 10,000 times. Performance concerns?",
          hint: "Stream creation overhead for small collections. Consider plain for-loop, or pre-collect outside loop, or restructure to stream over outer loop.",
        },
      ],
    },
    {
      id: "modern-optional",
      name: "5.3 Optional",
      interviewQuestions: [
        {
          id: "java-opt-1",
          type: "interview",
          question: "What is Optional and what problem does it solve?",
          hint: "Wrapper for nullable values. Forces caller to handle null case explicitly. Replaces null return values. NOT a replacement for all nulls.",
        },
        {
          id: "java-opt-2",
          type: "interview",
          question: "What is map() vs flatMap() on Optional?",
          hint: "map() wraps result in Optional. flatMap() for when function already returns Optional (avoids Optional<Optional<T>>).",
        },
        {
          id: "java-opt-3",
          type: "interview",
          question: "When should you NOT use Optional?",
          hint: "Not for fields (serialization issues, performance). Not for method parameters (use overloading). Not for collections (return empty collection).",
        },
        {
          id: "java-opt-4",
          type: "interview",
          question: "What is orElseGet() vs orElse()?",
          hint: "orElse(val) always evaluates default (even if present). orElseGet(supplier) lazy — only called if empty. Prefer orElseGet for expensive defaults.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-opt-s1",
          type: "scenario",
          question:
            "Replace deep null-check chain: if (user != null && user.getAddress() != null && ...) using Optional.",
          hint: "Optional.ofNullable(user).map(User::getAddress).map(Address::getCity).orElse('Unknown').",
        },
        {
          id: "java-opt-s2",
          type: "scenario",
          question:
            "You return Optional from repository. Callers call .get() directly without checking. How to enforce safe usage?",
          hint: "Code review, Sonar rules, use orElseThrow() explicitly, or define domain exception: orElseThrow(() -> new EntityNotFoundException(id)).",
        },
        {
          id: "java-opt-s3",
          type: "scenario",
          question:
            "An Optional<List<String>> is returned by a method. Is this good design?",
          hint: "No — return empty list instead (Collections.emptyList()). Optional around collections is unnecessary indirection.",
        },
        {
          id: "java-opt-s4",
          type: "scenario",
          question:
            "How do you filter out empty Optionals in a stream pipeline?",
          hint: "stream.map(this::findById).filter(Optional::isPresent).map(Optional::get). Java 9+: .flatMap(Optional::stream) is cleaner.",
        },
        {
          id: "java-opt-s5",
          type: "scenario",
          question:
            "Service returns Optional<User> but you need to throw specific exception if absent. Best practice?",
          hint: "userOpt.orElseThrow(() -> new UserNotFoundException(id)). Readable, idiomatic. Don't use isPresent() + get() — defeats purpose.",
        },
        {
          id: "java-opt-s6",
          type: "scenario",
          question:
            "Perform action only if Optional has value, else do nothing. Idiomatic way?",
          hint: "optional.ifPresent(value -> doSomething(value)). Java 9+: optional.ifPresentOrElse(v -> use(v), () -> doDefault()).",
        },
      ],
    },
    {
      id: "modern-records",
      name: "5.4 Records, Sealed Classes & Pattern Matching",
      interviewQuestions: [
        {
          id: "java-rec-1",
          type: "interview",
          question: "What is a Java Record and what does it auto-generate?",
          hint: "Java 16+. Immutable data carrier. Auto-generates: constructor, equals(), hashCode(), toString(), accessor methods. Compact constructor for validation.",
        },
        {
          id: "java-rec-2",
          type: "interview",
          question: "What are Sealed Classes (Java 17)?",
          hint: "Restrict which classes can extend/implement. sealed class Shape permits Circle, Rectangle. Exhaustive pattern matching. Alternatives: final, non-sealed, sealed.",
        },
        {
          id: "java-rec-3",
          type: "interview",
          question: "What is Pattern Matching for instanceof (Java 16)?",
          hint: "if (obj instanceof String s) { s.length() } — binding variable s in scope. Replaces cast after instanceof. Reduces boilerplate.",
        },
        {
          id: "java-rec-4",
          type: "interview",
          question: "What are Switch Expressions (Java 14+)?",
          hint: "Expression = returns value, arrow syntax (->), no fall-through, exhaustive for enums. Statement = old, fall-through, no return.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-rec-s1",
          type: "scenario",
          question:
            "Replace a DTO class with Record but it needs input validation. How?",
          hint: "Use compact constructor: record User(String name, int age) { User { Objects.requireNonNull(name); if(age < 0) throw ...; } }.",
        },
        {
          id: "java-rec-s2",
          type: "scenario",
          question: "You use Records as JPA entities. What issues arise?",
          hint: "JPA requires mutable state, no-arg constructor, setters. Records are immutable with no no-arg constructor. Use regular class or Kotlin data class.",
        },
        {
          id: "java-rec-s3",
          type: "scenario",
          question:
            "Design AST (Abstract Syntax Tree) node hierarchy using Sealed Classes.",
          hint: "sealed interface Expr permits Num, Add, Mul. Pattern match exhaustively: switch(expr) { case Num n -> n.value(); case Add a -> eval(a.left()) + ... }.",
        },
        {
          id: "java-rec-s4",
          type: "scenario",
          question:
            "Method has 5 instanceof checks and casts. Refactor using Java 17+ features.",
          hint: "Use sealed type hierarchy + switch with pattern matching: switch(shape) { case Circle c -> πr²; case Rectangle r -> l*w; }. No casts.",
        },
        {
          id: "java-rec-s5",
          type: "scenario",
          question:
            "Can Records extend other classes? What can they implement?",
          hint: "Records implicitly extend java.lang.Record. Cannot extend other classes (single inheritance). Can implement interfaces. Can have static fields/methods.",
        },
        {
          id: "java-rec-s6",
          type: "scenario",
          question: "When would you use Record vs Lombok @Value?",
          hint: "Record = language-level (no library dep, JVM-native, IDE support). Lombok = more flexible (can customize), works in Java 8+. Prefer Record in Java 16+.",
        },
      ],
    },
    {
      id: "modern-virtual-threads",
      name: "5.5 Virtual Threads (Java 21)",
      interviewQuestions: [
        {
          id: "java-vt-1",
          type: "interview",
          question:
            "What are Virtual Threads and how do they differ from platform threads?",
          hint: "Lightweight JVM-managed threads (Project Loom). Not 1:1 with OS threads. Mounted on carrier threads. Can create millions. Block without blocking OS thread.",
        },
        {
          id: "java-vt-2",
          type: "interview",
          question: "When do virtual threads NOT improve performance?",
          hint: "CPU-bound tasks (no blocking, no benefit). Pinning (synchronized block holds carrier thread). Short non-blocking tasks.",
        },
        {
          id: "java-vt-3",
          type: "interview",
          question: "What is thread pinning and how do you avoid it?",
          hint: "Virtual thread pinned to carrier when inside synchronized block or native call — blocks carrier. Replace synchronized with ReentrantLock.",
        },
        {
          id: "java-vt-4",
          type: "interview",
          question: "What is Structured Concurrency (Java 21)?",
          hint: "StructuredTaskScope — group related concurrent tasks, cancel all on first failure/success, treat as unit. Lifecycle management, prevents thread leaks.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-vt-s1",
          type: "scenario",
          question:
            "REST service handles 1000 concurrent requests with DB calls. With platform threads you need 1000 threads. How do virtual threads help?",
          hint: "Virtual threads park on blocking I/O, unmount from carrier, carrier handles other tasks. Thousands of virtual threads → few carriers. No thread pool needed.",
        },
        {
          id: "java-vt-s2",
          type: "scenario",
          question:
            "You migrate Spring Boot service to virtual threads. What configuration changes?",
          hint: "Spring Boot 3.2+: spring.threads.virtual.enabled=true. Tomcat uses virtual thread executor. Check for synchronized pinning issues.",
        },
        {
          id: "java-vt-s3",
          type: "scenario",
          question:
            "Virtual thread calls synchronized JDBC driver method. What happens to throughput?",
          hint: "Pinning — carrier thread blocked. Throughput limited by carrier count. Check -Djdk.tracePinnedThreads=full. Pressure vendor to use ReentrantLock.",
        },
        {
          id: "java-vt-s4",
          type: "scenario",
          question:
            "When would you still use ExecutorService with virtual threads?",
          hint: "For lifecycle management, structured shutdown, result collection. Executors.newVirtualThreadPerTaskExecutor() for existing API compatibility.",
        },
        {
          id: "java-vt-s5",
          type: "scenario",
          question:
            "Compare virtual threads with reactive programming (WebFlux). When to pick each?",
          hint: "Virtual threads = imperative style, easier to read/debug, great for I/O-bound. Reactive = non-blocking, back-pressure, streaming. Virtual threads may replace most reactive use cases.",
        },
        {
          id: "java-vt-s6",
          type: "scenario",
          question: "How do you detect virtual thread pinning in production?",
          hint: "JVM flag -Djdk.tracePinnedThreads=short|full logs stack traces. JFR events for pinning. AsyncProfiler supports virtual thread profiling.",
        },
      ],
    },
  ],
};
