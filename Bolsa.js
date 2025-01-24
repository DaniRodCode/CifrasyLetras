/*!
 * Bolsa
 */
 
function Bolsa(valores) {        		
		this.vector = new Array();
		for (var i=0;i<valores.length;i++)
			this.vector.push(valores[i]);
}

Bolsa.prototype.sacar = function() {
		var n = Math.floor((Math.random() * this.vector.length));
		var valor = this.vector[n];
		this.vector.splice(n, 1);
		return valor;
};

Bolsa.prototype.meter = function(valor) {
		this.vector.push(valor);
};
