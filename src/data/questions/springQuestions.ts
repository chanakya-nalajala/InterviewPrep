import { CategoryData } from "../types";

export const springQuestions: CategoryData = {
  id: "spring",
  name: "Spring Framework & Boot",
  icon: "🍃",
  color: "var(--green)",
  description:
    "Spring Core, Boot, Data JPA, Security, Web, Testing, Advanced (Async, Caching, Batch)",
  sections: [
    {
      id: "spring-ioc-di",
      name: "6.1 IoC Container & Dependency Injection",
      interviewQuestions: [
        {
          id: "spring-ioc-1",
          type: "interview",
          question:
            "What is Inversion of Control and how does Spring implement it?",
          hint: "Container controls object lifecycle and dependencies (inverted from traditional new-ing). Spring uses BeanFactory/ApplicationContext as IoC container.",
        },
        {
          id: "spring-ioc-2",
          type: "interview",
          question: "What are the types of Dependency Injection in Spring?",
          hint: "Constructor injection (preferred — immutable, testable), Setter injection (optional deps), Field injection (discouraged — hidden deps, not testable without container).",
        },
        {
          id: "spring-ioc-3",
          type: "interview",
          question:
            "Why is constructor injection preferred over field injection?",
          hint: "Makes dependencies explicit, enables immutability (final), works without container (unit tests), fails fast on circular deps.",
        },
        {
          id: "spring-ioc-4",
          type: "interview",
          question: "What is @Qualifier and when do you need it?",
          hint: "When multiple beans of same type exist — disambiguate by name. @Qualifier('beanName'). Alternative: @Primary to mark default.",
        },
        {
          id: "spring-ioc-5",
          type: "interview",
          question: "What is @Primary vs @Qualifier?",
          hint: "@Primary = default when multiple candidates. @Qualifier = explicit selection. @Qualifier overrides @Primary.",
        },
      ],
      scenarioQuestions: [
        {
          id: "spring-ioc-s1",
          type: "scenario",
          question:
            "You have two implementations of PaymentService. How do you inject the correct one based on runtime configuration?",
          hint: "@Profile, @ConditionalOnProperty, @Qualifier with property value, or factory bean. Strategy pattern with dynamic lookup.",
        },
        {
          id: "spring-ioc-s2",
          type: "scenario",
          question:
            "A circular dependency causes startup failure. How do you diagnose and fix it?",
          hint: "A→B→A. Fix: restructure (introduce new class), use setter injection (Spring can resolve circular with setter), @Lazy injection (breaks cycle but hides design issue).",
        },
        {
          id: "spring-ioc-s3",
          type: "scenario",
          question:
            "You want to inject a list of all implementations of an interface. How?",
          hint: "@Autowired List<PaymentProcessor> processors — Spring injects all beans of that type. Order with @Order or Ordered interface.",
        },
        {
          id: "spring-ioc-s4",
          type: "scenario",
          question:
            "Field injection works fine in app but tests fail with NPE. Why?",
          hint: "Field injection bypasses constructor — Spring injects via reflection. Tests without Spring context don't inject fields. Fix: constructor injection or use @SpringBootTest.",
        },
        {
          id: "spring-ioc-s5",
          type: "scenario",
          question:
            "How do you conditionally create a bean only when a certain class is on the classpath?",
          hint: "@ConditionalOnClass(SomeClass.class). Part of Spring Boot's auto-configuration conditions: @ConditionalOnMissingBean, @ConditionalOnProperty.",
        },
        {
          id: "spring-ioc-s6",
          type: "scenario",
          question:
            "You have a stateful Service bean that multiple threads access. What scope should it be and why?",
          hint: "Stateful beans are dangerous as singletons. Use @Scope('prototype') (new instance per injection). Or redesign to be stateless. Session scope for web.",
        },
      ],
    },
    {
      id: "spring-bean-lifecycle",
      name: "6.2 Bean Lifecycle & Scopes",
      interviewQuestions: [
        {
          id: "spring-lifecycle-1",
          type: "interview",
          question: "What is the lifecycle of a Spring bean?",
          hint: "Instantiate → Populate properties → BeanNameAware/BeanFactoryAware → BeanPostProcessor (before/after) → @PostConstruct/InitializingBean → In use → @PreDestroy/DisposableBean → Destroy.",
        },
        {
          id: "spring-lifecycle-2",
          type: "interview",
          question: "What are the bean scopes in Spring?",
          hint: "singleton (default), prototype, request, session, application, websocket. Web scopes need web-aware context.",
        },
        {
          id: "spring-lifecycle-3",
          type: "interview",
          question:
            "What is the difference between @PostConstruct and InitializingBean?",
          hint: "Both run after injection. @PostConstruct is JSR-250 annotation (preferred — no Spring coupling). InitializingBean.afterPropertiesSet() = Spring interface (tightly coupled).",
        },
        {
          id: "spring-lifecycle-4",
          type: "interview",
          question:
            "What happens when you inject a prototype-scoped bean into a singleton?",
          hint: "Prototype becomes effectively singleton — injected once at startup. Fix: ApplicationContext.getBean(), @Lookup, ObjectProvider<T>, scoped proxy.",
        },
      ],
      scenarioQuestions: [
        {
          id: "spring-lifecycle-s1",
          type: "scenario",
          question:
            "A @PostConstruct method throws an exception. What happens to the application context?",
          hint: "Context fails to start. BeanCreationException wraps it. Application doesn't start. Make init robust — handle failures or mark non-critical.",
        },
        {
          id: "spring-lifecycle-s2",
          type: "scenario",
          question:
            "How do you initialize a connection pool or cache at Spring startup?",
          hint: "@PostConstruct, ApplicationListener<ContextRefreshedEvent>, CommandLineRunner, ApplicationRunner. Prefer @PostConstruct for bean-scoped init.",
        },
        {
          id: "spring-lifecycle-s3",
          type: "scenario",
          question:
            "You need a new instance of a prototype bean every time a method is called. How?",
          hint: "@Lookup method injection, ObjectProvider<T> (Spring 4.3+), or ApplicationContext.getBean(). @Lookup is cleanest.",
        },
        {
          id: "spring-lifecycle-s4",
          type: "scenario",
          question:
            "A @PreDestroy method should close a resource. But the app is killed with SIGKILL. Will it run?",
          hint: "No — SIGKILL (kill -9) bypasses JVM shutdown hooks. @PreDestroy runs only on graceful shutdown. Use SIGTERM (kill -15) for graceful termination.",
        },
        {
          id: "spring-lifecycle-s5",
          type: "scenario",
          question:
            "Your singleton bean holds a List that grows indefinitely in memory. What design violation is this?",
          hint: "Stateful singleton — anti-pattern. Singletons should be stateless. Move state to request/session scope, database, or cache with eviction.",
        },
        {
          id: "spring-lifecycle-s6",
          type: "scenario",
          question:
            "How do BeanPostProcessor and BeanFactoryPostProcessor differ?",
          hint: "BeanFactoryPostProcessor modifies bean definitions before instantiation. BeanPostProcessor wraps instances after creation. Used for proxying (@Transactional, AOP).",
        },
      ],
    },
    {
      id: "spring-aop",
      name: "6.3 Spring AOP",
      interviewQuestions: [
        {
          id: "spring-aop-1",
          type: "interview",
          question: "What is AOP and what are its key concepts in Spring?",
          hint: "Aspect, Advice (Before/After/Around/AfterReturning/AfterThrowing), Pointcut (where), JoinPoint (what), Weaving. Cross-cutting concerns (logging, security, transactions).",
        },
        {
          id: "spring-aop-2",
          type: "interview",
          question:
            "What is the difference between JDK dynamic proxy and CGLIB proxy in Spring AOP?",
          hint: "JDK proxy: requires interface, uses java.lang.reflect.Proxy. CGLIB: subclasses the target class, no interface needed. Spring Boot auto-selects.",
        },
        {
          id: "spring-aop-3",
          type: "interview",
          question:
            "What is the @Around advice and what is ProceedingJoinPoint?",
          hint: "@Around wraps the method. ProceedingJoinPoint.proceed() calls the actual method. Can modify args, return value, suppress exception.",
        },
        {
          id: "spring-aop-4",
          type: "interview",
          question:
            "Why doesn't AOP work for self-invocation (calling method within same class)?",
          hint: "Spring AOP uses proxy. Direct method call within a class bypasses proxy. Fix: inject self (@Autowired ApplicationContext), AopContext.currentProxy(), or refactor.",
        },
      ],
      scenarioQuestions: [
        {
          id: "spring-aop-s1",
          type: "scenario",
          question:
            "Implement a method execution time logging aspect. What considerations?",
          hint: "@Around, System.nanoTime() before/after proceed(), log method name from joinPoint.getSignature(). Handle exception in proceed().",
        },
        {
          id: "spring-aop-s2",
          type: "scenario",
          question:
            "A @Transactional method called from another method in the same class doesn't start a transaction. Why?",
          hint: "Self-invocation bypasses proxy. Fix: extract to another bean, use AopContext.currentProxy() (enable with exposeProxy=true), or @Transactional on class level.",
        },
        {
          id: "spring-aop-s3",
          type: "scenario",
          question:
            "You need to cache method results for 5 minutes. How would you implement this with AOP?",
          hint: "@Around advice, compute cache key from method name + args, check cache, call proceed() on miss, store result. Or use @Cacheable (Spring does AOP for you).",
        },
        {
          id: "spring-aop-s4",
          type: "scenario",
          question:
            "An aspect is not being applied to a @Component bean. What are the common reasons?",
          hint: "@EnableAspectJAutoProxy missing, aspect not a Spring bean, pointcut expression wrong, final class/method (CGLIB can't subclass final), self-invocation.",
        },
        {
          id: "spring-aop-s5",
          type: "scenario",
          question:
            "You want AOP to apply to all @Service classes across 10 modules. How do you write the pointcut?",
          hint: "@within(org.springframework.stereotype.Service) or execution(* com.example..service..*(...)). Use @annotation(com.example.Log) for custom marker.",
        },
        {
          id: "spring-aop-s6",
          type: "scenario",
          question:
            "How do you pass data from @Before advice to @AfterReturning advice for the same method?",
          hint: "You can't directly between separate advices. Use @Around instead (single advice wraps before+after). Or use ThreadLocal as a last resort.",
        },
      ],
    },
    {
      id: "spring-events",
      name: "6.4 ApplicationContext & Events",
      interviewQuestions: [
        {
          id: "spring-events-1",
          type: "interview",
          question:
            "What is the difference between BeanFactory and ApplicationContext?",
          hint: "BeanFactory = basic DI. ApplicationContext extends with: event publication, i18n, AOP, web support. Always use ApplicationContext in production.",
        },
        {
          id: "spring-events-2",
          type: "interview",
          question: "What types of ApplicationContext are commonly used?",
          hint: "AnnotationConfigApplicationContext (standalone), ClassPathXmlApplicationContext (XML, legacy), WebApplicationContext (web), SpringApplication (Boot).",
        },
        {
          id: "spring-events-3",
          type: "interview",
          question: "What is the Spring Event system and how does it work?",
          hint: "Publisher-subscriber. ApplicationEventPublisher.publishEvent(). @EventListener (Spring 4.2+). Sync by default. @Async for async delivery.",
        },
        {
          id: "spring-events-4",
          type: "interview",
          question:
            "What is @TransactionalEventListener and why is it important?",
          hint: "Listens to events only when the publishing transaction commits (AFTER_COMMIT). Prevents processing events from rolled-back transactions.",
        },
      ],
      scenarioQuestions: [
        {
          id: "spring-events-s1",
          type: "scenario",
          question:
            "You publish a domain event. The listener sends an email. If the transaction rolls back, the email is still sent. How do you fix?",
          hint: "@TransactionalEventListener(phase = AFTER_COMMIT). Email only sent after successful commit. Outbox pattern for guaranteed delivery.",
        },
        {
          id: "spring-events-s2",
          type: "scenario",
          question:
            "Multiple listeners handle the same event. You need them in a specific order. How?",
          hint: "@Order annotation on listener methods. @EventListener combined with @Order. Also SmartApplicationListener for fine control.",
        },
        {
          id: "spring-events-s3",
          type: "scenario",
          question:
            "How do you refresh/replace beans in ApplicationContext without restarting (hot-reload)?",
          hint: "Spring Cloud's @RefreshScope + /actuator/refresh. For development: Spring DevTools restart. Full reload needed for non-@RefreshScope beans.",
        },
        {
          id: "spring-events-s4",
          type: "scenario",
          question:
            "You need to run code after all beans are fully initialized. What's the correct hook?",
          hint: "ApplicationListener<ContextRefreshedEvent>, ApplicationRunner, CommandLineRunner, or SmartInitializingSingleton. Avoid @PostConstruct for cross-bean operations.",
        },
        {
          id: "spring-events-s5",
          type: "scenario",
          question:
            "An @EventListener throws an exception. What happens to the publisher thread?",
          hint: "Sync listener exception propagates to publisher. Use @Async to decouple. Add try-catch in listener or use AsyncUncaughtExceptionHandler.",
        },
        {
          id: "spring-events-s6",
          type: "scenario",
          question:
            "How do you test that an event was published from a service method?",
          hint: "Use ApplicationEventPublisher mock, @MockBean it, verify publishEvent() called. Or use @SpyBean on context, assert event captured.",
        },
      ],
    },
    {
      id: "boot-autoconfig",
      name: "7.1 Auto-Configuration",
      interviewQuestions: [
        {
          id: "boot-autoconfig-1",
          type: "interview",
          question: "How does Spring Boot auto-configuration work?",
          hint: "@EnableAutoConfiguration → reads spring.factories / AutoConfiguration.imports (Boot 2.7+) → conditional bean creation (@ConditionalOn*).",
        },
        {
          id: "boot-autoconfig-2",
          type: "interview",
          question: "What is @SpringBootApplication? What does it contain?",
          hint: "Composed of @Configuration, @EnableAutoConfiguration, @ComponentScan. All three in one annotation.",
        },
        {
          id: "boot-autoconfig-3",
          type: "interview",
          question: "How do you exclude a specific auto-configuration class?",
          hint: "@SpringBootApplication(exclude = DataSourceAutoConfiguration.class), or spring.autoconfigure.exclude property, or @EnableAutoConfiguration(exclude=...).",
        },
        {
          id: "boot-autoconfig-4",
          type: "interview",
          question: "What is the order of auto-configuration processing?",
          hint: "@AutoConfigureBefore, @AutoConfigureAfter, @AutoConfigureOrder. Conditions evaluated lazily. Own @Configuration takes precedence over auto-config.",
        },
      ],
      scenarioQuestions: [
        {
          id: "boot-autoconfig-s1",
          type: "scenario",
          question:
            "A Spring Boot app auto-configures a DataSource you don't want. How do you disable it?",
          hint: "Exclude DataSourceAutoConfiguration, HibernateJpaAutoConfiguration. Or set spring.datasource.url to null with condition logic.",
        },
        {
          id: "boot-autoconfig-s2",
          type: "scenario",
          question:
            "You write a custom starter. What is the minimum structure needed?",
          hint: "autoconfigure module with @Configuration + conditions. starter module with dependency on autoconfigure + dependencies. AutoConfiguration.imports / spring.factories file.",
        },
        {
          id: "boot-autoconfig-s3",
          type: "scenario",
          question:
            "Auto-configured ObjectMapper doesn't match your needs. How do you customize without breaking auto-config?",
          hint: "Define Jackson2ObjectMapperBuilderCustomizer bean, or @Bean ObjectMapper (replaces auto-config). @ConditionalOnMissingBean is the key.",
        },
        {
          id: "boot-autoconfig-s4",
          type: "scenario",
          question:
            "@ConditionalOnMissingBean — when does Spring evaluate this? Order of evaluation issues?",
          hint: "Evaluated at bean definition phase. If your @Bean is defined after the auto-config, it may not be seen as 'present' yet. Use @AutoConfigureAfter correctly.",
        },
        {
          id: "boot-autoconfig-s5",
          type: "scenario",
          question:
            "How do you debug which auto-configurations are applied or skipped?",
          hint: "--debug flag or logging.level.org.springframework.boot.autoconfigure=DEBUG. /actuator/conditions endpoint shows conditions evaluation report.",
        },
        {
          id: "boot-autoconfig-s6",
          type: "scenario",
          question:
            "You want a bean created only if stripe.enabled=true in properties. How?",
          hint: "@ConditionalOnProperty(name = 'stripe.enabled', havingValue = 'true'). Works for auto-config and regular @Configuration classes.",
        },
      ],
    },
    {
      id: "boot-profiles",
      name: "7.2 Profiles & Configuration",
      interviewQuestions: [
        {
          id: "boot-profiles-1",
          type: "interview",
          question:
            "How do Spring Profiles work and what are the ways to activate them?",
          hint: "@Profile('dev'), spring.profiles.active, -Dspring.profiles.active, SPRING_PROFILES_ACTIVE env var, SpringApplication.setAdditionalProfiles().",
        },
        {
          id: "boot-profiles-2",
          type: "interview",
          question: "What is the property loading order in Spring Boot?",
          hint: "17-source hierarchy. Key order: Command-line args > JNDI > System properties > OS env vars > profile-specific YAML/properties > application.properties.",
        },
        {
          id: "boot-profiles-3",
          type: "interview",
          question:
            "What is @ConfigurationProperties and how does it differ from @Value?",
          hint: "@ConfigurationProperties: type-safe, bound to prefix, supports nested objects and validation (@Validated). @Value: individual property, SpEL support, harder to test.",
        },
        {
          id: "boot-profiles-4",
          type: "interview",
          question:
            "How do you externalize secrets (DB password, API keys) in Spring Boot?",
          hint: "Environment variables, Kubernetes Secrets, Spring Cloud Vault, AWS Secrets Manager (Spring Cloud AWS), never in application.properties committed to Git.",
        },
      ],
      scenarioQuestions: [
        {
          id: "boot-profiles-s1",
          type: "scenario",
          question:
            "You need different DB configurations for dev (H2), test (TestContainers), and prod (Oracle). How do you structure this?",
          hint: "application-dev.yml, application-test.yml, application-prod.yml. Active profile via env var in each environment. Override only what differs.",
        },
        {
          id: "boot-profiles-s2",
          type: "scenario",
          question:
            "A @ConfigurationProperties bean has a wrong property value causing NullPointerException. How do you catch this early?",
          hint: "Add @Validated + JSR-303 annotations (@NotNull, @Min). Validation runs at startup — fails fast. Use @ConstructorBinding (Boot 2.x) or records (Boot 3).",
        },
        {
          id: "boot-profiles-s3",
          type: "scenario",
          question:
            "Sensitive credentials are in application.properties and checked into Git. How do you fix this without changing code?",
          hint: "Move to env vars or ~/.spring-properties (local override). Spring Cloud Config Server for centralized config. Vault for secrets. .gitignore the local override file.",
        },
        {
          id: "boot-profiles-s4",
          type: "scenario",
          question:
            "How do you merge YAML and properties files for the same profile?",
          hint: "Spring Boot merges all matching property sources by priority. Profile-specific overrides base. Multiple YAML docs with --- separator per profile.",
        },
        {
          id: "boot-profiles-s5",
          type: "scenario",
          question:
            "You want a set of properties only available in integration tests, not unit tests.",
          hint: "src/test/resources/application-test.yml, activate with @ActiveProfiles('test') on test class, or @TestPropertySource(locations='...').",
        },
        {
          id: "boot-profiles-s6",
          type: "scenario",
          question:
            "Spring Boot Actuator exposes /env. A security audit flags it. How do you harden configuration?",
          hint: "Limit management.endpoints.web.exposure.include, require auth (management.endpoint.env.access=READ_ONLY), sanitize secrets via management.endpoint.env.keys-to-sanitize.",
        },
      ],
    },
    {
      id: "boot-actuator",
      name: "7.3 Spring Boot Actuator",
      interviewQuestions: [
        {
          id: "boot-actuator-1",
          type: "interview",
          question:
            "What is Spring Boot Actuator and what key endpoints does it expose?",
          hint: "Production-ready features. Key endpoints: /health, /info, /metrics, /env, /beans, /mappings, /loggers, /threaddump, /heapdump, /conditions.",
        },
        {
          id: "boot-actuator-2",
          type: "interview",
          question: "How do you create a custom health indicator?",
          hint: "Implement HealthIndicator, override health(). Return Health.up(), Health.down(withDetail(...)). Auto-registered if Spring bean.",
        },
        {
          id: "boot-actuator-3",
          type: "interview",
          question: "How do you add custom metrics to Actuator?",
          hint: "MeterRegistry injection, Counter, Timer, Gauge, DistributionSummary. Micrometer abstracts over Prometheus, Datadog, CloudWatch.",
        },
        {
          id: "boot-actuator-4",
          type: "interview",
          question: "How do you secure Actuator endpoints?",
          hint: "Move to different port (management.server.port), require authentication, limit exposed endpoints, Spring Security config for /actuator/**.",
        },
      ],
      scenarioQuestions: [
        {
          id: "boot-actuator-s1",
          type: "scenario",
          question:
            "Your K8s liveness probe hits /actuator/health and restarts the pod when a downstream service is down. How do you fix this?",
          hint: "Separate liveness (app alive) from readiness (ready to serve). livenessState, readinessState. Down dependency → readiness OUT_OF_SERVICE, not liveness DOWN.",
        },
        {
          id: "boot-actuator-s2",
          type: "scenario",
          question:
            "You want to expose a custom endpoint that returns the current feature flags. How?",
          hint: "@Endpoint(id = 'featureflags') + @ReadOperation method. Auto-exposed under /actuator/featureflags. Control with management.endpoint.featureflags.enabled=true.",
        },
        {
          id: "boot-actuator-s3",
          type: "scenario",
          question:
            "How do you dynamically change log level in production without restart?",
          hint: "POST to /actuator/loggers/{logger} with body {'configuredLevel': 'DEBUG'}. Works with Logback/Log4j2. Resets on restart.",
        },
        {
          id: "boot-actuator-s4",
          type: "scenario",
          question:
            "An Actuator /heapdump endpoint is exposed publicly. What's the risk?",
          hint: "Heap dump contains all in-memory data: passwords, tokens, PII. Restrict behind authentication, or disable. Never expose publicly.",
        },
        {
          id: "boot-actuator-s5",
          type: "scenario",
          question:
            "How do you use Actuator metrics with Prometheus in a Spring Boot app?",
          hint: "Add micrometer-registry-prometheus dependency. /actuator/prometheus exposes metrics in Prometheus format. Scrape with Prometheus + visualize in Grafana.",
        },
        {
          id: "boot-actuator-s6",
          type: "scenario",
          question:
            "Your service's /health shows DOWN because a non-critical third-party API is unreachable. How do you handle this?",
          hint: "Configure health contributor to not affect overall status: management.health.thirdparty.enabled=false, or implement HealthIndicator returning Health.up() with detail.",
        },
      ],
    },
    {
      id: "boot-testing",
      name: "7.4 Spring Boot Testing",
      interviewQuestions: [
        {
          id: "boot-testing-1",
          type: "interview",
          question:
            "What is the difference between @SpringBootTest and @WebMvcTest?",
          hint: "@SpringBootTest: full context (slow). @WebMvcTest: only web layer (controllers, filters) — no service/repo beans (mock them). Faster.",
        },
        {
          id: "boot-testing-2",
          type: "interview",
          question: "What is @MockBean vs @Mock?",
          hint: "@MockBean: registers Mockito mock in Spring context (replaces/adds bean). @Mock: plain Mockito mock, no Spring context. Use @MockBean with Spring tests.",
        },
        {
          id: "boot-testing-3",
          type: "interview",
          question: "What is @DataJpaTest?",
          hint: "Sliced test for JPA: configures in-memory DB (H2), loads only JPA-related beans. No full context. Transactional by default — rolls back after each test.",
        },
        {
          id: "boot-testing-4",
          type: "interview",
          question: "What is TestContainers and when do you use it?",
          hint: "Manages Docker containers in tests. Real DB (PostgreSQL, Oracle) instead of H2. @Container + @Testcontainers. Better production fidelity.",
        },
      ],
      scenarioQuestions: [
        {
          id: "boot-testing-s1",
          type: "scenario",
          question:
            "Your @SpringBootTest tests are slow (30+ seconds). How do you speed them up?",
          hint: "Use sliced tests (@WebMvcTest, @DataJpaTest), @MockBean instead of real beans, @DirtiesContext only when needed (context reuse), parallel test execution.",
        },
        {
          id: "boot-testing-s2",
          type: "scenario",
          question:
            "A test passes in isolation but fails when run with others. What's the likely cause?",
          hint: "Shared state (static vars, DB, cache), test ordering, @DirtiesContext needed, thread safety, leftover data from another test.",
        },
        {
          id: "boot-testing-s3",
          type: "scenario",
          question:
            "How do you test a service that calls an external REST API without actually calling it?",
          hint: "MockRestServiceServer for RestTemplate, WireMock for WebClient/HTTP stubs, @MockBean for service injection. WireMock best for realistic HTTP testing.",
        },
        {
          id: "boot-testing-s4",
          type: "scenario",
          question:
            "You want to test database queries against real Oracle (not H2). How without full Spring context?",
          hint: "@DataJpaTest + @AutoConfigureTestDatabase(replace = NONE) + TestContainers Oracle TC image. Real dialect, real constraints.",
        },
        {
          id: "boot-testing-s5",
          type: "scenario",
          question:
            "A @Transactional test always passes but the same code fails in production. Why?",
          hint: "Test rolls back after each method — never actually commits. Production commits expose constraint violations, lazy loading issues, etc. Add @Commit for specific tests.",
        },
        {
          id: "boot-testing-s6",
          type: "scenario",
          question: "How do you test a Spring Batch job step by step?",
          hint: "@SpringBatchTest (Spring Batch 4.1+), JobLauncherTestUtils, JobRepositoryTestUtils (clean up). Launch specific jobs/steps, assert JobExecution status.",
        },
      ],
    },
    {
      id: "data-jpa-hibernate",
      name: "8.1 JPA, Hibernate & Repositories",
      interviewQuestions: [
        {
          id: "data-jpa-1",
          type: "interview",
          question: "What is the N+1 problem in JPA and how do you fix it?",
          hint: "Fetching parent + N separate queries for children. Fix: JOIN FETCH in JPQL, @EntityGraph, @BatchSize, FetchType.EAGER (careful), @Query with join.",
        },
        {
          id: "data-jpa-2",
          type: "interview",
          question:
            "What is the difference between FetchType.LAZY and FetchType.EAGER?",
          hint: "LAZY: load on access. EAGER: load immediately with parent. LAZY default for collections, EAGER for @ManyToOne. EAGER can cause over-fetching.",
        },
        {
          id: "data-jpa-3",
          type: "interview",
          question: "What is the JPA First Level and Second Level Cache?",
          hint: "L1 (EntityManager/Session): per-persistence-context, automatic. L2 (SessionFactory-level, e.g. Ehcache): shared across sessions, opt-in with @Cacheable.",
        },
        {
          id: "data-jpa-4",
          type: "interview",
          question: "What is @DynamicUpdate and when should you use it?",
          hint: "Hibernate-only — generates UPDATE only for modified columns. Useful for wide tables with many columns and high-write concurrency.",
        },
      ],
      scenarioQuestions: [
        {
          id: "data-jpa-s1",
          type: "scenario",
          question:
            "A report query joins 5 tables and is slow. You use JPA. How do you optimize?",
          hint: "Native query with Oracle hints, projections (interface/DTO), avoid loading full entities (avoid SELECT *), second-level cache, proper indexing.",
        },
        {
          id: "data-jpa-s2",
          type: "scenario",
          question:
            "You update an entity field but Hibernate doesn't persist the change. Why?",
          hint: "Entity not in managed state (detached). Re-attach with merge(). Or the field wasn't actually changed (dirty checking compares snapshots).",
        },
        {
          id: "data-jpa-s3",
          type: "scenario",
          question:
            "A LazyInitializationException occurs outside a transaction. How do you handle it?",
          hint: "Extend transaction boundary, use @Transactional on service, JOIN FETCH in query, projections (DTOs), or open-session-in-view (anti-pattern for APIs).",
        },
        {
          id: "data-jpa-s4",
          type: "scenario",
          question:
            "You delete an entity but related entities remain in DB. What JPA cascade configuration resolves this?",
          hint: "cascade = CascadeType.REMOVE or cascade = CascadeType.ALL, orphanRemoval = true for collections. Understand the difference between both.",
        },
        {
          id: "data-jpa-s5",
          type: "scenario",
          question:
            "Two users simultaneously update the same record. How do you prevent lost updates?",
          hint: "Optimistic locking: @Version field — throws OptimisticLockException on conflict. Pessimistic locking: @Lock(PESSIMISTIC_WRITE) — DB row lock.",
        },
        {
          id: "data-jpa-s6",
          type: "scenario",
          question:
            "Hibernate generates a SELECT before every INSERT. Why and how to fix?",
          hint: "@GeneratedValue(strategy = IDENTITY) causes this on some DBs. Use SEQUENCE strategy with allocationSize. Or batch inserts with hibernate.jdbc.batch_size.",
        },
      ],
    },
    {
      id: "data-transactions",
      name: "8.2 Transactions",
      interviewQuestions: [
        {
          id: "data-tx-1",
          type: "interview",
          question: "What are the transaction propagation levels in Spring?",
          hint: "REQUIRED (default, join or new), REQUIRES_NEW (always new, suspends outer), SUPPORTS, NOT_SUPPORTED, MANDATORY, NEVER, NESTED.",
        },
        {
          id: "data-tx-2",
          type: "interview",
          question:
            "What is @Transactional(readOnly = true) and what does it do?",
          hint: "Hints to Hibernate (no dirty checking, no flush), and to JDBC driver/DB (read replica routing). Performance optimization, not a true read-only enforcement.",
        },
        {
          id: "data-tx-3",
          type: "interview",
          question:
            "What is rollback behavior in Spring transactions by default?",
          hint: "Rolls back on unchecked exceptions (RuntimeException, Error). Doesn't roll back on checked exceptions. Override: rollbackFor = Exception.class.",
        },
        {
          id: "data-tx-4",
          type: "interview",
          question:
            "What is REQUIRES_NEW propagation and when is it dangerous?",
          hint: "Suspends outer TX, starts new one — commits independently. Risk: outer TX rolls back but inner already committed. Use for audit logging.",
        },
      ],
      scenarioQuestions: [
        {
          id: "data-tx-s1",
          type: "scenario",
          question:
            "An order service creates an order (TX1) and sends a notification (TX2). If notification fails, should the order rollback?",
          hint: "Separate concerns. Use REQUIRES_NEW for notification (independent). Or decouple entirely with events + @TransactionalEventListener.",
        },
        {
          id: "data-tx-s2",
          type: "scenario",
          question:
            "A service method is @Transactional. It calls another @Transactional(propagation=REQUIRES_NEW) method in the same class. What happens?",
          hint: "Self-invocation — REQUIRES_NEW is ignored (same proxy). Both run in same transaction. Fix: separate service class or AopContext.currentProxy().",
        },
        {
          id: "data-tx-s3",
          type: "scenario",
          question:
            "Your transaction times out in production after 30 seconds. How do you find the slow query?",
          hint: "Enable Hibernate SQL logging, set @Transactional(timeout=...), use slow query log, Spring's P6Spy, DataSource proxy for query metrics.",
        },
        {
          id: "data-tx-s4",
          type: "scenario",
          question:
            "You need a method to always run in its own transaction regardless of caller. What propagation?",
          hint: "REQUIRES_NEW — always suspends existing TX and creates new. Commits/rolls back independently. Commonly used for audit trail, outbox writes.",
        },
        {
          id: "data-tx-s5",
          type: "scenario",
          question: "@Transactional on a private method doesn't work. Why?",
          hint: "Spring AOP can't proxy private methods (neither JDK proxy nor CGLIB). Must be at least protected (CGLIB) or public (JDK proxy). AspectJ weaving avoids this.",
        },
        {
          id: "data-tx-s6",
          type: "scenario",
          question:
            "A service writes to DB and publishes to Kafka in the same transaction. Kafka doesn't support JTA. What patterns help?",
          hint: "Outbox pattern: write to outbox table in same DB TX, separate relay polls and publishes to Kafka. Guarantees at-least-once. Or Kafka Transactions (idempotent producer).",
        },
      ],
    },
    {
      id: "data-query-pagination",
      name: "8.3 Spring Data Query Methods & Pagination",
      interviewQuestions: [
        {
          id: "data-query-1",
          type: "interview",
          question:
            "How does Spring Data JPA derive queries from method names?",
          hint: "Parses method name — findByFirstNameAndLastName, findByAgeGreaterThan, countByStatus. Uses JPA criteria API under the hood.",
        },
        {
          id: "data-query-2",
          type: "interview",
          question:
            "What is the difference between @Query with JPQL and native query?",
          hint: "JPQL = object model (entity names, field names), DB-agnostic. Native = raw SQL (table/column names), DB-specific but more powerful.",
        },
        {
          id: "data-query-3",
          type: "interview",
          question: "How does Spring Data handle pagination?",
          hint: "Pageable parameter, returns Page<T> (content + totalElements) or Slice<T> (hasNext, no count query). PageRequest.of(page, size, sort).",
        },
        {
          id: "data-query-4",
          type: "interview",
          question: "What is a Projection in Spring Data JPA?",
          hint: "Interface/class projection selects specific fields only. Avoids loading full entity. Interface projection = query optimization (SELECT only used fields).",
        },
      ],
      scenarioQuestions: [
        {
          id: "data-query-s1",
          type: "scenario",
          question:
            "A count query on a 50M row table for Page<T> is too slow. How do you optimize?",
          hint: "Use Slice<T> (no count query — just hasNext). Or cursor-based/keyset pagination (ID-based). Avoid COUNT(*) on large tables.",
        },
        {
          id: "data-query-s2",
          type: "scenario",
          question:
            "You need dynamic filtering (optional first name, optional last name, optional age). How do you implement it?",
          hint: "Spring Data JPA Specifications (Specification<T>), QueryDSL predicates, Criteria API. Avoid method proliferation for every combination.",
        },
        {
          id: "data-query-s3",
          type: "scenario",
          question:
            "A @Query with JPQL performs well in development but is slow in production. What do you investigate?",
          hint: "Explain plan differences (data volume), missing indexes, Hibernate generating unexpected SQL, N+1 in JPQL join, database statistics stale.",
        },
        {
          id: "data-query-s4",
          type: "scenario",
          question:
            "How do you implement cursor-based (keyset) pagination in Spring Data for a high-volume list?",
          hint: "WHERE id > :lastId ORDER BY id LIMIT :size. Pass last seen ID as cursor. Consistent performance, no offset drift. Return next cursor in response.",
        },
        {
          id: "data-query-s5",
          type: "scenario",
          question:
            "You need to bulk-update 10,000 records without loading them into memory. How?",
          hint: "@Modifying @Query('UPDATE User u SET u.status = :status WHERE u.createdAt < :cutoff'). No entity loading, direct SQL. Clear L1 cache after with @Modifying(clearAutomatically = true).",
        },
        {
          id: "data-query-s6",
          type: "scenario",
          question:
            "@Modifying with clearAutomatically = false causes stale entity reads after update. Explain and fix.",
          hint: "Bulk update bypasses persistence context — cache not updated. clearAutomatically = true clears L1 cache. Or manually entityManager.clear().",
        },
      ],
    },
    {
      id: "security-architecture",
      name: "9.1 Security Architecture",
      interviewQuestions: [
        {
          id: "security-arch-1",
          type: "interview",
          question: "Explain the Spring Security filter chain architecture.",
          hint: "SecurityFilterChain — ordered chain of filters. DelegatingFilterProxy bridges Servlet container and Spring context. Key filters: UsernamePasswordAuthenticationFilter, BasicAuthFilter, ExceptionTranslationFilter, AuthorizationFilter.",
        },
        {
          id: "security-arch-2",
          type: "interview",
          question:
            "What is the difference between Authentication and Authorization in Spring Security?",
          hint: "Authentication = who are you (identity). Authorization = what can you do (permissions). AuthenticationManager → SecurityContext → AccessDecisionManager.",
        },
        {
          id: "security-arch-3",
          type: "interview",
          question:
            "What is SecurityContextHolder and what threading model does it use?",
          hint: "Holds SecurityContext for current thread. Default: ThreadLocal (per-thread). InheritableThreadLocal for child threads. GlobalSecurityContextHolder for single-threaded.",
        },
        {
          id: "security-arch-4",
          type: "interview",
          question:
            "What is the difference between permitAll(), authenticated(), and hasRole()?",
          hint: "permitAll() = no auth needed. authenticated() = any authenticated user. hasRole('ADMIN') = specific role (auto-prefixes ROLE_). hasAuthority() = no prefix.",
        },
      ],
      scenarioQuestions: [
        {
          id: "security-arch-s1",
          type: "scenario",
          question:
            "A public endpoint should not require authentication but your security config blocks it. How do you debug?",
          hint: "Enable security debug logging, check filter order, requestMatchers path patterns, ensure permitAll() before anyRequest().authenticated(), method security vs URL security.",
        },
        {
          id: "security-arch-s2",
          type: "scenario",
          question:
            "You need different security rules for /api/** and /admin/**. How do you configure multiple security filter chains?",
          hint: "Multiple @Bean SecurityFilterChain with @Order. Each has its own requestMatchers() and security config. Higher priority chain matches first.",
        },
        {
          id: "security-arch-s3",
          type: "scenario",
          question:
            "A CSRF token is rejected for POST requests in your REST API. Should REST APIs use CSRF protection?",
          hint: "Stateless APIs (JWT-based) don't need CSRF — no cookies/sessions. Disable CSRF for REST: http.csrf().disable(). Only needed for browser session-based apps.",
        },
        {
          id: "security-arch-s4",
          type: "scenario",
          question:
            "User logs out but token is still valid. How do you invalidate JWT tokens on logout?",
          hint: "JWT is stateless — can't truly invalidate. Strategies: token blacklist (Redis), short expiry + refresh tokens, JTI (JWT ID) in DB/cache, session management.",
        },
        {
          id: "security-arch-s5",
          type: "scenario",
          question:
            "A user's roles change but their JWT still has old roles. How do you handle this?",
          hint: "Short token lifetime + re-issue on refresh, force logout + re-login, token revocation list. Avoid long-lived JWTs if roles change frequently.",
        },
        {
          id: "security-arch-s6",
          type: "scenario",
          question:
            "How do you implement IP-based rate limiting in Spring Security?",
          hint: "Custom HandlerInterceptor or Filter, Bucket4j library, Redis for distributed counting, X-Forwarded-For header for proxy scenarios.",
        },
      ],
    },
    {
      id: "security-jwt-oauth2",
      name: "9.2 JWT & OAuth2",
      interviewQuestions: [
        {
          id: "security-jwt-1",
          type: "interview",
          question: "What is the structure of a JWT token?",
          hint: "Three parts: Header (alg, typ), Payload (claims: sub, iat, exp, custom), Signature. Base64URL encoded, dot-separated. Signed not encrypted by default.",
        },
        {
          id: "security-jwt-2",
          type: "interview",
          question: "What is the difference between OAuth2 and OIDC?",
          hint: "OAuth2 = authorization framework (access delegation). OIDC = identity layer on OAuth2 (who the user is). OIDC adds ID token (JWT), UserInfo endpoint.",
        },
        {
          id: "security-jwt-3",
          type: "interview",
          question: "What are OAuth2 grant types and when do you use each?",
          hint: "Authorization Code (web apps), Authorization Code + PKCE (SPAs/mobile), Client Credentials (service-to-service), Refresh Token (get new access token). Password grant — deprecated.",
        },
        {
          id: "security-jwt-4",
          type: "interview",
          question:
            "How does Spring Security OAuth2 Resource Server validate JWT tokens?",
          hint: "Configure jwk-set-uri or issuer-uri. Fetches public keys, validates signature, expiry, issuer. JwtDecoder bean does the work.",
        },
      ],
      scenarioQuestions: [
        {
          id: "security-jwt-s1",
          type: "scenario",
          question:
            "A microservice needs to call another service on behalf of the current user. How do you propagate the JWT?",
          hint: "Token relay — pass Authorization: Bearer <token> header. Spring Cloud Security TokenRelayGatewayFilterFactory, or manually read from SecurityContext and add to WebClient.",
        },
        {
          id: "security-jwt-s2",
          type: "scenario",
          question:
            "JWT signature verification fails intermittently. What could cause this?",
          hint: "Key rotation (new key, old tokens), clock skew (iat/exp check), key mismatch between issuer and validator, Base64 padding issues.",
        },
        {
          id: "security-jwt-s3",
          type: "scenario",
          question:
            "An OAuth2 authorization code flow is vulnerable to CSRF. How does PKCE help?",
          hint: "PKCE: code verifier (random) + code challenge (hash). Authorization server verifies verifier matches challenge. No shared secret needed. Prevents code injection.",
        },
        {
          id: "security-jwt-s4",
          type: "scenario",
          question:
            "Your Keycloak token has roles but Spring Security doesn't see them. Why?",
          hint: "Roles may be under resource_access.{clientId}.roles not standard roles. Write custom JwtAuthenticationConverter to map them to GrantedAuthority.",
        },
        {
          id: "security-jwt-s5",
          type: "scenario",
          question:
            "You need fine-grained authorization (e.g., user can only edit their own resources). How do you implement this?",
          hint: "@PreAuthorize('authentication.name == #resource.ownerId'). Method security with SpEL. Or custom PermissionEvaluator for complex rules.",
        },
        {
          id: "security-jwt-s6",
          type: "scenario",
          question: "How do you implement refresh token rotation for security?",
          hint: "On refresh: issue new access + new refresh token, invalidate old refresh token. Store refresh token hash in DB. Detect reuse (indicator of theft), revoke family.",
        },
      ],
    },
    {
      id: "web-rest-controllers",
      name: "10.1 REST Controllers & Exception Handling",
      interviewQuestions: [
        {
          id: "web-rest-1",
          type: "interview",
          question:
            "What is the difference between @Controller and @RestController?",
          hint: "@RestController = @Controller + @ResponseBody. All methods return response body directly (JSON/XML). @Controller returns view names.",
        },
        {
          id: "web-rest-2",
          type: "interview",
          question: "How does @ControllerAdvice work?",
          hint: "Global exception handler, model attribute contributor, data binding. @ExceptionHandler methods. Applied across all controllers. Can narrow with basePackages.",
        },
        {
          id: "web-rest-3",
          type: "interview",
          question:
            "What is ResponseEntity and when do you use it over just returning an object?",
          hint: "Full HTTP response control: status code, headers, body. Use for: non-200 success responses, custom headers, conditional responses, file downloads.",
        },
        {
          id: "web-rest-4",
          type: "interview",
          question: "What is content negotiation in Spring MVC?",
          hint: "Determines response format based on Accept header, URL extension, parameter. ContentNegotiationStrategy. produces attribute in @RequestMapping.",
        },
      ],
      scenarioQuestions: [
        {
          id: "web-rest-s1",
          type: "scenario",
          question:
            "You want all API errors to return a consistent {code, message, timestamp} JSON body. How do you implement?",
          hint: "@ControllerAdvice + @ExceptionHandler per exception type, return ResponseEntity<ErrorResponse>. Use ProblemDetail (RFC 7807, Spring 6+).",
        },
        {
          id: "web-rest-s2",
          type: "scenario",
          question:
            "A REST endpoint receives a large file upload. How do you handle this without OOM?",
          hint: "MultipartFile (streaming), set spring.servlet.multipart.max-file-size, stream directly to S3/disk, avoid loading bytes into memory, transferTo().",
        },
        {
          id: "web-rest-s3",
          type: "scenario",
          question:
            "Your API returns 200 for validation errors. How do you fix it?",
          hint: "@Valid on request body + @ExceptionHandler(MethodArgumentNotValidException.class) returning 400. Or @ControllerAdvice. Default Spring behavior returns 400 already.",
        },
        {
          id: "web-rest-s4",
          type: "scenario",
          question: "How do you implement API versioning in Spring Boot?",
          hint: "URL path (/api/v1/), Request header (X-API-Version), Media type versioning (application/vnd.company.v1+json). URL versioning most common.",
        },
        {
          id: "web-rest-s5",
          type: "scenario",
          question:
            "A controller method is called but does nothing and returns null. Request hangs. Why?",
          hint: "Likely async (Callable, DeferredResult, CompletableFuture) — result never set. Or streaming response not flushed. Check for async config.",
        },
        {
          id: "web-rest-s6",
          type: "scenario",
          question:
            "How do you handle CORS in Spring Boot for a cross-origin SPA?",
          hint: "@CrossOrigin on controller, global CorsConfiguration bean, WebMvcConfigurer.addCorsMappings(). Spring Security also needs CORS config: http.cors().",
        },
      ],
    },
    {
      id: "web-webclient",
      name: "10.2 WebClient & RestTemplate",
      interviewQuestions: [
        {
          id: "web-webclient-1",
          type: "interview",
          question:
            "What is the difference between WebClient and RestTemplate?",
          hint: "RestTemplate = synchronous, blocking, deprecated in Spring 5+. WebClient = reactive, non-blocking, supports sync/async, supports streaming. Prefer WebClient.",
        },
        {
          id: "web-webclient-2",
          type: "interview",
          question:
            "How do you add a global request/response interceptor to WebClient?",
          hint: "ExchangeFilterFunction (functional interceptor). WebClient.builder().filter(...). Use for logging, auth header injection, retry.",
        },
        {
          id: "web-webclient-3",
          type: "interview",
          question: "How do you add retry logic to a WebClient call?",
          hint: ".retryWhen(Retry.backoff(3, Duration.ofSeconds(1)).filter(e -> e instanceof WebClientResponseException)). Reactor's retry with exponential backoff.",
        },
        {
          id: "web-webclient-4",
          type: "interview",
          question: "How do you configure timeout for a WebClient call?",
          hint: "Connection timeout (at HttpClient level), response timeout (WebClient level), read timeout. HttpClient.newConnection().responseTimeout(Duration). Also Mono.timeout().",
        },
      ],
      scenarioQuestions: [
        {
          id: "web-webclient-s1",
          type: "scenario",
          question:
            "A downstream service is slow and your WebClient calls pile up. How do you add circuit breaking?",
          hint: "Resilience4j CircuitBreaker operator: filter(CircuitBreakerOperator.of(circuitBreaker)). Or Spring Cloud Gateway with circuit breaker filter.",
        },
        {
          id: "web-webclient-s2",
          type: "scenario",
          question:
            "You need to call the same endpoint for 100 items in parallel using WebClient. How?",
          hint: "Flux.fromIterable(ids).flatMap(id -> webClient.get().uri(...).retrieve().bodyToMono(Dto.class)).collectList().block(). Control concurrency with flatMap(fn, concurrency).",
        },
        {
          id: "web-webclient-s3",
          type: "scenario",
          question:
            "WebClient is returning stale data. You suspect the response is being cached somewhere. How do you investigate?",
          hint: "Check Cache-Control / ETag headers. HTTP client connection pool may cache. CDN/proxy caching. Add no-cache headers to requests.",
        },
        {
          id: "web-webclient-s4",
          type: "scenario",
          question:
            "How do you test WebClient calls without making real HTTP calls?",
          hint: "WireMock stub server, MockWebServer (OkHttp), or WebTestClient with mock server. Don't use @MockBean WebClient — test the real config.",
        },
        {
          id: "web-webclient-s5",
          type: "scenario",
          question:
            "You switch from RestTemplate to WebClient in a sync Spring MVC app. Is there a benefit?",
          hint: "Some benefit (better connection pool, filter chain, retry). But true non-blocking benefit only in reactive stack (WebFlux). In MVC, still blocks calling thread.",
        },
      ],
    },
    {
      id: "test-strategies",
      name: "11.1 Testing Strategies & Slices",
      interviewQuestions: [
        {
          id: "test-strat-1",
          type: "interview",
          question:
            "What is the test pyramid and how does it apply to Spring Boot applications?",
          hint: "Unit (many, fast, no Spring), Integration (some, slice tests), E2E (few, slow). Over-reliance on integration tests = slow suite. Balance is key.",
        },
        {
          id: "test-strat-2",
          type: "interview",
          question: "What is @TestConfiguration?",
          hint: "@Configuration only loaded in tests. Bean definitions that supplement or replace main config. Not picked up by component scan in main code.",
        },
        {
          id: "test-strat-3",
          type: "interview",
          question:
            "How do you mock external dependencies in a Spring Boot integration test?",
          hint: "@MockBean for Spring beans, WireMock for HTTP dependencies, TestContainers for real DB, @SpyBean for partial mocking.",
        },
        {
          id: "test-strat-4",
          type: "interview",
          question: "What is the difference between @Spy and @Mock in Mockito?",
          hint: "@Mock = complete mock (all methods stubbed to default). @Spy = real object + selective stubbing. Call real methods unless overridden.",
        },
      ],
      scenarioQuestions: [
        {
          id: "test-strat-s1",
          type: "scenario",
          question:
            "You want to test only the service layer without starting a full Spring context. How?",
          hint: "Plain JUnit 5 + Mockito (@ExtendWith(MockitoExtension.class)). No @SpringBootTest. Inject mocks manually. Fast execution.",
        },
        {
          id: "test-strat-s2",
          type: "scenario",
          question:
            "A @DataJpaTest fails because your @Entity uses Hibernate-specific annotations not supported by H2. How do you fix?",
          hint: "Replace H2 with TestContainers real DB + @AutoConfigureTestDatabase(replace = NONE). Or abstract DB-specific annotations.",
        },
        {
          id: "test-strat-s3",
          type: "scenario",
          question:
            "How do you test a @Scheduled method without waiting for the schedule?",
          hint: "Call the method directly (it's a regular public method). Or use @MockBean ScheduledTaskScheduler and invoke task manually. Test logic, not scheduling.",
        },
        {
          id: "test-strat-s4",
          type: "scenario",
          question:
            "Your test relies on @EventListener. How do you verify the event was published and handled?",
          hint: "@SpyBean on the listener and verify with Mockito. Or use an ApplicationListener test helper collecting events. ApplicationEventPublisher can also be mocked.",
        },
        {
          id: "test-strat-s5",
          type: "scenario",
          question:
            "You have a test with @Transactional but the INSERT doesn't appear in the same @DataJpaTest. Why?",
          hint: "Same transaction as the test — flush to see it: entityManager.flush() + entityManager.clear(). Or use TestEntityManager.",
        },
        {
          id: "test-strat-s6",
          type: "scenario",
          question:
            "How do you test Keycloak-secured endpoints without a real Keycloak instance?",
          hint: "@WithMockUser, SecurityMockMvcRequestPostProcessors.jwt() (Spring Security test support), mockMvc.with(jwt().jwt(builder -> ...)). No real token needed.",
        },
      ],
    },
    {
      id: "advanced-async-cache",
      name: "12.1 Async, Scheduling & Caching",
      interviewQuestions: [
        {
          id: "advanced-async-1",
          type: "interview",
          question:
            "How does @Async work in Spring and what are its limitations?",
          hint: "Creates proxy, submits to TaskExecutor. Limitations: self-invocation, return type must be void/Future/CompletableFuture, exceptions in void methods are lost.",
        },
        {
          id: "advanced-async-2",
          type: "interview",
          question:
            "How do you configure a custom thread pool for @Async methods?",
          hint: "Define ThreadPoolTaskExecutor bean named asyncExecutor or configure AsyncConfigurer.getAsyncExecutor(). Separate pool per task type.",
        },
        {
          id: "advanced-async-3",
          type: "interview",
          question: "How does @Cacheable work and what are its key attributes?",
          hint: "AOP proxy intercepts. Returns cached value if present. key = SpEL expression. condition = cache when. unless = don't cache when. cacheManager = which cache.",
        },
        {
          id: "advanced-async-4",
          type: "interview",
          question: "What is @CacheEvict vs @CachePut?",
          hint: "@CacheEvict = removes entry (or all). @CachePut = updates cache with method result regardless of hit/miss. @CacheEvict(allEntries=true) clears entire cache.",
        },
      ],
      scenarioQuestions: [
        {
          id: "advanced-async-s1",
          type: "scenario",
          question:
            "An @Async method throws an exception. It's silent and you don't know it failed. How do you handle?",
          hint: "Return CompletableFuture and handle via .exceptionally(). Or implement AsyncUncaughtExceptionHandler in AsyncConfigurer.",
        },
        {
          id: "advanced-async-s2",
          type: "scenario",
          question:
            "@Cacheable returns stale data after an entity is updated. How do you fix?",
          hint: "Add @CacheEvict on update method. Or @CachePut after save. Or TTL-based eviction. Consider cache-aside vs write-through.",
        },
        {
          id: "advanced-async-s3",
          type: "scenario",
          question:
            "You cache a DB query result. DB is updated directly (not via service). Cache is stale. Solutions?",
          hint: "DB trigger → cache invalidation (complex). Short TTL. Cache-aside with database CDC (Debezium). Accept eventual consistency.",
        },
        {
          id: "advanced-async-s4",
          type: "scenario",
          question:
            "A @Scheduled task overlaps itself because the previous run isn't finished. How do you prevent this?",
          hint: "fixedDelay (waits for completion) vs fixedRate (overlaps). ShedLock for distributed lock. @ScheduledLock(name='task', lockAtMostFor='10m').",
        },
        {
          id: "advanced-async-s5",
          type: "scenario",
          question:
            "Your cache (@Cacheable) works in unit tests but not in production. What could be wrong?",
          hint: "Self-invocation (same class bypasses proxy), @EnableCaching missing, cache manager not configured, wrong cache name, condition/key expression wrong.",
        },
      ],
    },
    {
      id: "advanced-batch",
      name: "12.2 Spring Batch",
      interviewQuestions: [
        {
          id: "advanced-batch-1",
          type: "interview",
          question: "What are the core concepts of Spring Batch?",
          hint: "Job → Step → ItemReader/ItemProcessor/ItemWriter. JobLauncher, JobRepository, JobParameters. Chunk-oriented vs tasklet.",
        },
        {
          id: "advanced-batch-2",
          type: "interview",
          question: "What is chunk-oriented processing in Spring Batch?",
          hint: "Read N items (chunk-size), process all, write all — in one transaction per chunk. Fault-tolerant, restart from last committed chunk.",
        },
        {
          id: "advanced-batch-3",
          type: "interview",
          question:
            "How does Spring Batch handle restartability and fault tolerance?",
          hint: "JobRepository persists execution state. Restart picks up from last successful commit. skip-limit, retry-limit policies. SkipListener.",
        },
        {
          id: "advanced-batch-4",
          type: "interview",
          question: "What is a Partitioner in Spring Batch?",
          hint: "Splits a Step into parallel sub-steps (partitions). Each partition runs on a separate thread/worker. GridSize, StepExecutionContext per partition.",
        },
      ],
      scenarioQuestions: [
        {
          id: "advanced-batch-s1",
          type: "scenario",
          question:
            "A batch job processes 10M rows and fails at row 8M. You want it to resume from where it left off. How?",
          hint: "Spring Batch checkpoint (chunk commits). Job restartable if JobParameters same. Resume via JobLauncher with same parameters. Data must not be re-processed (idempotent reader).",
        },
        {
          id: "advanced-batch-s2",
          type: "scenario",
          question:
            "How do you run multiple batch jobs in parallel without interfering with each other?",
          hint: "Separate JobParameters (different instances), separate ThreadPoolTaskExecutor, FlowJob for parallel flows, JobOperator for concurrent launches.",
        },
        {
          id: "advanced-batch-s3",
          type: "scenario",
          question:
            "A batch job writes to Oracle but gets ORA-01795: maximum 1000 expressions in list. How do you fix?",
          hint: "Chunk size > 1000. Reduce chunk size or batch write with individual statements. Or split IN clause into batches of 1000.",
        },
        {
          id: "advanced-batch-s4",
          type: "scenario",
          question:
            "You need to read from REST API, transform, and write to DB. How do you implement a custom reader?",
          hint: "Implement ItemReader<T>, hold page/cursor state, call API per read() invocation. Or RestPagingItemReader. Handle paging in reader state.",
        },
        {
          id: "advanced-batch-s5",
          type: "scenario",
          question: "How do you monitor a Spring Batch job in production?",
          hint: "JobExplorer API, Spring Batch Admin (legacy), Actuator batch endpoint, DB tables (BATCH_JOB_EXECUTION), JobExecutionListener for alerts.",
        },
      ],
    },
  ],
};
