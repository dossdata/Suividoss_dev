<?php

namespace Jss;

use App\Connection;

class Situation_portfeuille extends Connection
{

    public function list_general($idequip, $iduser, $annee)
    {
        //SELECT * FROM situation_par_portfeuil WHERE date_cloturation is null or date_cloturation = ""
        $arrayidequip = explode("#", $idequip);
        $conditionEquipe = "";
        foreach ($arrayidequip as $value) {
            $conditionEquipe .= ' OR Eq.id = "' . $value . '"';
        }
        $conditionEquipe = "(" . substr(str_replace(' OR Eq.id = ""', '', $conditionEquipe), 3) . ")";


        $arrayannee = explode("#", $annee);
        $conditionannee = "";
        foreach ($arrayannee as $value) {
            if ($value == "Vide") {
                $conditionannee .= " OR S.date_cloturation is null OR date_cloturation = '' ";
            } else {
                $conditionannee .= " OR S.date_cloturation LIKE '" . $value . "%'";
            }
        }
        $conditionannee =  "(" . substr(str_replace(" OR S.date_cloturation LIKE '%'", '', $conditionannee), 3) . ")";

        $sql = 'SELECT DISTINCT 
        u1.nom_mail as cde,u2.nom_mail as reference,u3.nom_mail as cdm_j,u4.nom_mail as ass,u5.nom_mail as os,u6.nom_mail as prepa, u7.nom_mail as manage_fr   ,u8.nom_mail as cdm_frr,
        cd.presentant,cd.tel,cd.mail as mail_presentant,
        
        u1.prenom_mail as prenom_mail_cde, u1.mail as mail_cde,
        u2.prenom_mail as prenom_mail_reviseur,u2.mail as mail_rev,
        u3.prenom_mail as prenom_mail_cdm,u3.mail as mail__cdm,
        u4.prenom_mail as prenom_mail_ass,u4.mail as mail_ss,
        u5.prenom_mail as prenom_mail_os,u5.mail as mail_os,
        u6.prenom_mail as prenom_mail_prepa,u6.mail as mail_prepa,         

        u7.prenom_mail as prenom_manag,u7.mail as mail_mamanag,
        u8.prenom_mail as prenom_cdm_m ,u8.mail as mail_cdm_m,

        
        D.id as id_dossier,
        S.id as situation_portfeuil_id,
        Eq.code as code,
        D.nom as dossier, 
        S.idsituation_dossier as sit_dossier,
        S.cmtKarlit as cmt,
        S.date_cloturation as cloture,
        S.regime_dimpos as rg_d_imp1,
        S.regime_dimpos2 as rg_d_imp2,
        S.forme_juridique as frm_jrdq,
        S.dpcoala as dp_coala,
        S.tvregime as regime,
        S.tvadate_echeance as dt_ech,
        S.date_de_depot_dernier_keobiz,
        S.situation_trait_karlit as sit_karlit,
        S.date_dernier_maj as date_maj,
        S.etat_bilan as etat_bl,
        S.date_envoie_bilan_karlit as dt_d_envoie_bl_krlt,
        U.nom as cdm,
        S.date_rev_bilan_fr as dt_rev_sup_fr,
        S.observation as obs_sup_fr,
        max(P.date_pes) as dernier_pes,
        max(R.date_relance) as dernier_relance,
        S.date_dernier_appel_client dernier_appel_client,
        S.Activite as Activite,
        S.social as social, 
        S.tns as tns,
        S.releve as releve,
        S.mem_autre_equipe as mem_autre_equipe,
        S.commentaire_releve as commentaire_releve,
        S.achat as achat,
        S.vente as vente,
        S.date_modif_revu,
        S.date_expert,
        Rs.siren,siret,Rs.activite,
        Rs.fs_coala,fs_apptream,Rs.table_banque,

        S.commentaire_et_autre as commentaire_et_autre,Rs.activite as Activite_final,
        "" as sumimage,
        if(S.situation_trait_karlit = "EC REVISION PRECOMPTA",EN.nom_revision_precompta,if(S.situation_trait_karlit = "EC SAISI P.C",EN.nom_precompta,if(S.situation_trait_karlit = "EC REVISION",EN.nom_cdm,if(S.situation_trait_karlit = "EC SAISI ASS.",EN.nom_assistant,if(S.situation_trait_karlit = "A TRAITER",EN.responsable_reception,if(S.situation_trait_karlit = "EN ATTENTE",EN.nom_cdm,if(S.situation_trait_karlit = "A REVISER P.C",EN.nom_precompta,if(S.situation_trait_karlit = "FINI REVISION PRECOMPTA",EN.nom_revision_precompta,if(S.situation_trait_karlit = "A REVISER",EN.nom_assistant,"??")))))))))  AS encours_de 
        FROM suividossdb.situation_par_portfeuil S 
        LEFT JOIN dossier D on (D.id = S.iddoss)  
        LEFT JOIN utilisateur u1 on(u1.id = D.ll) 
        LEFT JOIN utilisateur u2 on(u2.id = D.reference_t) 
        LEFT JOIN utilisateur u3 on(u3.id = D.cdm) 
        LEFT JOIN utilisateur u4 on(u4.id = D.ass) 
        LEFT JOIN utilisateur u5 on(u5.id = D.os) 
        LEFT JOIN utilisateur u6 on(u6.id = D.prepa)  

        LEFT JOIN utilisateur u7 on(u7.id = D.manger_fr)
        LEFT JOIN utilisateur u8 on(u8.id = D.cdm_fr)

        LEFT JOIN contact_dossier cd on(cd.id_dossier = D.id)  LEFT JOIN
        suividossdb.pes P on(P.iddoss = S.id) LEFT JOIN suividossdb.relance R on(R.iddoss = S.id) 
        LEFT JOIN utilisateur U on(U.id = S.utilisateur_id) LEFT JOIN suividossdb.equipe Eq on(D.equip_id = Eq.id) 
        LEFT JOIN suividossdb.reseignement_juridique Rs on(D.id = Rs.iddossier) 
        LEFT JOIN suividossdb.envoie EN on(EN.dossier_id = D.id) 
         WHERE ' . $conditionEquipe . '  and  ' . $conditionannee .
            ' group by S.id order by Eq.code';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $respons = $res->fetchAll();
        return $respons;
    }

