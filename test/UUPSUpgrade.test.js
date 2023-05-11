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

            it("should return the address of the implementation contract owner", async()=>{
                const imp = await ImplementationV1.at(proxy.address)
                const _owner = await imp.getOwner()

                _owner.should.be.equal(owner, "It returns the address of the contract owner")
            })

        })

        describe("Version 2", ()=>{

            let imp2

            beforeEach(async()=>{
                implementationV2 = await ImplementationV2.new() //  deploy v2 implementation

                await proxy.upgradeTo(implementationV2.address) //  upgrade proxy's implementation to reference the new implementation
            
            
                imp2 =  await ImplementationV2.at(proxy.address)
            })


            it("should set implementaion address in the proxy contract", async()=>{

                const getImplementation = await proxy.getImplementation()
                getImplementation.should.be.equal(implementationV2.address)
    
            })

            it("should retain state of the contract owner after upgrade", async()=>{

                

                const _owner =  await imp2.getOwner()

                _owner.should.be.equal(owner, "It retains the state of the owner")

            })


            it("should execute the functions in the upgraded contract", async()=>{
        
                _value = 90
                await imp2.setValue(_value)


                const returnedValue = await imp2.getValue()

               Number(returnedValue).should.be.equal(_value, "It returned the value that was set")

                
            })

        })

       

       

    })

})