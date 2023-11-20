import { Sequelize } from "sequelize-typescript"
import Address from "../../@shared/domain/value-object/address.value-object"
import { ClientModel } from "../repository/client.model"
import ClientRepository from "../repository/client.repository"
import AddClientUseCase from "../usecase/add-client/add-client.usecase"
import ClientAdmFacade from "./client-adm.facade"
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory"

describe("Client Adm Facade test", () => {

    let sequelize: Sequelize
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true }
      })
  
      sequelize.addModels([ClientModel])
      await sequelize.sync()
    })
  
    afterEach(async () => {
      await sequelize.close()
    })
  
    it("should create a client", async () => {
  
      const repository = new ClientRepository();
      const addUsecase = new AddClientUseCase(repository);
      const facade = new ClientAdmFacade({
        addUsecase: addUsecase,
        findUsecase: undefined,
      });
  
      const input = {
        id: "1",
        name: "Lucian",
        email: "lucian@xpto.com",
        document: "1234-5678",
        address: new Address(
          "Rua 123",
          "99",
          "Casa Verde",
          "Criciúma",
          "SC",
          "88888-888",
        )
      }

      await facade.add(input)
  
      const client2 = await ClientModel.findAll();

      const client = await ClientModel.findOne({ where: { id: "1" } })

      console.log("client: " + client2[0].id);
  
    //   expect(client).toBeDefined()
    //   expect(client.id).toBe(input.id)
    //   expect(client.name).toBe(input.name)
    //   expect(client.email).toBe(input.email)
    //   expect(client.document).toBe(input.document)
    //   expect(client.street).toBe(input.address.street)
    })
  
    // it("should find a client", async () => {
  
    //   // const repository = new ClientRepository()
    //   // const addUsecase = new AddClientUseCase(repository)
    //   // const findUseCase = new FindClientUseCase(repository)
    //   // const facade = new ClientAdmFacade({
    //   //   addUseCase: addUsecase,
    //   //   findUseCase: findUseCase
    //   // })
  
    //   const facade = ClientAdmFacadeFactory.create()

    //   console.log(facade)
  
    //   const input = {
    //     id: "1",
    //     name: "Lucian",
    //     email: "lucian@xpto.com",
    //     document: "1234-5678",
    //     address: new Address(
    //       "Rua 123",
    //       "99",
    //       "Casa Verde",
    //       "Criciúma",
    //       "SC",
    //       "88888-888"
    //     )
    //   }
  
    //   await facade.add(input)
  
    //   const client = await facade.find({ id: "1" })
  
    //   expect(client).toBeDefined()
    //   expect(client.id).toBe(input.id)
    //   expect(client.name).toBe(input.name)
    //   expect(client.email).toBe(input.email)
    //   expect(client.document).toBe(input.document)
    //   expect(client.address.street).toBe(input.address.street)
    //   expect(client.address.number).toBe(input.address.number)
    //   expect(client.address.complement).toBe(input.address.complement)
    //   expect(client.address.city).toBe(input.address.city)
    //   expect(client.address.state).toBe(input.address.state)
    //   expect(client.address.zipCode).toBe(input.address.zipCode)
    // })
  })