<?php
session_start();

use Jss\Acceuil;
use Devscreencast\ResponseClass\JsonResponse;
use Jss\Login;
use Jss\Situation_portfeuille;

require 'vendor/autoload.php';
$affect = new Acceuil();
$situation = new Situation_portfeuille;

$authification = new Login();


switch ($_POST["param"]) {
    case 'list_general':
        $v =  $situation->list_general($_POST['id'], $_SESSION['utilisateur'][0]["id"], $_POST['annee']);
        echo json_encode($v);
        break;

    case 'juridique_gloabl':
        $v =  $situation->juridique_gloabl($_POST["date_bilan"]);
        echo json_encode($v);
        break;

    case 'juridique_gloabl_applicable_click':
        $v =  $situation->juridique_gloabl_applicable_click($_POST["date_bilan"], $_POST["condition"]);
        echo json_encode($v);
        break;

    case 'juridique_gloabl_offre_click':
        $v =  $situation->juridique_gloabl_offre_click($_POST["date_bilan"], $_POST["condition"]);
        echo json_encode($v);
        break;


    case 'juridique_insert':
        $v =  $situation->juridique_insert($_POST["id"], $_POST["offre"], $_SESSION['utilisateur'][0]["id"]);
        echo json_encode($_SESSION['utilisateur'][0]["id"]);
        break;

    case 'juridique_delete':
        $v =  $situation->juridique_delete($_POST["id"]);
        echo json_encode($v);
        break;

    case 'juridique_fait':
        $v =  $situation->juridique_fait($_POST["date_bilan"]);
        echo json_encode($v);
        break;



    case 'juridique_gloabl_applicable_click':
        $v =  $situation->juridique_gloabl_applicable_click($_POST["date_bilan"], $_POST["condition"]);
        echo json_encode($v);
        break;



    case 'recherche_attribution':
        $s = "";
        if ($_POST["data_param"] == "0")$s = 9;
        if ($_POST["data_param"] ==  "1")$s = 8;
        if ($_POST["data_param"] ==  "2")$s = 1;
        if ($_POST["data_param"] ==  "3")$s = 4;
        if ($_POST["data_param"] ==  "4")$s = 15;
        if ($_POST["data_param"] ==  "5")$s = 6; 
        if ($_POST["data_param"] ==  "6")$s = 2;
        if ($_POST["data_param"] ==  "7")$s = 5;
        $v =  $situation->recherche_attribution($s, $_POST["valeur"],$_POST["data_param"]);
        echo json_encode($v);
        break;

        case 'save_attrib':
            $s = "";
            if ($_POST["data_param"] == "0")$s = "ll";
            if ($_POST["data_param"] ==  "1")$s = "reference_t";
            if ($_POST["data_param"] ==  "2")$s = "cdm";
            if ($_POST["data_param"] ==  "3")$s = "ass";
            if ($_POST["data_param"] ==  "4")$s = "prepa";
            if ($_POST["data_param"] ==  "5")$s = "os"; 
            if ($_POST["data_param"] ==  "6")$s = "manger_fr";
            if ($_POST["data_param"] ==  "7")$s = "cdm_fr";
            $v =  $situation->save_attrib($s, $_POST["valeur_id"],$_POST["iddossier"]);
            echo "ok";
            break;        

        case 'select_attrib':
            $v =  $situation->select_attrib($_POST["iddossier"]);
            echo json_encode($v);
            break;             
      
            



    case 'list_general_avec_nombre_image':
        $v =  $situation->list_general_avec_nombre_image($_POST['id'], $_SESSION['utilisateur'][0]["id"], $_POST['annee']);
        echo json_encode($v);
        break;
        


    case 'select_chif_aff':
        $v =  $situation->select_chif_aff($_POST['id'], $_POST['condition'], $_POST['annee']);
        echo json_encode($v);
        break;

    case 'click_detail_suivi':
        $v =  $situation->click_detail_suivi($_POST['id_st']);
        echo json_encode($v);
        break;


    case 'list_general_dernier_exo':
        $v =  $situation->list_general_dernier_exo($_POST["id"], null);
        echo json_encode($v);
        break;



    case 'contact_dossier':
        $v =  $situation->contact_dossier($_POST['id_dossier']);
        echo json_encode($v);
        break;

    case 'save_contact_dossier':
        $v =  $situation->save_contact_dossier($_POST['id_dossier'], $_POST['presantant_client'], $_POST['phone_client'], $_POST['mail_client']);
        echo $v;
        break;

    case 'contact_sie':
        $v =  $situation->contact_sie($_POST['id_dossier']);
        echo json_encode($v);
        break;

    case 'save_contact_sie':
        $v =  $situation->save_contact_sie($_POST['id_dossier'], $_POST['phone_contact_sie'], $_POST['mail_contact_sie']);
        echo $v;
        break;


    case 'reseignement_juridique':
        $v =  $situation->reseignement_juridique($_POST['id_dossier']);
        echo json_encode($v);
        break;

    case 'save_reseignement_juridique':
        $v =  $situation->save_reseignement_juridique(
            $_POST['id_dossier'],
            $_POST['forme_juridique'],
            $_POST['siren'],
            $_POST['siret'],
            $_POST['activite'],
            $_POST['adress'],
            $_POST['capital_social'],
            $_POST['rcs'],
            $_POST['dernier_maj'],
            $_POST['gerant'],

            $_POST['fs_coala'],
            $_POST['fs_apptream'],
            $_POST['table_banque']
        );
        echo $v;
        break;


    case 'chiffre_d_affaire':
        $v =  $situation->chiffre_d_affaire($_POST['id_dossier']);
        echo json_encode($v);
        break;

    case 'save_chiffre_d_affaire':
        $v =  $situation->save_chiffre_d_affaire(
            $_POST['id_dossier'],
            $_POST['chiffre_affaire_v'],
            $_POST['nombre_chiffre_affaire'],
            $_POST['date_chiffre_affaire'],
        );
        echo $v;
        break;

    case 'supre_chiffre_d_affaire':
        $v =  $situation->supre_chiffre_d_affaire($_POST['id_dossier']);
        echo $v;
        break;


    case 'suprimer_cloture':
        $v =  $situation->suprimer_cloture($_POST['id_situation'], $_SESSION['utilisateur'][0]["id"], $_POST['action']);
        echo $v;
        break;

    case 'pole_juridique':
        $v =  $situation->pole_juridique($_POST['id_dossier']);
        echo json_encode($v);
        break;

    case 'save_pole_juridique':
        $v =  $situation->save_pole_juridique(
            $_POST['id_dossier'],
            $_POST['juridique_annuel'],
            $_POST['juridique_exceptionnel'],
            $_POST['juridique_mixte'],
            $_POST['mandat_banque'],
            $_POST['projet'],
            $_POST['dossier_complet'],
            $_POST['depot_au_greffe'],
            $_POST['envoie_mail_de_bienvenue'],
            $_POST['saisie_ldm_ebp_et_hubspot'],
            $_POST['creation_efi'],
            $_POST['creation_sepa'],

        );
        echo $v;
        break;

    case 'pes_relance':
        $v =  $situation->pes_relance($_POST['id_dossier'], $_POST['id_situation']);
        echo json_encode($v);
        break;

    case 'click_relance':
        $v =  $situation->click_relance($_POST['id_dossier'], $_POST['id_situation']);
        echo json_encode($v);
        break;

    case 'click_relance_pieces':
        $v =  $situation->click_relance_pieces($_POST['id_dossier'], $_POST['id_situation']);
        echo json_encode($v);
        break;


    case 'click_relance_banque':
        $v =  $situation->click_relance_banque($_POST['id_dossier'], $_POST['id_situation']);
        echo json_encode($v);
        break;


    case 'save_pes_relance':
        $v =  $situation->save_pes_relance($_POST['id_dossier'], $_POST['id_situation'], $_POST['pes_num'], $_POST['dat_pes']);
        echo json_encode($v);
        break;

    case 'save_modif_pes_relance':
        $v =  $situation->save_modif_pes_relance($_POST['id_pes'], $_POST['dat_pes'], $_POST['date_retour']);
        echo json_encode($v);
        break;

    case 'save_modif_relance_pieces':
        $v =  $situation->save_modif_relance_pieces($_POST['id_relance_pieces'], $_POST['date_pieces_m'], $_POST['date_retour_pieces_m']);
        echo json_encode($v);
        break;


    case 'save_modif_relance':
        $v =  $situation->save_modif_relance($_POST['id_relance'], $_POST['date_realnce_m']);
        echo json_encode($v);
        break;



    case 'supre_pes_relance':
        $v =  $situation->supre_pes_relance($_POST['id_pes']);
        echo json_encode($v);
        break;

    case 'supre_relance_pes':
        $v =  $situation->supre_relance_pes($_POST['id_relance_pieces']);
        echo json_encode($v);
        break;



    case 'supre_relance':
        $v =  $situation->supre_relance($_POST['id_relance']);
        echo json_encode($v);
        break;

    case 'supre_pes_relancebanque':
        $v =  $situation->supre_pes_relancebanque($_POST['id_relancebaqnque']);
        echo json_encode($v);
        break;


    case 'save_relance':
        $v =  $situation->save_relance($_POST['id_dossier'], $_POST['id_situation'], $_POST['pes_num'], $_POST['dat_relance']);
        echo json_encode($v);
        break;


    case 'savemodif_banque':
        $v =  $situation->savemodif_banque($_POST['id_relancebaqnque'], $_POST['date_relancebanque_m']);
        echo json_encode($v);
        break;



    case 'save_relancebanque':
        $v =  $situation->save_relancebanque($_POST['id_dossier'], $_POST['id_situation'], $_POST['relnce_pieces_num'], $_POST['relance_date_piece']);
        echo json_encode($v);
        break;


    case 'save_relancepieces':
        $v =  $situation->save_relancepieces($_POST['id_dossier'], $_POST['id_situation'], $_POST['relnce_pieces_num'], $_POST['relance_date_piece']);
        echo json_encode($v);
        break;


    case 'add_new_cloture':
        $v =  $situation->add_new_cloture(
            $_POST['id_dossier'],
            $_POST['id_situation'],
            $_POST['date_cloturation'],
            $_POST['regime_dimpos'],
            $_POST['regime_dimpos2'],
            $_POST['forme_juridique'],
            $_POST['dpcoala'],
            $_POST['tvregime'],
            $_POST['tvadate_echeance'],
            $_POST['ss_check']
        );
        echo $v;
        break;

    case 'saveS':
        $v =  $situation->saveS(
            $_POST['id_situation'],
            $_POST['selectsituationdoss'],
            $_POST['date_cloturation'],
            $_POST['regime_dimpos'],
            $_POST['regime_dimpos2'],
            $_POST['forme_juridique'],
            $_POST['dpcoala'],
            $_POST['tvregime'],
            $_POST['tvadate_echeance'],
            $_POST['date_de_depot_dernier_keobiz'],
            $_POST['situation_trait_karlit'],
            $_POST['date_dernier_maj'],
            $_POST['etat_bilan'],
            $_POST['date_envoie_bilan_karlit'],
            $_POST['date_rev_bilan_fr'],
            $_POST['observation'],
            $_POST['date_dernier_appel_client'],
            $_POST['mem_autre_equipe'],
            $_POST['cmtkarlit'],
            $_POST['user_fait'],
            $_POST['user_post'],
            $_POST['date_debut_de_mission'],

            $_POST['Activite'],
            $_POST['social_bilan'],
            $_POST['tns_bilan'],
            $_POST['releve_bilan'],
            $_POST['cmt_relve_bilan'],
            $_POST['achat_bilan'],
            $_POST['vente_bilan'],
            $_POST['cmt_autre_bilan'],

            $_POST['Liase_'],
            $_POST['ca12_'],
            $_POST['solde_'],
            $_POST['cvae_'],
            $_POST['svae_'],
            $_POST['decl_'],
            $_POST['das_'],
            $_POST['c3s_'],
            $_POST['bool_checked_affiche_bilan']
        );
        echo $v;
        break;
    case 'updateimport':
        $v = $situation->updateimport(
            $_POST['ID'],
            $_POST['SITUATION_DOSSIER'],
            $_POST['COMMENTAIRE'],
            $_POST['DATE_CLOTURATION'],
            $_POST['REGIME_D_IMPOS_1'],
            $_POST['REGIME_D_IMPOS_2'],
            $_POST['FORME_JURIDIQUE'],
            $_POST['DP_COALA'],
            $_POST['REGIME'],
            $_POST['DATE_ECH'],
            $_POST['SITUATION_KARLIT'],
            $_POST['DATE_MAJ'],
            $_POST['ETAT_BILAN']
        );
        break;

    case 'list_suivi_tva';
        $list = $situation->list_tva($_POST["equipe"], $_POST["exo"], $_POST["mois"], $_POST["regim_tv"]);
        $dz = json_encode($list);
        echo ($dz);
        break;

    case 'update_suivi_tva';
        $list = $situation->update_stva(
            $_POST["id_situation"],
            $_POST["colone_mois"],
            $_POST["valeur_colonnes"],
            $_POST["user_modif"],
            $_POST["anne_playbilan"]
        );
        echo ($list);
        break;

    case 'ajout_envoi_recap';
        $list = $situation->ajout_envoi_recap($_POST["id_dossier"], $_POST["txt_envoie"], $_POST["serveur_select"], $_POST["nombre_images"], $_POST["image_debut"], $_POST["image_fin"], $_POST["recap_envoie"], $_POST["login"]);
        echo "ok";
        break;

    case 'tableau_recap';
        echo  json_encode($situation->recap_envoi_tableau($_POST["id_envoie"]));
        break;

    case 'recupere_recap';
        $list = $situation->recupere_recap($_POST["id_dossier"], $_POST["recheche_piece"]);
        echo json_encode($list);
        break;

    case 'envoie_modif';
        $situation->envoie_modif($_POST["data_param"]);
        echo "update ok";
        break;

    case 'delete_envoie';
        $situation->delete_envoie($_POST["id_envoie"]);
        echo "update ok";
        break;



    case 'updata_profile';
        $situation->update_matricule($_POST['id'], $_POST['matricule'], $_POST["mon_sup"]);
        echo "update_matricule";
        break;

    case 'recupere_checked';
        echo  json_encode($situation->recupere_checked($_POST["id"]));
        break;

    case 'login_mdp':
        $v = $authification->returnLogin("admin", $_POST["pwd"]);
        echo count($v);
        break;
}
