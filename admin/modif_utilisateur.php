<?php session_start(); ?>
<?php
if (mb_strtolower($_SESSION['utilisateur'][0]["nom"], 'UTF-8') != "admin") {
	header("location:/SuiviKARLIT");
} ?>
<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>modification utilisateur</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<link href="css/style.css" rel="stylesheet" type="text/css" />
	<link href="css/gm-date-selector.css" rel="stylesheet" />

	<style type="text/css">
		.statusOdd :hover {
			background-color: red;
		}

		.envoiedetail {
			background-color: #fff;
		}

		.iconedetail {
			cursor: pointer;
		}



		.ligne_user:hover {
			background-color: #fff;
		}

		input,
		select {
			color: #000;
		}

		/*******************************
molda left
*******************************/
		.modal.left .modal-dialog,
		.modal.right .modal-dialog {
			position: fixed;
			margin: auto;
			width: 320px;
			height: 100%;
			-webkit-transform: translate3d(0%, 0, 0);
			-ms-transform: translate3d(0%, 0, 0);
			-o-transform: translate3d(0%, 0, 0);
			transform: translate3d(0%, 0, 0);
		}

		.modal.left .modal-content,
		.modal.right .modal-content {
			height: 100%;
			overflow-y: auto;
		}

		.modal.left .modal-body,
		.modal.right .modal-body {
			padding: 15px 15px 80px;
		}

		/*Left*/
		.modal.left.fade .modal-dialog {
			left: -320px;
			-webkit-transition: opacity 0.3s linear, left 0.3s ease-out;
			-moz-transition: opacity 0.3s linear, left 0.3s ease-out;
			-o-transition: opacity 0.3s linear, left 0.3s ease-out;
			transition: opacity 0.3s linear, left 0.3s ease-out;
		}

		.modal.left.fade.in .modal-dialog {
			left: 0;
		}

		/*Right*/
		.modal.right.fade .modal-dialog {
			right: -320px;
			-webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
			-moz-transition: opacity 0.3s linear, right 0.3s ease-out;
			-o-transition: opacity 0.3s linear, right 0.3s ease-out;
			transition: opacity 0.3s linear, right 0.3s ease-out;
		}

		.modal.right.fade.in .modal-dialog {
			right: 0;
		}

		/* ----- MODAL STYLE ----- */
		.modal-content {
			border-radius: 0;
			border: none;
		}

		.modal-header {
			border-bottom-color: #EEEEEE;
			background-color: #FAFAFA;
		}

		/* ----- v CAN BE DELETED v ----- */
	</style>
</head>

<body>
	<nav class="navbar navbar-inverse navtete hautdepage" style="position:fixed;top:0; width:100%;border:none">
		<div class="container-fluid" style="background-color:#130a5e;border:none;">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand">Suivie</a>
			</div>
			<div class="collapse navbar-collapse" id="myNavbar">
				<ul class="nav navbar-nav">
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li><a href="admin.php"><span class="glyphicon glyphicon-user"></span> Admin</a></li>
					<li><a href="/SuiviKARLIT"><span class="glyphicon glyphicon-log-in"></span> Deconnexion</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<div style="padding-top:76px " id="corpbody" class="text-center">
		<div class="row">

			<div class="col-lg-5">

				<div class="input-group">
					<input type="text" class="form-control" placeholder="Cherche...nom ou login" size="60" id="txtrecherche">
					<span class="input-group-btn">
						<button class="btn btn-default" type="button" id="btnrecherche">Effacer!</button>
					</span>
				</div><!-- /input-group -->
			</div><!-- /.col-lg-6 -->
		</div><!-- /.row -->

	</div><!-- container -->
	<!-- Modal -->
	<div class="modal left fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width:90%;height:65%">
			<div class="modal-content" style="background-color:#ddd">

				<div class="modal-header" style="border:none">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel">MODIFIER</h4>
					<p><b id="imagecollab"> </b>
					<p>
					<table>
						<tr>
							<td>nom</td>
							<td>login</td>
							<td>password</td>
							<td>pays</td>
							<td>poste</td>
						</tr>
						<tr>
							<td><input type="text" id="txtnom"></td>
							<td><input type="text" id="txtlogin"></td>
							<td><input type="text" id="txtpassword"></td>
							<td id="listpays"></td>

							<td id="listpost"><select>
									<option></option>
									<option></option>
									<option></option>
								</select></td>
						</tr>

						<tr>
							<td>prenom</td>
							<td>sexe</td>
							<td>mail</td>
							<td>niveau_etp</td>
							<td>supervision</td>
						</tr>
						<td><input type="text" id="txtprenom"></td>
						<td><select id="txtsexe">
								<option></option>
								<option value="M">M</option>
								<option value="F">F</option>
							</select></td>
						<td><input type="text" id="txtmail"></td>
						<td>
							<script>
								var rep = "";
								for (var i = 1; i < 11; i++) {
									rep += "<option value='" + i + "'>" + i + "</option>";
								}
								document.write('<select id="txtniveauetp"><option></option>' + rep + '</select>');
							</script>
						</td>
						<td>
							<?php
							include "./class/connect.php";
							$rep = "";
							$sql = "SELECT id, nom  FROM utilisateur where pays_id=5 and post_id  = 5";
							$res = $dbo->prepare($sql);
							$res->execute();
							$resultat = $res->fetchAll();
							for ($i = 0; $i < count($resultat); $i++) {
								$rep .= "<option value='" . $resultat[$i]["id"] . "' data = '". $resultat[$i]["nom"] ."'>" . $resultat[$i]["nom"] . "</option>";
							}
							echo "<select id='supervision'><option></option>" . $rep . "</select>";
							?>
						</td>
						</tr>

						<tr>
							<td>date de naissance</td>
							<td>date d'entree</td>
							<td>date sortie</td>
							<td>MATRICULE</td>
							<td>Changement de poste ou date debut de poste</td>
						</tr>
						<tr>
							<td><input type="date" id="txtdate_de_naissance" class="form-control"></td>
							<td><input type="date" id="txtdateentrer"  class="form-control"></td>
							<td><input type="date" id="txtsortie" class="form-control"></td>
							<td ><input type="text" id="txtmatricule" maxlength="5" class="form-control"></td>
							<td ><input type="date" id="txtdatepost" class="form-control"></td>
						</tr>
					</table>
				</div>

				<div class="modal-body modalleftdetail" style="background-color:#fff">
					<p id="table_detail">

					</p>
				</div>
				<div class="text-center"><button class="btn btn-primary" id="btnEnregistrer">Enregistrer la modification <span class='glyphicon glyphicon-edit'></span></button>

					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-warning" id="btn-supr" style="display:none">Suprimier l'Utilisateur <span class='glyphicon glyphicon-delete'></span></button>

				</div>

			</div><!-- modal-content -->
		</div><!-- modal-dialog -->
	</div><!-- modal -->

	<!-- Modal -->
	<div class="modal right fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
		<div class="modal-dialog" role="document">
			<div class="modal-content">

				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel2">Right Sidebar</h4>
				</div>

				<div class="modal-body">
					<p>
					</p>
				</div>

			</div><!-- modal-content -->
		</div><!-- modal-dialog -->
	</div><!-- modal -->


	</div><!-- container -->




	<!---------------------------------------------------- -->
	<div id="tablelist" style="overflow: auto; height: 402px; width: 100%;">

	</div>


	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/modifU.js"></script>



</body>

</html>