const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the string 'partitionKey' when partitionKey isn't null", () => {
    const data = {
      partitionKey: "key1213",
    };
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe(data.partitionKey);
  });

  it("Returns the string 'partitionKey' when partitionKey is null", () => {
    const data = {};
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe(
      crypto.createHash("sha3-512").update(JSON.stringify(data)).digest("hex")
    );
  });
});
