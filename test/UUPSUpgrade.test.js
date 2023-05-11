require("chai").use(require("chai-as-promised")).should()

const { getInitializeABI, getOwner } = require("./helper")

const PROXY = artifacts.require("MyContractProxy")
const ImplementationV1 = artifacts.require("ImplementationV1")
const ImplementationV2 = artifacts.require("ImplementationV2")



contract ("UUPS upgrade", ([owner, ])=>{

    /**
     * Deploy Implementation contract
     * Create an ABI of the initialize function of the implementation contract
     * Set this ABI in the constructor of the Proxy and deploy the proxy
     */

    let implementationV1
    let implementationV2

    let proxy;

    
    beforeEach(async()=>{
        const initializeImplementation = getInitializeABI()

        implementationV1 = await ImplementationV1.new()   //  deploy v1 implementation

        proxy = await PROXY.new(implementationV1.address, initializeImplementation)   //    set proxy to the v1                //  deploy proxy
    
        
    
    })


    describe("Setting Implementation", ()=>{


        describe("Version 1", ()=>{

            it("should set implementaion address in the proxy contract", async()=>{

                const getImplementation = await proxy.getImplementation()
                getImplementation.should.be.equal(implementationV1.address)
    
            })

        })

        describe("Version 2", ()=>{

            beforeEach(async()=>{
                implementationV2 = await ImplementationV2.new() //  deploy v2 implementation

                await proxy.upgradeTo(implementationV2.address) //  upgrade proxy's implementation to reference the new implementation
            })


            it("should set implementaion address in the proxy contract", async()=>{

                const getImplementation = await proxy.getImplementation()
                getImplementation.should.be.equal(implementationV2.address)
    
            })

        })

       

        // it("should return the owner of the contract", async()=>{
    

        //     const imp = await ImplementationV1.at(proxy.address)
        //     const _owner = await imp.getOwner()

        //     console.log(_owner)
        //     console.log(owner)

        //     console.log("Proxy before upgrade", proxy.address)


        //     const imp2 =  await ImplementationV2.at(proxy.address)
        //     console.log("Proxy after upgrade", proxy.address)

        //     const _owner2 =  await imp2.getOwner()

        //     console.log(_owner2)

        //     await imp2.setValue(90)


        //     const value = await imp2.getValue()

        //     console.log(value.toString())



        //     const value2 = await proxy.getValue()

        //     console.log(value2.toString())



            
        // })

    })

})