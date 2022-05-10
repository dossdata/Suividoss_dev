<?php session_start(); ?>
<?php 
    if( mb_strtolower($_SESSION['utilisateur'][0]["nom"],'UTF-8') != "admin"){
      header("location:/SuiviKARLIT");
    }?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SUP</title>

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">

    <style type="text/css">
        .linenom:hover,
        .suprln:hover {
            background-color: lightblue;
            cursor: pointer;

        }

        .suprln:active,
        .linenom:active {
            background-color: lightcoral;
        }
    </style>
</head>

<body style="background:#dfe8f1">
    <nav class="navbar navbar-inverse navtete hautdepage" style="position:fixed;top:0; width:100%;border:none">
        <div class="container-fluid" style="background-color:#130a5e;border:none;">
            <div class="navbar-header">
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
                    <li><a  href="/SuiviKARLIT" id="id_access_u">id_access_u</a></li>
                    <li><a  href="/SuiviKARLIT" id="id_user_u">id_user_u</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <p>
    <div style="position:absolute;top:10%">
    <button class="btn btn-warning text-center" style="position:fixed;top:10%;right:0;" id="btnnotifi"><span class="glyphicon glyphicon-ok"></span> Appliquer la modification</button>
    <div class="alert alert-success text-center"  style="position:fixed;top:10%;right:0;" role="alert" id="sucalert">Modification avec succes <span class="glyphicon glyphicon-ok"></span></div>                                    
        <div class="container">
            <div class="row">
            <div class="panel-heading">COLLABORATEUR</div>
            <div class="panel-heading"><input type="text" class="text_recherche"></div>
                <div class="col-sm-4" style="overflow:auto!important;height:590px!important">
                    <p>
                    <div class="panel panel-default">
                        <!-- Default panel contents -->
           
                        <div class="panel-body" >
                        </div>
                        <b id="collab" >
                         </b>
                    </div>
                    </p>

                </div>
                <div class="col-sm-8">
                    <div class="panel panel-default">
                    <div class="modals fades" id="myModal" role="dialog">
                <div class="modal-dialog">

                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Portfeuille ajouter pour : <b id="nom_id" style='color:red'></b></h4>
                            <div class="text-center" id="namesup"></div>
                        </div>
                        <div class="modal-body">
                            <p>
                            <form>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Recherche portfeuille ...." id="keyprfeui">
                                    <div class="input-group-btn">
                                        <button class="btn btn-default" type="button">
                                            <i class="glyphicon glyphicon-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                            </p>
                            <p>

                            <div class="panel panel-default">
                                <!-- Default panel contents -->
                                <div class="panel-heading">Nouveau equipe ajouter</div>
                                <div class="panel-body">
                                </div>
                                <div>
                                    <table width="100%">
                                        <td>
                                            <div class="panel panel-default">
                                                <!-- Default panel contents -->
                                                <div class="panel-heading">Portfeuil &nbsp; <a href="#" id="cauchtous">Cocher tous</a>&nbsp;/---/ &nbsp;<a href="#" id="dacacuhe">Décocher tous</a></div>
                                                <div class="panel-body">
                                                </div>
                                                <div style="overflow:auto;height:250px" id="listeQup">

                                                </div>
                                            </div>

                                        </td>
                                        <td>
                                            <button class="btn-default" id="selectright"><span class="glyphicon glyphicon-chevron-right"></span></button><br>
                                        </td>
                                        <td>
                                            <div class="panel panel-default">
                                                <!-- Default panel contents -->
                                                <div class="panel-heading">Portfeuil déjà existé</div>
                                                <div class="panel-body">
                                                </div>
                                                <div style="overflow:auto;height:250px" id="prtdeja">

                                                </div>
                                            </div>
                                </div>
                            </div>
                            </td>
                            </table>
                        </div>
                        </p>
                    </div>
          
                </div>

            </div>
                    </div>
                </div>
         
            </div>
        </div>



        <div class="container">
            <!-- Modal -->
           
        </div>

    </div>
<div id="idutilisateur" style="display:none"></div>
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/access_portfuil.js"></script>

</body>

</html>