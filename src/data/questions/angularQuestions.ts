import { CategoryData } from "../types";

export const angularQuestions: CategoryData = {
  id: "angular",
  name: "14. Angular Framework",
  icon: "🅰️",
  color: "var(--red)",
  description:
    "Components, DI, RxJS, Signals, Forms, Routing, State, Performance, Testing, Advanced",
  sections: [
    {
      id: "ng-fundamentals",
      name: "14.1 Fundamentals & Components",
      interviewQuestions: [
        {
          id: "ng-fund-1",
          type: "interview",
          question:
            "What is Angular's component architecture and how does data flow?",
          hint: "Tree of components. Data flows down via @Input(). Events flow up via @Output() (EventEmitter). @ViewChild for direct reference. Services for cross-component.",
        },
        {
          id: "ng-fund-2",
          type: "interview",
          question:
            "What are Angular lifecycle hooks and in what order do they fire?",
          hint: "ngOnChanges → ngOnInit → ngDoCheck → ngAfterContentInit → ngAfterContentChecked → ngAfterViewInit → ngAfterViewChecked → ngOnDestroy.",
        },
        {
          id: "ng-fund-3",
          type: "interview",
          question:
            "What is the difference between a Component and a Directive?",
          hint: "Component = directive + template. Directive = behavior without template. Structural directives (*ngIf, *ngFor) modify DOM structure. Attribute directives modify appearance.",
        },
        {
          id: "ng-fund-4",
          type: "interview",
          question: "What are Standalone Components (Angular 14+)?",
          hint: "No NgModule needed. standalone: true in decorator, imports directly in component. Simplifies architecture, enables better tree-shaking, required in Angular 17+ default.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ng-fund-s1",
          type: "scenario",
          question:
            "A parent component passes data to a deeply nested child. Prop-drilling becomes messy. How do you solve this?",
          hint: "Shared service with Subject/BehaviorSubject, @Input with @ContentChild, dependency injection, or Signal-based state (Angular 16+).",
        },
        {
          id: "ng-fund-s2",
          type: "scenario",
          question:
            "A component renders a large list but scrolling is choppy. How do you optimize?",
          hint: "trackBy in *ngFor, virtual scrolling (@angular/cdk), OnPush change detection, pagination/infinite scroll, avoid complex template expressions.",
        },
        {
          id: "ng-fund-s3",
          type: "scenario",
          question:
            "A component is destroyed but memory usage keeps growing. What's the likely issue?",
          hint: "Observable subscriptions not unsubscribed (memory leak). Fix: takeUntilDestroyed() (Angular 16+), async pipe (auto-unsubscribes), Subject + takeUntil(destroy$) in ngOnDestroy.",
        },
        {
          id: "ng-fund-s4",
          type: "scenario",
          question:
            "How do you dynamically create and insert a component at runtime?",
          hint: "ViewContainerRef.createComponent(ComponentClass) (Angular 13+, simplified API). Inject ViewContainerRef in host, pass inputs, manage lifecycle.",
        },
        {
          id: "ng-fund-s5",
          type: "scenario",
          question:
            "Two sibling components need to share state that changes frequently. What's your approach?",
          hint: "Shared service with BehaviorSubject/Signal, both inject it. Parent as mediator (less ideal for deep trees). NgRx for complex app-wide state.",
        },
        {
          id: "ng-fund-s6",
          type: "scenario",
          question:
            "A component template has complex logic with multiple *ngIf and pipe transformations. How do you clean this up?",
          hint: "Compute in component class (not template), use @Pipe for transformations, ngSwitch for multiple conditions, extract sub-components.",
        },
      ],
    },
    {
      id: "ng-di",
      name: "14.2 Dependency Injection",
      interviewQuestions: [
        {
          id: "ng-di-1",
          type: "interview",
          question:
            "How does Angular's hierarchical dependency injection work?",
          hint: "Injector tree mirrors component tree. Child can override parent provider. Resolution walks up the tree. Module injectors, element injectors.",
        },
        {
          id: "ng-di-2",
          type: "interview",
          question:
            "What is the difference between providedIn: 'root' and providing in a module?",
          hint: "'root': singleton in root injector, lazy-loaded when first injected (tree-shaking friendly). Module-provided: singleton per module, not tree-shakeable.",
        },
        {
          id: "ng-di-3",
          type: "interview",
          question:
            "What are useClass, useValue, useFactory, and useExisting in providers?",
          hint: "useClass = DI creates instance. useValue = provide literal value/object. useFactory = factory function (can use DI deps). useExisting = alias for another token.",
        },
        {
          id: "ng-di-4",
          type: "interview",
          question: "What is an InjectionToken and when do you use it?",
          hint: "Type-safe token for non-class dependencies (config, primitives). new InjectionToken<string>('API_URL'). Avoids string-based tokens.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ng-di-s1",
          type: "scenario",
          question:
            "You need different implementations of a Logger service in dev and prod. How?",
          hint: "Abstract Logger token, ConsoleLogger and RemoteLogger implementations. Provide in AppModule based on environment via useFactory + environment.production.",
        },
        {
          id: "ng-di-s2",
          type: "scenario",
          question:
            "A singleton service maintains state that leaks between tests. How do you reset it?",
          hint: "TestBed.resetTestingModule() between tests (expensive). Or design service to be stateless, or use TestBed.overrideProvider() to replace with fresh mock.",
        },
        {
          id: "ng-di-s3",
          type: "scenario",
          question:
            "A service needs configuration values from a backend API before it can initialize. How do you handle this in Angular?",
          hint: "APP_INITIALIZER token with a factory function returning a Promise. Angular waits for Promise to resolve before app bootstraps.",
        },
        {
          id: "ng-di-s4",
          type: "scenario",
          question:
            "Two lazy-loaded modules each provide the same service. Will they share the instance?",
          hint: "No — each lazy module gets its own injector instance. If you want sharing: provide in root or forRoot() pattern to ensure single instance.",
        },
        {
          id: "ng-di-s5",
          type: "scenario",
          question:
            "How do you inject a value (API base URL) from environment into a service without global variable pollution?",
          hint: "InjectionToken<string>, provide in AppModule as { provide: API_URL, useValue: environment.apiUrl }, inject with @Inject(API_URL).",
        },
      ],
    },
    {
      id: "ng-rxjs",
      name: "14.3 RxJS & Reactive Programming",
      interviewQuestions: [
        {
          id: "ng-rxjs-1",
          type: "interview",
          question:
            "What is the difference between Subject, BehaviorSubject, ReplaySubject, and AsyncSubject?",
          hint: "Subject: no initial, multicast. BehaviorSubject: current value to late subscribers. ReplaySubject: N last values. AsyncSubject: only last value on complete.",
        },
        {
          id: "ng-rxjs-2",
          type: "interview",
          question:
            "What is the difference between switchMap, mergeMap, concatMap, and exhaustMap?",
          hint: "switchMap: cancel previous. mergeMap: parallel, all. concatMap: serial, one at a time. exhaustMap: ignore new while current runs. Critical for HTTP calls.",
        },
        {
          id: "ng-rxjs-3",
          type: "interview",
          question: "What are cold vs hot observables?",
          hint: "Cold: starts on subscribe (HTTP calls, interval). Each subscriber gets own execution. Hot: already running (mouse events, Subject). Shared execution.",
        },
        {
          id: "ng-rxjs-4",
          type: "interview",
          question:
            "How do you unsubscribe from Observables to prevent memory leaks?",
          hint: "async pipe (auto), takeUntilDestroyed() (Angular 16+), takeUntil(destroy$) pattern, Subscription.unsubscribe() in ngOnDestroy.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ng-rxjs-s1",
          type: "scenario",
          question:
            "A search box triggers API calls on every keystroke. How do you optimize?",
          hint: "debounceTime(300) + distinctUntilChanged() + switchMap(query => http.get(...)). Cancels previous call if new input arrives.",
        },
        {
          id: "ng-rxjs-s2",
          type: "scenario",
          question:
            "Three independent API calls must all complete before rendering. How?",
          hint: "forkJoin([obs1, obs2, obs3]) — emits when all complete. All must complete (won't work if any never complete). combineLatest for ongoing streams.",
        },
        {
          id: "ng-rxjs-s3",
          type: "scenario",
          question:
            "A combineLatest in your component fires unexpectedly on every minor emission. How do you reduce emissions?",
          hint: "debounceTime, distinctUntilChanged, throttleTime. Or restructure — maybe withLatestFrom is better for your case (get snapshot, not continuous).",
        },
        {
          id: "ng-rxjs-s4",
          type: "scenario",
          question:
            "An HTTP call in switchMap should retry 3 times on error before failing. How?",
          hint: "switchMap(q => http.get(q).pipe(retry(3), catchError(e => of([])))).",
        },
        {
          id: "ng-rxjs-s5",
          type: "scenario",
          question:
            "You share an HTTP call result among multiple components. How do you avoid duplicate HTTP requests?",
          hint: "shareReplay(1) on the observable. Or store in service's BehaviorSubject (cache). AsyncSubject to share single response.",
        },
        {
          id: "ng-rxjs-s6",
          type: "scenario",
          question:
            "A stream emits errors in production silently swallowing them. How do you add global error handling?",
          hint: "catchError at stream level, global ErrorHandler for uncaught, log to monitoring. Never let stream die silently — re-emit or log and rethrow.",
        },
      ],
    },
    {
      id: "ng-signals",
      name: "14.4 Signals (Angular 16+)",
      interviewQuestions: [
        {
          id: "ng-sig-1",
          type: "interview",
          question:
            "What are Signals in Angular and what problem do they solve?",
          hint: "Fine-grained reactive primitives. signal(), computed(), effect(). No Zone.js needed. Synchronous, predictable, automatic dependency tracking. Solves change detection overhead.",
        },
        {
          id: "ng-sig-2",
          type: "interview",
          question:
            "What is the difference between signal(), computed(), and effect()?",
          hint: "signal: writable reactive value. computed: derived (auto-recomputes when deps change, lazy, memoized). effect: side effect that re-runs when deps change.",
        },
        {
          id: "ng-sig-3",
          type: "interview",
          question: "How do Signals compare to RxJS Observables?",
          hint: "Signals: sync, always have value, simpler for state. Observables: async, events over time, powerful operators. toSignal() / toObservable() bridges both.",
        },
        {
          id: "ng-sig-4",
          type: "interview",
          question:
            "What is input() in Angular 17+ and how does it replace @Input()?",
          hint: "input() = signal-based input. input.required() for required. Returns InputSignal<T>. Works with signal graph, no decorator needed in modern Angular.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ng-sig-s1",
          type: "scenario",
          question:
            "You have a component with complex derived state calculated from multiple inputs. How do Signals simplify this?",
          hint: "Replace multiple @Input + manual ngOnChanges recalculation with computed(() => derived(a(), b(), c())). Auto-updates, cached, no manual subscription.",
        },
        {
          id: "ng-sig-s2",
          type: "scenario",
          question:
            "An effect() in your component updates another signal. This causes an infinite loop. How do you fix?",
          hint: "Avoid writing to signals inside effects (circular dependency). Use untracked() to read without tracking. Restructure to computed() instead.",
        },
        {
          id: "ng-sig-s3",
          type: "scenario",
          question:
            "How do you migrate from BehaviorSubject service state to Signals?",
          hint: "Replace BehaviorSubject<T> with signal<T>(), expose as readonly via .asReadonly(), replace .next() with .set() or .update(). Remove subscriptions.",
        },
        {
          id: "ng-sig-s4",
          type: "scenario",
          question:
            "A child component needs to notify the parent when an internal signal changes. How?",
          hint: "output() (Angular 17+, signal-based) or EventEmitter. Or lift state to parent. effect(() => parent.notify(childSignal())) if shared service.",
        },
        {
          id: "ng-sig-s5",
          type: "scenario",
          question:
            "How do you use Signals with reactive forms? Any challenges?",
          hint: "toSignal(formControl.valueChanges) to bridge. Forms are still RxJS-based. Signal-based forms not yet native. effect() to sync form value to signal state.",
        },
        {
          id: "ng-sig-s6",
          type: "scenario",
          question:
            "Describe the change detection difference between Signals and Zone.js-based change detection.",
          hint: "Zone.js patches async APIs, triggers CD for any async event (over-checking). Signals: only components with changed signal inputs/computeds re-render. More precise, faster.",
        },
      ],
    },
    {
      id: "ng-forms",
      name: "14.5 Forms",
      interviewQuestions: [
        {
          id: "ng-forms-1",
          type: "interview",
          question:
            "What is the difference between Template-Driven and Reactive Forms?",
          hint: "Template-driven: two-way binding, simple, less testable. Reactive: explicit model in TS, more control, easier to test, dynamic forms, sync/async validators.",
        },
        {
          id: "ng-forms-2",
          type: "interview",
          question:
            "What is FormBuilder and what are FormGroup, FormControl, and FormArray?",
          hint: "FormBuilder: factory to reduce boilerplate. FormGroup: keyed group. FormControl: single value. FormArray: dynamic list of controls.",
        },
        {
          id: "ng-forms-3",
          type: "interview",
          question: "How do you implement custom validators in Reactive Forms?",
          hint: "Sync: function (control: AbstractControl): ValidationErrors | null. Async: returns Observable<ValidationErrors | null> or Promise. Register in FormControl.",
        },
        {
          id: "ng-forms-4",
          type: "interview",
          question: "What is updateOn: 'blur' | 'change' | 'submit'?",
          hint: "Controls when validation triggers and model updates. blur reduces API calls for async validators. submit for form-wide validation on submit only.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ng-forms-s1",
          type: "scenario",
          question:
            "A dynamic survey form needs to add/remove questions at runtime. How do you implement this?",
          hint: "FormArray for questions. push(new FormGroup(...)) to add, removeAt(index) to remove. *ngFor over formArray.controls with formGroupName='i'.",
        },
        {
          id: "ng-forms-s2",
          type: "scenario",
          question:
            "An email field has an async validator checking uniqueness via API. Calls fire on every keystroke. How do you fix?",
          hint: "debounceTime inside the async validator on the valueChanges. Or set updateOn: 'blur'. distinctUntilChanged() to skip unchanged values.",
        },
        {
          id: "ng-forms-s3",
          type: "scenario",
          question:
            "Two fields are interdependent (password + confirm password). How do you validate at the group level?",
          hint: "Add cross-field validator at FormGroup level, not individual controls. Check group.get('password')?.value === group.get('confirm')?.value.",
        },
        {
          id: "ng-forms-s4",
          type: "scenario",
          question:
            "A form should mark all controls as touched when the submit button is clicked (to show all errors). How?",
          hint: "form.markAllAsTouched() (Angular 8+). Then check form.invalid to block submission. Errors display only when touched || dirty.",
        },
        {
          id: "ng-forms-s5",
          type: "scenario",
          question:
            "How do you pre-populate a reactive form from an API response asynchronously?",
          hint: "form.patchValue(data) (partial) or form.setValue(data) (must match all fields). Call after API response. reset(data) to clear dirty/touched state too.",
        },
        {
          id: "ng-forms-s6",
          type: "scenario",
          question:
            "Form controls have complex nested structure and manual setValue is error-prone. How do you enforce type safety?",
          hint: "Strictly typed forms (Angular 14+): FormControl<string>, FormGroup<{name: FormControl<string>}>. TypeScript catches shape mismatches at compile time.",
        },
      ],
    },
    {
      id: "ng-routing",
      name: "14.6 Routing",
      interviewQuestions: [
        {
          id: "ng-routing-1",
          type: "interview",
          question:
            "What is lazy loading in Angular routing and why is it important?",
          hint: "Load feature modules/components only when route is activated. loadChildren: () => import('./feature').then(m => m.FeatureModule). Reduces initial bundle size.",
        },
        {
          id: "ng-routing-2",
          type: "interview",
          question: "What are Route Guards and what types exist?",
          hint: "CanActivate, CanActivateChild, CanDeactivate, CanMatch, Resolve. Block navigation based on conditions (auth, unsaved changes, data prefetch).",
        },
        {
          id: "ng-routing-3",
          type: "interview",
          question: "What is a Route Resolver?",
          hint: "Pre-fetches data before component is instantiated. Prevents flicker of empty state. resolve: { data: MyResolver }. Component accesses via ActivatedRoute.data.",
        },
        {
          id: "ng-routing-4",
          type: "interview",
          question:
            "What is the difference between RouterLink and Router.navigate()?",
          hint: "RouterLink: declarative, template binding. Router.navigate(): programmatic (after action). Both support absolute/relative paths, query params, fragments.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ng-routing-s1",
          type: "scenario",
          question:
            "A user has unsaved form changes and tries to navigate away. How do you prompt them?",
          hint: "CanDeactivate guard. Check form.dirty, prompt with window.confirm() or custom modal. Return boolean | Observable<boolean>.",
        },
        {
          id: "ng-routing-s2",
          type: "scenario",
          question:
            "An app has 50 routes. Initial load is slow. How do you optimize routing configuration?",
          hint: "Lazy load all feature routes. PreloadingStrategy (selective preloading for high-probability routes). Route-level code splitting.",
        },
        {
          id: "ng-routing-s3",
          type: "scenario",
          question:
            "Implement role-based route protection where admins can access /admin/** but regular users cannot.",
          hint: "CanActivate guard. Inject AuthService, check user role. Return true or router.navigate(['/forbidden']). Apply to parent route to cover all children.",
        },
        {
          id: "ng-routing-s4",
          type: "scenario",
          question:
            "A resolver fetches user data but it may fail. How do you handle resolver errors?",
          hint: "catchError in resolver returning EMPTY (navigation completes but component data is empty) or redirect to error page. Router event NavigationError for global handling.",
        },
        {
          id: "ng-routing-s5",
          type: "scenario",
          question:
            "How do you share state between two sibling routes (e.g., a filter set in route A should persist in route B)?",
          hint: "Query params (visible in URL, shareable), shared service, app state management (NgRx/Signal). URL params are best for bookmarkable state.",
        },
        {
          id: "ng-routing-s6",
          type: "scenario",
          question: "Explain how CanMatch differs from CanActivate.",
          hint: "CanMatch: prevents route from matching at all (router tries next route). CanActivate: route matches but navigation blocked (redirect or stay). CanMatch for feature flags.",
        },
      ],
    },
    {
      id: "ng-state",
      name: "14.7 State Management",
      interviewQuestions: [
        {
          id: "ng-state-1",
          type: "interview",
          question:
            "What are the different state management approaches in Angular?",
          hint: "Services + BehaviorSubject (simple), Signals (reactive, built-in), NgRx (Redux pattern, complex), Akita, NGXS, ComponentStore (local NgRx).",
        },
        {
          id: "ng-state-2",
          type: "interview",
          question: "What are the core NgRx building blocks?",
          hint: "Store (single state tree), Actions (describe events), Reducers (pure state transitions), Effects (side effects — API calls), Selectors (memoized state queries).",
        },
        {
          id: "ng-state-3",
          type: "interview",
          question:
            "What is a Selector in NgRx and why is memoization important?",
          hint: "createSelector() — derived state from store. Memoized: recalculates only when input state changes. Prevents unnecessary re-renders. Compose selectors.",
        },
        {
          id: "ng-state-4",
          type: "interview",
          question:
            "What is NgRx ComponentStore and when would you use it over the global store?",
          hint: "Local state management tied to component lifecycle. Simpler than global store for component-level state. Auto-cleanup on component destroy.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ng-state-s1",
          type: "scenario",
          question:
            "A shopping cart state is needed across many components. Should you use NgRx or a service?",
          hint: "Service with Signal or BehaviorSubject for medium complexity. NgRx if: complex state transitions, time-travel debugging, multiple async flows, team scale.",
        },
        {
          id: "ng-state-s2",
          type: "scenario",
          question:
            "An NgRx effect makes an API call. The call fails. How do you handle the error without crashing the effect stream?",
          hint: "catchError inside switchMap returning of(SomeAction.failure({error})). Never let the outer Observable error — effects must never complete/error.",
        },
        {
          id: "ng-state-s3",
          type: "scenario",
          question:
            "NgRx store is growing complex. How do you organize it across a large feature-heavy app?",
          hint: "Feature state per module (lazy-loaded). StoreModule.forFeature(). Separate action/reducer/selector/effect files. createFeature() (NgRx 12+) reduces boilerplate.",
        },
        {
          id: "ng-state-s4",
          type: "scenario",
          question: "How do you test NgRx effects?",
          hint: "provideMockActions(), provideMockStore(), dispatch action via subject, assert dispatched actions. jasmine-marbles or jest for async effect testing.",
        },
        {
          id: "ng-state-s5",
          type: "scenario",
          question:
            "A page loads data but navigating away and back re-fetches it every time. How do you cache with NgRx?",
          hint: "Check store selector in effect before API call. switchMap(() => store.select(selector).pipe(take(1), switchMap(cached => cached ? of(loadSuccess(cached)) : http.get()))). Or NgRx EntityAdapter.",
        },
      ],
    },
    {
      id: "ng-performance",
      name: "14.8 Performance Optimization",
      interviewQuestions: [
        {
          id: "ng-perf-1",
          type: "interview",
          question:
            "What is OnPush change detection strategy and when should you use it?",
          hint: "Checks only when @Input references change or events fire. Immutable inputs required. Big perf boost for presentational components. Default in modern Angular with Signals.",
        },
        {
          id: "ng-perf-2",
          type: "interview",
          question: "How do you optimize Angular bundle size?",
          hint: "Lazy loading, tree-shaking (standalone components), Ahead-of-Time compilation, budgets in angular.json, differential loading, source maps only in dev.",
        },
        {
          id: "ng-perf-3",
          type: "interview",
          question:
            "What is Ahead-of-Time (AOT) compilation vs Just-in-Time (JIT)?",
          hint: "AOT: templates compiled at build time, faster startup, smaller bundle, catches errors early. JIT: compile in browser (dev mode). Always use AOT for production.",
        },
        {
          id: "ng-perf-4",
          type: "interview",
          question: "What is Ivy and what benefits does it bring?",
          hint: "Angular 9+ rendering engine. Smaller bundles, faster compilation, better debugging, locality principle, tree-shaking. Replaces View Engine.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ng-perf-s1",
          type: "scenario",
          question:
            "Change detection runs too frequently causing performance issues. How do you diagnose which components are the problem?",
          hint: "Angular DevTools profiler. ChangeDetectorRef.detach() manually. enableDebugTools() + ng.profiler.timeChangeDetection(). Check OnPush candidates.",
        },
        {
          id: "ng-perf-s2",
          type: "scenario",
          question:
            "A large table (1000 rows) renders slowly. Scrolling is choppy. Optimize it.",
          hint: "Virtual scrolling (@angular/cdk/scrolling), pagination, OnPush change detection, trackBy function in *ngFor, avoid complex template expressions.",
        },
        {
          id: "ng-perf-s3",
          type: "scenario",
          question: "An app has a main.js bundle of 5MB. How do you reduce it?",
          hint: "Lazy loading all routes, analyze with webpack-bundle-analyzer, remove unused dependencies, switch to date-fns from moment, tree-shake lodash, differential loading.",
        },
        {
          id: "ng-perf-s4",
          type: "scenario",
          question:
            "A pipe executes on every change detection even though inputs haven't changed. How do you fix?",
          hint: "Pure pipes (pure: true, default) are memoized. Impure pipes run every CD. Make pipe pure and return new reference only when needed.",
        },
        {
          id: "ng-perf-s5",
          type: "scenario",
          question:
            "How do you implement progressive web app (PWA) features in Angular?",
          hint: "ng add @angular/pwa. Service worker for offline support, caching strategy in ngsw-config.json, app shell, installability.",
        },
        {
          id: "ng-perf-s6",
          type: "scenario",
          question:
            "First Contentful Paint (FCP) is slow. What techniques improve initial render speed?",
          hint: "SSR (Angular Universal), preloading, inline critical CSS, optimize images (lazy load), reduce initial bundle (lazy routes), HTTP/2, CDN.",
        },
      ],
    },
    {
      id: "ng-testing",
      name: "14.9 Testing",
      interviewQuestions: [
        {
          id: "ng-test-1",
          type: "interview",
          question:
            "What is the difference between TestBed and shallow component testing?",
          hint: "TestBed: full Angular environment (DI, templates, directives). Shallow: test component in isolation (mock children as NO_ERRORS_SCHEMA). Shallow is faster.",
        },
        {
          id: "ng-test-2",
          type: "interview",
          question:
            "How do you test a component with async data (Observables)?",
          hint: "fakeAsync() + tick(), async() + whenStable(), or done() callback. Subscribe in test and assert. Use marbles for complex Observable testing.",
        },
        {
          id: "ng-test-3",
          type: "interview",
          question: "What is the purpose of ComponentFixture?",
          hint: "Wrapper around component for testing. detectChanges() triggers CD, debugElement for DOM queries, componentInstance for component access.",
        },
        {
          id: "ng-test-4",
          type: "interview",
          question: "How do you mock a service in Angular tests?",
          hint: "TestBed.overrideProvider() or providers: [{ provide: MyService, useValue: mockService }]. Jasmine spies for method mocking.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ng-test-s1",
          type: "scenario",
          question:
            "A component calls an HTTP service in ngOnInit. How do you test it?",
          hint: "HttpClientTestingModule, inject HttpTestingController, mock request with expectOne(url).flush(data). Assert component state after flush.",
        },
        {
          id: "ng-test-s2",
          type: "scenario",
          question:
            "How do you test that clicking a button emits an @Output event?",
          hint: "Subscribe to output in test (component.myOutput.subscribe(val => expect(val).toBe(...))), trigger click via debugElement.nativeElement.click().",
        },
        {
          id: "ng-test-s3",
          type: "scenario",
          question: "A directive manipulates DOM. How do you test this?",
          hint: "Create host component in test with directive applied. Query debugElement by directive. Assert DOM changes (classes, attributes, styles).",
        },
        {
          id: "ng-test-s4",
          type: "scenario",
          question: "How do you test NgRx effects?",
          hint: "provideMockActions() with ReplaySubject. Dispatch action, subscribe to effect$, assert output action. Use jasmine-marbles for timing.",
        },
        {
          id: "ng-test-s5",
          type: "scenario",
          question:
            "A route guard calls an auth service. How do you unit test the guard?",
          hint: "Mock AuthService, provide in TestBed, call guard.canActivate() directly. Assert return value (true/false/UrlTree). No need for full router.",
        },
        {
          id: "ng-test-s6",
          type: "scenario",
          question:
            "How do you achieve high test coverage without brittle tests?",
          hint: "Test behavior not implementation. Avoid testing private methods. Use Page Object pattern for complex templates. Focus on user interactions.",
        },
      ],
    },
    {
      id: "ng-advanced",
      name: "14.10 Advanced Topics",
      interviewQuestions: [
        {
          id: "ng-adv-1",
          type: "interview",
          question:
            "What is Angular Universal and why use Server-Side Rendering?",
          hint: "Renders Angular on the server. Benefits: SEO (crawlers see content), faster First Contentful Paint, social media previews. @nguniversal/express-engine.",
        },
        {
          id: "ng-adv-2",
          type: "interview",
          question: "What are Angular Elements?",
          hint: "Package Angular components as Web Components (custom elements). Use Angular components in non-Angular apps or CMS. @angular/elements + createCustomElement().",
        },
        {
          id: "ng-adv-3",
          type: "interview",
          question: "What is Zone.js and how does it work?",
          hint: "Patches async APIs (setTimeout, Promise, events) to detect changes. Triggers change detection automatically. Can disable for more control (Signals/manual CD).",
        },
        {
          id: "ng-adv-4",
          type: "interview",
          question: "What is Incremental Hydration (Angular 16+)?",
          hint: "Progressive hydration of SSR-rendered content. Parts of the app become interactive incrementally. Deferrable views (@defer). Reduces Time to Interactive.",
        },
      ],
      scenarioQuestions: [
        {
          id: "ng-adv-s1",
          type: "scenario",
          question:
            "You implement SSR but some third-party libraries use window/document and cause errors. How do you handle this?",
          hint: "Platform checks: isPlatformBrowser(platformId). Inject PLATFORM_ID. Lazy load browser-only code. Use afterNextRender() (Angular 16+).",
        },
        {
          id: "ng-adv-s2",
          type: "scenario",
          question:
            "An Angular Element (custom element) needs to communicate with its parent non-Angular app. How?",
          hint: "Inputs via setAttribute(), outputs via addEventListener(). Document.querySelector() to get element reference. Dispatch CustomEvent for outputs.",
        },
        {
          id: "ng-adv-s3",
          type: "scenario",
          question:
            "You want to disable Zone.js for better performance. What changes are needed?",
          hint: "provideExperimentalZonelessChangeDetection() (Angular 17+). Use Signals for reactivity. Manual ChangeDetectorRef.markForCheck(). Async pipe still works.",
        },
        {
          id: "ng-adv-s4",
          type: "scenario",
          question:
            "Implement a custom structural directive that behaves like *ngIf but with a fade animation.",
          hint: "@Directive with TemplateRef + ViewContainerRef. createEmbeddedView() to render, clear() to remove. Add Angular animations trigger on insert/remove.",
        },
        {
          id: "ng-adv-s5",
          type: "scenario",
          question:
            "How do you implement internationalization (i18n) in Angular?",
          hint: "@angular/localize, i18n attributes in templates, ng extract-i18n, build per locale (--localize flag), or runtime translation (ngx-translate library).",
        },
        {
          id: "ng-adv-s6",
          type: "scenario",
          question:
            "A large Angular workspace has 20 projects. Build times are slow. How do you optimize?",
          hint: "Nx workspace for computation caching, incremental builds, affected command. Parallel builds, build budgets, separate library packages, lazy load features.",
        },
      ],
    },
  ],
};
