// Apache Kafka Interview Questions - 80 Total Questions
import { CategoryData } from "../types";

export const kafkaQuestions: CategoryData = {
  id: "kafka",
  name: "Apache Kafka",
  icon: "📨",
  color: "var(--purple)",
  description: "Event streaming platform - messaging, storage, processing",
  sections: [
    {
      id: "kafka-fundamentals",
      name: "15.1 Kafka Fundamentals",
      interviewQuestions: [
        {
          id: "kafka-fund-1",
          type: "interview",
          question: "What is Apache Kafka and what are its main use cases?",
          hint: "Distributed event streaming platform. Use cases: messaging, activity tracking, log aggregation, stream processing, event sourcing, metrics.",
        },
        {
          id: "kafka-fund-2",
          type: "interview",
          question: "Explain the difference between Kafka and traditional message queues?",
          hint: "Kafka: append-only log, persistent, pull-based, horizontal scaling. MQ: delete on consume, often push-based, vertical scaling.",
        },
        {
          id: "kafka-fund-3",
          type: "interview",
          question: "What are the core components of Kafka architecture?",
          hint: "Producer, Consumer, Broker, Topic, Partition, ZooKeeper/KRaft, Consumer Group, Offset.",
        },
        {
          id: "kafka-fund-4",
          type: "interview",
          question: "How does Kafka achieve high throughput?",
          hint: "Sequential disk I/O, zero-copy, batch processing, compression, partitioning, page cache usage.",
        },
        {
          id: "kafka-fund-5",
          type: "interview",
          question: "What is a Kafka topic and partition?",
          hint: "Topic: logical category. Partition: ordered sequence of records. Partitions enable parallelism.",
        },
        {
          id: "kafka-fund-6",
          type: "interview",
          question: "Explain Kafka's data retention and cleanup policies?",
          hint: "Time-based (retention.ms), size-based (retention.bytes), log compaction, delete policy.",
        },
      ],
      scenarioQuestions: [
        {
          id: "kafka-fund-s1",
          type: "scenario",
          question: "Cluster has 3 brokers, RF=3. One broker goes down. What happens?",
          hint: "Cluster continues. Leader election. One replica out-of-sync. No data loss if min.insync.replicas=2.",
        },
        {
          id: "kafka-fund-s2",
          type: "scenario",
          question: "Need to process 1M events/sec. How to design Kafka topic?",
          hint: "High partition count (100+), multiple consumers, tune batch size, compression, separate topics.",
        },
        {
          id: "kafka-fund-s3",
          type: "scenario",
          question: "Messages being duplicated. Causes and solutions?",
          hint: "Causes: crashes before commit, rebalance. Solutions: disable auto-commit, manual commit, idempotent consumers.",
        },
        {
          id: "kafka-fund-s4",
          type: "scenario",
          question: "Migrate from RabbitMQ to Kafka with zero downtime?",
          hint: "Dual-write: both systems, shift consumers gradually, monitor lag, decommission RabbitMQ.",
        },
        {
          id: "kafka-fund-s5",
          type: "scenario",
          question: "Cluster storage 80% full. Options?",
          hint: "Decrease retention, enable compression, add brokers, tiered storage, delete old topics.",
        },
        {
          id: "kafka-fund-s6",
          type: "scenario",
          question: "Implement exactly-once semantics (EOS)?",
          hint: "Transactions: enable.idempotence=true, transactional.id, beginTransaction/commit, isolation.level=read_committed.",
        },
      ],
    },
    {
      id: "kafka-producer",
      name: "15.2 Producers",
      interviewQuestions: [
        {
          id: "kafka-prod-1",
          type: "interview",
          question: "What are acknowledgment modes (acks)?",
          hint: "acks=0: no ack, acks=1: leader ack, acks=all: all ISR ack (strongest durability).",
        },
        {
          id: "kafka-prod-2",
          type: "interview",
          question: "How does partitioning work? What if no key specified?",
          hint: "With key: hash(key) % partitions. No key: round-robin or sticky partitioning.",
        },
        {
          id: "kafka-prod-3",
          type: "interview",
          question: "What is idempotent producer?",
          hint: "enable.idempotence=true. Sequence numbers per partition. Broker deduplicates. Prevents duplicate writes.",
        },
        {
          id: "kafka-prod-4",
          type: "interview",
          question: "Explain batching and linger.ms?",
          hint: "batch.size: max batch bytes. linger.ms: wait before send. Latency vs throughput trade-off.",
        },
        {
          id: "kafka-prod-5",
          type: "interview",
          question: "Purpose of buffer.memory?",
          hint: "Total memory for buffering before send. If full, send() blocks for max.block.ms. Default 32MB.",
        },
        {
          id: "kafka-prod-6",
          type: "interview",
          question: "How do Kafka transactions work?",
          hint: "Set transactional.id, initTransactions(), beginTransaction(), send, commitTransaction(). Atomic across partitions.",
        },
      ],
      scenarioQuestions: [
        {
          id: "kafka-prod-s1",
          type: "scenario",
          question: "Need guaranteed message ordering. Configuration?",
          hint: "Same key for related messages, max.in.flight.requests.per.connection=1 or idempotence.",
        },
        {
          id: "kafka-prod-s2",
          type: "scenario",
          question: "Producer slow, causing backpressure. Optimize?",
          hint: "Increase batch.size, linger.ms, compression, buffer.memory, more partitions, async send.",
        },
        {
          id: "kafka-prod-s3",
          type: "scenario",
          question: "Handle producer failures without duplicates?",
          hint: "Enable idempotence, retries=MAX, acks=all, transactions.",
        },
        {
          id: "kafka-prod-s4",
          type: "scenario",
          question: "Messages too large. Options?",
          hint: "Compress, split messages, increase max.request.size/message.max.bytes, external storage.",
        },
      ],
    },
    {
      id: "kafka-consumer",
      name: "15.3 Consumers",
      interviewQuestions: [
        {
          id: "kafka-cons-1",
          type: "interview",
          question: "What is Consumer Group? How does it enable scalability?",
          hint: "Group sharing workload. Each partition → one consumer in group. Scale by adding consumers (up to partition count).",
        },
        {
          id: "kafka-cons-2",
          type: "interview",
          question: "Auto commit vs manual commit?",
          hint: "Auto: commits every auto.commit.interval.ms. Manual: commitSync()/Async() for at-least/exactly-once.",
        },
        {
          id: "kafka-cons-3",
          type: "interview",
          question: "What happens during consumer rebalance?",
          hint: "Stop-the-world, partition reassignment. Minimize: tune max.poll.interval.ms, session.timeout.ms.",
        },
        {
          id: "kafka-cons-4",
          type: "interview",
          question: "Offset reset policies?",
          hint: "auto.offset.reset: earliest (start from beginning), latest (new only), none (exception).",
        },
        {
          id: "kafka-cons-5",
          type: "interview",
          question: "Exactly-once processing in consumers?",
          hint: "isolation.level=read_committed, manual commits, idempotent writes, or Kafka Streams.",
        },
      ],
      scenarioQuestions: [
        {
          id: "kafka-cons-s1",
          type: "scenario",
          question: "Consumer lagging. Diagnose and fix?",
          hint: "Check lag metric, add consumers, optimize processing, tune fetch.min.bytes, max.poll.records.",
        },
        {
          id: "kafka-cons-s2",
          type: "scenario",
          question: "Reprocess messages from 3 days ago?",
          hint: "consumer.seek() or offsetsForTimes(), or kafka-consumer-groups --reset-offsets.",
        },
        {
          id: "kafka-cons-s3",
          type: "scenario",
          question: "Consumer keeps rebalancing. Root cause?",
          hint: "Processing > max.poll.interval.ms. Increase it, reduce max.poll.records, optimize code.",
        },
        {
          id: "kafka-cons-s4",
          type: "scenario",
          question: "Implement dead letter queue (DLQ)?",
          hint: "Catch exceptions, send to DLQ topic with original topic/partition/offset/error.",
        },
      ],
    },
    {
      id: "kafka-monitoring",
      name: "15.4 Monitoring",
      interviewQuestions: [
        {
          id: "kafka-mon-1",
          type: "interview",
          question: "Key metrics to monitor?",
          hint: "UnderReplicatedPartitions, ISR, consumer lag, latency, bytes in/out, failed requests.",
        },
        {
          id: "kafka-mon-2",
          type: "interview",
          question: "How to monitor consumer lag?",
          hint: "Current vs log end offset. Tools: kafka-consumer-groups, JMX, Burrow, Datadog.",
        },
        {
          id: "kafka-mon-3",
          type: "interview",
          question: "Role of ZooKeeper (pre-KRaft)?",
          hint: "Metadata, leader election, controller election. KRaft removes ZooKeeper dependency.",
        },
        {
          id: "kafka-mon-4",
          type: "interview",
          question: "Rolling restart without downtime?",
          hint: "One broker at a time, wait for ISR catchup, controlled.shutdown.enable=true, RF≥2.",
        },
      ],
      scenarioQuestions: [
        {
          id: "kafka-mon-s1",
          type: "scenario",
          question: "UnderReplicatedPartitions > 0 alert. Troubleshoot?",
          hint: "Check broker health, disk, network, fetch lag, controller logs, ZooKeeper.",
        },
        {
          id: "kafka-mon-s2",
          type: "scenario",
          question: "Consumer lag growing. Identify slow consumer?",
          hint: "kafka-consumer-groups --describe, JMX metrics, profile code, check rebalancing.",
        },
        {
          id: "kafka-mon-s3",
          type: "scenario",
          question: "Upgrade 2.8 to 3.x with zero downtime?",
          hint: "Rolling: set inter.broker.protocol.version, upgrade one-by-one, update clients, update protocol.",
        },
        {
          id: "kafka-mon-s4",
          type: "scenario",
          question: "Backup and disaster recovery strategy?",
          hint: "MirrorMaker, tier to S3, backup ZK, config versioning, monitoring, runbooks.",
        },
      ],
    },
  ],
};
