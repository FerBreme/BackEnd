const fs = require("fs");

// CREACION DE LA CLASS
class ProductManager{
        constructor(path){
            this.products = []
            this.nextId = 1
            this.path = path;
        }
        //OBTENER INFO DEL ARRAY

        async getProducts(){
            try {
                if(fs.existsSync(this.path)){
                    const productsFile = await fs.promises.readFile(this.path, "utf-8");
                    const products = JSON.parse(productsFile);
                    return products
                } else{
                    return this.products
                }
            } catch (error) {
                console.log(error)
            }
        }
// METODO PARA CREAR EL PRODUCTO CON LOS PARAMETROS REQUERIDOS
        async addProduct(code, title, description, thumbnail, price, stock  ){
            try {
                const productsFile = await this.getProducts();
                            //VALIDACION DE CAMPOS
            
            if(!code || !title || !description || !thumbnail || !price || !stock){
                console.log(`Todos los campos son obligatorios!`)
                return
            }
            
            //VALIDACION DE CODIGO DUPLICADO
            const  verifyCode =  async (code) => await productsFile.some(product => product.code === code)
        
            
            if( await verifyCode(code)){
                console.log(`El codigo Ingresado ya existe!`)
                return
            }

            //DATOS DEL PRODUCTO

            const product = {
                id : this.nextId,
                title,
                description,
                thumbnail,
                price,
                stock,
                code
            }
            
            //AGREGAR PRODUCTO NUEVO AL ARRAY

            productsFile.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
            this.nextId++
            } 
            catch (error) {
                console.log(error);
            }

        //METODO PARA VERIFICAR CODIGO INGRESADO
        

        }
        




        //METODO PARA FILTRAR PRODUCTO POR ID

        async getProductById(id){
            try {
                const productsFile = await this.getProducts();
                const product = productsFile.find(product => product.id === id);

                if(product){
                    return product;
                } else{
                    console.log(`404 Not Found`);
                            }
            } catch (error) {
                console.log({message: "error"});
            }

        }

        // MOODIFICAR DATOS DE UN PRODUCTO

        async updateProd (updated, prodId){
            try {
                const products = await this.getProducts();
                const index = products.findIndex(prod => prod.id === prodId);
                
                if(index != -1){
                    products[index] = {...updated, ...products[index]}
                    await fs.promises.writeFile(this.path, JSON.stringify(products));
                    console.log (`product modified`);

                     } else{
                        console.log("product not found");
                     }

            } catch (error) {
                console.log(error)
            }

        }

        // ELIMINAR UN PRODUCTO

        async deleteProd(id){

            try {
                const products = await this.getProducts();
                const prodIndex = products.findIndex(prod => prod.id === id);
                if(prodIndex != -1){
                    products.splice(prodIndex, 1);
                    await fs.promises.writeFile(this.path, JSON.stringify(products));
                    console.log("product deleted.")
                    return
                } else{
                    console.log("product not found");
                    
                } 
            } catch (error) {
                console.log(error);
            }

        }
    }
//
const manager = new ProductManager("./products.json");

const test = async ()=>{
    // PRODUCTO AGREGADO CON EXITO (2)

    await manager.addProduct(`CO001`, `Anillo`, `Anillo de plata con grabado interno`, `Imagen no encontrada`, `$3500`, `10 unidades`);
    await manager.addProduct(`CO002`, `reloj`, `Reloj pulsera con tiras de jean y ebilla de 1cm`, `imagen1.jpg`, `$4500`, `5 unidades`);

    const products = await manager.getProducts();
    console.log(products);

    const prodId = await manager.getProductById(1);
    console.log(prodId);

    //***PRODUCTO RECHAZADO POR FALTA DE CAMPOS***

    console.log( await manager.addProduct(`CO003`, `Anillo2`, `Un nuevo Anillo`, `URL`, `$3800`));

    //***PRODUCTO RECHAZADO POR CODIGO DUPLICADO***

    console.log(await manager.addProduct(`CO002`, `reloj2`, `Reloj nuevo`, `imagen2.jpg`, `$4500`, `3 unidades`));

    //***  PRODUCTO ELIMINADO  ****/


   // console.log(await manager.deleteProd(1));

   // const products2 = await manager.getProducts();
    //console.log(products2);
}

test();

