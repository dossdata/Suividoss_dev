<?php
session_start();
include "../class/connect.php";
$param = $_POST['param'];

if ($param == "listequipe") {
    $fin_resultat0 = "";
    $sql0 = "SELECT distinct E.id as idequipe, E.code FROM dossier D left join equipe E on(D.equip_id = E.id) WHERE E.id is not null";
    $res0 = $dbo->prepare($sql0);
    $res0->execute();
    $resultat0 = $res0->fetchAll();

    for ($i = 0; $i < count($resultat0); $i++) {
        $fin_resultat0 .= '<option value="' . $resultat0[$i]['idequipe'] . '">' . $resultat0[$i]['code'] . '</option>';
    }
    echo $fin_resultat0;
}

if ($param == "etatrevis") {
    $fin_resultat0 = "";
    $sql0 = "SELECT * FROM etat_revision";
    $res0 = $dbo->prepare($sql0);
    $res0->execute();
    $resultat0 = $res0->fetchAll();

    for ($i = 0; $i < count($resultat0); $i++) {
        $fin_resultat0 .= '<option value="' . $resultat0[$i]['id'] . '">' . $resultat0[$i]['nom'] . '</option>';
    }
    echo $fin_resultat0;
}


if ($param == "remarque") {
    $fin_resultat0 = "";
    $sql0 = "SELECT * FROM remarque";
    $res0 = $dbo->prepare($sql0);
    $res0->execute();
    $resultat0 = $res0->fetchAll();

    for ($i = 0; $i < count($resultat0); $i++) {
        $fin_resultat0 .= '<option value="' . $resultat0[$i]['id'] . '">' . $resultat0[$i]['nom'] . '</option>';
    }
    echo $fin_resultat0;
}

if ($param == "relevebanque") {
    $fin_resultat0 = "";
    $sql0 = "SELECT * FROM releve_bancaire";
    $res0 = $dbo->prepare($sql0);
    $res0->execute();
    $resultat0 = $res0->fetchAll();

    for ($i = 0; $i < count($resultat0); $i++) {
        $fin_resultat0 .= '<option value="' . $resultat0[$i]['id'] . '">' . $resultat0[$i]['nom'] . '</option>';
    }
    echo $fin_resultat0;
}

if ($param == "lotpieces") {
    $fin_resultat0 = "";
    $sql0 = "SELECT * FROM lot_des_piece";
    $res0 = $dbo->prepare($sql0);
    $res0->execute();
    $resultat0 = $res0->fetchAll();

    for ($i = 0; $i < count($resultat0); $i++) {
        $fin_resultat0 .= '<option value="' . $resultat0[$i]['id'] . '">' . $resultat0[$i]['nom'] . '</option>';
    }
    echo $fin_resultat0;
}

if ($param == "saisiebanque") {
    $fin_resultat0 = "";
    $sql0 = "SELECT * FROM saisie_banque";
    $res0 = $dbo->prepare($sql0);
    $res0->execute();
    $resultat0 = $res0->fetchAll();

    for ($i = 0; $i < count($resultat0); $i++) {
        $fin_resultat0 .= '<option value="' . $resultat0[$i]['id'] . '">' . $resultat0[$i]['nom'] . '</option>';
    }
    echo $fin_resultat0;
}


if ($param == "etat_saisiebd") {
    $fin_resultat0 = "";
    $sql0 = "SELECT * FROM etat_saisie";
    $res0 = $dbo->prepare($sql0);
    $res0->execute();
    $resultat0 = $res0->fetchAll();

    for ($i = 0; $i < count($resultat0); $i++) {
        $fin_resultat0 .= '<option value="' . $resultat0[$i]['id'] . '">' . $resultat0[$i]['nom'] . '</option>';
    }
    echo $fin_resultat0;
}




if($param == "touslesdossier"){
    $fin_resultat = "";
    $sql = "SELECT DISTINCT D.id, D.nom FROM suividossdb.dossier D Inner join  suividossdb.affectation_dossier AF on(D.id = AF.iddossier) inner join suividossdb.utilisateur U on(U.id = AF.id_utilisateur) inner join suividossdb.equipe E on(E.id = D.equip_id) left join suividossdb.situation_par_portfeuil SP on(SP.iddoss = D.id)  where U.id = " . $_SESSION['id_login'];
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();

    for ($i = 0; $i < count($resultat); $i++) {
        $fin_resultat .= '<option data-value="' . $resultat[$i]['id'] . '" value ="' . $resultat[$i]['nom'] . '"</option>';
    }
    echo "<datalist id='dossierid'>" . $fin_resultat . "</datalist>" .
        '<input id="optiondoss" list="dossierid" type="text" class="form-control " placeholder="Cherche dossier....." autocomplete="off">';
}


