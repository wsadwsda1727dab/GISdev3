function calculate(){
	var a = document.getElementById('a').value;
	var b = document.getElementById('b').value;
	var t = document.getElementById('t').value;
	var c;
	if(t=='+'){//+
		c = Number(a)+Number(b);
	}
	else if(t=='-'){//-
		c = Number(a)-Number(b);
	}
	else if(t=='*'){//*
		c = Number(a)*Number(b);
	}
	else{//   除以
		c = Number(a)/Number(b);
	}
	document.getElementById('c').value = c;
}