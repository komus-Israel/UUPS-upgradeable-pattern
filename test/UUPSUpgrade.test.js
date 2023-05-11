require("chai").use(require("chai-as-promised")).should()

const { getInitializeABI } = require("./helper")

const PROXY = artifacts.require("MyContractProxy")
const ImplementationV1 = artifacts.require("ImplementationV1")



contract ("UUPS upgrade", ()=>{

    /**
     * Deploy Implementation contract
     * Create an ABI of the initialize function of the implementation contract
     * Set this ABI in the constructor of the Proxy and deploy the proxy
     */

    let implementationV1

    let proxy;

    
    beforeEach(async()=>{
        const initializeImplementation = getInitializeABI()

        implementationV1 = await ImplementationV1.new()   //  deploy implementation
        proxy = await PROXY.new(implementationV1.address, initializeImplementation)                   //  deploy proxy
    })


    describe("Upgrade", ()=>{

        it("should set implementaion address in the proxy contract", async()=>{

            const getImplementation = await proxy.getImplementation()
            getImplementation.should.be.equal(implementationV1.address)

        })

    })

})