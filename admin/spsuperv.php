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
        .linesup:hover,
        .suprln:hover {
            background-color: lightblue;
            cursor: pointer;

        }

        .suprln:active,
        .linesup:active {
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
                </ul>
            </div>
        </div>
    </nav>
    <p>
    <div style="position:absolute;top:10%">
    <button class="btn btn-warning text-center" style="position:absolute;left:110%" id="btnnotifi"><span class="glyphicon glyphicon-ok"></span> Appliquer la modification</button>
        <div class="container">
            <div class="row">
                <div class="col-sm-4">
                    <p>
                    <div class="panel panel-default">
                        <!-- Default panel contents -->
                        <div class="panel-heading">SUPERVISEUR MADA</div>
                        <div class="panel-body">
                        </div>
                        <b id="tablesupmada">
                         </b>
                    </div>
                    </p>

                </div>
                <div class="col-sm-4">
                    <div class="panel panel-default">
                        <!-- Default panel contents -->
                        <div class="panel-heading">SUPERVISEUR FRANCE</div>
                        <div class="panel-body">
                        </div>
                        <b id="tablesupfr">
                        </b>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div id="animat">
                        <a href="#" class="adportf" data-toggle="modal" data-target="#myModal">
                            <h3><span class="glyphicon glyphicon-plus"></span> Ajout Portfeuille <b id="idul"></b></h3>
                        </a>
                        <b id="tableport">

                        </b>
                    </div>
                    <div class="alert alert-success text-center" role="alert" id="sucalert">Modification avec succes <span class="glyphicon glyphicon-ok"></span></div>                                    
                </div>
            </div>
        </div>



        <div class="container">
            <!-- Modal -->
            <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog">

                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Portfeuille Ajouter pour :</h4>
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
                                <div class="panel-heading">Nouveau Equipe ajouter</div>
                                <div class="panel-body">
                                </div>
                                <div>
                                    <table width="100%">
                                        <td>
                                            <div class="panel panel-default">
                                                <!-- Default panel contents -->
                                                <div class="panel-heading">Portfeuille</div>
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="valide">VALIDER</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>
                    </div>
                </div>

            </div>
        </div>

    </div>
<div id="idutilisateur" style="display:none"></div>
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/spsuperv.js"></script>

</body>

</html>