const HelloSol = artifacts.require("HelloSol");

module.exports = function (deployer) {
  deployer.deploy(HelloSol);
};
