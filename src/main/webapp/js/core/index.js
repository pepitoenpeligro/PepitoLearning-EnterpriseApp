"use strict";

const BASE_URL  = 'http://localhost:8080';
const APP       = 'jpacruc';
const API       = 'webservices';


const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const formContainerParent = document.getElementById('form-container-parent');

const btnSinginup = document.getElementById('btn-signinup');
const formContainerGeneral = document.getElementById('form-container-parent');
const formContainerParentParent = document.getElementById('form-container-parent-parent');

const btnSignin = document.getElementById('btn-signin');
const btnSignup = document.getElementById('btn-signup');

const btnbtnTableBasic = document.getElementById('btn-table-basic');
const btnbtnTableStandard = document.getElementById('btn-table-standard');
const btnbtnTablePremium = document.getElementById('btn-table-premium');

const videoSigned = document.getElementById('video_parent_signedin');
const wave = document.getElementById('wave_video_parent');


const check = document.getElementById('check');
const checkBTN = document.getElementById('checkbtn');

const ulElemetns = document.getElementById('ul-events');

const closeBtn = document.getElementById('close-btn');


const tableParent = document.getElementById('table-parent');

const btnShoppingCart = document.getElementById('shoppingCartButton');
const btnAdmin = document.getElementById('adminButton');

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];



let formContainerGeneralInitialStatus = "none";





const keyListUsers = 'listUsers';
const keyLoged = 'userLoged';
let listUsers = [];


ulElemetns.addEventListener('click', () => {
	if (check.checked) {
		check.checked = false;
	}
})

signUpButton.addEventListener('click', () => {
	formContainerParent.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	formContainerParent.classList.remove("right-panel-active");
});

btnSinginup.addEventListener('click', () => {
	if (btnSinginup.innerText === "Logout") {
		logout();
		btnSinginup.innerText = "SignIn-Up";
		return;
	}

	if (formContainerGeneralInitialStatus === "none") {
		showSignInUpModal();
	} else {
		closeSignInUpModal();

	}
});














async function getProductsFromShoppingCart(){

	const email = localStorage.getItem(keyLoged);
	

	let r = await fetch(`${BASE_URL}/${APP}/${API}/shopcart/items`, {
		method: 'POST',
		mode: 'cors', headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body:JSON.stringify({email: email})

	});
	return r.json();
}



btnAdmin.addEventListener('click', () => {
	window.location.href = 'admin.html';
})

btnShoppingCart.addEventListener('click', () => {
	
	let response = getProductsFromShoppingCart();

	response.then((v) => {
		console.log("Api Rest devolvió:");
		console.log(v);

		modal.style.display = "block";
		let h = document.getElementById('shoppingCartBody');
		h.innerHTML= '';
		v.forEach( (item) => {
			let n1 = document.createElement('div');
			n1.className = "container__table";
				let n2 = document.createElement('div');
				n2.className="tab__table";
				let divTabHeaderTable = document.createElement('div');
				divTabHeaderTable.className = "tab-header__table";
					let nameTable = document.createElement('div');
						nameTable.className = "name__table";
						divTabHeaderTable.appendChild(nameTable);
						let h1nameTable = document.createElement('h1');
							h1nameTable.innerText = item[2];
							nameTable.appendChild(h1nameTable);
					let priceTable = document.createElement('div');
						priceTable.className="price__table"
						let pricetable = document.createElement('h2');
						pricetable.innerText=item[3]+" €";
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
						li.innerText=item[1];
					ul.appendChild(li);

				let divBut = document.createElement('div');
					divBut.className="add__table";
					let but = document.createElement('button');
						but.type="button"
						but.id="btn-table-basic"
						but.textContent="Removed!";
						but.addEventListener('click', () =>{
							console.log("Remove from Shopping Cart");
						});
					divBut.appendChild(but);
				n2.appendChild(divTabHeaderTable);
				n2.appendChild(separatorTable);
				n2.appendChild(ul);
				n2.appendChild(divBut);
			n1.appendChild(n2);
		h.appendChild(n1);


		});

	}).catch ((err) => {
		console.log(err);
	});

});

span.addEventListener('click', () =>{
	modal.style.display = "none";
});


























closeBtn.addEventListener('click', () => {
	hideAlert();
});

window.onclick = function(event) {
	if (event.target == modal) {
	  modal.style.display = "none";
	}
  }



function closeSignInUpModal() {
	formContainerGeneralInitialStatus = "none";
	formContainerGeneral.style.display = formContainerGeneralInitialStatus

}

function showSignInUpModal() {
	formContainerGeneralInitialStatus = "flex";
	formContainerGeneral.style.display = formContainerGeneralInitialStatus;
}






const l = document.getElementById('alert_button');
const c = document.getElementById('close-btn');
const msgContent = document.getElementById('alert-msg-content');
const alert = document.getElementById('alert');
// l.addEventListener('click', () => {
//     alert.classList.add("show");
//     alert.classList.remove("hide");
//     alert.classList.add("showAlert");
//     var msg = l.getAttribute('msg');
//     console.log(msg);

//     setTimeout(function() {
//         console.log("finn");
//         alert.classList.remove("show");
//         alert.classList.add("hide");
//     }, 8000);
// });


// c.addEventListener('click', () => {
//     alert.classList.remove("show");
//     alert.classList.add("hide");
// });

function showAlert() {
	alert.classList.add("show");
	alert.classList.remove("hide");
	alert.classList.add("showAlert");

}

function hideAlert() {
	alert.classList.remove("show");
	alert.classList.add("hide");
}


