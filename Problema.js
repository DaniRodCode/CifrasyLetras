/*!
 * Problema
 */
 
function Problema(valores, objetivo) {
	this.valores = valores;
	this.objetivo = objetivo;	
}

Problema.prototype.generarSolucion = function() {
	var cifras = new Array();
	
	for (var i=0; i<this.valores.length; i++)
		cifras.push(i);
	
	var bolsaValores = new Bolsa(cifras);
	var operadores = ["+","-","*","/"];

	var secuencia = new Array();
	
	for (var i=0; i<this.valores.length-1; i++) {
		secuencia.push(bolsaValores.sacar());
		secuencia.push(operadores[Math.floor(Math.random() * operadores.length)]);
		secuencia.push(bolsaValores.sacar());
		
		bolsaValores.meter(this.valores.length+i);		
	}
		
	return new Solucion(secuencia);
};


Problema.prototype.evaluar = function(solucion) {
	var v = this.valores.slice();
	var maximo = 0;
	
	for (var i=0; i<this.valores.length-1; i++) {	
		var operacion = solucion.operacion(i);
		var op1 = v[operacion[0]];
		var op2 = v[operacion[2]];
		var resultado = solucion.resultado(op1, operacion[1], op2);	
					
		v.push(resultado);	
	}
	
	for (var i=0; i<v.length; i++) {		
		if (v[i]<0) return 0;
		if (Math.floor(v[i]) != v[i]) return 0;
		var valor = 1-(Math.abs(this.objetivo - v[i])/this.objetivo);
	    if (maximo < valor) maximo = valor;
	}
	
	//console.log(v);
	return maximo;
}


Problema.prototype.masProximo = function(solucion) {
	var v = this.valores.slice();
	var maximo = 0;
	var valorMaximo = 0;
	
	for (var i=0; i<this.valores.length-1; i++) {	
		var operacion = solucion.operacion(i);
		var op1 = v[operacion[0]];
		var op2 = v[operacion[2]];
		var resultado = solucion.resultado(op1, operacion[1], op2);	
					
		v.push(resultado);	
	}
	
	for (var i=0; i<v.length; i++) {		
		if (v[i]<0) return 0;
		if (Math.floor(v[i]) != v[i]) return 0;
		var valor = 1-(Math.abs(this.objetivo - v[i])/this.objetivo);
	    if (maximo < valor) { 
			maximo = valor;
			valorMaximo = v[i];
		}
	}
	
	//console.log(v);
	return valorMaximo;
}




Problema.prototype.mostrar = function(solucion) {
	var v = this.valores.slice();
	var operaciones = new Array();
	var cadena = "";
	
	
	var pendientes = new Array();
	pendientes.push(this.masProximo(solucion));
	var metidas = new Array();
		
	while (pendientes.length != 0) {
		var valor = pendientes.pop();
		console.log("buscando:"+valor);
		
		for (var i=0; i<this.valores.length-1; i++) {	
			
			var repetida = false;
			for (j=0;j<metidas.length;j++)
				if (metidas[j] == i) repetida = true;
				
			if (repetida) continue;		
		
			var operacion = solucion.operacion(i);
			var op1 = v[operacion[0]];
			var op2 = v[operacion[2]];
			var resultado = solucion.resultado(op1, operacion[1], op2);	
			v.push(resultado);	
			
			if (resultado == valor) {
				if (operacion[0] >= this.valores.length) pendientes.push(op1);
				if (operacion[2] >= this.valores.length) pendientes.push(op2);

				operaciones.push("<div id='operacion'>" + op1 + operacion[1] + op2 + "=" + resultado + "</div>");
				metidas.push(i);				
			}
		}	
	 //console.log("pendientes:"+pendientes);	
	}	
	
	while(operaciones.length)
		cadena += operaciones.pop();	
	
	return cadena;
}
		

		

		
function Solucion(valores) {
		this.vector = valores;
}



Solucion.prototype.operacion = function(n) {
	return [this.vector[n*3], this.vector[n*3+1], this.vector[n*3+2]];
}


Solucion.prototype.resultado = function (v1, operacion, v2) {	
	switch (operacion) {
		case "+": return v1 + v2;
		case "-": return v1 - v2;
		case "*": return v1 * v2;
		case "/": return v1 / v2;
	}
}


