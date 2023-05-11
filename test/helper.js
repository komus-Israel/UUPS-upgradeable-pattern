const { abi: ImplementationABI }  =require("../build/contracts/ImplementationV1.json")


const getInitializeABI=()=>{

    const contract =  new web3.eth.Contract(ImplementationABI)
    const initialize = contract.methods.initialize().encodeABI()
    return initialize


}

module.exports = { getInitializeABI }