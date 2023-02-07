const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  candidate = event
    ? event?.partitionKey ??
      crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex")
    : candidate;

  candidate = candidate
    ? typeof candidate !== "string"
      ? JSON.stringify(candidate)
      : candidate
    : TRIVIAL_PARTITION_KEY;

  candidate =
    candidate.length > MAX_PARTITION_KEY_LENGTH
      ? crypto.createHash("sha3-512").update(candidate).digest("hex")
      : candidate;
  return candidate;
};
