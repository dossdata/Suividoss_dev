let selectedFile;
console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[{
    "name":"jayanth",
    "data":"scd",
    "abc":"sdef"
}]


document.getElementById('input').addEventListener("change", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
	
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
         console.log(workbook);
		
         workbook.SheetNames.forEach(sheet => {
              let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
			  var z = rowObject;
              console.log(rowObject);
    		  var rowdstable = "";
			  for(var i = 0 ; i< rowObject.length; i++){
				rowdstable += "<tr>"+
				"<td class='nom'>"+rowObject[i]["NOM"]+"</td><td class='login'>"+rowObject[i]["LOGIN"]+"</td>"+
				"<td class='password'>"+rowObject[i]["PASSOWRD"]+
                "<td class='poste'>"+rowObject[i]["POSTE"]+"</td><td class='pays'>"+rowObject[i]["PAYS"]+"</td><tr>";
			  }
			  document.getElementById("jsondata").innerHTML = "<table border='1'>" + rowdstable.replace(/undefined/g," ") + "</table>";
			 $('.nddoss').each(function(index1){
                $('.ndoss').each(function(index2){
                    if($('.nddoss:eq('+index1+')').html() == $('.ndoss:eq('+index2+')').html()){
                        $('.idimport:eq('+index1+')').html($('.ncaus:eq('+index2+')').html());
                    }
                
                })
         
             })
         });
		 
        }
	
    }

});