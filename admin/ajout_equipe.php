<?php session_start(); ?>
<?php 
    if( mb_strtolower($_SESSION['utilisateur'][0]["nom"],'UTF-8') != "admin"){
      header("location:/SuiviKARLIT");
    }?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ajout equipe</title>
<link rel="stylesheet" href="css/Roboto.css" >
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/font-awesome.min.css">
<link href="css/style.css" rel="stylesheet" type="text/css" />
<link href="css/gm-date-selector.css" rel="stylesheet" />
<script src="js/jszip.js"></script>
<script src="js/xlsx.js"></script>

<style type="text/css">

body { background-color: #fff }
.panel-body .btn:not(.btn-block) { width:100%;margin-bottom:10px; }
#corpbody{
	width:100%;
	height: 100%;
}
  
body {
 font-family:"trebuchet ms",sans-serif;

 }
form {
 background-color:#fff;
 padding:10px;

 }
fieldset {
 padding:0 20px 20px 20px;
 margin-bottom:10px;
 border:1px solid #71417d;
 }
legend {
 color:#71417d;
 font-weight:bold
 }
label {
 margin-top:10px;
 display:block;
 }
label.inline {
 display:inline;
 margin-right:50px;
 }
input, textarea, select, option {
 background-color:#FFF3F3;
 }
input, textarea, select {
 padding:3px;
 border:1px solid #F5C5C5;
 border-radius:5px;
 width:100%;
 box-shadow:1px 1px 2px #C0C0C0 inset;
 }
select {
 margin-top:10px;
 }
input[type=checkbox] {
 background-color:transparent;
 border:none;
 width:10px;
 }
input[type=button], input[type=reset] {
 width:100px;
 margin-left:5px;
 box-shadow:1px 1px 1px #D83F3D;
 cursor:pointer;
 }
</style>
<script>
    var ExcelToJSON = function() {

      this.parseExcel = function(file) {
         var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
            type: 'binary'
          });
          workbook.SheetNames.forEach(function(sheetName) {
            // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        console.log(json_object);
      //alert(json_object.replace(/{/g, '').replace(/}/g, '').replace(/]/g, '').replace(/\[/g, '').replace(/\DOSSIER/g, '').replace(/\:/g, '').replace(/\"/g, ''));
      document.getElementById('tbdonnerexcel').innerHTML = "";
      if(document.getElementById('myoptions').value != ""){
      document.getElementById('tbdonnerexcel').innerHTML = json_object.replace(/{/g, '').replace(/}/g, '').replace(/]/g, '').replace(/\[/g, '').replace(/\DOSSIER/g, '').replace(/\:/g, '').replace(/\"/g, '').replace(/\,/g, '</br>');
      }else{
        alert("Attention l'equipe ne doit pas être vide !");
      }
            jQuery( '#xlx_json' ).val( json_object );
          })
        };

        reader.onerror = function(ex) {
          console.log(ex);
        };

        reader.readAsBinaryString(file);
      };
  };

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);

  }

</script>
</head>
<body>

<nav class="navbar navbar-inverse navtete hautdepage" style="position:fixed;top:0; width:100%;border:none"  >
  <div class="container-fluid" style="background-color:#130a5e;border:none;">
    <div class="navbar-header" >
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="admin.php"><span class="glyphicon glyphicon-user"></span> Admin</a></li>
        <li><a  href="/SuiviKARLIT"><span class="glyphicon glyphicon-log-in"></span> Deconnexion</a></li>
      </ul>
    </div>
  </div>
</nav>	
<p>
  <div style="position: absolute;top:15%;width:100%;text-align: center;"> 
    <form >
<fieldset>

 <legend>Nouveau Equipe :</legend>
  <label for="email">Nom :</label>
   <input type="text"  size="20"  maxlength="40" placeholder="nom..." id="txtnom" />
  <label for="email">Prenom :</label>
   <input type="text"  size="20" placeholder="Prenom..." maxlength="40" id="txtprenom" />
  <label for="utilise">Mail : </label>
 <input type="email" name="email" size="20" maxlength="40" placeholder="Mail..." id="txtmail"/>
   </select>

  <label for="email">Code :</label>
    <input type="text"  size="20" maxlength="10" placeholder="XXX" id="txtcode" />
</fieldset>

     <p><br/>
 <input type="button" class="btn-primary" value="VALIDER" id="btnOk" />
 <input type="reset" id="annuler" class="btn-warning" value="Annuler" />
<br/>

<table>
  <td>

</p>

</form>
  </div>

    <div class="modal left fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" style="width:80%">
      <div class="modal-content" style="background-color:#ddd">

        <div class="modal-header" style="background-color:#049e5e;border:none;color:#fff">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Dossier inserer</h4>
          <p>
            <b id="imagecollab"> </b>
          <p>
          <table><td>nom dossier</td></table>
        </div>

        <div class="modal-body modalleftdetail" style="background-color:#fff;overflow:auto;height:600px;">
          <p id="tbdonnerexcel">
          
          </p>
        </div>
        <button class="btn btn-primary">Enregistrer</button>

      </div><!-- modal-content -->
    </div><!-- modal-dialog -->
  </div><!-- modal -->

<script>
        document.getElementById('upload').addEventListener('change', handleFileSelect, false);    
</script>


<script src="js/jquery.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/script_equipe.js"></script>
</body>
</html>                            