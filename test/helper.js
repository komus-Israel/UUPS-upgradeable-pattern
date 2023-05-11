const { abi: ImplementationABI }  =require("../build/contracts/ImplementationV1.json")


const getInitializeABI=()=>{

    const contract =  new web3.eth.Contract(ImplementationABI)
    console.log(contract)

}

module.exports = { getInitializeABI }