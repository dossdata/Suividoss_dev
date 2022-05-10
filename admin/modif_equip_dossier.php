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
<title>Modification dossier</title>
<link href="https://swisnl.github.io/jQuery-contextMenu/dist/jquery.contextMenu.css" rel="stylesheet" type="text/css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://swisnl.github.io/jQuery-contextMenu/dist/jquery.contextMenu.js" type="text/javascript"></script>
    <script src="https://swisnl.github.io/jQuery-contextMenu/dist/jquery.ui.position.min.js" type="text/javascript"></script>

<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/font-awesome.min.css">
<link href="css/style.css" rel="stylesheet" type="text/css" />
<link href="css/gm-date-selector.css" rel="stylesheet" />
<script src="js/jszip.js"></script>
<script src="js/xlsx.js"></script>

<style type="text/css">

body { background-color: #e6e6e6 }
.panel-body .btn:not(.btn-block) { width:100%;margin-bottom:10px; }
#corpbody{
  width:100%;
  height: 100%;
}
  
body {
 font-family:"trebuchet ms",sans-serif;
background:#415a72;

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

 td{
  line-height:8px;
 }
 .sprU{
  cursor:default;
 }

 .sprU:hover{
  background-color: #ddd;
 }
 th{
   font-family: "Trebuchet MS", Arial, Verdana;
  font-size: 14px;
  padding: 5px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #CDC1A7;
  background-color: #CDC1A7;
  color: #993300;
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
      document.getElementById('tbdonnerexcel').innerHTML = "";
      if(document.getElementById('myoptions').value != ""){
      document.getElementById('tbdonnerexcel').innerHTML = json_object.replace(/{/g, '').replace(/}/g, '').replace(/]/g, '').replace(/\[/g, '').replace(/NOM DOSSIERS/g, '').replace(/\:/g, '').replace(/\"/g, '').replace(/\,/g, '</br>');
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
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="admin.php"><span class="glyphicon glyphicon-user"></span> Admin</a></li>
        <li><a  href="/SuiviKARLIT"><span class="glyphicon glyphicon-log-in"></span> Deconnexion</a></li>
      </ul>
    </div>
  </div>
</nav>  
<p/>
  <div style="position: absolute;top:10%;text-align: center;width: 100%;background-color: #fff"> 
   
<fieldset style="background-color: #e7e1e7;">

     
<br/> 

<table>
  <td>
<fieldset>
  <legend>Nouveau dossiers avec son Collaborateurs : </legend>
  <div style="position: absolute;top: 7%">Selection un Equipe</div><b class ="chkequipe"></b><br/><p/>
  <input type = "text" class="form-control" placeholder="Recherche dossier..." id="recherdoss">
</fieldset>

</p>


  </div>
</table>

    <table border="0">
    <td></td>
    <tr> <td id='listexcel'><input type="file" name="" id="upload" data-toggle="modal" data-target="#myModal"></i></button'></td></tr>
  </table>

    <div class="modal left fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" style="width:70%">
      <div class="modal-content" style="background-color:#ddd">

        <div class="modal-header" style="background-color:#049e5e;border:none;color:#fff">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Dossier inserer</h4>
          <p>
            <b id="imagecollab"> </b>
          <p/>
          <table><td>nom dossier</td></table>
        </div>

        <div class="modal-body modalleftdetail" style="background-color:#fff;overflow:auto;height:600px;">
          <p id="listuser">
          
          </p>
          <p id="tbdonnerexcel">
          
          </p>
        </div>
        <button class="btn btn-primary" id="saveListdossier">Enregistrer</button>

      </div><!-- modal-content -->
    </div><!-- modal-dialog -->
  </div><!-- modal -->


<!-- Modal -->
<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content" style="background-color: #ddd">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Liste utilisateurs<div class="text-center">
	<input type="text" placeholder="recherche nom" id="chrcnom">
</div><div style="background-color: #ddd"  class="animgif"><img src="images/tenor.gif" width="50%"></div></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body" id="listUser" style="overflow:auto;height: 400px;background-color: #fff" >
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" class="btn btn-primary" id="ajoutafectation">Valider</button>
      </div>
    </div>
  </div>
</div>


  <table>
    <tr><b id="iddossier" style="display: none"></b><div class="text-right"> <a href="#" id="affListuser" data-toggle="modal" data-target="#exampleModalLong"> <span class="glyphicon glyphicon-plus"></span></a></div>
    <td style="background-color: #fff" width="70%">
      <div id="listdosssier" style="overflow: auto;height:350px;" ></div>
    </td>
    <!--<td style="background-color: #fff" rowspan="2">
      <div style="overflow: auto;height:350px;" id="listUtilisateur"></div>
    </td> -->
  </tr>
  <tr>
    <td>
<div class="text-left"> Total dossier : <b id="countdoss"></b></div>
      <table>
        <label> nouveau dossier ajouter</label></td>
    <td><input type="text" name="" size="126px" id="txtnamedoss"></td>

    <td id="utilisateur"></td>
     <td><input type="button" class="btn-primary" id="btn_doss" value='>>'>
      </table>
    </td>
  </tr>
  

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="position:fixed;top:40%">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Attention !</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <h3>Voulez vous vraiment enlevé dans le dossier <p/> ?
        <b id="idaffect" style="display: none" ></b>
      </h3>
      </div>
      <div class="modal-footer">
        <button id="supreaffecatation" type="button" class="btn-warning" data-dismiss="modal">Oui</button>
        <button type="button" class="btn-primary" data-dismiss="modal">Non</button>
      </div>
    </div>
  </div>
</div>


<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" id="btnequippop" style="display:none">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content"  style="background:#dfe8f1">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="tsequipe">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">FERMER</button>
        <button type="button" class="btn btn-primary" id="validtransfer">VALIDER</button>
      </div>
    </div>
  </div>
</div>

<button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm" id="message_erreur" style="display:none">Small modal</button>

<div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content" id="corp_message" style="background:#3344bf;">

    </div>
  </div>
</div>

<script>
        document.getElementById('upload').addEventListener('change', handleFileSelect, false);    
</script>


<script src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/script_equipe.js"></script>
<script type="text/javascript" src="js/script_modif_dossier.js"></script>
</body>
</html>                            