    public function list_general_juridique($idequip, $annee,$mois)
    {
     
        $date_cloture = $annee. "-" . $mois;
        $sql = 'SELECT DISTINCT 
        D.id as id_dossier,
        S.id as situation_portfeuil_id,
        Eq.code as code,
        D.nom as dossier, 
        S.idsituation_dossier as sit_dossier,
        S.cmtKarlit as cmt,
        S.date_cloturation as cloture,
        S.regime_dimpos as rg_d_imp1,
        S.regime_dimpos2 as rg_d_imp2,
        S.forme_juridique as frm_jrdq,
        S.dpcoala as dp_coala,
        S.tvregime as regime,
        S.tvadate_echeance as dt_ech,
        S.date_de_depot_dernier_keobiz,
        S.situation_trait_karlit as sit_karlit,
        S.date_dernier_maj as date_maj,
        S.etat_bilan as etat_bl,
        S.date_envoie_bilan_karlit as dt_d_envoie_bl_krlt,
        U.nom as cdm,
        S.date_rev_bilan_fr as dt_rev_sup_fr,
        S.observation as obs_sup_fr,
        max(P.date_pes) as dernier_pes,
        max(R.date_relance) as dernier_relance,
        S.date_dernier_appel_client dernier_appel_client,
        S.Activite as Activite,
        S.social as social, 
        S.tns as tns,
        S.releve as releve,
        S.mem_autre_equipe as mem_autre_equipe,
        S.commentaire_releve as commentaire_releve,
        S.achat as achat,
        S.vente as vente,
        S.date_modif_revu,
        S.date_expert,
        S.commentaire_et_autre as commentaire_et_autre,Rs.activite as Activite_final,
        "" as sumimage 
        FROM suividossdb.situation_par_portfeuil S
        LEFT JOIN dossier D on (D.id = S.iddoss) LEFT JOIN 
        suividossdb.pes P on(P.iddoss = S.id) LEFT JOIN suividossdb.relance R on(R.iddoss = S.id) 
        LEFT JOIN utilisateur U on(U.id = S.utilisateur_id) LEFT JOIN suividossdb.equipe Eq on(D.equip_id = Eq.id) 
        LEFT JOIN suividossdb.reseignement_juridique Rs on(D.id = Rs.iddossier) 
        LEFT JOIN suividossdb.envoie EN on(EN.dossier_id = D.id) 
         WHERE Eq.id =:equip_id and  S.date_cloturation LIKE :date_cloturation   group by S.id order by Eq.code';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'equip_id' => $idequip,
            'date_cloturation' => $date_cloture . "%"
        ));
        $respons = $res->fetchAll();
        return $respons;
    }
    
    public function juridique_gloabl($date_bilan)
    {
        // SP.id as id_situation , SP.etat_bilan, e.code, d2.NOM as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert
        $array = [];
        for ($i = 1; $i < 13; $i++) {
            if($i < 10) {
                $i = "0" . $i;
            }
            
        $sql_dr_resviser = 'SELECT SP.id   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
          LIKE "' . $date_bilan . '-'. $i . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL';
        $res_dr_revisier = $this->Getconnexion()->prepare($sql_dr_resviser);
        $res_dr_revisier->execute();
        $resultat_dr_reviser = $res_dr_revisier->fetchAll();

        $sql_applicable = 'SELECT SP.id   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
        suividossdb.pole_juridique Pj  on(Pj.id_situation = SP.id) LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
          LIKE "' . $date_bilan . '-'. $i . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and 
          (SP.forme_juridique <> "EI" and SP.forme_juridique <> "AUTOENTREPRENEUR" and SP.forme_juridique <> "BNC") and SP.reviseur_id is not NULL and Pj.id_situation is NULL';
        $res_applicable = $this->Getconnexion()->prepare($sql_applicable);
        $res_applicable->execute();
        $resultat_applicable = $res_applicable->fetchAll();

        
        $sql_applicable_fait_ffre = 'SELECT SP.id   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
        suividossdb.pole_juridique Pj  on(Pj.id_situation = SP.id) LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
          LIKE "' . $date_bilan . '-'. $i . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and 
          (SP.forme_juridique <> "EI" and SP.forme_juridique <> "AUTOENTREPRENEUR" and SP.forme_juridique <> "BNC") and SP.reviseur_id is not NULL';
        $res_applicable_fait_of = $this->Getconnexion()->prepare($sql_applicable_fait_ffre);
        $res_applicable_fait_of->execute();
        $resultat_applicable_of = $res_applicable_fait_of->fetchAll(); 



        $sql_applicable_fait = 'SELECT SP.id   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
        suividossdb.pole_juridique j on (j.id_situation = SP.id) LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
          LIKE "' . $date_bilan . '-'. $i . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and 
          (SP.forme_juridique = "SAS" or SP.forme_juridique = "SAS" or SP.forme_juridique = "SASU" or SP.forme_juridique = "SARL" or SP.forme_juridique = "EURL" or SP.forme_juridique = "EURL" or SP.forme_juridique = "SARLU" or SP.forme_juridique = "SCI" or SP.forme_juridique = "EIRL") AND j.date_juridique_fait is not null';
        $res_applicable_fait = $this->Getconnexion()->prepare($sql_applicable_fait);
        $res_applicable_fait->execute();
        $resultat_applicable_fait = $res_applicable_fait->fetchAll(); 
            
        
        $sql_non_applicable = 'SELECT SP.id   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
          LIKE "' . $date_bilan . '-'. $i . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and 
          (SP.forme_juridique = "EI" or SP.forme_juridique = "AUTOENTREPRENEUR" or SP.forme_juridique = "BNC") and SP.reviseur_id is not NULL';
        $res_non_applicable = $this->Getconnexion()->prepare($sql_non_applicable);
        $res_non_applicable->execute();
        $resultat_non_applicable = $res_non_applicable->fetchAll();


        $sql_non_applicable_fait = 'SELECT SP.id   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
        suividossdb.pole_juridique j on (j.id_situation = SP.id) LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
          LIKE "' . $date_bilan . '-'. $i . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and 
          (SP.forme_juridique = "EI" or SP.forme_juridique = "AUTOENTREPRENEUR" or SP.forme_juridique = "BNC") AND j.date_juridique_fait is not null';
        $res_non_applicable_fait = $this->Getconnexion()->prepare($sql_non_applicable_fait);
        $res_non_applicable_fait->execute();
        $resultat_non_applicable_fait = $res_non_applicable_fait->fetchAll();    


        $sql_offre = 'SELECT offre,COUNT(*) as nombre   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
        suividossdb.pole_juridique j on (j.id_situation = SP.id) LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
          LIKE "' . $date_bilan . '-'. $i . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and j.offre is not null GROUP BY j.offre';
        $offre = $this->Getconnexion()->prepare($sql_offre);
        $offre->execute();
        $resultat_offre = $offre->fetchAll();   
        
        $sql = 'SELECT SP.id  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
        suividossdb.pole_juridique j on (j.id_situation = SP.id) LEFT JOIN 
        suividossdb.utilisateur Us on (Us.id = j.responsable) LEFT JOIN
        suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
        suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
        WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
        LIKE "' . $date_bilan . '-'. $i . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and j.id_situation is NOT NULL and j.date_juridique_fait is NULL';
        $non_fait= $this->Getconnexion()->prepare($sql);
        $non_fait->execute();
        $resultat_non_fait_jur = $non_fait->fetchAll();

        $sql_s_fait = 'SELECT SP.id  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
        suividossdb.pole_juridique j on (j.id_situation = SP.id) LEFT JOIN 
        suividossdb.utilisateur Us on (Us.id = j.responsable) LEFT JOIN
        suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
        suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
        WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
        LIKE"' . $date_bilan . '-'. $i . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and j.id_situation is NOT NULL and j.date_juridique_fait is NOT NULL';
        $res_s_fait = $this->Getconnexion()->prepare($sql_s_fait);
        $res_s_fait->execute();
        $resultat_s_fait = $res_s_fait->fetchAll();        
       

        array_push($array,
        [
            "dr_reviser" => count($resultat_dr_reviser),
            "applicable" => count($resultat_applicable),
            "applicable_fait" => count($resultat_applicable_fait),
            "nomappli"=>  count($resultat_non_applicable),
            "fait_nomapppli" => count($resultat_non_applicable_fait),
            "resultat_offre" => $resultat_offre,
            "resultat_applicable_of" => count($resultat_applicable_of),
            "resultat_juridique_non_fait" => count($resultat_non_fait_jur),
            "resultat_juridique__fait"=> count($resultat_s_fait)
        ]);
        }
        return  $array;
    }


    public function juridique_gloabl_offre_click ($date_bilan,$condition){

        switch ($condition) {
            case 'nb_fait':
                $sql_s_fait = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.NOM as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
                suividossdb.pole_juridique j on (j.id_situation = SP.id) LEFT JOIN 
                suividossdb.utilisateur Us on (Us.id = j.responsable) LEFT JOIN
                suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
                suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
                WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
                LIKE"' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and j.id_situation is NOT NULL and j.date_juridique_fait is NOT NULL';
                $res_s_fait = $this->Getconnexion()->prepare($sql_s_fait);
                $res_s_fait->execute();
                $resultat_s_fait = $res_s_fait->fetchAll();
                return   $resultat_s_fait;
                break;
            case "nb_restant":
                $sql = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.NOM as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
                suividossdb.pole_juridique j on (j.id_situation = SP.id) LEFT JOIN 
                suividossdb.utilisateur Us on (Us.id = j.responsable) LEFT JOIN
                suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
                suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
                WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
                LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and j.id_situation is NOT NULL and j.date_juridique_fait is NULL';
                $non_fait= $this->Getconnexion()->prepare($sql);
                $non_fait->execute();
                $resultat_non_fait_jur = $non_fait->fetchAll();    
                return $resultat_non_fait_jur;
                break;
            
            default:
            $sql_offre = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.NOM as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.pole_juridique j on (j.id_situation = SP.id) LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
            suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
            LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and j.offre =:offre';
                    $res_offre = $this->Getconnexion()->prepare($sql_offre);
                    $res_offre->execute(array(
                        "offre" =>$condition
                    ));
                    return $res_offre->fetchAll(); 
                break;
        }

       
    }

    public function juridique_gloabl_applicable_click($date_bilan,$condition)
    {
        $array = [];
        switch ($condition) {
            case 'click_affaire_applicable':
                $sql_applicable = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.NOM as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
                suividossdb.pole_juridique j on (j.id_situation = SP.id) LEFT JOIN 
                suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
                suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
                WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
                LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and 
                (SP.forme_juridique = "SAS" or SP.forme_juridique = "SAS" or SP.forme_juridique = "SASU" or SP.forme_juridique = "SARL" or SP.forme_juridique = "EURL" or SP.forme_juridique = "EURL" or SP.forme_juridique = "SARLU" or SP.forme_juridique = "SCI" or SP.forme_juridique = "EIRL") and j.date_juridique_fait is null';
              $res_applicable = $this->Getconnexion()->prepare($sql_applicable);
              $res_applicable->execute();
              $resultat_applicable = $res_applicable->fetchAll();    
      
              array_push($array,
              [
                  "applicable" => $resultat_applicable,
              ]);
              return  $array;
            
              break;

              case 'click_affaire_applicable_affaire':
                $sql_applicable = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.NOM as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
                suividossdb.pole_juridique Pj  on(Pj.id_situation = SP.id) LEFT JOIN 
                suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
                suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
                WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
                LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and 
                (SP.forme_juridique <> "EI" and SP.forme_juridique <> "AUTOENTREPRENEUR" and SP.forme_juridique <> "BNC") and SP.reviseur_id is not NULL and Pj.id_situation is NULL';
              $res_applicable = $this->Getconnexion()->prepare($sql_applicable);
              $res_applicable->execute();
              $resultat_applicable = $res_applicable->fetchAll();    
      
              array_push($array,
              [
                  "applicable" => $resultat_applicable,
              ]);
              return  $array;
            
              break;    
              
              case 'click_affaire_applicable_affaire_app':
                $sql_applicable_app = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.NOM as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
                suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
                suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
                WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
                LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and 
                (SP.forme_juridique <> "EI" and SP.forme_juridique <> "AUTOENTREPRENEUR" and SP.forme_juridique <> "BNC") and SP.reviseur_id is not NULL';
              $res_applicable_p = $this->Getconnexion()->prepare($sql_applicable_app);
              $res_applicable_p->execute();
              $resultat_applicable_s = $res_applicable_p->fetchAll();    
      
              array_push($array,
              [
                  "applicable_app" => $resultat_applicable_s,
              ]);
              return  $array;
            
              break;               


              case 'click_fait__applicable':
                $sql_applicable = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.NOM as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
                suividossdb.pole_juridique j on (j.id_situation = SP.id) LEFT JOIN 
                  suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
                  suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
                  WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
                  LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and 
                  (SP.forme_juridique = "SAS" or SP.forme_juridique = "SAS" or SP.forme_juridique = "SASU" or SP.forme_juridique = "SARL" or SP.forme_juridique = "EURL" or SP.forme_juridique = "EURL" or SP.forme_juridique = "SARLU" or SP.forme_juridique = "SCI" or SP.forme_juridique = "EIRL") AND j.date_juridique_fait is not null';
              $res_applicable = $this->Getconnexion()->prepare($sql_applicable);
              $res_applicable->execute();
              $resultat_applicable = $res_applicable->fetchAll();    
      
              array_push($array,
              [
                  "applicable" => $resultat_applicable,
              ]);
              return  $array;
            
              break;                  
              

              
            
            case 'click_affaire_non_applicable': 
                $sql_applicable = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.NOM as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
                suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
                suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
                WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
                LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and 
                (SP.forme_juridique = "EI" or SP.forme_juridique = "AUTOENTREPRENEUR" or SP.forme_juridique = "BNC")';
                $res_applicable = $this->Getconnexion()->prepare($sql_applicable);
                $res_applicable->execute();
                $resultat_applicable = $res_applicable->fetchAll();    
        
                array_push($array,
                [
                    "nonapplicable" => $resultat_applicable,
                ]);
                return  $array;
                break;

                case 'click_offre': 
                    $sql_applicable = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.NOM as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert    FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
                    suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
                    suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
                    WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
                    LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL';
                    $offre = $this->Getconnexion()->prepare($sql_applicable);
                    $offre->execute();
                    $resultat_offre = $offre->fetchAll();    
            
                    array_push($array,
                    [
                        "resultat_offre" => $resultat_offre,
                    ]);
                    return  $array;
                    break;   
                    
                    case 'click_restant_applicable': 
                        $sql_applicable = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.NOM as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
                        suividossdb.pole_juridique j on (j.id_situation = SP.id) LEFT JOIN 
                        suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
                        suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
                        WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
                        LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and 
                        (SP.forme_juridique = "EI" or SP.forme_juridique = "AUTOENTREPRENEUR" or SP.forme_juridique = "BNC") AND j.date_juridique_fait is null';
                        $offre = $this->Getconnexion()->prepare($sql_applicable);
                        $offre->execute();
                        $resultat_offre = $offre->fetchAll();    
                
                        array_push($array,
                        [
                            "nonapplicable" => $resultat_offre,
                        ]);
                        return  $array;
                        break;    
                        
                        case 'click_fait_nonapplicable': 
                            $sql_applicable = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.NOM as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
                            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
                            suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
                            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
                            LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and 
                            (SP.forme_juridique = "EI" or SP.forme_juridique = "AUTOENTREPRENEUR" or SP.forme_juridique = "BNC") and SP.reviseur_id is not NULL';
                            $offre = $this->Getconnexion()->prepare($sql_applicable);
                            $offre->execute();
                            $resultat_offre = $offre->fetchAll();    
                    
                            array_push($array,
                            [
                                "nonapplicable" => $resultat_offre,
                            ]);
                            return  $array;
                            break;                          

                        
                    
        }

 
    }
    

    public function list_general_avec_nombre_image($idequip, $iduser, $annee)
    {
        //SELECT * FROM situation_par_portfeuil WHERE date_cloturation is null or date_cloturation = ""
        $arrayidequip = explode("#", $idequip);
        $conditionEquipe = "";
        foreach ($arrayidequip as $value) {
            $conditionEquipe .= ' OR Eq.id = "' . $value . '"';
        }
        $conditionEquipe = "(" . substr(str_replace(' OR Eq.id = ""', '', $conditionEquipe), 3) . ")";


        $arrayannee = explode("#", $annee);
        $conditionannee = "";
        foreach ($arrayannee as $value) {
            if ($value == "Vide") {
                $conditionannee .= " OR S.date_cloturation is null OR date_cloturation = '' ";
            } else {
                $conditionannee .= " OR S.date_cloturation LIKE '" . $value . "%'";
            }
        }
        $conditionannee =  "(" . substr(str_replace(" OR S.date_cloturation LIKE '%'", '', $conditionannee), 3) . ")";

        $sql = 'SELECT DISTINCT 
        u1.nom_mail as cde,u2.nom_mail as reference,u3.nom_mail as cdm_j,u4.nom_mail as ass,u5.nom_mail as os,u7.nom_mail as manage_fr ,u8.nom_mail as cdm_frr,
        u6.nom_mail as prepa,
        cd.presentant,cd.tel,cd.mail as mail_presentant,
        u1.prenom_mail as prenom_mail_cde, u1.mail as mail_cde,
        u2.prenom_mail as prenom_mail_reviseur,u2.mail as mail_rev,
        u3.prenom_mail as prenom_mail_cdm,u3.mail as mail__cdm,
        u4.prenom_mail as prenom_mail_ass,u4.mail as mail_ss,
        u5.prenom_mail as prenom_mail_os,u5.mail as mail_os,
        u6.prenom_mail as prenom_mail_prepa,u6.mail as mail_prepa,        

        D.id as id_dossier,
        S.id as situation_portfeuil_id,
        Eq.code as code,
        D.nom as dossier, 
        S.idsituation_dossier as sit_dossier,
        S.cmtKarlit as cmt,
        S.date_cloturation as cloture,
        S.regime_dimpos as rg_d_imp1,
        S.regime_dimpos2 as rg_d_imp2,
        S.forme_juridique as frm_jrdq,
        S.dpcoala as dp_coala,
        S.tvregime as regime,
        S.tvadate_echeance as dt_ech,
        S.date_de_depot_dernier_keobiz
        S.situation_trait_karlit as sit_karlit,
        S.date_dernier_maj as date_maj,
        S.etat_bilan as etat_bl,
        S.date_envoie_bilan_karlit as dt_d_envoie_bl_krlt,
        U.nom as cdm,
        S.date_rev_bilan_fr as dt_rev_sup_fr,
        S.observation as obs_sup_fr,
        max(P.date_pes) as dernier_pes,
        max(R.date_relance) as dernier_relance,
        S.date_dernier_appel_client dernier_appel_client,
        S.Activite as Activite,
        S.social as social, 
        S.tns as tns,
        S.releve as releve,
        S.mem_autre_equipe as mem_autre_equipe,
        S.commentaire_releve as commentaire_releve,
        S.achat as achat,
        S.vente as vente,
        Rs.siren,siret,Rs.activite,
        Rs.fs_coala,fs_apptream,Rs.table_banque,
        S.commentaire_et_autre as commentaire_et_autre,Rs.activite as Activite_final FROM suividossdb.situation_par_portfeuil S
        LEFT JOIN dossier D on (D.id = S.iddoss) 
        LEFT JOIN utilisateur u1 on(u1.id = D.ll) 
        LEFT JOIN utilisateur u2 on(u2.id = D.reference_t) 
        LEFT JOIN utilisateur u3 on(u3.id = D.cdm) 
        LEFT JOIN utilisateur u4 on(u4.id = D.ass) 
        LEFT JOIN utilisateur u5 on(u5.id = D.os)  
        LEFT JOIN utilisateur u6 on(u6.id = D.prepa)  
        LEFT JOIN contact_dossier cd on(cd.id_dossier = D.id)  LEFT JOIN
        suividossdb.pes P on(P.iddoss = S.id) LEFT JOIN suividossdb.relance R on(R.iddoss = S.id) 
        LEFT JOIN utilisateur U on(U.id = S.utilisateur_id) LEFT JOIN suividossdb.equipe Eq on(D.equip_id = Eq.id) 
        LEFT JOIN suividossdb.reseignement_juridique Rs on(D.id = Rs.iddossier) 
        LEFT JOIN suividossdb.envoie EN on(EN.dossier_id = D.id) 
         WHERE ' . $conditionEquipe . '  and  ' . $conditionannee .
            ' group by S.id order by Eq.code';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $respons = $res->fetchAll();
        return $respons;
    }




    public function click_detail_suivi($id)
    {

        $sql = 'SELECT DISTINCT 
        D.id as id_dossier,
        S.id as situation_portfeuil_id,
        Eq.code as code,
        D.nom as dossier, 
        S.idsituation_dossier as sit_dossier,
        S.cmtKarlit as cmt,
        S.date_cloturation as cloture,
        S.regime_dimpos as rg_d_imp1,
        S.regime_dimpos2 as rg_d_imp2,
        S.forme_juridique as frm_jrdq,
        S.dpcoala as dp_coala,
        S.tvregime as regime,
        S.tvadate_echeance as dt_ech,
        S.situation_trait_karlit as sit_karlit,
        S.date_dernier_maj as date_maj,
        S.etat_bilan as etat_bl,
        S.date_envoie_bilan_karlit as dt_d_envoie_bl_krlt,
        U.nom as cdm,
        S.date_rev_bilan_fr as dt_rev_sup_fr,
        S.observation as obs_sup_fr,
        max(P.date_pes) as dernier_pes,
        max(R.date_relance) as dernier_relance,
        S.date_dernier_appel_client dernier_appel_client,
        S.Activite as Activite,
        S.social as social, 
        S.tns as tns,
        S.releve as releve,
        S.mem_autre_equipe as mem_autre_equipe,
        S.commentaire_releve as commentaire_releve,
        S.achat as achat,
        S.vente as vente,
        S.niveau_risque,
        U2.nom as nom_revue,
        U3.nom as nom_expert,
        S.expert_list,
        S.commentaire_et_autre as commentaire_et_autre,Rs.activite as Activite_final
        FROM suividossdb.situation_par_portfeuil S
        LEFT JOIN dossier D on (D.id = S.iddoss) LEFT JOIN 
        suividossdb.utilisateur U2 ON(S.reviseur_id = U2.id) LEFT JOIN
        suividossdb.utilisateur U3 ON(S.expert_id = U3.id) LEFT JOIN
        suividossdb.pes P on(P.iddoss = S.id) LEFT JOIN suividossdb.relance R on(R.iddoss = S.id) 
        LEFT JOIN utilisateur U on(U.id = S.utilisateur_id) LEFT JOIN suividossdb.equipe Eq on(D.equip_id = Eq.id) 
        LEFT JOIN suividossdb.reseignement_juridique Rs on(D.id = Rs.iddossier) 
         WHERE S.id=:id  group by S.id order by Eq.code';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id' => $id
        ]);
        $respons = $res->fetchAll();
        return $respons;
    }

    public function select_chif_aff($idequip, $condition, $annee)
    {
        $arrayidequip = explode("#", $idequip);
        $conditionEquipe = "";
        foreach ($arrayidequip as $value) {
            $conditionEquipe .= ' OR Eq.id = "' . $value . '"';
        }
        $conditionEquipe = "(" . substr(str_replace(' OR Eq.id = ""', '', $conditionEquipe), 3) . ")";

        $arrayannee = explode("#", $annee);
        $conditionannee = "";
        foreach ($arrayannee as $value) {
            $conditionannee .= " OR N.annee = '" . $value . "'";
        }

        $conditionannee =  "(" .  str_replace(" OR N.annee = ''", '', $conditionannee) . ")";

        $conditionannee = str_replace("( OR ", "(", $conditionannee);

        $varwhere = "";
        if ($condition == "0") {
            $varwhere = ' AND Eq.code IS NOT NULL AND S.idsituation_dossier <> "MA" and  S.idsituation_dossier <> "MS"';
        }
        if ($condition == "01") {
            $varwhere = ' AND Eq.code IS NOT NULL AND S.idsituation_dossier <> "MS" ';
        }

        if ($condition == "02") {
            $varwhere = ' AND Eq.code IS NOT NULL AND S.idsituation_dossier <> "MA"';
        }

        if ($condition == "012") {
            $varwhere = ' AND Eq.code IS NOT NULL';
        }

        $sql = 'SELECT distinct 
        Eq.nom as equipe,
        D.nom as nom_de_dossier,
        S.idsituation_dossier as situation_dossier,
        N.annee ,
        N.nbligne as nombre_de_ligne,
        N.chiffreAffaire as chiffre_d_affaire
         FROM suividossdb.nbligne_chfaffaire N LEFT join suividossdb.situation_par_portfeuil S on(S.iddoss = N.id_situation) 
        left join suividossdb.dossier D on(D.id = N.id_situation) LEFT JOIN equipe Eq on(Eq.id = D.equip_id) WHERE ' . $conditionEquipe . '  and  ' . $conditionannee .
            $varwhere .   ' order by Eq.code,D.nom';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $respons = $res->fetchAll();
        return $respons;
    }


    public function list_general_dernier_exo($idequip, $iduser)
    {
        $arrayresultat = [];
        $arrayreponse = [];
        $arrayidequip = explode("#", $idequip);
        $conditionEquipe = "";
        foreach ($arrayidequip as $value) {
            $conditionEquipe .= ' OR equip_id = "' . $value . '"';
        }
        $conditionEquipe = "(" . substr(str_replace(' OR Eq.id = ""', '', $conditionEquipe), 3) . ")";

        $sql = 'SELECT 
          u1.nom_mail as cde,u2.nom_mail as reference,u3.nom_mail as cdm_j,u4.nom_mail as ass,u5.nom_mail as os,u6.nom_mail as prepa, u7.nom_mail as manage_fr   ,u8.nom_mail as cdm_frr,
        cd.presentant,cd.tel,cd.mail as mail_presentant,
            
        u1.prenom_mail as prenom_mail_cde, u1.mail as mail_cde,
        u2.prenom_mail as prenom_mail_reviseur,u2.mail as mail_rev,
        u3.prenom_mail as prenom_mail_cdm,u3.mail as mail__cdm,
        u4.prenom_mail as prenom_mail_ass,u4.mail as mail_ss,
        u5.prenom_mail as prenom_mail_os,u5.mail as mail_os,
        u6.prenom_mail as prenom_mail_prepa,u6.mail as mail_prepa,         

        u7.prenom_mail as prenom_manag,u7.mail as mail_mamanag,
        u8.prenom_mail as prenom_cdm_m ,u8.mail as mail_cdm_m,
            
            D.id as id_dossier,
                             S.id as situation_portfeuil_id,
                             Eq.code as code,
                             D.nom as dossier, 
                             S.idsituation_dossier as sit_dossier,
                             S.cmtKarlit as cmt,
                             tmp.dern_date as cloture,
                             S.regime_dimpos as rg_d_imp1,
                             S.regime_dimpos2 as rg_d_imp2,
                             S.forme_juridique as frm_jrdq,
                             S.dpcoala as dp_coala,
                             S.tvregime as regime,
                             S.tvadate_echeance as dt_ech,
                             S.date_de_depot_dernier_keobiz,
                             S.situation_trait_karlit as sit_karlit,
                             S.date_dernier_maj as date_maj,
                             S.etat_bilan as etat_bl,
                             S.date_envoie_bilan_karlit as dt_d_envoie_bl_krlt,
                             U.nom as cdm,
                             S.date_rev_bilan_fr as dt_rev_sup_fr,
                             S.observation as obs_sup_fr,
                             S.date_dernier_appel_client dernier_appel_client,
                             S.Activite as Activite,
                             S.social as social, 
                             S.tns as tns,
                             S.releve as releve,
                             S.mem_autre_equipe as mem_autre_equipe,
                             S.commentaire_releve as commentaire_releve,
                             S.achat as achat,
                             S.vente as vente,
                             Rs.siren,siret,Rs.activite,
                                Rs.fs_coala,fs_apptream,Rs.table_banque,

                             max(P.date_pes) as dernier_pes,
                             max(R.date_relance) as dernier_relance,
                             S.commentaire_et_autre as commentaire_et_autre,Rs.activite as Activite_final,
                             "" as sumimage,
        if(S.situation_trait_karlit = "EC REVISION PRECOMPTA",EN.nom_revision_precompta,if(S.situation_trait_karlit = "EC SAISI P.C",EN.nom_precompta,if(S.situation_trait_karlit = "EC REVISION",EN.nom_cdm,if(S.situation_trait_karlit = "EC SAISI ASS.",EN.nom_assistant,if(S.situation_trait_karlit = "A TRAITER",EN.responsable_reception,if(S.situation_trait_karlit = "EN ATTENTE",EN.nom_cdm,if(S.situation_trait_karlit = "A REVISER P.C",EN.nom_precompta,if(S.situation_trait_karlit = "FINI REVISION PRECOMPTA",EN.nom_revision_precompta,if(S.situation_trait_karlit = "A REVISER",EN.nom_assistant,"??")))))))))  AS encours_de 
         FROM suividossdb.situation_par_portfeuil S 
        LEFT JOIN dossier D on (D.id = S.iddoss)  
        LEFT JOIN utilisateur u1 on(u1.id = D.ll) 
        LEFT JOIN utilisateur u2 on(u2.id = D.reference_t) 
        LEFT JOIN utilisateur u3 on(u3.id = D.cdm) 
        LEFT JOIN utilisateur u4 on(u4.id = D.ass) 
        LEFT JOIN utilisateur u5 on(u5.id = D.os) 
        LEFT JOIN utilisateur u6 on(u6.id = D.prepa)  
        LEFT JOIN utilisateur u7 on(u7.id = D.manger_fr)
        LEFT JOIN utilisateur u8 on(u8.id = D.cdm_fr)
        LEFT JOIN contact_dossier cd on(cd.id_dossier = D.id)  LEFT JOIN 
        suividossdb.pes P on(P.iddoss = S.id) LEFT JOIN suividossdb.relance R on(R.iddoss = S.id) 
        LEFT JOIN utilisateur U on(U.id = S.utilisateur_id) LEFT JOIN suividossdb.equipe Eq on(D.equip_id = Eq.id)
        LEFT JOIN suividossdb.reseignement_juridique Rs on(D.id = Rs.iddossier) 
         LEFT JOIN
         (
             SELECT iddoss , MAX(date_cloturation) AS dern_date
             FROM suividossdb.situation_par_portfeuil
             GROUP BY iddoss
         ) tmp 
             ON (tmp.iddoss = S.iddoss And tmp.dern_date = S.date_cloturation ) 
             LEFT JOIN suividossdb.envoie EN on(EN.dossier_id = D.id) 
              WHERE ' . $conditionEquipe . ' AND tmp.dern_date is not null AND tmp.dern_date <> "" AND D.equip_id <> "" AND D.equip_id is not null GROUP BY tmp.iddoss  order by Eq.code,D.nom';

        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $responsfin = $res->fetchAll();
        if (count($responsfin) > 0)
            array_push($arrayreponse, $responsfin);

        return  $responsfin;
    }

    public function table_option($table)
    {
        $sql = "select * from suividossdb." . $table;
        $rs = $this->Getconnexion()->prepare($sql);
        $rs->execute();
        $resultat = $rs->fetchAll();
        return $resultat;
    }

    public function recherche_attribution($data_param,$valeur,$param)
    {

        if($param < 6){
            $sql = "select * from utilisateur WHERE (nom LIKE '$valeur%' OR prenom = '$valeur' ) AND post_id = $data_param AND pays_id = 5";
            $rs = $this->Getconnexion()->prepare($sql);
            $rs->execute();
            $resultat = $rs->fetchAll();
            if(count($resultat) > 0){
                return $resultat;
            }
        }else{
            $sql = "select * from utilisateur WHERE (mail LIKE '$valeur%' OR login LIKE '$valeur%' ) AND pays_id = 2";
            $rs = $this->Getconnexion()->prepare($sql);
            $rs->execute();
            $resultat = $rs->fetchAll();
            if(count($resultat) > 0){
                return $resultat;
            }            
        }
    } 

    public function save_attrib($data_param,$valeur_id,$iddossier)
    {
        if($valeur_id == ""){$valeur_id =null ;}
        $sql = "UPDATE dossier SET  $data_param =:valeur_id WHERE id =:id";
        $rs = $this->Getconnexion()->prepare($sql);
        $rs->execute([
            "id" => $iddossier,
            "valeur_id" => $valeur_id
        ]);
    }     

    public function select_attrib($iddossier)
    {

        $sql = "SELECT 
        u1.prenom_mail as prenom_cde,
        u2.prenom_mail as prenom_reference,
        u3.prenom_mail as prenom_cdm_j,
        u4.prenom_mail as prenom_ass,
        u5.prenom_mail as prenom_os,
        u6.prenom_mail as prenom_prepa,

        u7.nom_mail as prenom_manager_fr,
        u8.nom_mail as prenom_cdm_fr,

        u1.prenom as prenom_cde_s,
        u2.prenom as prenom_reference_s,
        u3.prenom as prenom_cdm_s,
        u4.prenom as prenom_ass_s,
        u5.prenom as prenom_os_s,
        u6.prenom as prenom_prepa_s,

        u7.prenom_mail as prenom_manager_fr_s,
        u8.prenom_mail as prenom_cdm_fr_s,



          u1.nom as cde,u2.nom as reference,u3.nom as cdm_j,u4.nom as ass,u5.nom as os,u6.nom as prepa, u7.nom as mg_fr, u8.nom as cdm_frr 
        FROM suividossdb.dossier d 
        LEFT JOIN utilisateur u1 on(u1.id = d.ll) 
        LEFT JOIN utilisateur u2 on(u2.id = d.reference_t) 
        LEFT JOIN utilisateur u3 on(u3.id = d.cdm) 
        LEFT JOIN utilisateur u4 on(u4.id = d.ass) 
        LEFT JOIN utilisateur u5 on(u5.id = d.os) 
        LEFT JOIN utilisateur u6 on(u6.id = d.prepa) 
        LEFT JOIN utilisateur u7 on(u7.id = d.manger_fr) 
        LEFT JOIN utilisateur u8 on(u8.id = d.cdm_fr) 
        WHERE d.id =:id";
        $rs = $this->Getconnexion()->prepare($sql);
        $rs->execute([
            "id" => $iddossier,
        ]);

        $resultat = $rs->fetchAll();
        return $resultat;

    }     

    

    
    

    public function contact_dossier($id_dossier)
    {
        $sql = "SELECT * FROM suividossdb.contact_dossier where id_dossier =:id_dossier";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id_dossier' => $id_dossier
        ]);
        $resultat = $res->fetchAll();
        return $resultat;
    }
    public function save_contact_dossier($id_dossier, $presantant_client, $phone_client, $mail_client)
    {
        if (count($this->contact_dossier($id_dossier))  == 0) {
            $sqld = "INSERT INTO suividossdb.contact_dossier (presentant, tel, mail,id_dossier) VALUES (:presentant, :tel, :mail, :id_dossier)";
            $stmt = $this->Getconnexion()->prepare($sqld);
            $stmt->execute([
                'presentant' => $presantant_client,
                'tel' => $phone_client,
                'mail' => $mail_client,
                'id_dossier' => $id_dossier,
            ]);
        } else {
            $sqld = "UPDATE suividossdb.contact_dossier SET presentant=:presentant,tel=:tel,mail=:mail where id_dossier =:id_dossier";
            $stmt = $this->Getconnexion()->prepare($sqld);
            $stmt->execute([
                'presentant' => $presantant_client,
                'tel' => $phone_client,
                'mail' => $mail_client,
                'id_dossier' => $id_dossier,
            ]);
        }
        return "Enregistrement Ok";
    }
