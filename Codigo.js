// JavaScript source code

function factorial(Num1){
	  var fact = 1;
	
	for(var i=1;i<=Num1;i++){
		fact*=i;
	}
	return(fact);
	
}

function Combinacion(n,r){
	var comb;
	comb = factorial(n-1)/(factorial(r-1)*factorial(n-r));
	return(comb);
}	

document.getElementById("form").addEventListener("submit", (event)=>{
	event.preventDefault();
	var ensayo = parseInt(document.getElementById("x").value);
	var exito = parseInt(document.getElementById("k").value);
	var moneda = document.getElementById("moneda").value;
	var resultado;

	console.log("moneda: " + moneda);
	console.log("ensayo [x]: "+ ensayo);
	console.log("exito [k]: " + exito);
	resultado = (Combinacion(ensayo,exito)*(Math.pow(0.5,exito))*(Math.pow(0.5,(ensayo-exito))))*100;
	resultado = resultado.toFixed(4);
	const salida = "La probabilidad de que" + " se obtenga(n) "+exito+" "+moneda + " en el lanzamiento numero "+ensayo+" es de "+resultado+"%";
	
	if((ensayo-exito) >= 0){
		document.getElementById("resultado").innerHTML = `<h2>${salida}</h2>`
		simular(ensayo, moneda, exito);
		repetirSimulaciones(ensayo, moneda, exito, 10000);
	}else{
		document.getElementById("resultado").innerHTML = `<h2>Los ensayos deben ser mayor a los éxitos</h2>`
	}
	
});

const simular = (x)=>{
	let html = "";
	const salida = document.getElementById("salidas");
	const aguilaImg = "https://www.banxico.org.mx/multimedia/C_mon_10_pesosAnv.png";
	const solImg = "https://www.banxico.org.mx/multimedia/C_mon_10_resumen.png"

	let cuentaSol = 0;
	let cuentaAguila = 0;

	for(let i=0; i<x; i++){
		if(lanzarMoneda() === 0){
			cuentaSol++;
			html = html + `<div><p>Sol ${cuentaSol}</p><img src="${solImg}" alt="sol"></div>`;
		}else{
			cuentaAguila++;
			html = html + `<div><p>Aguila ${cuentaAguila}</p><img src="${aguilaImg}" alt="aguila"></div>`;
		}
	}	
	salida.innerHTML = html;
	document.getElementById("simulacion").removeAttribute("hidden");
}


const lanzarMoneda = ()=>{
	//0 -> Sol; 1-> Aguila
	return Math.round(Math.random());
}

const repetirSimulaciones = (x, moneda, k, numSim) =>{
	//se repite el experimento como si se diera a calcular 100 veces
	let cuentaExitosSol=0;
	let cuentaExitosAguila=0;

	for(let experimento=0; experimento<=numSim; experimento++){
		let cuentaSol = 0;
		let cuentaAguila = 0;
		for(let i=0; i<x; i++){
			if(lanzarMoneda() === 0){
				cuentaSol++;
			}else{
				cuentaAguila++;
			}
		}

		if(moneda==="Sol"){
			if(cuentaSol === k){
				cuentaExitosSol++;
			}
		}else{
			if(cuentaAguila === k){
				cuentaExitosAguila++;
			}
		}
	}

	if(moneda==="Sol"){
		let resultado = (cuentaExitosSol*100/numSim)/(x/k);
		resultado = resultado.toFixed(4);
		const text = `<h2>Se simuló el experimento ${numSim} veces, de las cuales ${cuentaExitosSol} veces se cumplió 
		que el sol numero ${k} fue en el lanzamiento ${x} -> ${resultado}%</h2>`
		document.getElementById("comprobacion").innerHTML = text;
	}else{
		let resultado = (cuentaExitosAguila*100/numSim)/(x/k);
		resultado = resultado.toFixed(4);
		const text = `<h2>Se simuló el experimento ${numSim} veces, de las cuales ${cuentaExitosAguila} veces se cumplió 
		que el Águila numero ${k} fue en el lanzamiento ${x} -> ${resultado}%</h2>`
		document.getElementById("comprobacion").innerHTML = text;
	}
}

document.getElementById("simular").addEventListener("click", (event)=>{

	var ensayo = parseInt(document.getElementById("x").value);
	var exito = parseInt(document.getElementById("k").value);
	var moneda = document.getElementById("moneda").value;
	const numSim = parseInt(document.getElementById("numSim").value);
	repetirSimulaciones(ensayo, moneda, exito, numSim);	
})
