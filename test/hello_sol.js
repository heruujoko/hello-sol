const HelloSol = artifacts.require("HelloSol");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("HelloSol", function (/* accounts */) {
  it("should assert true and return string", async function () {
    const cont = await HelloSol.deployed();
    const expectation = "Hello World";
    const actual = await cont.hello();
    assert.equal(actual, expectation, "greeted with 'Hello, World!'");
  });
});

contract("HelloSol:setGreeting", function (/* accounts */) {
  it("should assert true and return custom string", async function () {
    const cont = await HelloSol.deployed();
    const expectation = "Good Morning";
    await cont.setGreeting(expectation);
    const actual = await cont.hello();
    assert.equal(actual, expectation, "greeted with custom");
  });
});

contract("HelloSol:owner()", function (accounts) {
  it("should return the contract owner", async function () {
    const cont = await HelloSol.deployed();
    const owner = await cont.getOwner();
    assert(owner, "contract owner");
  });

  it("should match the deployer", async function() {
    const cont = await HelloSol.deployed();
    const owner = await cont.getOwner();
    const expected = accounts[0];
    assert(owner, expected, "contract owner");
  });
});

contract("HelloSol:updateGreeting", function(accounts) {
  it("greeting cannot be modified by non-owner", async function() {
    const cont = await HelloSol.deployed();
    const expectation = "Good Morning";
    try {
      await cont.setGreeting(expectation, { from: accounts[1] });
    } catch (err) {
      const errorMessage = "Ownable: caller is not the owner"
      assert.equal(err.reason, errorMessage, "greeting should not update");
      return;
    }
    assert(false, "greeting should not update");
  });
});
