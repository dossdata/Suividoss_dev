<?php
use Jss\Acceuil;
use Devscreencast\ResponseClass\JsonResponse;

require 'vendor/autoload.php';
$affect = new Acceuil();

switch ($_POST["param"]) {

    case 'elementbloquant':
        $z = $affect->elementbloquant($_POST["annee"], $_POST["id"]);
        $dz = json_encode($z);
        echo $dz;
        break;

    case 'alert_pes':
        $z = $affect->alert_pes($_POST["annee"], $_POST["id"]);
        $dz = json_encode($z);
        echo $dz;
        break;


    case 'aa_mm':
        $z = $affect->bilan($_POST["exercice"], $_POST["id"]);
        $dz = json_encode($z);
        echo $dz;
        break;

    case 'selectsup':
        $z = $affect->select_sup($_POST["valeur_id"]);
        $dz = json_encode($z);
        echo $dz;
        break;

    case 'selectsonportfeuil':
        $z = $affect->selectsonportfeuil($_POST["id"]);
        $dz = json_encode($z);
        echo $dz;
        break;

    case 'supstatg':
        $z = $affect->statGeneralsup($_POST["annee"], $_POST["Allportfeuil"]);
        $dz = json_encode($z);
        echo $dz;
        break;



    case 'stat_g':
        $z = $affect->stat_g($_POST["exercice"]);
        $dz = json_encode($z);
        echo $dz;
        break;

    case 'stat_g_avec_ms':
        $z = $affect->stat_g_avec_ms($_POST["exercice"]);
        $dz = json_encode($z);
        echo $dz;
        break;

    case 'aa_mm__ms':
        $z = $affect->bilan_diff_egal_ms($_POST["exercice"], $_POST["id"]);
        $dz = json_encode($z);
        echo $dz;
        break;

    case 'listusersimple':
        $list = $affect->affect($_POST["idequipe"]);
        if (isset($list[0]["nomutilisateur"]))
            $z = $list[0]["nomutilisateur"];
        $repons = [];
        foreach ($list as $value) {
            array_push($repons, $value["nomutilisateur"]);
        }

        $dz = json_encode($repons);
        echo $dz;
        break;

    case 'bilan_detailtab1':
        $list = $affect->bilan_detailtab1($_POST["date_exercice"], $_POST["id"]);
        $repons = [];
        foreach ($list as $value) {
            array_push($repons, [
                "id_situation"=> $value["id_situation"],
                "code" => $value["code"],
                "nomdossier" => $value["nomdossier"],
                "idsituation_dossier" => $value["idsituation_dossier"],
                "etat_bilan" => $value["etat_bilan"],
                "date_cloturation" => $value["date_cloturation"],
                "date_envoie_bilan_karlit" => $value["date_envoie_bilan_karlit"],
            ]);
        }
        $dz = json_encode($repons);
        echo ($dz);
        break;


    case 'bilan_detailtab2':
        $list = $affect->bilan_detailtab2($_POST["date_exercice"], $_POST["id"]);
        $repons = [];
        foreach ($list as $value) {
            array_push($repons, [
                "id_situation" => $value["id_situation"],
                "code" => $value["code"],
                "nomdossier" => $value["nomdossier"],
                "idsituation_dossier" => $value["idsituation_dossier"],
                "etat_bilan" => $value["etat_bilan"],
                "date_cloturation" => $value["date_cloturation"],
                "date_envoie_bilan_karlit" => $value["date_envoie_bilan_karlit"],
                "id_situation" => $value["id_situation"],
            ]);
        }
        $dz = json_encode($repons);
        echo ($dz);
        break;



    case 'bilan_detailtab3':
        $list = $affect->bilan_detailtab3($_POST["date_exercice"], $_POST["id"]);
        $repons = [];
        foreach ($list as $value) {
            array_push($repons, [
                "id_situation" => $value["id_situation"],
                "code" => $value["code"],
                "nomdossier" => $value["nomdossier"],
                "idsituation_dossier" => $value["idsituation_dossier"],
                "etat_bilan" => $value["etat_bilan"],
                "date_cloturation" => $value["date_cloturation"],
                "date_envoie_bilan_karlit" => $value["date_envoie_bilan_karlit"],
            ]);
        }
        $dz = json_encode($repons);
        echo ($dz);
        break;

    case 'dt_tva_clik':
        $list = $affect->dt_tva_clik($_POST["exercice_v"], $_POST["idequipe"],$_POST["tvareg"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'click_detail_stat_general':
        $list = $affect->click_detail_stat_general($_POST["date_cours"], $_POST["condition"]);
        $dz = json_encode($list);
        echo ($dz);
        break;        
        
        
    case 'recupereET_RT':
        $list = $affect->click_recupere_et_rt($_POST["annee"], $_POST["id"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'click_recupere_rm_etm':
        $list = $affect->click_recupere_rm_etm($_POST["exercice_v"], $_POST["idequipe"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'valeurEM':
        $list = $affect->EM($_POST["annee"], $_POST["id"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'valeurca12':
        $list = $affect->ca12($_POST["annee"], $_POST["id"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

        case 'valeurcvae':
            $list = $affect->valeurcvae($_POST["annee"], $_POST["id"]);
            $dz = json_encode($list);
            echo ($dz);
        break;    

        case 'valeurcfe':
            $list = $affect->valeurcfe($_POST["annee"], $_POST["id"]);
            $dz = json_encode($list);
            echo ($dz);
        break;          

    case 'acompteIs';
        $list = $affect->acompteIs($_POST["annee"], $_POST["id"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'liquidation';
        $list = $affect->liquidation($_POST["annee"], $_POST["id"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'produser';
        $list = $affect->checkprod($_POST["txtanne"], $_POST["tousles_iduserkarlit"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'liststattotal';
        $list = $affect->totalequipes($_POST["alllistequipe"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'stat_tva_l';
        $list = $affect->stat_tva_s($_POST["alllistequipe"],$_POST["condition"]);
        $dz = json_encode($list);
        echo ($dz);
        break;        

    case 'detail_pes';
        $list = $affect->detail_pes($_POST["nomdossier"],$_POST["date_cloture"]);
        echo ($list);
        break;

    case 'bas_ma_ms';
        $list = $affect->select_base_alex_tiana($_POST["cloture"],$_POST["condition"]);
        $dz = json_encode($list);
        echo($dz);
        break;

        case 'click_detail_et_rt';
        $list = $affect->click_detail_et_rt($_POST["id_equipe"],$_POST["tvaregime"],$_POST["mois"],$_POST["annee"],$_POST["test"]);
        $dz = json_encode($list);
        echo($dz);
        break;        
    
    case 'click_detail_et_rtNONFAIT';
        $list = $affect->click_detail_et_rtNONFAIT($_POST["id_equipe"],$_POST["tvaregime"],$_POST["mois"],$_POST["annee"]);
        $dz = json_encode($list);
        echo($dz);
        break;
}
