let selectedFile;

function ExcelDateToJSDate(date) {
    return new Date(Math.round((date - 25569)*86400*1000));
  }

console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[{
    "name":"jayanth",
    "data":"scd",
    "abc":"sdef"
}]

function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    if(isNaN(year) != true){
    return year + "-" + month +"-" + day;
    }else{
        return "";  
    }
}



document.getElementById('input').addEventListener("change", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
	
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
		
         workbook.SheetNames.forEach(sheet => {
              let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
			  var z = rowObject;
    		  var rowdstable = "";
              
			  for(var i = 0 ; i< rowObject.length; i++){
                var cloture = getFormattedDate(ExcelDateToJSDate(rowObject[i]["DATE_CLOTURATION"])) ;
                var mij_aj = getFormattedDate(ExcelDateToJSDate(rowObject[i]["DATE_MAJ"])) ;
				rowdstable += "<tr>"+
				"<td class='idimport in_visible'></td><td class='nddoss'>"+rowObject[i]["NOM_DOSSIER"]+"</td><td class='stdosst'>"+rowObject[i]["SITUATION_DOSSIER"].toUpperCase().trim()+"</td>"+
				"<td class='dscomt'>"+ rowObject[i]["COMMENTAIRE"] + "</td>"+
                "<td class='dtcltr'>"+ cloture +"</td><td class='rg_1'>"+rowObject[i]["REGIME_D_IMPOS_1"].toUpperCase().trim()+"</td>"+
				"<td class='rg_2'>"+rowObject[i]["REGIME_D_IMPOS_2"].toUpperCase().trim()+"</td><td class='frmjd'>"+rowObject[i]["FORME_JURIDIQUE"].toUpperCase().trim()+"</td>"+
				"<td class='dpscola'>"+rowObject[i]["DP_COALA"].toUpperCase().trim()+"</td><td class='rgmoring'>"+rowObject[i]["REGIME"].toUpperCase().trim()+"</td>"+
				"<td class='dtecha'>"+rowObject[i]["DATE_ECH"]+"</td><td class='stkarlits'>"+rowObject[i]["SITUATION_KARLIT"].toUpperCase().trim()+"</td>"+
				"<td class='dtmajj'>"+ mij_aj +"</td><td class='etbllbil'>"+rowObject[i]["ETAT_BILAN"].toUpperCase().trim()+"</td>"+

				"<tr>";
			  }
			  document.getElementById("jsondata").innerHTML = "<table class='table-bordered text-center' width='100%' id='table_import'>" + rowdstable.replace(/undefined/g," ") + "</table>";
			 $('.nddoss').each(function(index1){
                $('.ndoss').each(function(index2){
                    if($('.nddoss:eq('+index1+')').html().toUpperCase().trim() == $(this).html().toUpperCase().trim()){
                        $('.idimport:eq('+index1+')').html($('.situation_portfeuil_id:eq('+index2+')').html());
                    }
                
                })
         
             })
         });
		 
        }
	
    }

});


document.getElementById('input').addEventListener("click", () => {
    try {
        document.getElementById('table_import').innerHTML = "";
    } catch (error) {
        
    }
    
});