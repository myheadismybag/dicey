const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log('Deploying contracts with account: ', deployer.address);
  console.log('Account balance: ', accountBalance.toString());

  const contractFactory = await hre.ethers.getContractFactory('DiceRoller');
  const contract = await contractFactory.deploy(
    "0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9", 
    "0xa36085F69e2889c224210F603D836748e7dC0088", 
    "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4", 
    hre.ethers.utils.parseEther('0.1')
  );

  await contract.deployed();
  console.log('Contract address: ', contract.address);

  const data = await contract.getAllUsers();
  console.log('Data: ', JSON.stringify(data));

  const result = await contract.rollDice("0x7971E1ce39A78E89137a69752a25Fc85aA65971A");
  console.log('Result: ', JSON.stringify(result));

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();