/************************************************************* */
    public function si_add_new_cloture_exist($id_dossier, $date_cloturation)
    {
        $sql = "SELECT * FROM suividossdb.situation_par_portfeuil where iddoss =:id_dossier and date_cloturation LIKE :date_cloturation";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id_dossier' => $id_dossier,
            'date_cloturation' => substr($date_cloturation, 0, 7) . "%"
        ]);
        $resultat = $res->fetchAll();
        return $resultat;
    }


    public function add_new_cloture(
        $id_dossier,
        $id_situation,
        $date_cloturation,
        $regime_dimpos,
        $regime_dimpos2,
        $forme_juridique,
        $dpcoala,
        $tvregime,
        $tvadate_echeance,
        $affiche_dans_stat

    ) {
        if (count($this->si_add_new_cloture_exist($id_dossier, $date_cloturation))  == 0) {
            if ($affiche_dans_stat == "n_affiche_pas") {
                $affiche_dans_stat = 1;
            }else{
                $affiche_dans_stat = null;
            }
            
            $sqld = "INSERT INTO suividossdb.situation_par_portfeuil
             (iddoss,idsituation_dossier,date_cloturation, regime_dimpos, regime_dimpos2,forme_juridique,dpcoala,tvregime,tvadate_echeance,affiche_dans_stat)
              VALUES (:iddoss,:idsituation_dossier,:date_cloturation, :regime_dimpos, :regime_dimpos2,:forme_juridique,:dpcoala,:tvregime,:tvadate_echeance,:affiche_dans_stat)";
            $stmt = $this->Getconnexion()->prepare($sqld);
            $stmt->execute([
                'iddoss' => $id_dossier,
                'idsituation_dossier' => $id_situation,
                'date_cloturation' => $date_cloturation,
                'regime_dimpos' => $regime_dimpos,
                'regime_dimpos2' => $regime_dimpos2,
                'forme_juridique' => $forme_juridique,
                'dpcoala' => $dpcoala,
                'tvregime' => $tvregime,
                'tvadate_echeance' => $tvadate_echeance,
                'affiche_dans_stat' => $affiche_dans_stat
            ]);
            return "nouveau cloture ok";
        } else {
            return "Attention cloture existant !";
        }
    }



    public function contact_sie($id_dossier)
    {
        $sql = "SELECT * FROM suividossdb.contact_sie where iddossier =:id_dossier";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id_dossier' => $id_dossier
        ]);
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function save_contact_sie($id_dossier, $tel, $mail)
    {
        if (count($this->contact_sie($id_dossier))  == 0) {
            $sqld = "INSERT INTO suividossdb.contact_sie (tel, mail,iddossier) VALUES (:tel, :mail, :id_dossier)";
            $stmt = $this->Getconnexion()->prepare($sqld);
            $stmt->execute([
                'tel' => $tel,
                'mail' => $mail,
                'id_dossier' => $id_dossier,
            ]);
        } else {
            $sqld = "UPDATE suividossdb.contact_sie SET tel=:tel,mail=:mail where iddossier =:id_dossier";
            $stmt = $this->Getconnexion()->prepare($sqld);
            $stmt->execute([
                'tel' => $tel,
                'mail' => $mail,
                'id_dossier' => $id_dossier,
            ]);
        }
        return "Enregistrement Ok";
    }


    public function reseignement_juridique($id_dossier)
    {
        $sql = "SELECT * FROM suividossdb.reseignement_juridique where iddossier =:id_dossier";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id_dossier' => $id_dossier
        ]);
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function save_reseignement_juridique($id_dossier, $forme_juridique, $siren, $siret, $activite, $adress, $capital_social, $rcs, $dernier_maj, $gerant,$fs_coala,$fs_apptream,$table_banque)
    {
        if (count($this->reseignement_juridique($id_dossier))  == 0) {
            $sqld = "INSERT INTO suividossdb.reseignement_juridique (forme_juridique, siren,siret,activite,adress,capital_social,rcs,dernier_maj,gerant,iddossier,fs_coala,fs_apptream,table_banque) 
            VALUES (:forme_juridique, :siren,:siret,:activite,:adress,:capital_social,:rcs,:dernier_maj,:gerant,:iddossier,:fs_coala,:fs_apptream,:table_banque)";
            $stmt = $this->Getconnexion()->prepare($sqld);
            $stmt->execute([
                'forme_juridique' => $forme_juridique,
                'siren' => $siren,
                'siret' => $siret,
                'activite' => $activite,
                'adress' => $adress,
                'capital_social' => $capital_social,
                'rcs' => $rcs,
                'dernier_maj' => $dernier_maj,
                'gerant' => $gerant,
                'iddossier' => $id_dossier,

                'fs_coala' => $fs_coala,
                'fs_apptream' => $fs_apptream,
                'table_banque' => $table_banque,
            ]);
        } else {
            $sqld = "UPDATE suividossdb.reseignement_juridique SET 
            forme_juridique=:forme_juridique, siren=:siren,siret=:siret,activite=:activite,adress=:adress,
            capital_social=:capital_social,rcs=:rcs,dernier_maj=:dernier_maj,gerant=:gerant,fs_coala=:fs_coala,fs_apptream=:fs_apptream,table_banque=:table_banque where iddossier =:id_dossier";
            $stmt = $this->Getconnexion()->prepare($sqld);
            $stmt->execute([
                'forme_juridique' => $forme_juridique,
                'siren' => $siren,
                'siret' => $siret,
                'activite' => $activite,
                'adress' => $adress,
                'capital_social' => $capital_social,
                'rcs' => $rcs,
                'dernier_maj' => $dernier_maj,
                'gerant' => $gerant,
                'id_dossier' => $id_dossier,

                'fs_coala' => $fs_coala,
                'fs_apptream' => $fs_apptream,
                'table_banque' => $table_banque,
            ]);
        }
        return "Enregistrement Ok";
    }



    public function chiffre_d_affaire($id_dossier)
    {
        $sql = "SELECT * FROM suividossdb.nbligne_chfaffaire where id_situation =:id_dossier";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id_dossier' => $id_dossier
        ]);
        $resultat = $res->fetchAll();
        return $resultat;
    }


    public function save_chiffre_d_affaire($id_dossier, $chiffreAffaire, $nbligne, $annee)
    {
        $sqld = "INSERT INTO suividossdb.nbligne_chfaffaire (chiffreAffaire, nbligne,annee,id_situation) 
        VALUES (:chiffreAffaire, :nbligne,:annee,:id_dossier)";
        $stmt = $this->Getconnexion()->prepare($sqld);
        $stmt->execute([
            'chiffreAffaire' => $chiffreAffaire,
            'nbligne' => $nbligne,
            'annee' => $annee,
            'id_dossier' => $id_dossier,
        ]);
        return "Enregistrement Ok";
    }

    public function supre_chiffre_d_affaire($id_dossier)
    {
        $sqld = "DELETE FROM suividossdb.nbligne_chfaffaire WHERE id =:id";
        $stmt = $this->Getconnexion()->prepare($sqld);
        $stmt->execute([
            'id' => $id_dossier,
        ]);
        return "Enregistrement Ok";
    }

    public function suprimer_cloture($id_situation, $id_user, $action)
    {

        $sql_s = "INSERT INTO suividossdb.historique(user_id,date_d_action,action,code_machine) 
                VALUES (:user_id,:date_d_action,:action,:code_machine)";
        $res_s = $this->Getconnexion()->prepare($sql_s);
        $res_s->execute(array(
            'user_id' => $id_user,
            'date_d_action' => date("Y-m-d H:i:s", strtotime('+3 hour')),
            'action' => $action,
            'code_machine' => gethostname(),
        ));
        $sqld = "DELETE FROM suividossdb.situation_par_portfeuil WHERE id =:id";
        $stmt = $this->Getconnexion()->prepare($sqld);
        $stmt->execute([
            'id' => $id_situation,
        ]);
        return "Ok";
    }


    public function pole_juridique($id_dossier)
    {
        $sql = "SELECT * FROM suividossdb.pole_juridique where id_dossier =:id_dossier";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id_dossier' => $id_dossier
        ]);
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function save_pole_juridique(
        $id_dossier,
        $juridique_annuel,
        $juridique_exceptionnel,
        $juridique_mixte,
        $mandat_banque,
        $projet,
        $dossier_complet,
        $depot_au_greffe,
        $envoie_mail_de_bienvenue,
        $saisie_ldm_ebp_et_hubspot,
        $creation_efi,
        $creation_sepa
    ) {
        if (count($this->pole_juridique($id_dossier))  == 0) {
            $sqld = "INSERT INTO suividossdb.pole_juridique (id_dossier,juridique_annuel, juridique_exceptionnel, juridique_mixte,
        mandat_banque,projet,dossier_complet,depot_au_greffe,envoie_mail_de_bienvenue,saisie_ldm_ebp_et_hubspot,creation_efi,creation_sepa) 
        VALUES (:id_dossier,:juridique_annuel, :juridique_exceptionnel, :juridique_mixte,
        :mandat_banque,:projet,:dossier_complet,:depot_au_greffe,:envoie_mail_de_bienvenue,:saisie_ldm_ebp_et_hubspot,:creation_efi,:creation_sepa)";
            $stmt = $this->Getconnexion()->prepare($sqld);
            $stmt->execute([
                'id_dossier' => $id_dossier,
                'juridique_annuel' => $juridique_annuel,
                'juridique_exceptionnel' => $juridique_exceptionnel,
                'juridique_mixte' => $juridique_mixte,
                'mandat_banque' => $mandat_banque,
                'projet' => $projet,
                'dossier_complet' => $dossier_complet,
                'depot_au_greffe' => $depot_au_greffe,
                'envoie_mail_de_bienvenue' => $envoie_mail_de_bienvenue,
                'saisie_ldm_ebp_et_hubspot' => $saisie_ldm_ebp_et_hubspot,
                'creation_efi' => $creation_efi,
                'creation_sepa' => $creation_sepa
            ]);
            return "Enregistrement Ok";
        } else {
            $sqld = "UPDATE suividossdb.pole_juridique SET 
            juridique_annuel =:juridique_annuel,
            juridique_exceptionnel=:juridique_exceptionnel,
            juridique_mixte=:juridique_mixte,
            mandat_banque=:mandat_banque,
            projet=:projet,
            dossier_complet=:dossier_complet,
            depot_au_greffe=:depot_au_greffe,
            envoie_mail_de_bienvenue=:envoie_mail_de_bienvenue,
            saisie_ldm_ebp_et_hubspot=:saisie_ldm_ebp_et_hubspot,
            creation_efi=:creation_efi,
            creation_sepa =:creation_sepa 
            where id_dossier =:id_dossier 
           ";
            $stmt = $this->Getconnexion()->prepare($sqld);
            $stmt->execute([
                'id_dossier' => $id_dossier,
                'juridique_annuel' => $juridique_annuel,
                'juridique_exceptionnel' => $juridique_exceptionnel,
                'juridique_mixte' => $juridique_mixte,
                'mandat_banque' => $mandat_banque,
                'projet' => $projet,
                'dossier_complet' => $dossier_complet,
                'depot_au_greffe' => $depot_au_greffe,
                'envoie_mail_de_bienvenue' => $envoie_mail_de_bienvenue,
                'saisie_ldm_ebp_et_hubspot' => $saisie_ldm_ebp_et_hubspot,
                'creation_efi' => $creation_efi,
                'creation_sepa' => $creation_sepa
            ]);
            return "Enregistrement Ok";
        }
    }

    public function pes_relance($id_dossier, $id_situtation)
    {
        $sql = "SELECT * FROM suividossdb.pes where id_situation =:id_dossier and iddoss=:id_situation";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id_dossier' => $id_dossier,
            'id_situation' => $id_situtation
        ]);
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function click_relance($id_dossier, $id_situtation)
    {
        $sql = "SELECT * FROM suividossdb.relance where id_situation =:id_dossier and iddoss=:id_situation";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id_dossier' => $id_dossier,
            'id_situation' => $id_situtation
        ]);
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function click_relance_pieces($id_dossier, $id_situtation)
    {
        $sql = "SELECT * FROM suividossdb.relance_piece where id_situation =:id_dossier and iddoss=:id_situation";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id_dossier' => $id_dossier,
            'id_situation' => $id_situtation
        ]);
        $resultat = $res->fetchAll();
        return $resultat;
    }



    public function click_relance_banque($id_dossier, $id_situtation)
    {
        $sql = "SELECT * FROM suividossdb.piecerelance_banque where id_situation =:id_dossier and iddoss=:id_situation";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id_dossier' => $id_dossier,
            'id_situation' => $id_situtation
        ]);
        $resultat = $res->fetchAll();
        return $resultat;
    }



    public function save_pes_relance($id_dossier, $id_situtation, $pes_num, $date_pes)
    {
        $sql = "INSERT INTO suividossdb.pes (pes_num,date_pes,iddoss,id_situation) VALUES (:pes_num,:date_pes,:iddoss,:id_situation)";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'pes_num' => $pes_num,
            'date_pes' => $date_pes,
            'iddoss' => $id_situtation,
            'id_situation' => $id_dossier
        ]);
        return "Enregistrement Ok";
    }

    public function save_relance($id_dossier, $id_situtation, $relance_num, $date_relance)
    {
        $sql = "INSERT INTO suividossdb.relance (relance_num,date_relance,iddoss,id_situation) VALUES (:relance_num,:date_relance,:iddoss,:id_situation)";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'relance_num' => $relance_num,
            'date_relance' => $date_relance,
            'iddoss' => $id_situtation,
            'id_situation' => $id_dossier
        ]);
        return "Enregistrement Ok";
    }

    public function save_relancebanque($id_dossier, $id_situtation, $relance_pieces_num, $relance_date_piece)
    {
        $sql = "INSERT INTO suividossdb.piecerelance_banque (relance_num,date_relance,iddoss,id_situation) VALUES (:relnce_pieces_num,:relance_date_piece,:iddoss,:id_situation)";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'relnce_pieces_num' => $relance_pieces_num,
            'relance_date_piece' => $relance_date_piece,
            'iddoss' => $id_situtation,
            'id_situation' => $id_dossier
        ]);
        return "Enregistrement Ok";
    }

    public function save_relancepieces($id_dossier, $id_situtation, $relance_pieces_num, $relance_date_piece)
    {
        $sql = "INSERT INTO suividossdb.relance_piece (pes_num,date_pes,iddoss,id_situation) VALUES (:relnce_pieces_num,:relance_date_piece,:iddoss,:id_situation)";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'relnce_pieces_num' => $relance_pieces_num,
            'relance_date_piece' => $relance_date_piece,
            'iddoss' => $id_situtation,
            'id_situation' => $id_dossier
        ]);
        return "Enregistrement Ok";
    }


    public function save_modif_pes_relance($id_pes, $dat_pes, $date_retour)
    {
        $sql = "UPDATE suividossdb.pes SET date_pes=:date_pes,date_retour=:date_retour WHERE id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'date_pes' => $dat_pes,
            'date_retour' => $date_retour,
            'id' => $id_pes,
        ]);
        return "Enregistrement Ok";
    }

    public function save_modif_relance_pieces($id_pes, $dat_pes, $date_retour)
    {
        $sql = "UPDATE suividossdb.relance_piece SET date_pes=:date_pes,date_retour=:date_retour WHERE id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'date_pes' => $dat_pes,
            'date_retour' => $date_retour,
            'id' => $id_pes,
        ]);
        return "Enregistrement Ok";
    }



    public function save_modif_relance($id_relance, $dat_relance)
    {
        $sql = "UPDATE suividossdb.relance SET date_relance=:date_relance WHERE id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'date_relance' => $dat_relance,
            'id' => $id_relance,
        ]);
        return "Enregistrement Ok";
    }

    public function savemodif_banque($id_relancebaqnque, $date_relancebanque_m)
    {
        $sql = "UPDATE suividossdb.piecerelance_banque SET date_relance=:date_relance WHERE id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'date_relance' => $date_relancebanque_m,
            'id' => $id_relancebaqnque,
        ]);
        return "Enregistrement Ok";
    }



    public function supre_pes_relance($id_pes)
    {
        $sql = "DELETE FROM suividossdb.pes where id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id' => $id_pes,
        ]);
        return "Enregistrement Ok";
    }

    public function supre_relance_pes($id_pieces)
    {
        $sql = "DELETE FROM suividossdb.relance_piece where id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id' => $id_pieces,
        ]);
        return "Enregistrement Ok";
    }


    public function supre_pes_relancebanque($id_relance_banque)
    {
        $sql = "DELETE FROM suividossdb.piecerelance_banque where id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id' => $id_relance_banque,
        ]);
        return "Enregistrement Ok";
    }


    public function supre_relance($id_relance)
    {
        $sql = "DELETE FROM suividossdb.relance where id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id' => $id_relance,
        ]);
        return "Enregistrement Ok";
    }

    public function list_tva($equipe, $exo, $mois, $regim_tv)
    {
        $c1 = "";
        $c2 = "";
        if ($regim_tv == "RM/EM") {
            $c1 = "EM";
            $c2 = "RM";
        } else {
            $c1 = "ET";
            $c2 = "RT";
        }
        $sql = 'SELECT DISTINCT ssp.id as situation_id , d.nom as nom_dossier
        ,e.code as equipe, ssp.date_cloturation as cloture,
        ssp.idsituation_dossier as situation_dossier
        ,ssp.tvadate_echeance as echeance,ssp.tvregime as regime_tva, stva.' .
            $mois . ' as ' .
            'mois_selection,ssp.date_de_depot_dernier_keobiz, max(R.date_relance) as dernier_relance  FROM suividossdb.dossier d 
            LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) LEFT JOIN suividossdb.situation_par_portfeuil ssp on(ssp.iddoss = d.id) 
            LEFT JOIN suividossdb.piecerelance_banque R on(R.iddoss = ssp.id) 
            LEFT JOIN suivi_tva stva on(stva.id_situation = ssp.id) 
          WHERE ssp.date_cloturation LIKE "' . $exo . '%" and e.id =:equip_id AND (ssp.tvregime =:c1 OR ssp.tvregime =:c2) group by ssp.id order by e.code';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'equip_id' => $equipe,
            'c1' => $c1,
            'c2' => $c2,
        ]);
        $resultat = $res->fetchAll();
        return $resultat;
    }



    public function saveS(
        $id_situation,
        $selectsituationdoss,
        $date_cloturation,
        $regime_dimpos,
        $regime_dimpos2,
        $forme_juridique,
        $dpcoala,
        $tvregime,
        $tvadate_echeance,
        $date_de_depot_dernier_keobiz,
        $situation_trait_karlit,
        $date_dernier_maj,
        $etat_bilan,
        $date_envoie_bilan_karlit,
        $date_rev_bilan_fr,
        $observation,
        $date_dernier_appel_client,
        $mem_autre_equipe,
        $cmtkarlit,
        $user_fait,
        $user_post,
        $date_debut_de_mission,
        $Activite,
        $social_bilan,
        $tns_bilan,
        $releve_bilan,
        $cmt_relve_bilan,
        $achat_bilan,
        $vente_bilan,
        $cmt_autre_bilan,

        $Liase,
        $ca12,
        $solde,
        $cvae,
        $svae,
        $decl,
        $das,
        $c3s,
        $affiche_dans_stat

    ) {
        $utilisateur_id = null;

        if ($date_envoie_bilan_karlit != null || $date_envoie_bilan_karlit <> "") {
            if (trim($user_post) == 1 || trim($user_post) == 2 || trim($user_post) == 3 || trim($user_post) == 5 || trim($user_post) == 12 || trim($user_post) == 13 || trim($user_post) == 14) {
                $utilisateur_id = trim($user_fait);
            } else {
                $utilisateur_id = $this->recupere_utilisateur_date_denvoie($id_situation);
            }
        }
        if ($date_envoie_bilan_karlit == "") {
            $date_envoie_bilan_karlit = null;
        }

        if ($date_debut_de_mission == "") {
            $date_debut_de_mission = null;
        }

        if ($date_de_depot_dernier_keobiz == "") {
            $date_de_depot_dernier_keobiz = null;
        }

        if ($affiche_dans_stat == "n_affiche_pas") {
            $affiche_dans_stat = 1;
        }else{
            $affiche_dans_stat = null;
        }

        
        $sql = "UPDATE suividossdb.situation_par_portfeuil SET 
		idsituation_dossier=:idsituation_dossier,
		date_cloturation=:date_cloturation,
		regime_dimpos=:regime_dimpos, 
		regime_dimpos2=:regime_dimpos2 ,
		forme_juridique=:forme_juridique,
		dpcoala=:dpcoala,
		tvregime=:tvregime ,
		tvadate_echeance=:tvadate_echeance,
        date_de_depot_dernier_keobiz=:date_de_depot_dernier_keobiz,
		situation_trait_karlit=:situation_trait_karlit,
		date_dernier_maj=:date_dernier_maj ,
		etat_bilan=:etat_bilan,
		date_envoie_bilan_karlit=:date_envoie_bilan_karlit,
		date_rev_bilan_fr=:date_rev_bilan_fr,
		observation=:observation,
		date_dernier_appel_client=:date_dernier_appel_client,
		mem_autre_equipe=:mem_autre_equipe,
		cmtKarlit=:cmtKarlit,
        date_du_jour =  current_date(),
        user_fait =:user_fait,
        utilisateur_id=:utilisateur_id,
        date_debut_exo=:date_debut_exo,
        Activite=:Activite,
        social=:social,
        tns=:tns,
        releve=:releve,
        commentaire_releve=:commentaire_releve,
        achat=:achat,
        vente=:vente,
        commentaire_et_autre=:commentaire_et_autre,
        param_liase_fiscal=:param_liase_fiscal,
        param_ca12=:param_ca12,
        param_solde_is=:param_solde_is,
        param_cva1330=:param_cva1330,
        param_solde_cvae=:param_solde_cvae,
        param_decloyer=:param_decloyer,
        param_das2=:param_das2,
        param_c3s=:param_c3s,
        affiche_dans_stat=:affiche_dans_stat 
        where id=" . $id_situation;

        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'idsituation_dossier' => $selectsituationdoss,
            'date_cloturation' => $date_cloturation,
            'regime_dimpos' => $regime_dimpos,
            'regime_dimpos2' => $regime_dimpos2,
            'forme_juridique' => $forme_juridique,
            'dpcoala' => $dpcoala,
            'tvregime' => $tvregime,
            'tvadate_echeance' => $tvadate_echeance,
            'date_de_depot_dernier_keobiz' => $date_de_depot_dernier_keobiz,
            'situation_trait_karlit' => $situation_trait_karlit,
            'date_dernier_maj' => $date_dernier_maj,
            'etat_bilan' => $etat_bilan,
            'date_envoie_bilan_karlit' => $date_envoie_bilan_karlit,
            'date_rev_bilan_fr' => $date_rev_bilan_fr,
            'observation' => $observation,
            'date_dernier_appel_client' => $date_dernier_appel_client,
            'mem_autre_equipe' => $mem_autre_equipe,
            'cmtKarlit' => $cmtkarlit,
            'user_fait' => $user_fait,
            'utilisateur_id' => $utilisateur_id,
            'date_debut_exo' => $date_debut_de_mission,
            'Activite' => $Activite,
            'social' => $social_bilan,
            'tns' => $tns_bilan,
            'releve' => $releve_bilan,
            'commentaire_releve' => $cmt_relve_bilan,
            'achat' => $achat_bilan,
            'vente' => $vente_bilan,
            'commentaire_et_autre' => $cmt_autre_bilan,
            'param_liase_fiscal' => $Liase,
            'param_ca12' =>$ca12,
            'param_solde_is' =>$solde,
            'param_cva1330' =>$cvae,
            'param_solde_cvae' =>$svae,
            'param_decloyer' =>$decl,
            'param_das2' => $das,
            'param_c3s' => $c3s,
            'affiche_dans_stat' => $affiche_dans_stat
        ));
        return $user_post;
    }

    function updateimport(
        $id,
        $SITUATION_DOSSIER,
        $COMMENTAIRE,
        $DATE_CLOTURATION,
        $REGIME_D_IMPOS_1,
        $REGIME_D_IMPOS_2,
        $FORME_JURIDIQUE,
        $DP_COALA,
        $REGIME,
        $DATE_ECH,
        $SITUATION_KARLIT,
        $DATE_MAJ,
        $ETAT_BILAN
    ) {
        $sql = "UPDATE suividossdb.situation_par_portfeuil SET 
            idsituation_dossier=:idsituation_dossier,
            cmtKarlit=:cmtKarlit,
            date_cloturation=:date_cloturation,
            regime_dimpos=:regime_dimpos,
            regime_dimpos2=:regime_dimpos2,
            forme_juridique=:forme_juridique,
            dpcoala=:dpcoala,
            tvregime=:tvregime,
            tvadate_echeance=:tvadate_echeance,
            situation_trait_karlit=:situation_trait_karlit,
            date_dernier_maj=:date_dernier_maj,
            etat_bilan=:etat_bilan 
            where id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'idsituation_dossier' => $SITUATION_DOSSIER,
            'cmtKarlit' => $COMMENTAIRE,
            'date_cloturation' => $DATE_CLOTURATION,
            'regime_dimpos' => $REGIME_D_IMPOS_1,
            'regime_dimpos2' => $REGIME_D_IMPOS_2,
            'forme_juridique' => $FORME_JURIDIQUE,
            'dpcoala' => $DP_COALA,
            'tvregime' => $REGIME,
            'tvadate_echeance' => $DATE_ECH,
            'situation_trait_karlit' => $SITUATION_KARLIT,
            'date_dernier_maj' => $DATE_MAJ,
            'etat_bilan' => $ETAT_BILAN,
            'id' => $id,
        ));
    }


    public function update_stva($id_situation, $colone_mois, $valeur_colonnes, $user_modif, $anne_playbilan)
    {



        if (count($this->recuereexistid($id_situation)) < 1) {
            $sql = "INSERT INTO
                 suividossdb.suivi_tva (id_situation," . $colone_mois . ",anne_stat) VALUES (:id_situation,:mois,:anne_stat)";
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array(
                'id_situation' => $id_situation,
                'mois' => $valeur_colonnes . "#" . $user_modif,
                "anne_stat" => $anne_playbilan,
            ));
            return "insert ok";
        } else {
            $sql = "UPDATE suividossdb.suivi_tva SET " . $colone_mois . "=:mois, anne_stat=:anne_stat WHERE id_situation=:id_situation";
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array(
                'mois' => $valeur_colonnes . "#" . $user_modif,
                'id_situation' => $id_situation,
                "anne_stat" => $anne_playbilan,
            ));
            return "modif ok";
        }
    }


    public function update_matricule($id, $matricule, $son_superviseur)
    {
        $sql = "UPDATE suividossdb.utilisateur SET prenom=:prenom,son_superviseur=:son_superviseur  WHERE id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'prenom' => $matricule,
            "id" => $id,
            "son_superviseur" => $son_superviseur,
        ));
        return "matricule fait ";
    }


    public function recupere_checked($id)
    {
        $sql = "SELECT affiche_dans_stat,param_liase_fiscal,param_ca12,param_solde_is,param_cva1330,param_solde_cvae,param_decloyer,param_das2,param_c3s,date_debut_exo as date_debut_de_mission FROM suividossdb.situation_par_portfeuil WHERE id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            "id" => $id,
        ));
        $respons = $res->fetchAll();
        return $respons;

    }
    


    public function envoie_modif($data_param)
    {

        $sql = "UPDATE suividossdb.envoie SET $data_param";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        //return $res;
    }

    public function delete_envoie($id_envoie)
    {

        $sql = "DELETE FROM suividossdb.envoie WHERE id =:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            "id" => $id_envoie,
        ]);
        return "ok";
    }






    public function ajout_envoi_recap($id_dossier, $txt_envoie, $serveur, $nombre_images, $image_debut, $image_fin, $recap_envoie, $login)
    {

        $sql = "INSERT INTO
             suividossdb.envoie (dossier_id,nom_envoies,serveur,nombre_images,image_debut,image_fin,list_recap_envoie,date_prepa_trait,responsable_reception) VALUES (:dossier_id,:nom_envoies,:serveur,:nombre_images,:image_debut,:image_fin,:recap_envoie, current_date(),:login_s)";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'dossier_id' => $id_dossier,
            'nom_envoies' => $txt_envoie,
            'serveur' => $serveur,
            'nombre_images' => $nombre_images,
            'image_debut' => $image_debut,
            'image_fin' => $image_fin,
            "recap_envoie" => $recap_envoie,
            "login_s" => $login,
        ));
    }


    public function recupere_recap($id_dossier, $recheche_piece)
    {
        if (empty($recheche_piece)) {
            $sql = "SELECT * FROM suividossdb.envoie  where dossier_id =:dossier_id ORDER BY id DESC";
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array('dossier_id' => $id_dossier,));
            $resultat = $res->fetchAll();
            return $resultat;
        } else {
            $sql = "SELECT * FROM suividossdb.envoie  where dossier_id =:dossier_id and list_recap_envoie like '%" . $recheche_piece . "%' ORDER BY id DESC";
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array('dossier_id' => $id_dossier,));
            $resultat = $res->fetchAll();
            return $resultat;
        }
    }

    public function juridique_insert($id,$offre,$responsable)
    {
            $sql = "INSERT INTO pole_juridique (offre,id_situation,responsable) VALUES (:offre,:id_situation,:responsable)";
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array(
                'offre' => $offre,
                'id_situation' => $id,
                'responsable' =>$responsable
            ));
    }    

    public function juridique_delete($id)
    {

            $sql = "DELETE FROM pole_juridique WHERE id_situation=:id_situation";
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array(
                'id_situation' => $id,
            ));
    }        
    

    

    public function juridique_fait($date_bilan)    {
        $sql = 'SELECT Us.nom as nom_responsable, SP.id as id_situation , SP.etat_bilan, e.code, d2.NOM as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
        suividossdb.pole_juridique j on (j.id_situation = SP.id) LEFT JOIN 
        suividossdb.utilisateur Us on (Us.id = j.responsable) LEFT JOIN
        suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
        suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
        WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
        LIKE "'. $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and j.id_situation is NOT NULL';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function recuereexist($nomtable, $id_situation)
    {
        $sql = "SELECT * FROM " . $nomtable . "  where id_situation =:id_situation";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('id_situation' => $id_situation,));
        $resultat = $res->fetchAll();
        return $resultat;
    }
    

    public function recap_envoi_tableau($id_envoie)
    {
        $sql = "SELECT * FROM suividossdb.envoie  where id =:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('id' => $id_envoie,));
        $resultat = $res->fetchAll();
        return $resultat[0];
    }





    public function recuereexistid($id_situation)
    {
        $sql = "SELECT * FROM suividossdb.suivi_tva  where id_situation =:id_situation";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('id_situation' => $id_situation,));
        $resultat = $res->fetchAll();
        return $resultat;
    }




    function recupere_utilisateur_date_denvoie($id)
    {
        $rep = null;

        if ($id != "null" && $id > 0) {
            $sql = 'SELECT  * FROM  situation_par_portfeuil WHERE id =:id';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array(
                'id' => $id,
            ));
            $resultat = $res->fetchAll();

            if (count($resultat) < 1) {
                $rep = 0;
            } else {
                if ($resultat[0]["utilisateur_id"] != null) {
                    $rep = $resultat[0]["utilisateur_id"];
                } else {
                    $rep = null;
                }
            }
            return $rep;
        }
    }
}