function sendMessage(msg) {
	msgContent.innerText = msg;
	alert.style.left = 300;
	alert.style.top = 600;

	alert.getBoundingClien


	alert.classList.add("show");
	alert.classList.remove("hide");
	alert.classList.add("showAlert");

	setTimeout(function() {
		alert.classList.remove("show");
		alert.classList.add("hide");
	}, 3000);
}

Array.prototype.inArray = function(comparer) {
	for (var i = 0; i < this.length; i++) {
		if (comparer(this[i])) return true;
	}
	return false;
};



Array.prototype.pushIfNotExist = function(element, comparer) {
	if (!this.inArray(comparer)) {
		this.push(element);
	}
};

// function initLocalStorage() {
//     let trialUser = {
//         name: 'Trial Person',
//         email: 'trial@faliatube.de',
//         pass: 'trialpass'
//     }

//     saveUser(trialUser);
// }


async function saveUser(user) {
	listUsers.push(user);
	localStorage.setItem(keyListUsers, JSON.stringify(listUsers));
	console.log("[saveUser]");
	console.log(user);

	let response = await fetch(`${BASE_URL}/${APP}/${API}/users/`, {
		method: 'POST',
		mode: 'cors', headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	});
}

function getUsers() {
	if (localStorage.getItem(keyListUsers)) {
		let list = JSON.parse(localStorage.getItem(keyListUsers));

		for (const i of list) {
			listUsers.pushIfNotExist(i, function(e) {
				return e.email === i.email;
			});

		}



		console.log("[localStorage] Users read:");
		console.log(listUsers);
	} else {
		console.log("No users found in localStorage")
	}
}

function login(email, password) {
	//localStorage.setItem(keyLoged, email);
	
}

function logout() {
    const user = localStorage.getItem(keyLoged);
    console.log(localStorage.getItem(keyLoged));
    sendMessage("Bye: " + user+ "!");
	localStorage.setItem(keyLoged, null);
	shoppingCartButton.classList.remove("showshoppingcart");
	shoppingCartButton.classList.add("hideshoppingcart");

	adminButton.classList.remove("showadminicon");
	adminButton.classList.add("hideadminicon");
	


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


window.addEventListener('load', function() {
	getUsers();
	getProducts().then((resp) => {
		renderProducts(resp);
	}).catch((err) => {
		console.log("[getProducts] catch");
		console.log(err);
	})
})

function renderProducts(content) {
    
    let tbParent = document.getElementById('container__table');
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
                    but.textContent="ORDER NOW!";
                    but.addEventListener('click', () =>{
                        buy(c.id);
                    });
                divBut.appendChild(but);
            
        
        
        
            n1.appendChild(divTabHeaderTable);
            n1.appendChild(separatorTable);
            n1.appendChild(ul);
            n1.appendChild(divBut);
        
        tbParent.appendChild(n1);
	});
}


async function buy(id){
    const email = localStorage.getItem(keyLoged);
    console.log("Comprando" + id + " desde" + email);

    let response = await fetch(`${BASE_URL}/${APP}/${API}/shopcart/item`, {
        method: 'POST',
        mode: 'cors', headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
        body: JSON.stringify({ email: email, idProducto: parseInt(id) })
    }).then((resp) => {
		console.log("[buy]");
		let data = resp.json();
        data.then((value) => {
			console.log(value);
			console.log(data);
		})
    }).catch((err) => {
        console.log("[buy]");
        console.log(err);
    });
    
}


async function doSignIn(email, password) {
	let r = await fetch(`${BASE_URL}/${APP}/${API}/users/login`, {
		method: 'POST',
		mode: 'cors', headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email: email, password: password })
	});
	return r.json();
}







btnSignin.addEventListener('click', () => {

	const email = document.getElementById('signin-email').value;
	const password = document.getElementById('signin-pass').value;

	doSignIn(email, password).then((r) => {
        console.log("[login]" + "OK");
		localStorage.setItem(keyLoged, email);
		console.log("Respuesta");
		console.log(r);
		if(r.admin === true){
			console.log("es admin");
			adminButton.classList.remove("hideadminicon");
			adminButton.classList.add("showadminicon");
		}else{
			console.log("NO es admin");
		}
		


        closeSignInUpModal()
        sendMessage('You are now logged in as: ' + email);
        document.getElementById('signin-email').value = "";
		btnSinginup.innerText = "Logout";
		shoppingCartButton.classList.remove('hideshoppingcart');
		shoppingCartButton.classList.add('showshoppingcart');
	document.getElementById('signin-pass').value = "";
	}).catch((err) => {
        console.log("[login]" + err);
        sendMessage('Sorry, we don\'t recognize you: ' + email);
    });
    
	
	
	

	//wave.innerHTML = '<div style="height: 150px; overflow: hidden;"><svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;"><path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style="stroke: none; fill: #128CFA;"></path></svg></div>';

	// }
	// }

	

});

btnSignup.addEventListener('click', () => {
	const name = document.getElementById('signup-name').value;
	const email = document.getElementById('signup-email').value;
	const password = document.getElementById('signup-pass').value;

	let contentNewUser = {
		name,
		email,
		password
	}
	saveUser(contentNewUser);

	// login(email,password);
	localStorage.setItem(keyLoged, email);

	closeSignInUpModal()

	btnSinginup.innerText = "Logout";

	document.getElementById('signup-name').value = "";
	document.getElementById('signup-email').value = "";
	document.getElementById('signup-pass').value = "";


	sendMessage('You are now from our family! ' + email);
});