if ($param == "listdosiser") {
    $fin_resultat = "";
    $sql = "SELECT EQ.code, U.nom as nompreparateur, S.id as idsuivie, S.date_suivie,D.nom as nom_dossier,D.id as id_dossier,S.nombre,LT.nom as lot_piece,LT.id as id_lot_piece,S.precision_lot_piece,R.nom as releve_bancaire,R.id as id_releve_bancaire,S.noms_precomptas,".
            " RQ.nom as remarque,".
            " RQ.id as id_remarque,".
            " S.m_utilisateur,".
            " ET.nom as etat_saise,".
            " ET.id as id_etat_saisie,".
            " SB.nom as saisie_banque,".
            " SB.id as id_saisie_banque,".
            " S.revision_precompta,".
            " ES.nom as etat_revision,".
            " ES.id as id_etat_revision,".
            " S.user_modif as id_utilisateur".
            " FROM suivie_precompta_prepa S left join ".
            " utilisateur U on(U.id = S.user_modif) left join".
            " dossier D on(D.id = S.iddoss)  left join".
            " equipe EQ on(EQ.id = D.equip_id) left join".
            " lot_des_piece LT on(LT.id = S.id_lot_des_piece) left join".
            " releve_bancaire R on(R.id = S.id_releve_bancaire) left join".
            " remarque RQ on(RQ.id = S.id_remarque) left join".
            " etat_saisie ET on(ET.id = S.id_etat_saisie) left join".
            " saisie_banque SB on (SB.id = S.id_saisie_banque) left join".
            " etat_revision ES on (ES.id = S.id_etat_revision) WHERE S.date_suivie LIKE concat(substr(now(),1,10),'%') ORDER BY S.id DESC";

    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();

    for ($i = 0; $i < count($resultat); $i++) {
        $fin_resultat .=
            "<tr class='trhov' >".
            "<td style='background-color:#33b5e5;color:whitesmoke ' class='text-center'>". (intval($i) + 1) ."</td>".
            "<td style='display:none' class='idsuivie'>".$resultat[$i]["idsuivie"]."</td>".
            "<td class='dtmadsuiv'>". $resultat[$i]["date_suivie"]."</td>".
            "<td class='equipe'>". $resultat[$i]["code"]."</td>".
            "<td class='namdoss'>".$resultat[$i]["nom_dossier"]."</td>".
            "<td class='namnombre'>".$resultat[$i]["nombre"]."</td>".
            "<td class='nlotpiece'>".$resultat[$i]["lot_piece"]."</td>".
            "<td class='precisionlt'>".$resultat[$i]["precision_lot_piece"]."</td>".
            "<td class='nrelbaq'>".$resultat[$i]["releve_bancaire"]."</td>".
            "<td class='mrequrqu'>".$resultat[$i]["remarque"]."</td>".
            "<td class='mutilis'>".$resultat[$i]["noms_precomptas"]."</td>".
            "<td class='nsaisiebq'>".$resultat[$i]["saisie_banque"]."</td>".
            "<td class='metatsais'>".$resultat[$i]["etat_saise"]."</td>".
            "<td class='rvprecmt'>".$resultat[$i]["revision_precompta"]."</td>".
            "<td class='metatrev'>".$resultat[$i]["etat_revision"]."</td>".

            "<td style='display: none' class='midossis'>".$resultat[$i]["id_dossier"]."</td>".
            "<td style='display: none' class='midosslit'>".$resultat[$i]["id_lot_piece"]."</td>".
            "<td style='display: none' class='midrelvbq'>".$resultat[$i]["id_releve_bancaire"]."</td>".
            "<td style='display: none' class='m_iruked'>".$resultat[$i]["id_utilisateur"]."</td>".
            "<td style='display: none' class='rqremarque'>".$resultat[$i]["id_remarque"]."</td>".
            "<td style='display: none' class='etarevisionm'>".$resultat[$i]["id_etat_revision"]."</td>".

            "<td style='display: none' class='idsaisiebanquemodif'>".$resultat[$i]["id_saisie_banque"]."</td>".
            "<td style='display: none' class='ideatatsisi'>".$resultat[$i]["id_etat_saisie"]."</td>".
            "<td style='display: none' class='nompreparateur'>".$resultat[$i]["nompreparateur"]."</td>".


            "<td class='modif' data-toggle='modal' data-target='#fullHeightModalRight'><i class='fas fa-pencil-alt'></i></td>".
            "<td class='supr' data-toggle='modal' data-target='#centralModalDanger' ><i class='far fa-trash-alt'></i></td>".
            "</tr>";
    }
    echo "<tbody>". $fin_resultat ."</tbody>";
}

    if($param == "insertionsuivie"){
        $date_entrer = $_POST['date_entrer'];
        $dossier = $_POST['dossier'];
        $nbr_imge = $_POST['nbr_imge'];
        $lot_piece = $_POST['lot_piece'];
        $presion = $_POST['presion'];
        $relevebanque = $_POST['relevebanque'];
        $sasiebanque = null;
        $id_etat_saisie = null;
        if($relevebanque == 3){$sasiebanque = 4;}
        if($relevebanque == 2){$sasiebanque = 2;$id_etat_saisie = 2;}
        if($relevebanque == 3){$sasiebanque = 4;$id_etat_saisie = 3;}

        $sql = "INSERT INTO suivie_precompta_prepa (date_suivie,iddoss,nombre,id_lot_des_piece,precision_lot_piece,id_releve_bancaire,date_traitment,user_modif,id_saisie_banque,id_etat_saisie) VALUES(:date_suivie,:iddoss,:nombre,:id_lot_des_piece,:precision_lot_piece,:id_releve_bancaire,:date_traitment,:user_modif,:id_saisie_banque,:id_etat_saisie)";
        $res = $dbo->prepare($sql);
        $res->execute(array(
            'date_suivie' => $date_entrer,
            'iddoss' =>$dossier,
            'nombre' =>$nbr_imge,
            'id_lot_des_piece' =>$lot_piece,
            'precision_lot_piece' =>$presion,
            'id_releve_bancaire' =>$relevebanque,
            'user_modif'=> $_SESSION['id_login'],
            'date_traitment' => date('Y-m-d'),
            'id_saisie_banque' => $sasiebanque,
            'id_etat_saisie' =>$id_etat_saisie,
        ));
        echo "mety";
    }

    if($param == "suprelinge"){
        $idlinge = $_POST["idlinge"];
        $sql = "DELETE FROM suividossdb.suivie_precompta_prepa where id=:id";
        $res = $dbo->prepare($sql);
        $res->execute(array(
            'id' => $idlinge,
        ));
    }

    if($param == "addfilter"){
        $fin_resultat = "";
        $dtdebut = $_POST['dtdebut'];
        $dtfin = $_POST['dtfin'];
        $flequipe = $_POST['flequipe'];
        $sql = "SELECT EQ.id, EQ.code,U.nom as nompreparateur, S.id as idsuivie, S.date_suivie,D.nom as nom_dossier,D.id as id_dossier,S.nombre,LT.nom as lot_piece,LT.id as id_lot_piece,S.precision_lot_piece,R.nom as releve_bancaire,R.id as id_releve_bancaire,S.noms_precomptas,".
            " RQ.nom as remarque,".
            " RQ.id as id_remarque,".
            " S.m_utilisateur,".
            " ET.nom as etat_saise,".
            " ET.id as id_etat_saisie,".
            " SB.nom as saisie_banque,".
            " SB.id as id_saisie_banque,".
            " S.revision_precompta,".
            " ES.nom as etat_revision,".
            " ES.id as id_etat_revision,".
            " S.user_modif as id_utilisateur".
            " FROM suivie_precompta_prepa S left join ".
            " utilisateur U on(U.id = S.user_modif) left join".
            " dossier D on(D.id = S.iddoss)  left join".
            " equipe EQ on(EQ.id = D.equip_id) left join".
            " lot_des_piece LT on(LT.id = S.id_lot_des_piece) left join".
            " releve_bancaire R on(R.id = S.id_releve_bancaire) left join".
            " remarque RQ on(RQ.id = S.id_remarque) left join".
            " etat_saisie ET on(ET.id = S.id_etat_saisie) left join".
            " saisie_banque SB on (SB.id = S.id_saisie_banque) left join".
            " etat_revision ES on (ES.id = S.id_etat_revision) where EQ.id = $flequipe and S.date_suivie BETWEEN '". $dtdebut ."' and '". $dtfin ."' ORDER BY  S.id DESC";

        $res = $dbo->prepare($sql);
        $res->execute();
        $resultat = $res->fetchAll();

        for ($i = 0; $i < count($resultat); $i++) {
            $fin_resultat .=
                "<tr class='trhov' >".
                "<td style='background-color:#33b5e5;color:whitesmoke ' class='text-center'>". (intval($i) + 1) ."</td>".
                "<td style='display:none' class='idsuivie'>".$resultat[$i]["idsuivie"]."</td>".
                "<td class='dtmadsuiv'>". $resultat[$i]["date_suivie"]."</td>".
                "<td class='equipe'>".$resultat[$i]["code"]."</td>".
                "<td class='namdoss'>".$resultat[$i]["nom_dossier"]."</td>".
                "<td class='namnombre'>".$resultat[$i]["nombre"]."</td>".
                "<td class='nlotpiece'>".$resultat[$i]["lot_piece"]."</td>".
                "<td class='precisionlt'>".$resultat[$i]["precision_lot_piece"]."</td>".
                "<td class='nrelbaq'>".$resultat[$i]["releve_bancaire"]."</td>".
                "<td class='mrequrqu'>".$resultat[$i]["remarque"]."</td>".
                "<td class='mutilis'>".$resultat[$i]["noms_precomptas"]."</td>".
                "<td class='nsaisiebq'>".$resultat[$i]["saisie_banque"]."</td>".
                "<td class='metatsais'>".$resultat[$i]["etat_saise"]."</td>".
                "<td class='rvprecmt'>".$resultat[$i]["revision_precompta"]."</td>".
                "<td class='metatrev'>".$resultat[$i]["etat_revision"]."</td>".

                "<td style='display: none' class='midossis'>".$resultat[$i]["id_dossier"]."</td>".
                "<td style='display: none' class='midosslit'>".$resultat[$i]["id_lot_piece"]."</td>".
                "<td style='display: none' class='midrelvbq'>".$resultat[$i]["id_releve_bancaire"]."</td>".
                "<td style='display: none' class='m_iruked'>".$resultat[$i]["id_utilisateur"]."</td>".
                "<td style='display: none' class='rqremarque'>".$resultat[$i]["id_remarque"]."</td>".
                "<td style='display: none' class='etarevisionm'>".$resultat[$i]["id_etat_revision"]."</td>".


                "<td style='display: none' class='idsaisiebanquemodif'>".$resultat[$i]["id_saisie_banque"]."</td>".
                "<td style='display: none' class='ideatatsisi'>".$resultat[$i]["id_etat_saisie"]."</td>".
                "<td style='display: none' class='nompreparateur'>".$resultat[$i]["nompreparateur"]."</td>".


                "<td class='modif' data-toggle='modal' data-target='#fullHeightModalRight'><i class='fas fa-pencil-alt'></i></td>".
                "<td class='supr' data-toggle='modal' data-target='#centralModalDanger' ><i class='far fa-trash-alt'></i></td>".
                "</tr>";
        }
        echo "<tbody>". $fin_resultat ."</tbody>";
    }

    if($param == "updateprecompta"){
        $nomprecomptamodif = $_POST['nomprecomptamodif'];
        $etat_saisimodif = $_POST['etat_saisimodif'];
        $saaisiebanqmodi = $_POST['saaisiebanqmodi'];
        $remarqumdf = $_POST['remarqumdf'];
        $id = $_POST['id'];

        $sql = "UPDATE suivie_precompta_prepa SET noms_precomptas=:noms_precomptas,id_etat_saisie=:id_etat_saisie,id_saisie_banque=:id_saisie_banque,id_remarque=:id_remarque where id =:id";
        $res = $dbo->prepare($sql);
        $res->execute(array(
            'noms_precomptas' => $nomprecomptamodif,
            'id_etat_saisie' => $etat_saisimodif,
            'id_saisie_banque' =>  $saaisiebanqmodi,
            'id_remarque' => $remarqumdf,
            'id' => $id,
        ));
    }

if($param == "updaterev"){
    $revprecommodif = $_POST['revprecommodif'];
    $etatrevisModif = $_POST['etatrevisModif'];
    $id = $_POST['id'];

    $sql = "UPDATE suivie_precompta_prepa SET revision_precompta=:revision_precompta,id_etat_revision=:id_etat_revision where id =:id";
    $res = $dbo->prepare($sql);
    $res->execute(array(
        'revision_precompta' => $revprecommodif,
        'id_etat_revision' => $etatrevisModif,
        'id' => $id,
    ));
}

