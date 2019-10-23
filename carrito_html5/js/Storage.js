
//Añadir nuevo libro al carrito
function addItem(isbn, titulo, autor, precio) {
	if (localStorage.getItem(isbn) == null) {
		var object = { 'titulo' : titulo, 'autor' : autor, 'precio' : precio, 'cantidad' : 1 };
		localStorage.setItem(isbn, JSON.stringify(object));
	} else {
		var libro = JSON.parse(localStorage.getItem(isbn));
		cant = parseInt(libro.cantidad,10) + 1;
		var object = { 'titulo' : titulo, 'autor' : autor, 'precio' : precio, 'cantidad' : cant };
		localStorage.setItem(isbn, JSON.stringify(object));
	}
	document.getElementById('numero').innerHTML = localStorage.length;
}

//Pinta el dígito del carro de la compra
function numCarro() {
	document.getElementById('numero').innerHTML = localStorage.length;
}

//Pinta el carro de la compra
function pintar() {
	if (CheckBrowser()) {
		numCarro();
		var key = "";
		var list = "<thead class='thead-light'>";
		list += "<tr><th>ISBN</th><th>Título</th><th>Autor</th><th>Precio</th><th>Cantidad</th></tr>\n";
		list += "</thead>";
		var i = 0;
		total = 0;
		//for more advance feature, you can set cap on max items in the cart
		for (i = 0; i <= localStorage.length-1; i++) {
			key = localStorage.key(i);
			var libro = JSON.parse(localStorage.getItem(key));
			list += "<tr><td>" + key + "</td>\n"
					+"<td>" + libro.titulo + "</td>\n"
					+"<td>" + libro.autor + "</td>\n"
					+"<td>" + libro.precio + "</td>\n"
					+"<td>" + libro.cantidad + "</td></tr>\n";
			total += libro.precio * libro.cantidad;
		}
		list += "<tr><td>TOTAL</td><td colspan='4'><strong>" + total + " €</strong></td></tr>";

		//if no item exists in the cart
		if (list == "<tr><th>ISBN</th><th>Cantidad</th></tr>\n") {
			list += "<tr><td><i>...</i></td>\n<td><i>...</i></td></tr>\n";
		}
		//bind the data to html table
		//you can use jQuery too....
		document.getElementById('list').innerHTML = list;
	} else {
		alert('No soporta HTML 5 y no puedes manejar este carro de la compra.');
	}
}

//------------------------------------------------------------------------------
//toma lo que hay en localstorage y lo manda por Ajax a comprar.php, donde se hace la compra del pedido
function Comprar() {

	var libros = new Array();
	//Sacar todos los elementos del carro en Localstorage
	for (i = 0; i <= localStorage.length-1; i++) {
		key = localStorage.key(i);
		var libro = JSON.parse(localStorage.getItem(key));
		libros.push(libro);
	}

	//Mandarlos por Ajax para que se haga el pedido en PHP (BBDD)
	$.ajax({
		type: "POST",
		url: "comprar.php",         
		data:  {data: libros},
		success: function(data) {
		   $('#pedido').html(data);
		   ClearAll();
		}
	 });
}


//------------------------------------------------------------------------------
//change an existing key=>value in the HTML5 storage
function ModifyItem() {
	var name1 = document.forms.ShoppingList.name.value;
	var data1 = document.forms.ShoppingList.data.value;
	//check if name1 is already exists
	
//check if key exists
			if (localStorage.getItem(name1) !=null)
			{
			  //update
			  localStorage.setItem(name1,data1);
			  document.forms.ShoppingList.data.value = localStorage.getItem(name1);
			}
		
	
	pintar();
}
//-------------------------------------------------------------------------
//delete an existing key=>value from the HTML5 storage
function RemoveItem() {
	var name = document.forms.ShoppingList.name.value;
	document.forms.ShoppingList.data.value = localStorage.removeItem(name);
	doShowAll();
}
//-------------------------------------------------------------------------------------
//restart the local storage
function ClearAll() {
	localStorage.clear();
	pintar();
}


/*
 =====> Checking the browser support
 //this step may not be required as most of modern browsers do support HTML5
 */
 //below function may be redundant
function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		// we can use localStorage object to store data
		return true;
	} else {
			return false;
	}
}
//-------------------------------------------------
/*
You can extend this script by inserting data to database or adding payment processing API to shopping cart..
*/