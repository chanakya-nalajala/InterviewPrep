import { CategoryData } from "../types";

export const javaCoreQuestions: CategoryData = {
  id: "java-core",
  name: "Java Core",
  icon: "☕",
  color: "var(--amber)",
  description:
    "Strings, OOP, Exception Handling, Generics, Reflection, Serialization",
  sections: [
    {
      id: "strings",
      name: "Strings",
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
      name: "Object-Oriented Programming (OOP)",
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
      name: "Exception Handling",
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
      name: "Generics",
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
      id: "reflection",
      name: "Reflection & Annotations",
      interviewQuestions: [
        {
          id: "java-refl-1",
          type: "interview",
          question: "What is Java Reflection and what can you do with it?",
          hint: "Inspect/manipulate classes, methods, fields at runtime. Used by Spring DI, Hibernate, JUnit. Performance cost.",
        },
        {
          id: "java-refl-2",
          type: "interview",
          question: "How do you create a custom annotation in Java?",
          hint: "@interface, @Retention (SOURCE/CLASS/RUNTIME), @Target (METHOD/FIELD/TYPE), @Documented.",
        },
        {
          id: "java-refl-3",
          type: "interview",
          question:
            "What is the difference between @Retention(RUNTIME) and @Retention(CLASS)?",
          hint: "RUNTIME = accessible via Reflection at runtime. CLASS = in .class but not at runtime. SOURCE = compile only (like @Override).",
        },
        {
          id: "java-refl-4",
          type: "interview",
          question: "How does Spring use reflection internally?",
          hint: "Bean instantiation, @Autowired injection, @Transactional proxy creation, @Value field injection, component scanning.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-refl-s1",
          type: "scenario",
          question:
            "You need to build a lightweight DI framework for a coding exercise. How would you use reflection?",
          hint: "Scan classes, find @Inject, use Class.getDeclaredFields(), setAccessible(true), resolve and inject dependencies.",
        },
        {
          id: "java-refl-s2",
          type: "scenario",
          question:
            "A framework uses reflection heavily and you notice slow startup. How do you profile and fix it?",
          hint: "JVM startup profiler, cache reflected metadata, use MethodHandle (faster), consider compile-time annotation processing.",
        },
        {
          id: "java-refl-s3",
          type: "scenario",
          question:
            "You need to auto-generate toString/equals/hashCode at runtime without Lombok. How?",
          hint: "Reflection over declared fields, getDeclaredFields(), build string/hash dynamically. Performance-cache results.",
        },
        {
          id: "java-refl-s4",
          type: "scenario",
          question:
            "Explain how @Transactional works under the hood in Spring.",
          hint: "Spring creates JDK/CGLIB proxy, intercepts method calls, opens transaction before, commits/rolls back after. Self-invocation issue.",
        },
        {
          id: "java-refl-s5",
          type: "scenario",
          question:
            "You want to enforce that all classes annotated with @AuditLog must also implement Auditable. How?",
          hint: "Custom annotation processor (AbstractProcessor), or Spring bean post-processor checking at startup via reflection.",
        },
        {
          id: "java-refl-s6",
          type: "scenario",
          question:
            "A custom annotation @RateLimit needs to be processed to limit API calls. Where do you implement this logic?",
          hint: "Spring AOP @Around advice + @annotation(rateLimit) pointcut, read annotation values, apply bucket/counter logic.",
        },
      ],
    },
    {
      id: "serialization",
      name: "Serialization",
      interviewQuestions: [
        {
          id: "java-ser-1",
          type: "interview",
          question: "What is Java Serialization and what are its pitfalls?",
          hint: "Serializable marker interface, serialVersionUID, security risks (deserialization attacks), performance, version compatibility.",
        },
        {
          id: "java-ser-2",
          type: "interview",
          question:
            "What is the role of serialVersionUID? What happens if it's missing?",
          hint: "Version compatibility identifier. JVM auto-generates if missing — any class change breaks deserialization with InvalidClassException.",
        },
        {
          id: "java-ser-3",
          type: "interview",
          question: "How do you prevent a field from being serialized?",
          hint: "transient keyword. Also static fields aren't serialized. Custom writeObject()/readObject() for control.",
        },
        {
          id: "java-ser-4",
          type: "interview",
          question:
            "What is Externalizable and how does it differ from Serializable?",
          hint: "Full control over serialization via writeExternal()/readExternal(). Faster, more explicit. Requires no-arg constructor.",
        },
      ],
      scenarioQuestions: [
        {
          id: "java-ser-s1",
          type: "scenario",
          question:
            "A class was serialized and stored. A new field is added. Deserialization fails. How do you fix this?",
          hint: "Declare serialVersionUID explicitly, ensure backward compatibility. New fields get default values on old data deserialization.",
        },
        {
          id: "java-ser-s2",
          type: "scenario",
          question:
            "Your app deserializes data from untrusted sources (user uploads). What's the security risk?",
          hint: "Remote code execution via gadget chains (Apache Commons vulnerability). Use ObjectInputFilter, whitelist allowed classes, prefer JSON.",
        },
        {
          id: "java-ser-s3",
          type: "scenario",
          question:
            "You need to serialize a class hierarchy with polymorphism using JSON. What issues arise?",
          hint: "Jackson's @JsonTypeInfo / @JsonSubTypes for polymorphic type info. Decide: include type metadata or use wrapper.",
        },
        {
          id: "java-ser-s4",
          type: "scenario",
          question:
            "A Password field should never appear in serialized output to a log or network. How do you handle this for both Java and JSON serialization?",
          hint: "transient for Java serialization, @JsonIgnore for Jackson, @JsonProperty(access = WRITE_ONLY), custom serializer.",
        },
        {
          id: "java-ser-s5",
          type: "scenario",
          question:
            "Two services exchange objects via Java serialization over RMI. One service upgrades and adds a field. What's your versioning strategy?",
          hint: "serialVersionUID discipline, backward compatible field additions only, consider Protobuf/Avro/JSON for cross-service communication.",
        },
        {
          id: "java-ser-s6",
          type: "scenario",
          question:
            "Performance tests show Java serialization is bottlenecking your messaging system. What alternatives do you evaluate?",
          hint: "Kryo (fast binary), Protobuf (schema-first, cross-lang), Avro (schema evolution), JSON/CBOR, MessagePack.",
        },
      ],
    },
  ],
};
