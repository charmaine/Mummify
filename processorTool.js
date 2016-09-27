processorTool = {
	"char2Num":function(vS){
		// input: vS:string (only the first character is used)
		// output: integer 0~65535 (decimal form)
		return vS.charCodeAt(0);
	},
	"num2Char":function(vI){
		// input: vI:integer (decimal form)
		// output: string (an unicode character)
		return String.fromCharCode(vI);
	}
}
