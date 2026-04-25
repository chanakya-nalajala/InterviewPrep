// Category mapping utility - determines category from question ID
// This avoids importing all question data in Dashboard

export const CATEGORY_INFO: Record<
  string,
  { icon: string; name: string; color: string }
> = {
  "java-core": { icon: "☕", name: "Java Core", color: "var(--amber)" },
  "java-collections": { icon: "📦", name: "Collections", color: "var(--blue)" },
  "java-concurrency": {
    icon: "⚡",
    name: "Concurrency",
    color: "var(--purple)",
  },
  "java-jvm": { icon: "🔧", name: "JVM & Memory", color: "var(--orange)" },
  "java-modern": { icon: "🚀", name: "Modern Java", color: "var(--cyan)" },
  "spring-core": { icon: "🍃", name: "Spring Core", color: "var(--green)" },
  "spring-boot": { icon: "🚀", name: "Spring Boot", color: "var(--lime)" },
  "spring-data": { icon: "💾", name: "Spring Data", color: "var(--teal)" },
  "spring-security": {
    icon: "🔒",
    name: "Spring Security",
    color: "var(--red)",
  },
  "spring-web": { icon: "🌐", name: "Spring Web", color: "var(--indigo)" },
  microservices: { icon: "🏗️", name: "Microservices", color: "var(--purple)" },
  angular: { icon: "🅰️", name: "Angular", color: "var(--red)" },
  kafka: { icon: "📨", name: "Apache Kafka", color: "var(--purple)" },
};

/**
 * Determine category from question ID pattern
 * This function uses ID prefixes to avoid loading all question data
 */
export function getCategoryFromQuestionId(questionId: string): string {
  // Java Core questions (java-str, java-oop, java-ex, java-gen, java-ref, java-ser)
  if (
    questionId.startsWith("java-str") ||
    questionId.startsWith("java-oop") ||
    questionId.startsWith("java-ex") ||
    questionId.startsWith("java-gen") ||
    questionId.startsWith("java-ref") ||
    questionId.startsWith("java-ser")
  ) {
    return "java-core";
  }

  // Java Collections (java-coll, java-map, java-eq, java-comp)
  if (
    questionId.startsWith("java-coll") ||
    questionId.startsWith("java-map") ||
    questionId.startsWith("java-eq") ||
    questionId.startsWith("java-comp")
  ) {
    return "java-collections";
  }

  // Java Concurrency (java-thread, java-sync, java-lock, java-atomic, java-exec, java-cf, java-dead)
  if (
    questionId.startsWith("java-thread") ||
    questionId.startsWith("java-sync") ||
    questionId.startsWith("java-lock") ||
    questionId.startsWith("java-atomic") ||
    questionId.startsWith("java-exec") ||
    questionId.startsWith("java-cf") ||
    questionId.startsWith("java-dead")
  ) {
    return "java-concurrency";
  }

  // Java JVM (java-jvm, java-mem, java-gc, java-class)
  if (
    questionId.startsWith("java-jvm") ||
    questionId.startsWith("java-mem") ||
    questionId.startsWith("java-gc") ||
    questionId.startsWith("java-class")
  ) {
    return "java-jvm";
  }

  // Modern Java (java-lambda, java-stream, java-opt, java-rec, java-vt, java-mod)
  if (
    questionId.startsWith("java-lambda") ||
    questionId.startsWith("java-stream") ||
    questionId.startsWith("java-opt") ||
    questionId.startsWith("java-rec") ||
    questionId.startsWith("java-vt") ||
    questionId.startsWith("java-mod")
  ) {
    return "java-modern";
  }

  // Spring questions by prefix
  if (questionId.startsWith("spring-boot")) return "spring-boot";
  if (
    questionId.startsWith("spring-data") ||
    questionId.startsWith("spring-jpa")
  )
    return "spring-data";
  if (questionId.startsWith("spring-sec")) return "spring-security";
  if (
    questionId.startsWith("spring-web") ||
    questionId.startsWith("spring-rest") ||
    questionId.startsWith("spring-mvc")
  )
    return "spring-web";
  if (questionId.startsWith("spring")) return "spring-core";

  // Microservices (ms-)
  if (questionId.startsWith("ms-")) return "microservices";

  // Angular (ng-)
  if (questionId.startsWith("ng-")) return "angular";

  // Kafka (kafka-)
  if (questionId.startsWith("kafka-")) return "kafka";

  // Default fallback
  return "java-core";
}
