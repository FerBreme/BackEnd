 // CREACION DE LA CLASS
class ProductManager{
        constructor(){
            this.products = []
            this.nextId = 1
        }

// METODO PARA CREAR EL PRODUCTO CON LOS PARAMETROS REQUERIDOS
        addProduct(code, title, description, thumbnail, price, stock  ){

            //VALIDACION DE CAMPOS
            
            if(!code || !title || !description || !thumbnail || !price || !stock){
                console.log(`Todos los campos son obligatorios!`)
                return
            }
            
            //VALIDACION DE CODIGO DUPLICADO
            
            if(this.verifyCode(code)){
                console.log(`El codigo Ingresado ya existe!`)
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

            this.products.push(product);
            this.nextId++
        }
        
        //METODO PARA VERIFICAR CODIGO INGRESADO
        
        verifyCode(code){
            return this.products.some(product => product.code === code)
        }

        //OBTENER INFO DEL ARRAY

        getProducts(){
            return this.products
        }

        //METODO PARA FILTRAR PRODUCTO POR ID

        getProductById(id){
            const product = this.products.find(product => product.id === id);

            if(product){
                return product;
            } else{
                console.log(`404 Not Found`);
                        }
        }
    }
//
const manager = new ProductManager();

// PRODUCTO AGREGADO CON EXITO (2)

manager.addProduct(`CO001`, `Anillo`, `Anillo de plata con grabado interno`, `Imagen no encontrada`, `$3500`, `10 unidades`);
manager.addProduct(`CO002`, `reloj`, `Reloj pulsera con tiras de jean y ebilla de 1cm`, `imagen1.jpg`, `$4500`, `5 unidades`);

console.log(manager.getProducts());
console.log(manager.getProductById(1));

//***PRODUCTO RECHAZADO POR FALTA DE CAMPOS***

console.log(manager.addProduct(`CO003`, `Anillo2`, `Un nuevo Anillo`, `URL`, `$3800`));

//***PRODUCTO RECHAZADO POR CODIGO DUPLICADO***

console.log(manager.addProduct(`CO002`, `reloj2`, `Reloj nuevo`, `imagen2.jpg`, `$4500`, `3 unidades`));

