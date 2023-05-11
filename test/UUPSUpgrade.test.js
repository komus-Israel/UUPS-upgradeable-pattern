require("chai").use(require("chai-as-promised")).should()

const { getInitializeABI } = require("./helper")

const PROXY = artifacts.require("SimpleProxy")
const ImplementationV1 = artifacts.require("ImplementationV1")



contract ("UUPS upgrade", ()=>{

    /**
     * Deploy Implementation contract
     * Create an ABI of the initialize function of the implementation contract
     * Set this ABI in the constructor of the Proxy and deploy the proxy
     */

    //let implementationV1 = ImplementationV1.new()

    
    // beforeEach(()=>{

    // })


    describe("Upgrade", ()=>{

        it("should set ")

    })

})