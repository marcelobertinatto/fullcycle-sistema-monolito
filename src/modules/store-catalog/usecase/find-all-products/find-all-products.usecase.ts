import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";

export default class FindAllProductsUseCase implements UseCaseInterface {
    
    constructor(private productRespository: ProductGateway) {
        
    }
    
    async execute(): Promise<any> {
        const products = await this.productRespository.findAll();

        return {
            products: products.map((product) => ({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            })),
        }
    }

}