
(function() {
 
		var numeroLetras = 9;
		var numeroCifras = 6;
		var maximoPalabrasEncontradas = 5;
		var tiempoPruebas = 30;
		var vocalesIniciales = "AOIIAOUOAEAOEOAOIIUAEOEOAIEOEAUAEAEAUAEIEUUOE";
		var consonantesIniciales = "FDLDMBRRPFMCBCXSLLDCGNDDCPCGHSHJMGBHDSPSSCCHCTTNRNRRSZYRTQSVNLCBDHBTSLNDCG"; // Permitir la ъ
		var cifrasIniciales = [	75, 4, 7, 7, 9, 100, 2,  2, 1, 9, 5, 4, 1, 6, 10, 50, 3, 6, 5, 3, 8, 25, 10, 8];

		var bolsaVocales;
		var bolsaConsonantes;
		var bolsaCifras;
		var cifras;		
		var letras;
		var numeroObjetivo;
		var diccionario;
		var tiempoActual;
		var reloj;


		$(document).ready(function() {

			var botonTitulo = $("#botonTitulo");

			botonTitulo.click(function (e) {
					$("#botonTitulo").fadeOut();
					$("#cabecera").fadeIn();
					$("#menuPrincipal").fadeIn();
				});

			$("#botonCifras").click(function (e) {
					$("#menuPrincipal").fadeOut();
					$("#pantallaCifras").fadeIn();
					mostrarTiempoCifras();
				    iniciarCifras();
				 });

			$("#botonLetras").click(function (e) {
					$("#menuPrincipal").fadeOut();
		 			$("#menuVocalConsonante").fadeIn();
					$("#pantallaLetras").fadeIn();
					$("#botonVocal").fadeIn();
					$("#botonConsonante").fadeIn();

					iniciarLetras();
				 });

			$("#botonVocal").click(function (e) {
				 if (faltanLetras()) {
					 sacarVocal();
					 if (!faltanLetras()) mostrarTiempoLetras();
					}
				});

			$("#botonConsonante").click(function (e) {
				 if (faltanLetras()) {
					 sacarConsonante();
					 if (!faltanLetras()) mostrarTiempoLetras();
					}
				});

			$("#pantallaLetras #botonVerPalabras").click(function (e) {
				$("#palabras").fadeOut();
				$("#pantallaLetras #botonVerPalabras").fadeOut("slow", function() {
					buscarPalabras();
					$("#palabras").fadeIn();
					});
				});

				
			$("#pantallaCifras #botonVerSolucion").click(function (e) {
				$("#solucion").fadeOut();
				$("#pantallaCifras #botonVerSolucion").fadeOut("slow", function() {
					$("#solucion").fadeIn();
					});
				});

				


			$("#pantallaCifras #botonVolver").click(function (e) {
				$("#pantallaCifras").fadeOut();
				$("#pantallaCifras #tiempo").fadeOut();
				$("#pantallaCifras #tiempo #barraProgreso").fadeOut();
				$("#pantallaCifras #tiempo #tiempoActual").fadeOut();
				$("#pantallaCifras #tiempo #barra").width("0%");
				$("#pantallaCifras #botonVolver").fadeOut();
				$("#pantallaCifras #botonVerSolucion").fadeOut();				
				$("#menuPrincipal").fadeIn();
			});

			$("#pantallaLetras #botonVolver").click(function (e) {
				$("#pantallaLetras").fadeOut();
				$("#pantallaLetras #tiempo").fadeOut();
				$("#pantallaLetras #tiempo #barraProgreso").fadeOut();
				$("#pantallaLetras #tiempo #tiempoActual").fadeOut();
				$("#pantallaLetras #tiempo #barra").width("0%");
				$("#pantallaLetras #botonVolver").fadeOut();
				$("#pantallaLetras #botonVerPalabras").fadeOut();
				$("#menuPrincipal").fadeIn();
			});


			cargarDiccionario();
			iniciarJuego();
		});


		function mostrarTiempoCifras() {
				$("#pantallaCifras #tiempo").fadeIn();
				$("#pantallaCifras #botonTiempo").fadeIn();
				$("#pantallaCifras #barraProgreso").fadeIn();
				$("#pantallaCifras #tiempo").on("click", clickTiempoCifras);
		}

		function clickTiempoCifras() {
				$("#pantallaCifras #tiempo").off("click");
				$("#pantallaCifras #tiempo #botonTiempo").fadeOut();
				 iniciarTiempoCifras();
				 buscarSolucion();				 
		}


		function mostrarTiempoLetras() {
				$("#botonVocal").fadeOut("slow");
				$("#botonConsonante").fadeOut("slow", function() {
					$("#pantallaLetras #tiempo").fadeIn();
					$("#pantallaLetras #botonTiempo").fadeIn();
					$("#pantallaLetras #barraProgreso").fadeIn();
					$("#pantallaLetras #tiempo").on("click", clickTiempoLetras);
				});
		}


		function clickTiempoLetras() {
				$("#pantallaLetras #tiempo").off("click");
				$("#pantallaLetras #tiempo #botonTiempo").fadeOut();
				 iniciarTiempoLetras();
		}



		function iniciarJuego() {
				$("#tiempo").fadeOut();
				$("#botonVolver").fadeOut();
		}

		function iniciarCifras() {
			bolsaCifras = new Bolsa(cifrasIniciales);
			cifras = [];
            $("#cifras").text("");
			$("#cifraObjetivo").text("");
			$("#solucion").text("");
			$("#solucion").fadeOut();
		
			sacarCifras(numeroCifras);
			mostrarNumeroACalcular();
		}

        function mostrarNumeroACalcular(){
			 numeroObjetivo = Math.floor((Math.random() * 900) + 100);
			$("#cifraObjetivo").append(numeroObjetivo);
		}

		function sacarCifras(cantidad) {
	        for (var i=0; i<cantidad; i++) {
				 var cifra = bolsaCifras.sacar();
				 cifras.push(cifra);
	             $("#cifras").append("<div id='cifra'>" + cifra + "</div>");
				}
		}

		function iniciarLetras() {
			bolsaVocales = new Bolsa(vocalesIniciales.split(""));
			bolsaConsonantes = new Bolsa(consonantesIniciales.split(""));
			letras = [];
			palabrasEncontradas = [];
            $("#letras").text("");
			$("#palabras").text("");
		}

		function sacarVocal() {
			var letra = bolsaVocales.sacar();
			letras.push(letra);
            $("#letras").append("<div id='letra'>" + letra + "</div>");
		}

		function sacarConsonante() {
			var letra = bolsaConsonantes.sacar();
			letras.push(letra);
            $("#letras").append("<div id='letra'>" + letra + "</div>");
		}

		function faltanLetras() {
			if (letras.length == numeroLetras) return false;
			else return true;
		}



		function cargarDiccionario() {
			$.get("./palabras.html", function( data ) {
				diccionario = new Array();
				var w = data.split("\n");

				for (var i=0; i<w.length; i++) {
					if (w[i].length <= numeroLetras && w[i].length > 2)
						diccionario.push(w[i]);
				}

			    console.log( diccionario.length + " palabras de "+numeroLetras + " letras cargadas." );
			});
		}
	
		
		function buscarSolucion() {		
			if (typeof buscarSolucion.iniciar == 'undefined' || buscarSolucion.iniciar == true) {
				console.log("buscarSolucion: "+cifras);
				buscarSolucion.iniciar = false;
				buscarSolucion.algoritmo = new Problema(cifras, numeroObjetivo);				
				buscarSolucion.maximo = 0;
				buscarSolucion.mejorSolucion = 0;	
				buscarSolucion.contador = 0;
			}
			
						
			for (i=0;i<10000;i++) {				
				if (tiempoActual == 0 || buscarSolucion.maximo == 1) {
					clearInterval(buscarSolucion.reloj);
					buscarSolucion.iniciar = true;
					$("#solucion").append(buscarSolucion.algoritmo.mostrar(buscarSolucion.mejorSolucion));
					console.log(buscarSolucion.algoritmo.evaluar(buscarSolucion.mejorSolucion));
					console.log("total intentos:" + buscarSolucion.contador);
					return;
				}

				buscarSolucion.contador++;
				var n = buscarSolucion.algoritmo.generarSolucion();
				var valor = buscarSolucion.algoritmo.evaluar(n);
				
				//console.log(buscarSolucion.maximo + ">" + valor);

				if (valor > buscarSolucion.maximo) {
				   buscarSolucion.maximo = valor;
				   buscarSolucion.mejorSolucion = n;				  
				   console.log(valor);
				}
			}
			
			console.log("intentos:" + buscarSolucion.contador);
			buscarSolucion.reloj = setTimeout(buscarSolucion, 100);
		}
		
		
	

		function buscarPalabras() {
			var palabrasEncontradas = new Array(numeroLetras);

			for (var i=0; i<numeroLetras; i++)
			    palabrasEncontradas[i] = new Array();

			for (var i=0; i<diccionario.length; i++) {
				if (palabraCorrecta(diccionario[i]))
					palabrasEncontradas[diccionario[i].length].push(diccionario[i]);
			}

	      var lista = new Array();
		  for (var i=0; i<palabrasEncontradas.length; i++)
		      lista = lista.concat(palabrasEncontradas[i]);

		  console.log("Encontradas " + lista.length + " palabras");

		  palabrasEncontradas = lista.slice(lista.length-maximoPalabrasEncontradas);

		  if (palabrasEncontradas.length == 0)
				  $("#palabras").append("<div id='palabra'>No se ha encontrado ninguna palabra</div>");
		  else {
			  for (var i=palabrasEncontradas.length-1; i>=0; i--)
				  $("#palabras").append("<div id='palabra'>" + palabrasEncontradas[i] + "</div>");
		  }
		}


		function palabraCorrecta(w) {
			var total = 0;
			var palabra = w.split('');

			if (letras.length<palabra.length) return false;

			for (var i=0; i<letras.length; i++) {
				for (var j=0; j<palabra.length; j++) {
					if (letras[i].valueOf() == palabra[j].valueOf()) {
						palabra[j] = "-";
						total++;
						break;
					}
				}
			 //console.log(letras[i] + " == " + palabra)
			}

			if (total == palabra.length) return true;
			else return false;
		}


		function iniciarTiempoCifras() {
			 tiempoActual = tiempoPruebas;
			$("#pantallaCifras #tiempo").off("click");
			$("#pantallaCifras #tiempo #barra").width("0%");
		    $("#pantallaCifras #tiempo #tiempoActual").text(tiempoActual);
			$("#pantallaCifras #tiempo #tiempoActual").fadeIn();
			 reloj = setInterval(actualizarTiempoCifras, 1000);
		}


		function actualizarTiempoCifras() {
		     tiempoActual--;
		     if (tiempoActual == 0) {
				 clearInterval(reloj);
				 finalizarTiempoCifras();
		      } else {
				$("#pantallaCifras #tiempo #tiempoActual").text(tiempoActual);
				$("#pantallaCifras #tiempo #barra").width((((tiempoPruebas-tiempoActual)/tiempoPruebas)*100)+"%");
			  }
		}

		function finalizarTiempoCifras() {
		     $("#pantallaCifras #tiempo #tiempoActual").text("Tiempo finalizado.");
			 $("#pantallaCifras #tiempo #barra").width("100%");
			 $("#pantallaCifras #botonVerSolucion").fadeIn();			 
			 $("#pantallaCifras #botonVolver").fadeIn();
		}


		function iniciarTiempoLetras() {
			 tiempoActual = tiempoPruebas;

			$("#pantallaLetras #tiempo #barra").width("0%");
		    $("#pantallaLetras #tiempo #tiempoActual").text(tiempoActual);
			$("#pantallaLetras #tiempo #tiempoActual").fadeIn();
			 reloj = setInterval(actualizarTiempoLetras, 1000);
		}


		function actualizarTiempoLetras() {
		     tiempoActual--;
		     if (tiempoActual == 0) {
				 clearInterval(reloj);
				 finalizarTiempoLetras();
		      } else {
				$("#pantallaLetras #tiempo #tiempoActual").text(tiempoActual);
				$("#pantallaLetras #tiempo #barra").width((((tiempoPruebas-tiempoActual)/tiempoPruebas)*100)+"%");
			  }
		}

		function finalizarTiempoLetras() {
		     $("#pantallaLetras #tiempo #tiempoActual").text("Tiempo finalizado.");
			 $("#pantallaLetras #tiempo #barra").width("100%");
			 $("#pantallaLetras #botonVerPalabras").fadeIn();
			 $("#pantallaLetras #botonVolver").fadeIn();
		}


 
}());
