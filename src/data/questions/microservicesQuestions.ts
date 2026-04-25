import { CategoryData } from "../types";

export const microservicesQuestions: CategoryData = {
  id: "microservices",
  name: "13. Microservices Architecture",
  icon: "🏗️",
  color: "var(--purple)",
  description:
    "Architecture Patterns, Communication, Resilience, Data Management, Observability, Deployment",
  sections: [
    {
      id: "ms-architecture",
      name: "13.1 Architecture Patterns",
      interviewQuestions: [
        {
          id: "ms-arch-1",
          type: "interview",
          question:
            "What are the main benefits and challenges of microservices over monoliths?",
          hint: "Benefits: independent deploy, scale, tech heterogeneity. Challenges: distributed systems complexity, network latency, data consistency, observability.",
        },
        {
          id: "ms-arch-2",
          type: "interview",
          question: "How do you decompose a monolith into microservices?",
          hint: "Domain-Driven Design (bounded contexts), Strangler Fig pattern, event storming, start with least-coupled modules, avoid nano-services.",
        },
        {
          id: "ms-arch-3",
          type: "interview",
          question: "What is the Strangler Fig pattern?",
          hint: "Gradually replace monolith by routing new features to microservices. Proxy (API gateway) intercepts calls. Incremental migration without big-bang rewrite.",
        },
        {
          id: "ms-arch-4",
          type: "interview",
          question:
            "What is the difference between orchestration and choreography in microservices?",
          hint: "Orchestration: central coordinator (SAGA orchestrator, process manager). Choreography: services react to events independently (event-driven SAGA).",
        },
      ],
      scenarioQuestions: [
        {
          id: "ms-arch-s1",
          type: "scenario",
          question:
            "A monolith has a shared DB used by many services. How do you migrate to DB-per-service without downtime?",
          hint: "Strangler Fig + dual-write period, sync data via CDC (Debezium), switch reads gradually, cut over once in sync. Never share DB between services.",
        },
        {
          id: "ms-arch-s2",
          type: "scenario",
          question:
            "A new microservice needs data owned by another service. Should it call the API or copy the data?",
          hint: "Event-driven replication (subscribe to events, maintain local projection) for frequent access. API call for infrequent. Avoid synchronous coupling for core data.",
        },
        {
          id: "ms-arch-s3",
          type: "scenario",
          question:
            "How do you handle the challenge of distributed transactions across 3 microservices?",
          hint: "SAGA pattern (choreography or orchestration). No 2PC in microservices. Compensating transactions for rollback. Outbox for guaranteed event delivery.",
        },
        {
          id: "ms-arch-s4",
          type: "scenario",
          question:
            "Your team debates: one big API Gateway vs multiple BFF (Backend for Frontend). What do you recommend?",
          hint: "BFF: tailored APIs per client (mobile, web, IoT) — better performance, independence. Gateway: shared concerns (auth, rate limit). Hybrid is common.",
        },
        {
          id: "ms-arch-s5",
          type: "scenario",
          question:
            "Service A calls Service B which calls Service C. C is slow. How does this affect A and how do you fix?",
          hint: "Cascading latency / failure chain. Circuit breaker at B, timeouts, bulkhead isolation. Or switch B→C communication to async (event-driven).",
        },
        {
          id: "ms-arch-s6",
          type: "scenario",
          question:
            "How do you version microservice APIs? What breaking vs non-breaking changes?",
          hint: "Non-breaking: add optional fields, add endpoints. Breaking: remove/rename fields, change types. Strategy: URL versioning, consumer-driven contract tests (Pact).",
        },
      ],
    },
    {
      id: "ms-communication",
      name: "13.2 Service Communication",
      interviewQuestions: [
        {
          id: "ms-comm-1",
          type: "interview",
          question:
            "When would you use synchronous (REST/gRPC) vs asynchronous (Kafka/RabbitMQ) communication?",
          hint: "Sync: real-time response needed, query, user-facing. Async: high throughput, decoupling, fire-and-forget, event notification, resilience.",
        },
        {
          id: "ms-comm-2",
          type: "interview",
          question: "What is gRPC and when is it better than REST?",
          hint: "HTTP/2, Protocol Buffers (binary, schema), bidirectional streaming, strongly typed, faster. Better for internal service-to-service, streaming, mobile.",
        },
        {
          id: "ms-comm-3",
          type: "interview",
          question:
            "What is an API Gateway and what responsibilities should it NOT have?",
          hint: "Gateway: routing, auth, rate limiting, SSL termination, logging. Should NOT have business logic — keep it a thin routing/policy layer.",
        },
        {
          id: "ms-comm-4",
          type: "interview",
          question:
            "What is service discovery and what are client-side vs server-side discovery?",
          hint: "Client-side: client queries registry (Eureka), load balances itself. Server-side: load balancer queries registry (K8s Service). Client-side more common in Spring Cloud.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ms-comm-s1",
          type: "scenario",
          question:
            "Service A makes 10 synchronous calls to different services to build a response. Performance is poor. How do you fix?",
          hint: "Parallel calls with `CompletableFuture.allOf()` or reactive `Mono.zip()`. Or GraphQL for aggregation. Consider BFF pattern.",
        },
        {
          id: "ms-comm-s2",
          type: "scenario",
          question:
            "Two services communicate via REST. Service B is redeployed with a new API contract. Service A breaks. How do you prevent this?",
          hint: "Consumer-driven contract testing (Pact). Provider publishes contract, consumer verifies. CI enforces compatibility before deploy.",
        },
        {
          id: "ms-comm-s3",
          type: "scenario",
          question:
            "You need exactly-once delivery of events between services. Is this achievable?",
          hint: "True exactly-once is hard. Aim for at-least-once + idempotent consumers (deduplication key). Kafka transactions + idempotent producer for at-least-once with dedup.",
        },
        {
          id: "ms-comm-s4",
          type: "scenario",
          question:
            "A synchronous call chain: A→B→C→D. C is down. How do cascades get worse and how do you isolate?",
          hint: "Thread pool exhaustion (all A/B threads waiting for C). Circuit breaker per downstream, bulkhead (separate thread pools), timeout + fallback.",
        },
        {
          id: "ms-comm-s5",
          type: "scenario",
          question:
            "You implement service mesh (Istio). What moves from application code to the mesh?",
          hint: "mTLS, retries, circuit breaking, traffic shaping, telemetry — all in sidecar (Envoy). App code becomes cleaner. Less Resilience4j needed.",
        },
      ],
    },
    {
      id: "ms-resilience",
      name: "13.3 Resilience Patterns",
      interviewQuestions: [
        {
          id: "ms-res-1",
          type: "interview",
          question:
            "What is the Circuit Breaker pattern and what are its states?",
          hint: "CLOSED (normal), OPEN (failing — reject fast), HALF-OPEN (probe). Transitions based on failure threshold. Resilience4j / Hystrix.",
        },
        {
          id: "ms-res-2",
          type: "interview",
          question: "What is the Bulkhead pattern?",
          hint: "Isolate failures in separate resource pools (thread pools or semaphores). Downstream A failure doesn't exhaust resources for downstream B.",
        },
        {
          id: "ms-res-3",
          type: "interview",
          question: "What is the difference between retry and circuit breaker?",
          hint: "Retry: attempt again on transient failure. Circuit breaker: stop trying when failure rate too high. Use both: retry for transient, CB for systemic failure.",
        },
        {
          id: "ms-res-4",
          type: "interview",
          question:
            "What is the Timeout pattern and why is it essential in microservices?",
          hint: "Don't wait indefinitely for a response. Set at every level: connection, read, overall. Without timeout, thread pools fill with waiting threads.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ms-res-s1",
          type: "scenario",
          question:
            "Configure Resilience4j to retry 3 times with exponential backoff only for 5xx errors. How?",
          hint: "`RetryConfig.custom().maxAttempts(3).waitDuration(Duration.ofSeconds(1)).intervalFunction(IntervalFunction.ofExponentialBackoff()).retryOnException(e -> e instanceof 5xxException)`.",
        },
        {
          id: "ms-res-s2",
          type: "scenario",
          question:
            "Circuit breaker opens but users see generic error. How do you provide a graceful fallback?",
          hint: "`@CircuitBreaker(fallbackMethod='fallback')`, fallback returns cached data, default response, or partial result. Log and monitor CB state.",
        },
        {
          id: "ms-res-s3",
          type: "scenario",
          question:
            "A retry storm amplifies load on an already struggling service. How do you prevent this?",
          hint: "Jitter in retry (random backoff offset), exponential backoff, circuit breaker to stop retrying, coordination (don't all retry at same time).",
        },
        {
          id: "ms-res-s4",
          type: "scenario",
          question: "How do you test circuit breaker behavior in unit tests?",
          hint: "Resilience4j test module: `CircuitBreakerRegistry`, transition state programmatically, or `@CircuitBreakerTest`. Verify fallback is called.",
        },
        {
          id: "ms-res-s5",
          type: "scenario",
          question:
            "A bulkhead is isolating a thread pool, but tasks queue up in the bulkhead queue indefinitely. What's the risk and fix?",
          hint: "Bounded queue + rejection policy. `BulkheadConfig.maxWaitDuration()` or semaphore-based bulkhead (immediate reject). Monitor queue depth.",
        },
        {
          id: "ms-res-s6",
          type: "scenario",
          question:
            "Describe a full resilience strategy for a payment service calling a credit check API.",
          hint: "Timeout (100ms), retry (2x with jitter, non-idempotent care), circuit breaker (50% failure threshold), bulkhead (5 concurrent), fallback (cached result or decline conservatively).",
        },
      ],
    },
    {
      id: "ms-data",
      name: "13.4 Data Management in Microservices",
      interviewQuestions: [
        {
          id: "ms-data-1",
          type: "interview",
          question: "Why is database-per-service important in microservices?",
          hint: "Independent deployments, polyglot persistence, bounded context isolation, no coupling via DB schema. Shared DB = coupling = defeats microservices purpose.",
        },
        {
          id: "ms-data-2",
          type: "interview",
          question: "What is the SAGA pattern and when do you use it?",
          hint: "Manage distributed transactions via sequence of local transactions + compensating transactions on failure. Choreography (events) or Orchestration (coordinator).",
        },
        {
          id: "ms-data-3",
          type: "interview",
          question: "What is CQRS and what problem does it solve?",
          hint: "Separate read and write models. Write side optimizes for consistency, read side for query performance. Allows different DBs for reads/writes.",
        },
        {
          id: "ms-data-4",
          type: "interview",
          question: "What is Event Sourcing?",
          hint: "Store events (not current state). Reconstruct state by replaying events. Immutable audit log. Works naturally with CQRS. Complexity: snapshotting, replay performance.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ms-data-s1",
          type: "scenario",
          question:
            "Order service creates order, Inventory service reserves stock, Payment service charges — all must succeed or all rollback. Design the SAGA.",
          hint: "Orchestration: SAGA coordinator sends commands, receives replies. Compensating transactions: cancel order, release stock, refund payment. State machine for SAGA steps.",
        },
        {
          id: "ms-data-s2",
          type: "scenario",
          question:
            "You implement Event Sourcing. The event stream grows to 10M events. Querying current state is slow. How do you fix?",
          hint: "Snapshots (checkpoint current state at N events). On read: load nearest snapshot + replay events since. Snapshot periodically or on event count.",
        },
        {
          id: "ms-data-s3",
          type: "scenario",
          question:
            "CQRS with eventual consistency: read model is 2 seconds behind. A user updates and immediately reloads — sees old data. How do you handle this UX issue?",
          hint: "Optimistic UI update (show what user submitted immediately), read-your-writes consistency (route read back to write DB for 5s after write), accept and explain.",
        },
        {
          id: "ms-data-s4",
          type: "scenario",
          question:
            "Two microservices need to join data from their separate DBs for a report. How?",
          hint: "API composition (service aggregates calls), event-driven denormalization (one service subscribes and maintains local copy), or data warehouse/lake for reporting.",
        },
        {
          id: "ms-data-s5",
          type: "scenario",
          question:
            "An event from Service A triggers Service B, which triggers C, which triggers A again. How do you detect and prevent event cycles?",
          hint: "Correlation ID tracking, causation chains. Event handler guards (don't re-emit if already processed this correlation). Idempotency checks.",
        },
        {
          id: "ms-data-s6",
          type: "scenario",
          question:
            "The Payment service owns transaction data. Finance team needs weekly reports on all transactions. How do you provide access without coupling?",
          hint: "Publish events to data lake (Kafka → S3 → Athena), CDC from DB, dedicated reporting projection (CQRS read model), or reporting microservice subscribing to events.",
        },
      ],
    },
    {
      id: "ms-observability",
      name: "13.5 Observability",
      interviewQuestions: [
        {
          id: "ms-obs-1",
          type: "interview",
          question: "What are the three pillars of observability?",
          hint: "Logs (what happened), Metrics (how much/how often), Traces (where time was spent end-to-end). Together they enable debugging distributed systems.",
        },
        {
          id: "ms-obs-2",
          type: "interview",
          question: "What is distributed tracing and how does it work?",
          hint: "Trace ID propagated across services (via headers). Each service adds span. Reconstruct call tree from spans. Tools: Jaeger, Zipkin, OpenTelemetry, AWS X-Ray.",
        },
        {
          id: "ms-obs-3",
          type: "interview",
          question:
            "What is the difference between structured and unstructured logging?",
          hint: "Structured: JSON with consistent fields (timestamp, level, traceId, message). Machine-readable, queryable in ELK/Loki. Unstructured: plain text — hard to parse.",
        },
        {
          id: "ms-obs-4",
          type: "interview",
          question: "What is the RED method for microservices metrics?",
          hint: "Rate (requests/sec), Errors (failed requests/sec), Duration (latency distribution). Per-service SLIs. Complements USE (Utilization, Saturation, Errors) for infra.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ms-obs-s1",
          type: "scenario",
          question:
            "A user reports 'my request is slow' with no trace ID. How do you investigate in a microservices system?",
          hint: "Correlate by user ID + timestamp across service logs. Tracing helps more — add user ID to trace baggage. Distributed tracing is critical for this.",
        },
        {
          id: "ms-obs-s2",
          type: "scenario",
          question:
            "How do you propagate trace context across async Kafka consumers?",
          hint: "Extract trace context from Kafka message headers (W3C TraceContext or B3). Inject in producer, extract in consumer. Micrometer Tracing with Kafka instrumentation.",
        },
        {
          id: "ms-obs-s3",
          type: "scenario",
          question:
            "Logs from 10 services are in different formats. Querying in ELK is painful. How do you standardize?",
          hint: "Structured JSON logging (Logstash encoder for Logback). Common mandatory fields: timestamp, level, service, traceId, spanId, userId. Enforce via shared logging lib.",
        },
        {
          id: "ms-obs-s4",
          type: "scenario",
          question:
            "You want to alert when p99 latency exceeds 500ms for a critical endpoint. How do you set this up?",
          hint: "Micrometer `Timer` with percentile histograms. Prometheus scrape. Grafana alert on `http_server_requests_seconds{quantile='0.99'} > 0.5`. PagerDuty integration.",
        },
        {
          id: "ms-obs-s5",
          type: "scenario",
          question:
            "How do you implement health checks that Kubernetes uses for liveness and readiness probes?",
          hint: "`/actuator/health/liveness` (app alive — DB down shouldn't affect it). `/actuator/health/readiness` (ready to serve — DB down → OUT_OF_SERVICE). Set in K8s probe config.",
        },
        {
          id: "ms-obs-s6",
          type: "scenario",
          question:
            "A transaction spans 5 services. The trace shows 80% of time in Service C. How do you investigate further?",
          hint: "Drill into Service C's spans, look for DB queries (slow SQL), external calls, GC pauses, thread contention. Check Service C's own metrics (JVM, DB pool).",
        },
      ],
    },
    {
      id: "ms-deployment",
      name: "13.6 Deployment & Containerization",
      interviewQuestions: [
        {
          id: "ms-deploy-1",
          type: "interview",
          question:
            "What is the difference between Blue-Green and Canary deployments?",
          hint: "Blue-Green: two identical environments, switch traffic all-at-once. Canary: gradual traffic shift (5% → 50% → 100%), reduce blast radius, monitor between steps.",
        },
        {
          id: "ms-deploy-2",
          type: "interview",
          question:
            "What are the key considerations for containerizing a Java Spring Boot app?",
          hint: "Base image (Eclipse Temurin), multi-stage Dockerfile, JVM container awareness (`-XX:MaxRAMPercentage`), layer caching, non-root user, health check, graceful shutdown.",
        },
        {
          id: "ms-deploy-3",
          type: "interview",
          question:
            "What is a Kubernetes liveness vs readiness vs startup probe?",
          hint: "Startup: wait for slow startup (prevents premature liveness failure). Liveness: restart if dead. Readiness: route traffic only when ready. Different failure actions.",
        },
        {
          id: "ms-deploy-4",
          type: "interview",
          question:
            "What is a Kubernetes ConfigMap and Secret? When do you use each?",
          hint: "ConfigMap: non-sensitive config (URLs, feature flags). Secret: sensitive data (passwords, keys) — base64 encoded (not encrypted by default). Use Vault or KMS for real encryption.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ms-deploy-s1",
          type: "scenario",
          question:
            "A rolling deployment causes 5 minutes of 500 errors because new code expects a DB column that's not yet added. How do you prevent this?",
          hint: "Backward-compatible DB migrations (expand-contract). Add column nullable first, deploy new code (reads optional), then populate, then add constraint, then remove old code.",
        },
        {
          id: "ms-deploy-s2",
          type: "scenario",
          question:
            "Your Spring Boot JAR is 200MB in Docker and deployments are slow. How do you optimize the Docker image?",
          hint: "Layered JARs (`spring-boot:build-image` or Jib), separate dependency layer from app layer. Dependencies cached in Docker layer — only app layer changes on rebuild.",
        },
        {
          id: "ms-deploy-s3",
          type: "scenario",
          question:
            "A K8s pod runs out of memory and is OOM-killed. How do you tune JVM memory for containers?",
          hint: "`-XX:MaxRAMPercentage=75`, set K8s resource limits matching JVM heap. Reserve for Metaspace, off-heap, GC overhead. Monitor with JFR or JVM metrics.",
        },
        {
          id: "ms-deploy-s4",
          type: "scenario",
          question:
            "How do you implement zero-downtime deployment for a Spring Boot app on Kubernetes?",
          hint: "Rolling update strategy, `minReadySeconds`, readiness probe (don't route until ready), `terminationGracePeriodSeconds` > app shutdown time, `preStop` hook.",
        },
        {
          id: "ms-deploy-s5",
          type: "scenario",
          question:
            "Your service has 10 instances. One starts failing health checks. K8s restarts it in a loop. How do you debug?",
          hint: "`kubectl logs pod --previous`, `kubectl describe pod` (OOM, startup timeout), check liveness probe response, resource limits, crash loop metrics.",
        },
        {
          id: "ms-deploy-s6",
          type: "scenario",
          question:
            "Implement Kubernetes HPA (Horizontal Pod Autoscaler) for a CPU-bound Java service. What metrics and thresholds?",
          hint: "CPU target ~70%, min replicas 2, max replicas 10. Custom metrics (request latency, queue depth) via Prometheus adapter. Warm-up time matters for JVM.",
        },
      ],
    },
  ],
};
