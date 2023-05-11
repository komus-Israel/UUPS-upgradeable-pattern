const { abi: ImplementationABI }  =require("../build/contracts/ImplementationV1.json")


const getInitializeABI=()=>{

    const contract =  new web3.eth.Contract(ImplementationABI)
    const initialize = contract.methods.initialize().encodeABI()
    return initialize


}


const getOwner=()=>{

    const contract =  new web3.eth.Contract(ImplementationABI)
    const owner = contract.methods.getOwner().encodeABI()
    return owner


}

module.exports = { getInitializeABI, getOwner }