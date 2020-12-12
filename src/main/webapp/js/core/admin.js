const BASE_URL  = 'http://localhost:8080';
const APP       = 'jpacruc';
const API       = 'webservices';



const formAddProduct = document.getElementById('formAddProduct');
const btnBack = document.getElementById('btn-Back');


formAddProduct.addEventListener('submit', (event) => {
    // event.preventDefault();
   
    console.log(document.querySelector('#title_product_add').value);
    console.log(document.querySelector('#description_product_add').value);
    console.log(document.querySelector('#price_product_add').value);

    addProduct(
        document.querySelector('#title_product_add').value,
        document.querySelector('#description_product_add').value,
        parseFloat(document.querySelector('#price_product_add').value)
    )
});


btnBack.addEventListener('click', (ev) => {
    window.location='index.html';
})


window.addEventListener('load', function() {
	
	getProducts().then((resp) => {
        renderProducts(resp);
        

        // BORRAR ANTES DE ENTREGAR
        getLogUser().then( (res) => {
            console.log("[getLogUser]");
            console.log(res);
        }).catch( (err) => {
            console.log("[getLogUser]");
            console.log(err);
        });


        getLogProducts().then( (res) => {
            console.log("[getLogProducts]");
            console.log(res);
        }).catch( (err) => {
            console.log("[getLogProducts]");
            console.log(err);
        });


        getLogCart().then( (res) => {
            console.log("[getLogCart]");
            console.log(res);
        }).catch( (err) => {
            console.log("[getLogCart]");
            console.log(err);
        });

        renderLogUser();
        renderLogProduct();
        renderLogCart();



	}).catch((err) => {
		console.log("[getProducts] catch");
		console.log(err);
	})
})


function renderLogUser(){

    getLogUser().then( (res) => {
        console.log("[getLogUser]");
        console.log(res);
        let tbParent = document.getElementById('ctluser');

        res.forEach((v) =>{
            console.log(v);
            let tr = document.createElement('tr');
            const [ _ ,timestamp, value] = v.description.split('#');

            let tdTimestamp = document.createElement('td');
            let d = new Date(timestamp);
            tdTimestamp.innerHTML = d.toUTCString();
            let tdValue = document.createElement('td');
            tdValue.innerHTML = value;

            tr.appendChild(tdTimestamp);
            tr.appendChild(tdValue);
            tbParent.appendChild(tr);
        })
    }).catch( (err) => {
        console.log("[getLogUser]");
        console.log(err);
    });
}



function renderLogProduct(){

    getLogProducts().then( (res) => {
        console.log("[getLogProducts]");
        console.log(res);
        let tbParent = document.getElementById('ctlproduct');

        res.forEach((v) =>{
            console.log(v);
            let tr = document.createElement('tr');
            const [ _ ,timestamp, value] = v.description.split('#');

            let tdTimestamp = document.createElement('td');
            let d = new Date(timestamp);
            tdTimestamp.innerHTML = d.toUTCString();
            let tdValue = document.createElement('td');
            tdValue.innerHTML = value;

            tr.appendChild(tdTimestamp);
            tr.appendChild(tdValue);
            tbParent.appendChild(tr);
        })
    }).catch( (err) => {
        console.log("[getLogProducts]");
        console.log(err);
    });
}


function renderLogCart(){

    getLogCart().then( (res) => {
        console.log("[getLogCart]");
        console.log(res);
        let tbParent = document.getElementById('ctlcart');

        res.forEach((v) =>{
            console.log(v);
            let tr = document.createElement('tr');
            const [ _ ,timestamp, value] = v.description.split('#');

            let tdTimestamp = document.createElement('td');
            let d = new Date(timestamp);
            tdTimestamp.innerHTML = d.toUTCString();
            let tdValue = document.createElement('td');
            tdValue.innerHTML = value;

            tr.appendChild(tdTimestamp);
            tr.appendChild(tdValue);
            tbParent.appendChild(tr);
        })
    }).catch( (err) => {
        console.log("[getLogCart]");
        console.log(err);
    });
}

async function getLogUser(){
    let response = await fetch(`${BASE_URL}/${APP}/${API}/logs/users`, {
		method: 'GET',
		mode: 'cors', headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});
	return response.json();
}



async function getLogProducts(){
    let response = await fetch(`${BASE_URL}/${APP}/${API}/logs/products`, {
		method: 'GET',
		mode: 'cors', headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});
	return response.json();
}


async function getLogCart(){
    let response = await fetch(`${BASE_URL}/${APP}/${API}/logs/cart`, {
		method: 'GET',
		mode: 'cors', headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});
	return response.json();
}


async function getProducts() {
	// Genetare over => tableParent
	let response = await fetch(`${BASE_URL}/${APP}/${API}/products`, {
		method: 'GET',
		mode: 'cors', headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});
	return response.json();
}

// Añadir un producto
async function addProduct(name, description, price){
    console.log("voy a enviar");
    console.log(JSON.stringify({name, description, price}));
    let response = await fetch(`${BASE_URL}/${APP}/${API}/products/`,{
        method: 'POST',
        mode: 'cors', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, description, price})
    }).then((result) => {
        console.log("Resultado de la operacion: " + result);
        location.reload();
    }).catch((err) => {
        console.log("Error: " + err);
    })
}

// Borrar un producto
async function remove(id){
    console.log("Me llamaron desde: " + id);
    let response = await fetch(`${BASE_URL}/${APP}/${API}/products/`+id, {
        method: 'DELETE',
        mode: 'cors', headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
    }).then((result) => {
        console.log("Resultado de la operacion: " + result);
        location.reload();
    }).catch((err) => {
        console.log("Error: " + err);
    })
}

function renderProducts(content) {
    
    let tbParent = document.getElementById('container__table__admin');
	content.forEach((c) => {
        console.log(c);

        let n1 = document.createElement('div');
        n1.className="tab__table";
            let divTabHeaderTable = document.createElement('div');
            divTabHeaderTable.className = "tab-header__table";
                let nameTable = document.createElement('div');
                    nameTable.className = "name__table";
                    divTabHeaderTable.appendChild(nameTable);
                    let h1nameTable = document.createElement('h1');
                        h1nameTable.innerText = c.name;
                        nameTable.appendChild(h1nameTable);
                let priceTable = document.createElement('div');
                    priceTable.className="price__table"
                    let pricetable = document.createElement('h2');
                    pricetable.innerText=c.price+" €";
                    priceTable.appendChild(pricetable);
            divTabHeaderTable.appendChild(priceTable);

            let separatorTable = document.createElement('div');
                separatorTable.className="separator__table";
                    let hr = document.createElement('hr');
                separatorTable.appendChild(hr);

            let ul = document.createElement('ul');
                ul.className="list__table";
                let li = document.createElement('li');
                    li.className="line_table";
                    li.innerText=c.description;
                ul.appendChild(li);

            let divBut = document.createElement('div');
                divBut.className="add__table";
                let but = document.createElement('button');
                    but.type="button"
                    but.id="btn-table-basic"
                    but.textContent="Delete";
                    but.addEventListener('click', () =>{
                        deleteProduct(c.id);
                    });
                divBut.appendChild(but);
            
        
        
        
            n1.appendChild(divTabHeaderTable);
            n1.appendChild(separatorTable);
            n1.appendChild(ul);
            n1.appendChild(divBut);
        
        tbParent.appendChild(n1);
	});
}

function deleteProduct(id){
    console.log("@todo borrar producto por id. Llamar a la api (que para eso está)");
    remove(id);
}