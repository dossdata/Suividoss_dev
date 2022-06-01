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

    case 'selectall_ptf':
        $z = $affect->selectall_ptf($_POST["select_mm"], $_POST["select_aa"]);
        $dz = json_encode($z);
        echo $dz;
        break;

        case 'lance_reporting':
            $z = $affect->lance_reporting($_POST["manager"], $_POST["cdm_fr"], $_POST["type_ma"],$_POST["dectect"]);
            $dz = json_encode($z);
            echo $dz;
            break; 

            case '__attrib':
                $z = $affect->__attrib($_POST["iddossier"]);
                echo json_encode($z);
                break; 
           
            
            case '_update_niveau_etp':
                $z = $affect->_update_niveau_etp($_POST["id_user"], $_POST["niveau"]);
                break;              
            
            

        case '__det__click':
            $z = $affect->__det__click($_POST["manager"], $_POST["cdm_fr"], $_POST["type_ma"],$_POST["collab"],$_POST["id"]);
            $dz = json_encode($z);
            echo $dz;
            break;               

        

    case 'selectall_ptf_cdm':
        $z = $affect->selectall_ptf_cdm($_POST["select_mm"], $_POST["select_aa"]);
        $dz = json_encode($z);
        echo $dz;
        break;

    case 'selectsonportfeuil':
        $z = $affect->selectsonportfeuil($_POST["id"]);
        $dz = json_encode($z);
        echo $dz;
        break;

    case 'selectsonportfeuil_grap':
        $z = $affect->selectsonportfeuil_grap($_POST["id"], $_POST["aneselect"]);
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

    case 'stat_g_fr':
        $z = $affect->stat_g_fr($_POST["exercice"]);
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
        /*    $list = $affect->affect($_POST["idequipe"]);
        if (isset($list[0]["nomutilisateur"]))
            $z = $list[0]["nomutilisateur"];
        $repons = [];
        foreach ($list as $value) {
            array_push($repons, $value["nomutilisateur"]);
        }*/

        $list = $affect->affect2($_POST["idequipe"]);
        if (isset($list[0]["nom"]))
            $z = $list[0]["nom"];
        $repons = [];
        foreach ($list as $value) {
            array_push($repons, $value["nom"]);
        }

        $dz = json_encode($repons);
        echo $dz;
        break;

    case 'bilan_detailtab1':
        $list = $affect->bilan_detailtab1($_POST["date_exercice"], $_POST["id"]);
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

    case 'click_pt_envclik_bl_restant':
        $list = $affect->pt_envclik_bl_restant($_POST["date_exercice"], $_POST["id"]);
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
                "date_modif_revu" => $value["date_modif_revu"],
                "date_expert" => $value["date_expert"],
                "nom_expert" => $value["nom_expert"],
            ]);
        }
        $dz = json_encode($repons);
        echo ($dz);
        break;

    case 'click_pt_fait_tous':
        $list = $affect->click_pt_fait_tous($_POST["date_exercice"], $_POST["id"]);
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
                "date_modif_revu" => $value["date_modif_revu"],
                "com_client_cdm_fr" => $value["liase_fiscal"],
                "nom_valid" => $value["nom_valid"],
                "date_expert" => $value["date_expert"],
            ]);
        }
        $dz = json_encode($repons);
        echo ($dz);
        break;

    case 'gaia':
        $list = $affect->list_gaia($_POST["cloture"]);
        echo json_encode($list);
        break;

    case 'click_val_fait_tous':
        $list = $affect->click_val_fait_tous($_POST["date_exercice"], $_POST["id"], $_POST["condtion"]);
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
                "date_modif_revu" => $value["date_modif_revu"],
                "com_client_cdm_fr" => $value["liase_fiscal"],
                "nom_valid" => $value["nom_valid"],
                "date_expert" => $value["date_expert"],
            ]);
        }
        $dz = json_encode($repons);
        echo ($dz);
        break;

    case 'click_manager_fait_tous':
        $list = $affect->click_manager_fait_tous($_POST["date_exercice"], $_POST["id"], $_POST["condtion"]);
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
                "date_modif_revu" => $value["date_modif_revu"],
                "com_client_cdm_fr" => $value["liase_fiscal"],
                "nom_valid" => $value["nom_valid"],
                "date_expert" => $value["date_expert"],
            ]);
        }
        $dz = json_encode($repons);
        echo ($dz);
        break;

    case 'click_teletrans_fait_tous':
        $list = $affect->click_teletrans_fait_tous($_POST["date_exercice"], $_POST["id"], $_POST["condtion"]);
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
                "date_modif_revu" => $value["date_modif_revu"],
                "com_client_cdm_fr" => $value["liase_fiscal"],
                "nom_valid" => $value["nom_valid"],
                "date_expert" => $value["date_expert"],
            ]);
        }
        $dz = json_encode($repons);
        echo ($dz);
        break;


    case 'click_edi_fait_tous':
        $list = $affect->click_edi_fait_tous($_POST["date_exercice"], $_POST["id"], $_POST["condtion"]);
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
                "date_modif_revu" => $value["date_modif_revu"],
                "com_client_cdm_fr" => $value["liase_fiscal"],
                "nom_valid" => $value["nom_valid"],
                "date_expert" => $value["date_expert"],
            ]);
        }
        $dz = json_encode($repons);
        echo ($dz);
        break;




    case 'bilan_expert':
        $list = $affect->bilan_expert($_POST["date_exercice"], $_POST["id"]);
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

    case 'bilan_expert_v':
        $list = $affect->bilan_expert_v($_POST["date_exercice"], $_POST["id"]);
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
                "date_modif_revu" => $value["date_modif_revu"],
                "responsable" => $value["responsable"],
            ]);
        }
        $dz = json_encode($repons);
        echo ($dz);
        break;




    case 'bilan_expert_fait':
        $list = $affect->bilan_expert_fait($_POST["date_exercice"], $_POST["id"]);
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
                "date_modif_revu" => $value["date_modif_revu"],
                "responsable" => $value["responsable"],
            ]);
        }
        $dz = json_encode($repons);
        echo ($dz);
        break;


    case 'bilan_expert_v_fait':
        $list = $affect->bilan_expert_v_fait($_POST["date_exercice"], $_POST["id"]);
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
                "date_expert" => $value["date_expert"],
                "nom_expert" => $value["nom_expert"],
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
        $list = $affect->dt_tva_clik($_POST["exercice_v"], $_POST["idequipe"], $_POST["tvareg"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'click_detail_stat_general':
        $list = $affect->click_detail_stat_general($_POST["date_cours"], $_POST["condition"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'click_detail_stat_general_sup':
        $list = $affect->click_detail_stat_general_sup($_POST["date_cours"], $_POST["condition"], $_POST['allequipe']);
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

    case 'produser_suit';
        $list = $affect->checkprod_suit($_POST["txtanne"], $_POST["tousles_rev"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'liststattotal';
        $list = $affect->totalequipes($_POST["alllistequipe"],$_POST["condition"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

        case 'listclick_det';
        $list = $affect->listclick_det($_POST["id_equipe"],$_POST["date_bilan"],$_POST["condition"]);
        $dz = json_encode($list);
        echo ($dz);
        break;        
        

    case 'stat_tva_l';
        $list = $affect->stat_tva_s($_POST["alllistequipe"], $_POST["condition"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'detail_pes';
        $list = $affect->detail_pes($_POST["nomdossier"], $_POST["date_cloture"]);
        echo ($list);
        break;

    case 'bas_ma_ms';
        $list = $affect->select_base_alex_tiana($_POST["cloture"], $_POST["condition"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'click_detail_et_rt';
        $list = $affect->click_detail_et_rt($_POST["id_equipe"], $_POST["tvaregime"], $_POST["mois"], $_POST["annee"], $_POST["test"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'click_detail_et_rtNONFAIT';
        $list = $affect->click_detail_et_rtNONFAIT($_POST["id_equipe"], $_POST["tvaregime"], $_POST["mois"], $_POST["annee"]);
        $dz = json_encode($list);
        echo ($dz);
        break;



    case 'ajout_rev';
        $affect->update_revue($_POST['resultat_final'], $_POST['id_situation_s'], $_POST['reviseur_id']);
        echo "aa";
        break;

    case 'valide_expert_v';
        $affect->valide_expert_v($_POST['resultat_final'], $_POST['id_situation_s'], $_POST['valide_par']);
        echo "aa";
        break;

    case 'val_dec_insert';
        echo $affect->val_dec_insert($_POST['resultat_final'], $_POST['id_situation_s'], $_POST['valide_par'], $_POST["nom_table"]);
        break;


    case 'recuper_val_decl';
        $list =  $affect->recuper_val_decl($_POST['id_situation_s']);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'update_valeur_alert_pes';
        $list =  $affect->update_valeur_alert_pes($_POST['id_situation'], $_POST['valeur']);
        $dz = json_encode($list);
        echo ($dz);
        break;
}
