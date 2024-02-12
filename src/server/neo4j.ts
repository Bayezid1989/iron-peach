import neo4j, { ManagedTransaction } from "neo4j-driver";
import type { Query } from "neo4j-driver-core/types/types";

export const driver = neo4j.driver(
  process.env.NEO4J_URI!,
  neo4j.auth.basic(process.env.NEO4J_USERNAME!, process.env.NEO4J_PASSWORD!),
);

export async function readNeo4j<T>(
  cypher: Query,
  params?: Parameters<ManagedTransaction["run"]>[1],
) {
  // 1. Open a session
  const session = driver.session();

  try {
    // 2. Execute a Cypher Statement
    const res = await session.executeRead((tx) => tx.run(cypher, params));

    // 3. Process the Results
    const values = res.records.map((record) => record.toObject());

    return values as T[];
  } finally {
    // 4. Close the session
    await session.close();
  }
}

export async function writeNeo4j(
  cypher: Query,
  params?: Parameters<ManagedTransaction["run"]>[1],
) {
  // 1. Open a session
  const session = driver.session();

  try {
    // 2. Execute a Cypher Statement
    const res = await session.executeWrite((tx) => tx.run(cypher, params));

    // 3. Process the Results
    const values = res.records.map((record) => record.toObject());

    return values;
  } finally {
    // 4. Close the session
    await session.close();
  }
}
