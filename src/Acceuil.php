<?php

namespace Jss;

use App\Connection;

class Acceuil extends Connection
{
    public function affect($idequipe)
    {
        $sql = 'SELECT DISTINCT U.nom as nomutilisateur  FROM suividossdb.dossier D Inner join  suividossdb.affectation_dossier AF on(D.id = AF.iddossier) INNER join suividossdb.utilisateur U on(U.id = AF.id_utilisateur) INNER join utilisateur u2 on(u2.id = AF.id_utilisateur ) where D.equip_id =:equip_id and u2.post_id = 1  group by U.nom';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(['equip_id' => $idequipe]);
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function affect2($idequipe)
    {

        $sql = 'SELECT DISTINCT u.id ,u.nom  FROM suividossdb.acces_portfeuil a left JOIN utilisateur u on(u.id =a.utilisateur_id)  where concat("#",tous_portfeuil_id) LIKE concat("%#",' . $idequipe . ',"#%") ORDER BY u.nom ';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(['equip_id' => $idequipe]);
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function bilan($date_bilan, $id__eq)
    {
        $array = [];
        for ($i = 1; $i < 13; $i++) {
            if (strlen($i) == 1) {
                $i = "0" . $i;
            }
            $division = 1;

            $sql = 'SELECT (SELECT count(SP.date_cloturation) FROM suividossdb.situation_par_portfeuil SP LEFT JOIN suividossdb.dossier d2  
                on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) WHERE SP.idsituation_dossier <> "MA" 
                and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.affiche_dans_stat is null  and SP.date_cloturation
                 LIKE "' . $date_bilan . '-' . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "" AND SP.date_envoie_bilan_karlit <> " " AND  LENGTH(SP.date_envoie_bilan_karlit) > 9 )) 
                 as total,count(S.date_cloturation) as total_bilan FROM suividossdb.equipe E  LEFT JOIN suividossdb.dossier 
                 D on(D.equip_id = E.id) LEFT JOIN suividossdb.situation_par_portfeuil S on(S.iddoss = D.id)  
                 WHERE S.idsituation_dossier <> "MA" and S.idsituation_dossier <> "MS" and E.id =:equip_id and S.affiche_dans_stat is null and date_cloturation 
                 LIKE "' . $date_bilan . '-' . $i . '%"';

            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array('equip_id' => $id__eq,));
            $resultat = $res->fetchAll();
            $total_bilan = $resultat[0]['total_bilan'];
            $fait = $resultat[0]['total'];

            $restant  =  $resultat[0]['total_bilan'] - $resultat[0]['total'];
            if ($total_bilan  > 0) {
                $division =  $total_bilan;
            }
            $pourcentage = number_format((($fait * 100) / $division), 2, '.', ',') . " %";


            $sqlexpert = 'SELECT (SELECT count(SP.date_cloturation) FROM suividossdb.situation_par_portfeuil SP LEFT JOIN suividossdb.dossier d2  
            on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) WHERE SP.idsituation_dossier <> "MA" 
            and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.affiche_dans_stat is null and SP.date_cloturation
             LIKE "' . $date_bilan . '-' . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "" AND SP.date_envoie_bilan_karlit <> " " AND  LENGTH(SP.date_envoie_bilan_karlit) > 9 ) AND SP.reviseur_id is NULL)
             as total,count(S.date_cloturation) as total_bilan_valid FROM suividossdb.equipe E  LEFT JOIN suividossdb.dossier 
             D on(D.equip_id = E.id) LEFT JOIN suividossdb.situation_par_portfeuil S on(S.iddoss = D.id)  
             WHERE S.idsituation_dossier <> "MA" and S.idsituation_dossier <> "MS" and E.id =:equip_id and S.affiche_dans_stat is null and  S.date_cloturation 
             LIKE "' . $date_bilan . '-' . $i . '%" and S.reviseur_id > 0';

            $resexpert = $this->Getconnexion()->prepare($sqlexpert);
            $resexpert->execute(array('equip_id' => $id__eq,));
            $resultatexpert = $resexpert->fetchAll();
            $total_bilan_expert = $resultatexpert[0]['total'];
            $fait_expert_valide =  $resultatexpert[0]['total_bilan_valid'];

            if ($total_bilan_expert  > 0) {
                $division =  $total_bilan_expert;
            }
            $pourcentage_expert = number_format((($fait_expert_valide * 100) / $division), 2, '.', ',') . " %";


            $sqlexpertd = 'SELECT (SELECT count(SP.date_cloturation) FROM suividossdb.situation_par_portfeuil SP LEFT JOIN suividossdb.dossier d2  
            on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) WHERE SP.idsituation_dossier <> "MA" 
            and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.affiche_dans_stat is null and SP.date_cloturation
             LIKE "' . $date_bilan . '-' . $i  .    '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "" AND SP.date_envoie_bilan_karlit <> " " AND  LENGTH(SP.date_envoie_bilan_karlit) > 9 ) AND SP.expert_id is NULL AND SP.reviseur_id > 0)
             as total,count(S.date_cloturation) as total_bilan_valid FROM suividossdb.equipe E  LEFT JOIN suividossdb.dossier 
             D on(D.equip_id = E.id) LEFT JOIN suividossdb.situation_par_portfeuil S on(S.iddoss = D.id)  
             WHERE S.idsituation_dossier <> "MA" and S.idsituation_dossier <> "MS" and E.id =:equip_id and S.affiche_dans_stat is null and  S.date_cloturation 
             LIKE "' . $date_bilan . '-' . $i . '%" and S.expert_id > 0';
            $resexpertd = $this->Getconnexion()->prepare($sqlexpertd);
            $resexpertd->execute(array('equip_id' => $id__eq,));
            $resultatexperts = $resexpertd->fetchAll();
            $total_bilan_expertv = $resultatexperts[0]['total'];
            $fait_expert_validev =  $resultatexperts[0]['total_bilan_valid'];

            if ($total_bilan_expertv  > 0) {
                $division =  $total_bilan_expertv;
            }

            $com_client_cdm_fr = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is null';
            $res_com_client_cdm_fr = $this->Getconnexion()->prepare($com_client_cdm_fr);
            $res_com_client_cdm_fr->execute(array('equip_id' => $id__eq,));
            $resultat_com_client_cdm_fr = count($res_com_client_cdm_fr->fetchAll());

            $com_client_cdm_fr_fait = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
              suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
              WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.affiche_dans_stat is null and SP.date_cloturation 
              LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null';
            $res_com_client_cdm_fr_fait = $this->Getconnexion()->prepare($com_client_cdm_fr_fait);
            $res_com_client_cdm_fr_fait->execute(array('equip_id' => $id__eq,));
            $resultat_com_client_cdm_fr_fait = count($res_com_client_cdm_fr_fait->fetchAll());


            $validation_client_fr_cdm = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
              suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
              LEFT JOIN zz_valid_client_cdm_fr v_f on(v_f.id_situation = z.id_situation) 
              WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.affiche_dans_stat is null and SP.date_cloturation 
              LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and v_f.liase_fiscal is null';
            $validation_client_fr_cdmfait = $this->Getconnexion()->prepare($validation_client_fr_cdm);
            $validation_client_fr_cdmfait->execute(array('equip_id' => $id__eq,));
            $resultat_validation_client_fr_cdmafaire = count($validation_client_fr_cdmfait->fetchAll());

            $validation_client_fr_cdmf = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
              suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
              LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
              WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.affiche_dans_stat is null and SP.date_cloturation 
              LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null';
            $validation_client_fr_cdmfaitf = $this->Getconnexion()->prepare($validation_client_fr_cdmf);
            $validation_client_fr_cdmfaitf->execute(array('equip_id' => $id__eq,));
            $resultat_validation_client_fr_cdmafairef = count($validation_client_fr_cdmfaitf->fetchAll());

            $manager_restant = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
              suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
              LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
              LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
              WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.affiche_dans_stat is null and SP.date_cloturation 
              LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is null ';
            $manager_restant = $this->Getconnexion()->prepare($manager_restant);
            $manager_restant->execute(array('equip_id' => $id__eq,));
            $resultat_manager_restant = count($manager_restant->fetchAll());

            $manager_fait = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
              suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) and SP.affiche_dans_stat is null LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
              LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
              LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
              WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.date_cloturation 
              LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null ';
            $manager_fait = $this->Getconnexion()->prepare($manager_fait);
            $manager_fait->execute(array('equip_id' => $id__eq,));
            $resultat_manager_fait = count($manager_fait->fetchAll());



            $teletransmission_restantf = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
              suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
              LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
              LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
              LEFT JOIN zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
              WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.affiche_dans_stat is null and SP.date_cloturation 
              LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is null ';
            $teletransmission_restant = $this->Getconnexion()->prepare($teletransmission_restantf);
            $teletransmission_restant->execute(array('equip_id' => $id__eq,));
            $resultat_teletransmission_restant = count($teletransmission_restant->fetchAll());

            $teletransmission_faitf = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
              suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
              LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
              LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
              LEFT JOIN zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
              WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.affiche_dans_stat is null and SP.date_cloturation 
              LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is not null ';
            $teletransmission_fait = $this->Getconnexion()->prepare($teletransmission_faitf);
            $teletransmission_fait->execute(array('equip_id' => $id__eq,));
            $resultat_teletransmission_fait = count($teletransmission_fait->fetchAll());

            $vedi_restantf = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
              suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
              LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
              LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
              LEFT JOIN zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
              LEFT JOIN zz_valid_edi_cdm_fr ve on(ve.id_situation = vt.id_situation) 
              WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.affiche_dans_stat is null and SP.date_cloturation 
              LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is not null and ve.liase_fiscal is null ';
            $vedi_restant = $this->Getconnexion()->prepare($vedi_restantf);
            $vedi_restant->execute(array('equip_id' => $id__eq,));
            $resultatvedi_restant = count($vedi_restant->fetchAll());


            $vedi_faitf = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
              suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
              LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
              LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
              LEFT JOIN zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
              LEFT JOIN zz_valid_edi_cdm_fr ve on(ve.id_situation = vt.id_situation) 
              WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.affiche_dans_stat is null and SP.date_cloturation 
              LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is not null and ve.liase_fiscal is not null ';
            $vedi_fait = $this->Getconnexion()->prepare($vedi_faitf);
            $vedi_fait->execute(array('equip_id' => $id__eq,));
            $resultatvedi_fait = count($vedi_fait->fetchAll());

            array_push(
                $array,
                $total_bilan . "#"
                    . $fait . "#"
                    . $restant . "#"
                    . $pourcentage . "#"
                    .  "0#0#0#0#0#0#0#0#"
                    . $total_bilan_expert . "#"
                    . $fait_expert_valide . "#" .
                    $pourcentage_expert . "#" .
                    $total_bilan_expertv . "#" .
                    $fait_expert_validev . "#" .
                    $resultat_com_client_cdm_fr . "#" .
                    $resultat_com_client_cdm_fr_fait . "#" .
                    $resultat_validation_client_fr_cdmafaire . "#" .
                    $resultat_validation_client_fr_cdmafairef . "#" .
                    $resultat_manager_restant . "#" .
                    $resultat_manager_fait . "#" .
                    $resultat_teletransmission_restant . "#" .
                    $resultat_teletransmission_fait . "#" .
                    $resultatvedi_restant . "#" .
                    $resultatvedi_fait
                //$pourcentage_expertv
            );
        }

        return $array;
    }
    public function bilan_diff_egal_ms($date_bilan, $id__eq)
    {
        $array = [];
        for ($i = 1; $i < 13; $i++) {
            if (strlen($i) == 1) {
                $i = "0" . $i;
            }
            $division = 1;
            $sql = 'SELECT (SELECT count(SP.date_cloturation) FROM suividossdb.situation_par_portfeuil SP LEFT JOIN suividossdb.dossier d2  
                on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) WHERE SP.idsituation_dossier <> "MA" 
                and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.date_cloturation
                 LIKE "' . $date_bilan . '-' . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL OR SP.date_envoie_bilan_karlit <> "" )) 
                 as total,count(S.date_cloturation) as total_bilan FROM suividossdb.equipe E  LEFT JOIN suividossdb.dossier 
                 D on(D.equip_id = E.id) LEFT JOIN suividossdb.situation_par_portfeuil S on(S.iddoss = D.id)  
                 WHERE S.idsituation_dossier <> "MA" and E.id =:equip_id and  date_cloturation 
                 LIKE "' . $date_bilan . '-' . $i . '%"';

            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array('equip_id' => $id__eq,));
            $resultat = $res->fetchAll();
            $total_bilan = $resultat[0]['total_bilan'];
            $fait = $resultat[0]['total'];
            $restant  =  $resultat[0]['total_bilan'] - $resultat[0]['total'];
            if ($total_bilan  > 0) {
                $division =  $total_bilan;
            }
            $pourcentage = number_format((($fait * 100) / $division), 2, '.', ',') . " %";
            array_push($array, $total_bilan . "#" . $fait . "#" . $restant . "#" . $pourcentage);
        }

        return $array;
    }


    public function bilan_detailtab1($date_bilan, $id__eq)
    {
        $sql = 'SELECT S.id as id_situation ,S.etat_bilan,E.code,  D.NOM as nomdossier,S.idsituation_dossier,S.date_cloturation,S.date_envoie_bilan_karlit 
            FROM suividossdb.equipe E  LEFT JOIN suividossdb.dossier D on(D.equip_id = E.id) 
            LEFT JOIN suividossdb.situation_par_portfeuil S on(S.iddoss = D.id) 
             WHERE S.idsituation_dossier <> "MA" and S.idsituation_dossier <> "MS"  
             and E.id =:equip_id and S.affiche_dans_stat is null and  date_cloturation LIKE "' . $date_bilan . '%"';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('equip_id' => $id__eq,));
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function bilan_detailtab2($date_bilan, $id__eq)
    {
        $sql = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.nom as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit 
        FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
        suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
        suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.utilisateur_id) 
        WHERE SP.idsituation_dossier <> "MA" and SP.affiche_dans_stat is null and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.date_cloturation 
        LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "" )';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('equip_id' => $id__eq,));
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function bilan_detailtab3($date_bilan, $id__eq)
    {
        $sql = 'SELECT SP.id as id_situation,SP.etat_bilan, e.code,  d2.nom as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit 
    FROM suividossdb.situation_par_portfeuil SP LEFT JOIN suividossdb.dossier d2  on(SP.iddoss = d2.id) 
    LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id)
     WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.affiche_dans_stat is null and e.id=:equip_id and SP.date_cloturation 
    LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is NULL OR SP.date_envoie_bilan_karlit = "" )';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('equip_id' => $id__eq,));
        $resultat = $res->fetchAll();
        return $resultat;
    }


    public function click_recupere_et_rt($date_bilan, $id__eq)
    {
        $tableannee = ["mars", "juin", "septembre", "decembre"];

        $sqlmars = 'SELECT count(Spp.tvregime) AS mars_rt FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.mars,"#",13),SUBSTRING_INDEX(S.mars,"#",12),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.mars,"#",13),SUBSTRING_INDEX(S.mars,"#",12),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" and Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "RT"';
        $resmars = $this->Getconnexion()->prepare($sqlmars);
        $resmars->execute(array('id' => $id__eq));
        $resultatmars = $resmars->fetchAll();

        $sqljuin = ' SELECT count(Spp.tvregime) AS juin_rt FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.juin,"#",13),SUBSTRING_INDEX(S.juin,"#",12),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.juin,"#",13),SUBSTRING_INDEX(S.juin,"#",12),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "RT"';
        $resjuin = $this->Getconnexion()->prepare($sqljuin);
        $resjuin->execute(array('id' => $id__eq));
        $resultatjuin = $resjuin->fetchAll();

        $sqlseptembre = ' SELECT count(Spp.tvregime) AS septembre_rt FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.septembre,"#",13),SUBSTRING_INDEX(S.septembre,"#",12),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.septembre,"#",13),SUBSTRING_INDEX(S.septembre,"#",12),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "RT"';
        $resseptembre = $this->Getconnexion()->prepare($sqlseptembre);
        $resseptembre->execute(array('id' => $id__eq));
        $resultatseptembre = $resseptembre->fetchAll();

        $sqldecembre = 'SELECT count(Spp.tvregime) AS decembre_rt FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.decembre,"#",13),SUBSTRING_INDEX(S.decembre,"#",12),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.decembre,"#",13),SUBSTRING_INDEX(S.decembre,"#",12),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "RT"';
        $resdecembre = $this->Getconnexion()->prepare($sqldecembre);
        $resdecembre->execute(array('id' => $id__eq));
        $resultatdecembre = $resdecembre->fetchAll();
        //-----------------------------------------x---------------------
        $sqlmarsF = 'SELECT count(Spp.tvregime) AS mars_rt FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.mars,"#",9),SUBSTRING_INDEX(S.mars,"#",8),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.mars,"#",9),SUBSTRING_INDEX(S.mars,"#",8),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "RT"';
        $resmarsF = $this->Getconnexion()->prepare($sqlmarsF);
        $resmarsF->execute(array('id' => $id__eq));
        $resultatmarsF = $resmarsF->fetchAll();

        $sqljuinF = ' SELECT count(Spp.tvregime) AS juin_rt FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.juin,"#",9),SUBSTRING_INDEX(S.juin,"#",8),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.juin,"#",9),SUBSTRING_INDEX(S.juin,"#",8),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "RT"';
        $resjuinF = $this->Getconnexion()->prepare($sqljuinF);
        $resjuinF->execute(array('id' => $id__eq));
        $resultatjuinF = $resjuinF->fetchAll();

        $sqlseptembreF = ' SELECT count(Spp.tvregime) AS septembre_rt FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.septembre,"#",9),SUBSTRING_INDEX(S.septembre,"#",8),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.septembre,"#",9),SUBSTRING_INDEX(S.septembre,"#",8),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "RT"';
        $resseptembreF = $this->Getconnexion()->prepare($sqlseptembreF);
        $resseptembreF->execute(array('id' => $id__eq));
        $resultatseptembreF = $resseptembreF->fetchAll();

        $sqldecembreF = 'SELECT count(Spp.tvregime) AS decembre_rt FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.decembre,"#",9),SUBSTRING_INDEX(S.decembre,"#",8),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.decembre,"#",9),SUBSTRING_INDEX(S.decembre,"#",8),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "RT"';
        $resdecembreF = $this->Getconnexion()->prepare($sqldecembreF);
        $resdecembreF->execute(array('id' => $id__eq));
        $resultatdecembreF = $resdecembreF->fetchAll();


        //------------------------------------x--------------------------------------------
        //------------------------------------x--------------------------------------------



        $sqlmarsET = 'SELECT count(Spp.tvregime) AS mars_et FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.mars,"#",13),SUBSTRING_INDEX(S.mars,"#",12),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.mars,"#",13),SUBSTRING_INDEX(S.mars,"#",12),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "ET"';
        $resmarsET = $this->Getconnexion()->prepare($sqlmarsET);
        $resmarsET->execute(array('id' => $id__eq));
        $resultatmarsET = $resmarsET->fetchAll();

        $sqljuinET = 'SELECT count(Spp.tvregime) AS juin_et FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.juin,"#",13),SUBSTRING_INDEX(S.juin,"#",12),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.juin,"#",13),SUBSTRING_INDEX(S.juin,"#",12),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "ET"';
        $resjuinET = $this->Getconnexion()->prepare($sqljuinET);
        $resjuinET->execute(array('id' => $id__eq));
        $resultatjuinET = $resjuinET->fetchAll();

        $sqlseptembreET = 'SELECT count(Spp.tvregime) AS septembre_et FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.septembre,"#",13),SUBSTRING_INDEX(S.septembre,"#",12),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.septembre,"#",13),SUBSTRING_INDEX(S.septembre,"#",12),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "ET"';
        $resseptembreET = $this->Getconnexion()->prepare($sqlseptembreET);
        $resseptembreET->execute(array('id' => $id__eq));
        $resultatseptembreET = $resseptembreET->fetchAll();


        $sqldecembreET = 'SELECT count(Spp.tvregime) AS decembre_et FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.decembre,"#",13),SUBSTRING_INDEX(S.decembre,"#",12),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.decembre,"#",13),SUBSTRING_INDEX(S.decembre,"#",12),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "ET"';
        $resdecembreET = $this->Getconnexion()->prepare($sqldecembreET);
        $resdecembreET->execute(array('id' => $id__eq));
        $resultatdecembreET = $resdecembreET->fetchAll();

        //-------------------------------------x------------------------------------------
        $sqlmarsETF = 'SELECT count(Spp.tvregime) AS mars_et FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.mars,"#",9),SUBSTRING_INDEX(S.mars,"#",8),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.mars,"#",9),SUBSTRING_INDEX(S.mars,"#",8),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "ET"';
        $resmarsETF = $this->Getconnexion()->prepare($sqlmarsETF);
        $resmarsETF->execute(array('id' => $id__eq));
        $resultatmarsETF = $resmarsETF->fetchAll();

        $sqljuinETF = 'SELECT count(Spp.tvregime) AS juin_et FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.juin,"#",9),SUBSTRING_INDEX(S.juin,"#",8),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.juin,"#",9),SUBSTRING_INDEX(S.juin,"#",8),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "ET"';
        $resjuinETF = $this->Getconnexion()->prepare($sqljuinETF);
        $resjuinETF->execute(array('id' => $id__eq));
        $resultatjuinETF = $resjuinETF->fetchAll();

        $sqlseptembreETF = 'SELECT count(Spp.tvregime) AS septembre_et FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.septembre,"#",9),SUBSTRING_INDEX(S.septembre,"#",8),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.septembre,"#",9),SUBSTRING_INDEX(S.septembre,"#",8),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "ET"';
        $resseptembreETF = $this->Getconnexion()->prepare($sqlseptembreETF);
        $resseptembreETF->execute(array('id' => $id__eq));
        $resultatseptembreETF = $resseptembreETF->fetchAll();


        $sqldecembreETF = 'SELECT count(Spp.tvregime) AS decembre_et FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
        LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) WHERE e.id =:id and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.decembre,"#",9),SUBSTRING_INDEX(S.decembre,"#",8),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.decembre,"#",9),SUBSTRING_INDEX(S.decembre,"#",8),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "ET"';
        $resdecembreETF = $this->Getconnexion()->prepare($sqldecembreETF);
        $resdecembreETF->execute(array('id' => $id__eq));
        $resultatdecembreETF = $resdecembreETF->fetchAll();

        //------------------------------------x--------------------------------------------
        //------------------------------------x--------------------------------------------


        $sql = 'SELECT count(sp.id) as ET   FROM suividossdb.situation_par_portfeuil sp LEFT JOIN dossier d2 on(d2.id = sp.iddoss) LEFT JOIN equipe e on(e.id = d2.equip_id)  WHERE sp.idsituation_dossier <> "MA" and sp.idsituation_dossier <> "MS" and sp.tvregime = "ET" and e.id =:id and sp.date_cloturation LIKE "' . substr($date_bilan, 0, 4) . '%"';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('id' => $id__eq));
        $resultat = $res->fetchAll();

        $sqlS = 'SELECT count(sp.id) as RT   FROM suividossdb.situation_par_portfeuil sp LEFT JOIN dossier d2 on(d2.id = sp.iddoss) LEFT JOIN equipe e on(e.id = d2.equip_id)  WHERE sp.idsituation_dossier <> "MA" AND sp.idsituation_dossier <> "Ms" and sp.tvregime = "RT" and e.id =:id and sp.date_cloturation LIKE "' . substr($date_bilan, 0, 4) . '%"';
        $resS = $this->Getconnexion()->prepare($sqlS);
        $resS->execute(array('id' => $id__eq));
        $resultatS = $resS->fetchAll();

        $sqlSsum = 'SELECT
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",10),SUBSTRING_INDEX(S.mars,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",10),SUBSTRING_INDEX(S.mars,"#",9),""),2,1) iS NULL,0,1))) as sum_mars,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",10),SUBSTRING_INDEX(S.juin,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",10),SUBSTRING_INDEX(S.juin,"#",9),""),2,1) iS NULL,0,1))) as sum_juin,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",10),SUBSTRING_INDEX(S.septembre,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",10),SUBSTRING_INDEX(S.septembre,"#",9),""),2,1) iS NULL,0,1))) as sum_septembre,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",10),SUBSTRING_INDEX(S.decembre,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",10),SUBSTRING_INDEX(S.decembre,"#",9),""),2,1) iS NULL,0,1))) as sum_decembre
         FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
                LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and 
                Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.tvregime = "ET" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ressum = $this->Getconnexion()->prepare($sqlSsum);
        $ressum->execute(array('id' => $id__eq));
        $resultatSum_et_client = $ressum->fetchAll();

        $sqlSsumRT = 'SELECT
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",10),SUBSTRING_INDEX(S.mars,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",10),SUBSTRING_INDEX(S.mars,"#",9),""),2,1) iS NULL,0,1))) as sum_mars,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",10),SUBSTRING_INDEX(S.juin,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",10),SUBSTRING_INDEX(S.juin,"#",9),""),2,1) iS NULL,0,1))) as sum_juin,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",10),SUBSTRING_INDEX(S.septembre,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",10),SUBSTRING_INDEX(S.septembre,"#",9),""),2,1) iS NULL,0,1))) as sum_septembre,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",10),SUBSTRING_INDEX(S.decembre,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",10),SUBSTRING_INDEX(S.decembre,"#",9),""),2,1) iS NULL,0,1))) as sum_decembre
         FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
                LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and 
                Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.tvregime = "RT" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ressumrt = $this->Getconnexion()->prepare($sqlSsumRT);
        $ressumrt->execute(array('id' => $id__eq));
        $resultatSum_rt_client = $ressumrt->fetchAll();


        //--------------------------x--------------

        $sqlSsumdtvRT = 'SELECT
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",11),SUBSTRING_INDEX(S.mars,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",11),SUBSTRING_INDEX(S.mars,"#",10),""),2,1) iS NULL,0,1))) as sum_mars,
         sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",11),SUBSTRING_INDEX(S.juin,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",11),SUBSTRING_INDEX(S.juin,"#",10),""),2,1) iS NULL,0,1))) as sum_juin,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",11),SUBSTRING_INDEX(S.septembre,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",11),SUBSTRING_INDEX(S.septembre,"#",10),""),2,1) iS NULL,0,1))) as sum_septembre,
         sum(if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",11),SUBSTRING_INDEX(S.decembre,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",11),SUBSTRING_INDEX(S.decembre,"#",10),""),2,1) iS NULL,0,1))) as sum_decembre
          FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
                 LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and 
                 Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.tvregime = "RT" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ressumdtvrt = $this->Getconnexion()->prepare($sqlSsumdtvRT);
        $ressumdtvrt->execute(array('id' => $id__eq));
        $resultatdtvSum_rt_client = $ressumdtvrt->fetchAll();


        $sqlSsumDTVET = 'SELECT
             sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",11),SUBSTRING_INDEX(S.mars,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",11),SUBSTRING_INDEX(S.mars,"#",10),""),2,1) iS NULL,0,1))) as sum_mars,
             sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",11),SUBSTRING_INDEX(S.juin,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",11),SUBSTRING_INDEX(S.juin,"#",10),""),2,1) iS NULL,0,1))) as sum_juin,
             sum(if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",11),SUBSTRING_INDEX(S.septembre,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",11),SUBSTRING_INDEX(S.septembre,"#",10),""),2,1) iS NULL,0,1))) as sum_septembre,
             sum(if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",11),SUBSTRING_INDEX(S.decembre,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",11),SUBSTRING_INDEX(S.decembre,"#",10),""),2,1) iS NULL,0,1))) as sum_decembre
          FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
                 LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and 
                 Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.tvregime = "ET" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ressumdtvet = $this->Getconnexion()->prepare($sqlSsumDTVET);
        $ressumdtvet->execute(array('id' => $id__eq));
        $resultatSum_etdtv_client = $ressumdtvet->fetchAll();


        //--------------------------x--------------

        $sqlSsumdtvRTS = 'SELECT
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",12),SUBSTRING_INDEX(S.mars,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",12),SUBSTRING_INDEX(S.mars,"#",11),""),2,1) iS NULL,0,1))) as sum_mars,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",12),SUBSTRING_INDEX(S.juin,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",12),SUBSTRING_INDEX(S.juin,"#",11),""),2,1) iS NULL,0,1))) as sum_juin,
       sum(if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",12),SUBSTRING_INDEX(S.septembre,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",12),SUBSTRING_INDEX(S.septembre,"#",11),""),2,1) iS NULL,0,1))) as sum_septembre,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",12),SUBSTRING_INDEX(S.decembre,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",12),SUBSTRING_INDEX(S.decembre,"#",11),""),2,1) iS NULL,0,1))) as sum_decembre
          FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
                 LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and 
                 Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.tvregime = "RT" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ressumdtvrtS = $this->Getconnexion()->prepare($sqlSsumdtvRTS);
        $ressumdtvrtS->execute(array('id' => $id__eq));
        $resultatdtvSum_rt_S = $ressumdtvrtS->fetchAll();


        $sqlSsumDTVETS = 'SELECT
             sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",12),SUBSTRING_INDEX(S.mars,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",12),SUBSTRING_INDEX(S.mars,"#",11),""),2,1) iS NULL,0,1))) as sum_mars,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",12),SUBSTRING_INDEX(S.juin,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",12),SUBSTRING_INDEX(S.juin,"#",11),""),2,1) iS NULL,0,1))) as sum_juin,
       sum(if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",12),SUBSTRING_INDEX(S.septembre,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",12),SUBSTRING_INDEX(S.septembre,"#",11),""),2,1) iS NULL,0,1))) as sum_septembre,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",12),SUBSTRING_INDEX(S.decembre,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",12),SUBSTRING_INDEX(S.decembre,"#",11),""),2,1) iS NULL,0,1))) as sum_decembre
          FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
                 LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and 
                 Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.tvregime = "ET" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ressumdtvetS = $this->Getconnexion()->prepare($sqlSsumDTVETS);
        $ressumdtvetS->execute(array('id' => $id__eq));
        $resultatSum_etS = $ressumdtvetS->fetchAll();



        return [
            "total_RT" =>  $resultatS[0]['RT'],
            "mars_RT" =>  $resultatmars,
            "juin_RT" =>  $resultatjuin,
            "septembre_RT" =>  $resultatseptembre,
            "decembre_RT" =>  $resultatdecembre,

            "mars_RT_F" =>  $resultatmarsF,
            "juin_RT_F" =>  $resultatjuinF,
            "septembre_RT_F" =>  $resultatseptembreF,
            "decembre_RT_F" =>  $resultatdecembreF,

            "total_ET" =>  $resultat[0]['ET'],
            "mars_ET" =>  $resultatmarsET,
            "juin_ET" =>  $resultatjuinET,
            "septembre_ET" =>  $resultatseptembreET,
            "decembre_ET" =>  $resultatdecembreET,

            "mars_ET_F" =>  $resultatmarsETF,
            "juin_ET_F" =>  $resultatjuinETF,
            "septembre_ET_F" =>  $resultatseptembreETF,
            "decembre_ET_F" =>  $resultatdecembreETF,

            "mars_envoie_client_et" =>  $resultatSum_et_client[0]["sum_mars"],
            "juin_envoie_client_et" =>  $resultatSum_et_client[0]["sum_juin"],
            "septembre_envoie_client_et" =>  $resultatSum_et_client[0]["sum_septembre"],
            "decembre_envoie_client_et" =>  $resultatSum_et_client[0]["sum_decembre"],

            "mars_envoie_client_rt" =>  $resultatSum_rt_client[0]["sum_mars"],
            "juin_envoie_client_rt" =>  $resultatSum_rt_client[0]["sum_juin"],
            "septembre_envoie_client_rt" =>  $resultatSum_rt_client[0]["sum_septembre"],
            "decembre_envoie_client_rt" =>  $resultatSum_rt_client[0]["sum_decembre"],

            "mars_dtv_et" =>  $resultatSum_etdtv_client[0]["sum_mars"],
            "juin_dtv_et" =>  $resultatSum_etdtv_client[0]["sum_juin"],
            "septembre_dtv_et" =>  $resultatSum_etdtv_client[0]["sum_septembre"],
            "decembre_dtv_et" =>  $resultatSum_etdtv_client[0]["sum_decembre"],

            "mars_dtv_rt" =>  $resultatdtvSum_rt_client[0]["sum_mars"],
            "juin_dtv_rt" =>  $resultatdtvSum_rt_client[0]["sum_juin"],
            "septembre_dtv_rt" =>  $resultatdtvSum_rt_client[0]["sum_septembre"],
            "decembre_dtv_rt" =>  $resultatdtvSum_rt_client[0]["sum_decembre"],



            "mars_dtl_et" =>  $resultatSum_etS[0]["sum_mars"],
            "juin_dtl_et" =>  $resultatSum_etS[0]["sum_juin"],
            "septembre_dtl_et" =>  $resultatSum_etS[0]["sum_septembre"],
            "decembre_dtl_et" =>  $resultatSum_etS[0]["sum_decembre"],

            "mars_dtl_rt" =>  $resultatdtvSum_rt_S[0]["sum_mars"],
            "juin_dtl_rt" =>  $resultatdtvSum_rt_S[0]["sum_juin"],
            "septembre_dtl_rt" =>  $resultatdtvSum_rt_S[0]["sum_septembre"],
            "decembre_dtl_rt" =>  $resultatdtvSum_rt_S[0]["sum_decembre"],



        ];
    }

    public function click_recupere_rm_etm($date_bilan, $id__eq)
    {
        $resultatfinal = [];
        $resultatfinal1 = [];
        $moiss = ["janvier", "fevrier", "mars", "avril", "mais", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];

        foreach ($moiss as $response) {

            $sql = 'SELECT Spp.tvregime AS rm FROM suividossdb.suivi_tva S
            LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) WHERE e.id =:id
            and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.' . $response . ',"#",13),SUBSTRING_INDEX(S.' . $response . ',"#",12),""),2,1) IS NULL,0,
            if(substring(REPLACE( SUBSTRING_INDEX(S.' . $response . ',"#",13),SUBSTRING_INDEX(S.' . $response . ',"#",12),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "RM"';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array('id' => $id__eq));
            $resultat = $res->fetchAll();

            $sqlT = 'SELECT Spp.tvregime AS rm FROM suividossdb.suivi_tva S
            LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) WHERE e.id =:id
            and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.' . $response . ',"#",9),SUBSTRING_INDEX(S.' . $response . ',"#",8),""),2,1) IS NULL,0,
            if(substring(REPLACE( SUBSTRING_INDEX(S.' . $response . ',"#",9),SUBSTRING_INDEX(S.' . $response . ',"#",8),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "RM"';
            $resT = $this->Getconnexion()->prepare($sqlT);
            $resT->execute(array('id' => $id__eq));
            $resultatT = $resT->fetchAll();
            array_push($resultatfinal, [
                'rm' => count($resultat),
                'rmF' => count($resultatT),
            ]);


            $sqlem = 'SELECT Spp.tvregime AS em FROM suividossdb.suivi_tva S
            LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) WHERE e.id =:id
            and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.' . $response . ',"#",13),SUBSTRING_INDEX(S.' . $response . ',"#",12),""),2,1) IS NULL,0,
            if(substring(REPLACE( SUBSTRING_INDEX(S.' . $response . ',"#",13),SUBSTRING_INDEX(S.' . $response . ',"#",12),""),2,1) + 0 < 1 ,0,1)) = 1 AND Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS"  AND Spp.tvregime = "EM"';
            $resem = $this->Getconnexion()->prepare($sqlem);
            $resem->execute(array('id' => $id__eq));
            $resultatem = $resem->fetchAll();

            $sqlemF = 'SELECT Spp.tvregime AS em FROM suividossdb.suivi_tva S
            LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id) WHERE e.id =:id
            and Spp.date_cloturation LIKE "' . $date_bilan . '%" and if(substring(REPLACE( SUBSTRING_INDEX(S.' . $response . ',"#",9),SUBSTRING_INDEX(S.' . $response . ',"#",8),""),2,1) IS NULL,0,
            if(substring(REPLACE( SUBSTRING_INDEX(S.' . $response . ',"#",9),SUBSTRING_INDEX(S.' . $response . ',"#",8),""),2,1) + 0 < 1 ,0,1)) = 1 AND (Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS") AND Spp.tvregime = "EM"';
            $resemF = $this->Getconnexion()->prepare($sqlemF);
            $resemF->execute(array('id' => $id__eq));
            $resultatemF = $resemF->fetchAll();

            array_push(
                $resultatfinal1,
                [
                    'em' => count($resultatem),
                    'emF' => count($resultatemF),
                ]
            );
        }

        //------------------------------------RM-----------------------------------------------------------------

        $sqlSsumDTVET = 'SELECT
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.janvier,"#",10),SUBSTRING_INDEX(S.janvier,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.janvier,"#",10),SUBSTRING_INDEX(S.janvier,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_janvier,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.fevrier,"#",10),SUBSTRING_INDEX(S.fevrier,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.fevrier,"#",10),SUBSTRING_INDEX(S.fevrier,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_fevrier,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",10),SUBSTRING_INDEX(S.mars,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",10),SUBSTRING_INDEX(S.mars,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_mars,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.avril,"#",10),SUBSTRING_INDEX(S.avril,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.avril,"#",10),SUBSTRING_INDEX(S.avril,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_avril,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mais,"#",10),SUBSTRING_INDEX(S.mais,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mais,"#",10),SUBSTRING_INDEX(S.mais,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_mais,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",10),SUBSTRING_INDEX(S.juin,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",10),SUBSTRING_INDEX(S.juin,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_juin,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juillet,"#",10),SUBSTRING_INDEX(S.juillet,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juillet,"#",10),SUBSTRING_INDEX(S.juillet,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_juillet,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.aout,"#",10),SUBSTRING_INDEX(S.aout,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.aout,"#",10),SUBSTRING_INDEX(S.aout,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_aout,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",10),SUBSTRING_INDEX(S.septembre,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",10),SUBSTRING_INDEX(S.septembre,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_septembre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.octobre,"#",10),SUBSTRING_INDEX(S.octobre,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.octobre,"#",10),SUBSTRING_INDEX(S.octobre,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_octobre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.novembre,"#",10),SUBSTRING_INDEX(S.novembre,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.novembre,"#",10),SUBSTRING_INDEX(S.novembre,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_novembre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",10),SUBSTRING_INDEX(S.decembre,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",10),SUBSTRING_INDEX(S.decembre,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_decembre

     FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and 
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.tvregime = "RM" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ressumdtvet = $this->Getconnexion()->prepare($sqlSsumDTVET);
        $ressumdtvet->execute(array('id' => $id__eq));
        $resultatenvoi_client = $ressumdtvet->fetchAll();


        $sqlSsumDTVETvclient = 'SELECT
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.janvier,"#",11),SUBSTRING_INDEX(S.janvier,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.janvier,"#",11),SUBSTRING_INDEX(S.janvier,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_janvier,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.fevrier,"#",11),SUBSTRING_INDEX(S.fevrier,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.fevrier,"#",11),SUBSTRING_INDEX(S.fevrier,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_fevrier,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",11),SUBSTRING_INDEX(S.mars,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",11),SUBSTRING_INDEX(S.mars,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_mars,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.avril,"#",11),SUBSTRING_INDEX(S.avril,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.avril,"#",11),SUBSTRING_INDEX(S.avril,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_avril,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mais,"#",11),SUBSTRING_INDEX(S.mais,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mais,"#",11),SUBSTRING_INDEX(S.mais,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_mais,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",11),SUBSTRING_INDEX(S.juin,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",11),SUBSTRING_INDEX(S.juin,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_juin,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juillet,"#",11),SUBSTRING_INDEX(S.juillet,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juillet,"#",11),SUBSTRING_INDEX(S.juillet,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_juillet,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.aout,"#",11),SUBSTRING_INDEX(S.aout,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.aout,"#",11),SUBSTRING_INDEX(S.aout,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_aout,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",11),SUBSTRING_INDEX(S.septembre,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",11),SUBSTRING_INDEX(S.septembre,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_septembre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.octobre,"#",11),SUBSTRING_INDEX(S.octobre,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.octobre,"#",11),SUBSTRING_INDEX(S.octobre,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_octobre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.novembre,"#",11),SUBSTRING_INDEX(S.novembre,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.novembre,"#",11),SUBSTRING_INDEX(S.novembre,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_novembre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",11),SUBSTRING_INDEX(S.decembre,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",11),SUBSTRING_INDEX(S.decembre,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_decembre

     FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and 
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.tvregime = "RM" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ressumdtvetvlcient = $this->Getconnexion()->prepare($sqlSsumDTVETvclient);
        $ressumdtvetvlcient->execute(array('id' => $id__eq));
        $resultat_valide_client = $ressumdtvetvlcient->fetchAll();


        $sqlSsumDTVETtramns = 'SELECT
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.janvier,"#",12),SUBSTRING_INDEX(S.janvier,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.janvier,"#",12),SUBSTRING_INDEX(S.janvier,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_janvier,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.fevrier,"#",12),SUBSTRING_INDEX(S.fevrier,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.fevrier,"#",12),SUBSTRING_INDEX(S.fevrier,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_fevrier,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",12),SUBSTRING_INDEX(S.mars,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",12),SUBSTRING_INDEX(S.mars,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_mars,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.avril,"#",12),SUBSTRING_INDEX(S.avril,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.avril,"#",12),SUBSTRING_INDEX(S.avril,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_avril,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mais,"#",12),SUBSTRING_INDEX(S.mais,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mais,"#",12),SUBSTRING_INDEX(S.mais,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_mais,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",12),SUBSTRING_INDEX(S.juin,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",12),SUBSTRING_INDEX(S.juin,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_juin,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juillet,"#",12),SUBSTRING_INDEX(S.juillet,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juillet,"#",12),SUBSTRING_INDEX(S.juillet,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_juillet,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.aout,"#",12),SUBSTRING_INDEX(S.aout,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.aout,"#",12),SUBSTRING_INDEX(S.aout,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_aout,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",12),SUBSTRING_INDEX(S.septembre,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",12),SUBSTRING_INDEX(S.septembre,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_septembre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.octobre,"#",12),SUBSTRING_INDEX(S.octobre,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.octobre,"#",12),SUBSTRING_INDEX(S.octobre,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_octobre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.novembre,"#",12),SUBSTRING_INDEX(S.novembre,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.novembre,"#",12),SUBSTRING_INDEX(S.novembre,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_novembre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",12),SUBSTRING_INDEX(S.decembre,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",12),SUBSTRING_INDEX(S.decembre,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_decembre

     FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and 
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.tvregime = "RM" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ressumdtvetvltramns = $this->Getconnexion()->prepare($sqlSsumDTVETtramns);
        $ressumdtvetvltramns->execute(array('id' => $id__eq));
        $resultat_transmission = $ressumdtvetvltramns->fetchAll();


        //--------------------------------------ET-------------------------------------------------------------------------

        $sqlSsumet = 'SELECT
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.janvier,"#",10),SUBSTRING_INDEX(S.janvier,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.janvier,"#",10),SUBSTRING_INDEX(S.janvier,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_janvier,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.fevrier,"#",10),SUBSTRING_INDEX(S.fevrier,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.fevrier,"#",10),SUBSTRING_INDEX(S.fevrier,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_fevrier,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",10),SUBSTRING_INDEX(S.mars,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",10),SUBSTRING_INDEX(S.mars,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_mars,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.avril,"#",10),SUBSTRING_INDEX(S.avril,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.avril,"#",10),SUBSTRING_INDEX(S.avril,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_avril,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mais,"#",10),SUBSTRING_INDEX(S.mais,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mais,"#",10),SUBSTRING_INDEX(S.mais,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_mais,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",10),SUBSTRING_INDEX(S.juin,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",10),SUBSTRING_INDEX(S.juin,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_juin,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juillet,"#",10),SUBSTRING_INDEX(S.juillet,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juillet,"#",10),SUBSTRING_INDEX(S.juillet,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_juillet,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.aout,"#",10),SUBSTRING_INDEX(S.aout,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.aout,"#",10),SUBSTRING_INDEX(S.aout,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_aout,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",10),SUBSTRING_INDEX(S.septembre,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",10),SUBSTRING_INDEX(S.septembre,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_septembre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.octobre,"#",10),SUBSTRING_INDEX(S.octobre,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.octobre,"#",10),SUBSTRING_INDEX(S.octobre,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_octobre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.novembre,"#",10),SUBSTRING_INDEX(S.novembre,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.novembre,"#",10),SUBSTRING_INDEX(S.novembre,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_novembre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",10),SUBSTRING_INDEX(S.decembre,"#",9),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",10),SUBSTRING_INDEX(S.decembre,"#",9),""),2,1) iS NULL,0,1))) as sum_envoi_client_decembre

     FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and 
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.tvregime = "EM" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ressumdet = $this->Getconnexion()->prepare($sqlSsumet);
        $ressumdet->execute(array('id' => $id__eq));
        $resultatenvoi_client_et = $ressumdet->fetchAll();


        $sqlSsumDTVETvclientet = 'SELECT
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.janvier,"#",11),SUBSTRING_INDEX(S.janvier,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.janvier,"#",11),SUBSTRING_INDEX(S.janvier,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_janvier,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.fevrier,"#",11),SUBSTRING_INDEX(S.fevrier,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.fevrier,"#",11),SUBSTRING_INDEX(S.fevrier,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_fevrier,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",11),SUBSTRING_INDEX(S.mars,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",11),SUBSTRING_INDEX(S.mars,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_mars,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.avril,"#",11),SUBSTRING_INDEX(S.avril,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.avril,"#",11),SUBSTRING_INDEX(S.avril,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_avril,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mais,"#",11),SUBSTRING_INDEX(S.mais,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mais,"#",11),SUBSTRING_INDEX(S.mais,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_mais,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",11),SUBSTRING_INDEX(S.juin,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",11),SUBSTRING_INDEX(S.juin,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_juin,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juillet,"#",11),SUBSTRING_INDEX(S.juillet,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juillet,"#",11),SUBSTRING_INDEX(S.juillet,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_juillet,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.aout,"#",11),SUBSTRING_INDEX(S.aout,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.aout,"#",11),SUBSTRING_INDEX(S.aout,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_aout,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",11),SUBSTRING_INDEX(S.septembre,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",11),SUBSTRING_INDEX(S.septembre,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_septembre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.octobre,"#",11),SUBSTRING_INDEX(S.octobre,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.octobre,"#",11),SUBSTRING_INDEX(S.octobre,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_octobre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.novembre,"#",11),SUBSTRING_INDEX(S.novembre,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.novembre,"#",11),SUBSTRING_INDEX(S.novembre,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_novembre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",11),SUBSTRING_INDEX(S.decembre,"#",10),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",11),SUBSTRING_INDEX(S.decembre,"#",10),""),2,1) iS NULL,0,1))) as sum_valide_client_decembre

     FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and 
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.tvregime = "EM" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ressumdtvetvlcientet = $this->Getconnexion()->prepare($sqlSsumDTVETvclientet);
        $ressumdtvetvlcientet->execute(array('id' => $id__eq));
        $resultat_valide_client_et = $ressumdtvetvlcientet->fetchAll();


        $sqlSsumDTVETtramnset = 'SELECT
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.janvier,"#",12),SUBSTRING_INDEX(S.janvier,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.janvier,"#",12),SUBSTRING_INDEX(S.janvier,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_janvier,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.fevrier,"#",12),SUBSTRING_INDEX(S.fevrier,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.fevrier,"#",12),SUBSTRING_INDEX(S.fevrier,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_fevrier,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",12),SUBSTRING_INDEX(S.mars,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mars,"#",12),SUBSTRING_INDEX(S.mars,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_mars,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.avril,"#",12),SUBSTRING_INDEX(S.avril,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.avril,"#",12),SUBSTRING_INDEX(S.avril,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_avril,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.mais,"#",12),SUBSTRING_INDEX(S.mais,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.mais,"#",12),SUBSTRING_INDEX(S.mais,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_mais,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",12),SUBSTRING_INDEX(S.juin,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juin,"#",12),SUBSTRING_INDEX(S.juin,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_juin,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.juillet,"#",12),SUBSTRING_INDEX(S.juillet,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.juillet,"#",12),SUBSTRING_INDEX(S.juillet,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_juillet,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.aout,"#",12),SUBSTRING_INDEX(S.aout,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.aout,"#",12),SUBSTRING_INDEX(S.aout,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_aout,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",12),SUBSTRING_INDEX(S.septembre,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.septembre,"#",12),SUBSTRING_INDEX(S.septembre,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_septembre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.octobre,"#",12),SUBSTRING_INDEX(S.octobre,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.octobre,"#",12),SUBSTRING_INDEX(S.octobre,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_octobre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.novembre,"#",12),SUBSTRING_INDEX(S.novembre,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.novembre,"#",12),SUBSTRING_INDEX(S.novembre,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_novembre,
    sum(if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",12),SUBSTRING_INDEX(S.decembre,"#",11),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.decembre,"#",12),SUBSTRING_INDEX(S.decembre,"#",11),""),2,1) iS NULL,0,1))) as sum_transm_decembre

     FROM suividossdb.suivi_tva S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and 
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.tvregime = "EM" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ressumdtvetvltramnset = $this->Getconnexion()->prepare($sqlSsumDTVETtramnset);
        $ressumdtvetvltramnset->execute(array('id' => $id__eq));
        $resultat_transmission_et = $ressumdtvetvltramnset->fetchAll();

        //------------------------------------------FIN ET---------------------------------------

        return [
            "rm" => $resultatfinal,
            "em" => $resultatfinal1,
            //-----------------------------------rep RM-----------------------------------
            "sum_envoi_client_janvier" => $resultatenvoi_client[0]["sum_envoi_client_janvier"],
            "sum_envoi_client_fevrier" => $resultatenvoi_client[0]["sum_envoi_client_fevrier"],
            "sum_envoi_client_mars" => $resultatenvoi_client[0]["sum_envoi_client_mars"],
            "sum_envoi_client_avril" => $resultatenvoi_client[0]["sum_envoi_client_avril"],
            "sum_envoi_client_mais" => $resultatenvoi_client[0]["sum_envoi_client_mais"],
            "sum_envoi_client_juin" => $resultatenvoi_client[0]["sum_envoi_client_juin"],
            "sum_envoi_client_juillet" => $resultatenvoi_client[0]["sum_envoi_client_juillet"],
            "sum_envoi_client_aout" => $resultatenvoi_client[0]["sum_envoi_client_aout"],
            "sum_envoi_client_septembre" => $resultatenvoi_client[0]["sum_envoi_client_septembre"],
            "sum_envoi_client_octobre" => $resultatenvoi_client[0]["sum_envoi_client_octobre"],
            "sum_envoi_client_novembre" => $resultatenvoi_client[0]["sum_envoi_client_novembre"],
            "sum_envoi_client_decembre" => $resultatenvoi_client[0]["sum_envoi_client_decembre"],

            "sum_valide_client_janvier" => $resultat_valide_client[0]["sum_valide_client_janvier"],
            "sum_valide_client_fevrier" => $resultat_valide_client[0]["sum_valide_client_fevrier"],
            "sum_valide_client_mars" => $resultat_valide_client[0]["sum_valide_client_mars"],
            "sum_valide_client_avril" => $resultat_valide_client[0]["sum_valide_client_avril"],
            "sum_valide_client_mais" => $resultat_valide_client[0]["sum_valide_client_mais"],
            "sum_valide_client_juin" => $resultat_valide_client[0]["sum_valide_client_juin"],
            "sum_valide_client_juillet" => $resultat_valide_client[0]["sum_valide_client_juillet"],
            "sum_valide_client_aout" => $resultat_valide_client[0]["sum_valide_client_aout"],
            "sum_valide_client_septembre" => $resultat_valide_client[0]["sum_valide_client_septembre"],
            "sum_valide_client_octobre" => $resultat_valide_client[0]["sum_valide_client_octobre"],
            "sum_valide_client_novembre" => $resultat_valide_client[0]["sum_valide_client_novembre"],
            "sum_valide_client_decembre" => $resultat_valide_client[0]["sum_valide_client_decembre"],

            "sum_transm_janvier" => $resultat_transmission[0]["sum_transm_janvier"],
            "sum_transm_fevrier" => $resultat_transmission[0]["sum_transm_fevrier"],
            "sum_transm_mars" => $resultat_transmission[0]["sum_transm_mars"],
            "sum_transm_avril" => $resultat_transmission[0]["sum_transm_avril"],
            "sum_transm_mais" => $resultat_transmission[0]["sum_transm_mais"],
            "sum_transm_juin" => $resultat_transmission[0]["sum_transm_juin"],
            "sum_transm_juillet" => $resultat_transmission[0]["sum_transm_juillet"],
            "sum_transm_aout" => $resultat_transmission[0]["sum_transm_aout"],
            "sum_transm_septembre" => $resultat_transmission[0]["sum_transm_septembre"],
            "sum_transm_octobre" => $resultat_transmission[0]["sum_transm_octobre"],
            "sum_transm_novembre" => $resultat_transmission[0]["sum_transm_novembre"],
            "sum_transm_decembre" => $resultat_transmission[0]["sum_transm_decembre"],

            //----------------------------------X--EM----------------------------------------

            "sum_envoi_client_janvier_et" => $resultatenvoi_client_et[0]["sum_envoi_client_janvier"],
            "sum_envoi_client_fevrier_et" => $resultatenvoi_client_et[0]["sum_envoi_client_fevrier"],
            "sum_envoi_client_mars_et" => $resultatenvoi_client_et[0]["sum_envoi_client_mars"],
            "sum_envoi_client_avril_et" => $resultatenvoi_client_et[0]["sum_envoi_client_avril"],
            "sum_envoi_client_mais_et" => $resultatenvoi_client_et[0]["sum_envoi_client_mais"],
            "sum_envoi_client_juin_et" => $resultatenvoi_client_et[0]["sum_envoi_client_juin"],
            "sum_envoi_client_juillet_et" => $resultatenvoi_client_et[0]["sum_envoi_client_juillet"],
            "sum_envoi_client_aout_et" => $resultatenvoi_client_et[0]["sum_envoi_client_aout"],
            "sum_envoi_client_septembre_et" => $resultatenvoi_client_et[0]["sum_envoi_client_septembre"],
            "sum_envoi_client_octobre_et" => $resultatenvoi_client_et[0]["sum_envoi_client_octobre"],
            "sum_envoi_client_novembre_et" => $resultatenvoi_client_et[0]["sum_envoi_client_novembre"],
            "sum_envoi_client_decembre_et" => $resultatenvoi_client_et[0]["sum_envoi_client_decembre"],

            "sum_valide_client_janvier_et" => $resultat_valide_client_et[0]["sum_valide_client_janvier"],
            "sum_valide_client_fevrier_et" => $resultat_valide_client_et[0]["sum_valide_client_fevrier"],
            "sum_valide_client_mars_et" => $resultat_valide_client_et[0]["sum_valide_client_mars"],
            "sum_valide_client_avril_et" => $resultat_valide_client_et[0]["sum_valide_client_avril"],
            "sum_valide_client_mais_et" => $resultat_valide_client_et[0]["sum_valide_client_mais"],
            "sum_valide_client_juin_et" => $resultat_valide_client_et[0]["sum_valide_client_juin"],
            "sum_valide_client_juillet_et" => $resultat_valide_client_et[0]["sum_valide_client_juillet"],
            "sum_valide_client_aout_et" => $resultat_valide_client_et[0]["sum_valide_client_aout"],
            "sum_valide_client_septembre_et" => $resultat_valide_client_et[0]["sum_valide_client_septembre"],
            "sum_valide_client_octobre_et" => $resultat_valide_client_et[0]["sum_valide_client_octobre"],
            "sum_valide_client_novembre_et" => $resultat_valide_client_et[0]["sum_valide_client_novembre"],
            "sum_valide_client_decembre_et" => $resultat_valide_client_et[0]["sum_valide_client_decembre"],

            "sum_transm_janvier_et" => $resultat_transmission_et[0]["sum_transm_janvier"],
            "sum_transm_fevrier_et" => $resultat_transmission_et[0]["sum_transm_fevrier"],
            "sum_transm_mars_et" => $resultat_transmission_et[0]["sum_transm_mars"],
            "sum_transm_avril_et" => $resultat_transmission_et[0]["sum_transm_avril"],
            "sum_transm_mais_et" => $resultat_transmission_et[0]["sum_transm_mais"],
            "sum_transm_juin_et" => $resultat_transmission_et[0]["sum_transm_juin"],
            "sum_transm_juillet_et" => $resultat_transmission_et[0]["sum_transm_juillet"],
            "sum_transm_aout_et" => $resultat_transmission_et[0]["sum_transm_aout"],
            "sum_transm_septembre_et" => $resultat_transmission_et[0]["sum_transm_septembre"],
            "sum_transm_octobre_et" => $resultat_transmission_et[0]["sum_transm_octobre"],
            "sum_transm_novembre_et" => $resultat_transmission_et[0]["sum_transm_novembre"],
            "sum_transm_decembre_et" => $resultat_transmission_et[0]["sum_transm_decembre"],

        ];
    }


    public function RM($date_bilan, $id__eq)
    {
        $totaledi = "";
        $sql = 'SELECT tm.dt_validation_edi as fait_edi,tm.adddate FROM tva_mensuel tm left join situation_par_portfeuil spp on(spp.id =tm.id_situation) left join dossier d on(d.id = spp.iddoss) left join equipe e2 on(e2.id = d.equip_id) WHERE spp.idsituation_dossier <> "MA" and spp.idsituation_dossier <> "MS" and spp.tvregime = "RM" and tm.adddate is not NULL and tm.dt_validation_edi is not NULL and e2.id =:id and spp.date_cloturation LIKE "' . substr($date_bilan, 0, 4) . '%"';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('id' => $id__eq));
        $resultat = $res->fetchAll();
        for ($i = 0; $i < count($resultat); $i++) {
            $totaledi .= "/" . $resultat[$i]['fait_edi'] . "__" . $resultat[$i]['adddate'];
        }
        $sql = 'SELECT count(*) as RM  FROM suividossdb.situation_par_portfeuil sp LEFT JOIN dossier d2 on(d2.id = sp.iddoss) LEFT JOIN equipe e on(e.id = d2.equip_id)  WHERE sp.idsituation_dossier <> "MA" and sp.tvregime = "RM"  and e.id = :id and sp.date_cloturation LIKE "' . substr($date_bilan, 0, 4) . '%"';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('id' => $id__eq));
        $resultat = $res->fetchAll();
        return [
            "total" => $resultat[0]['RM'],
            "mois" =>  $this->returnsumDateNomvide($totaledi),
        ];
    }

    public function EM($date_bilan, $id__eq)
    {
        $totaledi = "";
        //$sql = 'SELECT tm.dt_validation_edi as fait_edi, if(tm.adddate is null or tm.adddate = "","",tm.adddate) as  adddate  FROM suividossdb.situation_par_portfeuil sp LEFT JOIN dossier d2 on(d2.id = sp.iddoss) LEFT JOIN equipe e on(e.id = d2.equip_id)  left JOIN tva_mensuel tm on(tm.id_situation = sp.id ) WHERE sp.tvregime = "EM"  and tm.adddate is not NULL and tm.dt_validation_edi is not NULL and e.id =:id and sp.date_cloturation LIKE "'. substr($date_bilan,0,4).'%" and 
        $sql = 'SELECT tm.dt_validation_edi as fait_edi,tm.adddate FROM tva_mensuel tm left join situation_par_portfeuil spp on(spp.id =tm.id_situation) left join dossier d on(d.id = spp.iddoss) left join equipe e2 on(e2.id = d.equip_id) WHERE tm.adddate is not NULL and tm.dt_validation_edi is not NULL and e2.id =:id and spp.tvregime = "EM" and spp.date_cloturation LIKE "' . substr($date_bilan, 0, 4) . '%"';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('id' => $id__eq));
        $resultat = $res->fetchAll();
        for ($i = 0; $i < count($resultat); $i++) {
            $totaledi .= "/" . $resultat[$i]['fait_edi'] . "__" . $resultat[$i]['adddate'];
        }

        $sql = 'SELECT count(*) as EM  FROM suividossdb.situation_par_portfeuil sp LEFT JOIN dossier d2 on(d2.id = sp.iddoss) LEFT JOIN equipe e on(e.id = d2.equip_id)  WHERE sp.idsituation_dossier <> "MA" and sp.tvregime = "EM"  and e.id = :id and sp.date_cloturation LIKE "' . substr($date_bilan, 0, 4) . '%"';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('id' => $id__eq));
        $resultat = $res->fetchAll();
        return [
            "total" => $resultat[0]['EM'],
            "mois" =>  $this->returnsumDateNomvide($totaledi),
        ];
    }

    public function ca12($date_bilan, $id__eq)
    {
        $sqls = ' SELECT
        sum(if(SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",1) ="",0,1))) as dt_acpt_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",2),SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",2),SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",1),""),2,1) iS NULL,0,1))) as dt_acpt_2
     FROM suividossdb.acompte_tva_st S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ress = $this->Getconnexion()->prepare($sqls);
        $ress->execute(array('id' => $id__eq));
        $resultatS = $ress->fetchAll();

        $dt_envoie_client_dt_acpt = ' SELECT
        sum(if(SUBSTRING_INDEX(S.dt_envoie_client,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.dt_envoie_client,"#",1) ="",0,1))) as dt_envoie_client_dt_acpt_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.dt_envoie_client,"#",2),SUBSTRING_INDEX(S.dt_envoie_client,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.dt_envoie_client,"#",2),SUBSTRING_INDEX(S.dt_envoie_client,"#",1),""),2,1) iS NULL,0,1))) as dt_envoie_client_dt_acpt_2
     FROM suividossdb.acompte_tva_st S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $resdt_envoie_client_dt_acpt = $this->Getconnexion()->prepare($dt_envoie_client_dt_acpt);
        $resdt_envoie_client_dt_acpt->execute(array('id' => $id__eq));
        $resultatresdt_envoie_client_dt_acpt = $resdt_envoie_client_dt_acpt->fetchAll();


        $dt_validation_client = ' SELECT
        sum(if(SUBSTRING_INDEX(S.dt_validation_client,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.dt_validation_client,"#",1) ="",0,1))) as dt_validation_client_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.dt_validation_client,"#",2),SUBSTRING_INDEX(S.dt_validation_client,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.dt_validation_client,"#",2),SUBSTRING_INDEX(S.dt_validation_client,"#",1),""),2,1) iS NULL,0,1))) as dt_validation_client_2
     FROM suividossdb.acompte_tva_st S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $resdt_validation_client = $this->Getconnexion()->prepare($dt_validation_client);
        $resdt_validation_client->execute(array('id' => $id__eq));
        $resultatresresdt_validation_client = $resdt_validation_client->fetchAll();

        $dt_date_teletransmission = ' SELECT
        sum(if(SUBSTRING_INDEX(S.date_teletransmission,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.date_teletransmission,"#",1) ="",0,1))) as dt_date_teletransmission_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.date_teletransmission,"#",2),SUBSTRING_INDEX(S.date_teletransmission,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.date_teletransmission,"#",2),SUBSTRING_INDEX(S.date_teletransmission,"#",1),""),2,1) iS NULL,0,1))) as dt_date_teletransmission_2
     FROM suividossdb.acompte_tva_st S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $resdt_dt_date_teletransmission = $this->Getconnexion()->prepare($dt_date_teletransmission);
        $resdt_dt_date_teletransmission->execute(array('id' => $id__eq));
        $resultat_dt_date_teletransmission = $resdt_dt_date_teletransmission->fetchAll();


        $dt_dt_validation_edi = ' SELECT
        sum(if(SUBSTRING_INDEX(S.dt_validation_edi,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.dt_validation_edi,"#",1) ="",0,1))) as dt_validation_edi_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.dt_validation_edi,"#",2),SUBSTRING_INDEX(S.dt_validation_edi,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.dt_validation_edi,"#",2),SUBSTRING_INDEX(S.dt_validation_edi,"#",1),""),2,1) iS NULL,0,1))) as dt_validation_edi_2
     FROM suividossdb.acompte_tva_st S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $resdt_dt_dt_validation_edi = $this->Getconnexion()->prepare($dt_dt_validation_edi);
        $resdt_dt_dt_validation_edi->execute(array('id' => $id__eq));
        $resultat_dt_dt_validation_edi = $resdt_dt_dt_validation_edi->fetchAll();




        $sql = 'SELECT count(sp.id) as ST   FROM suividossdb.situation_par_portfeuil sp LEFT JOIN dossier d2 on(d2.id = sp.iddoss) LEFT JOIN equipe e on(e.id = d2.equip_id)  WHERE sp.idsituation_dossier <> "MA" and sp.idsituation_dossier <> "MS" and sp.tvregime = "ST" and e.id =:id and sp.date_cloturation LIKE "' . substr($date_bilan, 0, 4) . '%"';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('id' => $id__eq));
        $resultat = $res->fetchAll();
        return [
            "total" => $resultat[0]['ST'],

            "dt_acpt_1" =>  $resultatS[0]["dt_acpt_1"],
            "dt_acpt_2" =>  $resultatS[0]["dt_acpt_2"],
            "dt_envoie_client_dt_acpt_1" =>  $resultatresdt_envoie_client_dt_acpt[0]["dt_envoie_client_dt_acpt_1"],
            "dt_envoie_client_dt_acpt_2" =>  $resultatresdt_envoie_client_dt_acpt[0]["dt_envoie_client_dt_acpt_2"],

            "dt_validation_client_1" =>  $resultatresresdt_validation_client[0]["dt_validation_client_1"],
            "dt_validation_client_2" =>  $resultatresresdt_validation_client[0]["dt_validation_client_2"],

            "dt_date_teletransmission_1" =>  $resultat_dt_date_teletransmission[0]["dt_date_teletransmission_1"],
            "dt_date_teletransmission_2" =>  $resultat_dt_date_teletransmission[0]["dt_date_teletransmission_2"],

            "dt_validation_edi_1" =>  $resultat_dt_dt_validation_edi[0]["dt_validation_edi_1"],
            "dt_validation_edi_2" =>  $resultat_dt_dt_validation_edi[0]["dt_validation_edi_2"],
        ];
    }


    public function valeurcvae($date_bilan, $id__eq)
    {
        $sqls = ' SELECT
        sum(if(SUBSTRING_INDEX(S.date_cvae_karlit,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.date_cvae_karlit,"#",1) ="",0,1))) as dt_acpt_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.date_cvae_karlit,"#",2),SUBSTRING_INDEX(S.date_cvae_karlit,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.date_cvae_karlit,"#",2),SUBSTRING_INDEX(S.date_cvae_karlit,"#",1),""),2,1) iS NULL,0,1))) as dt_acpt_2
     FROM suividossdb.cvae S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ress = $this->Getconnexion()->prepare($sqls);
        $ress->execute(array('id' => $id__eq));
        $resultatS = $ress->fetchAll();

        $dt_envoie_client_dt_acpt = ' SELECT
        sum(if(SUBSTRING_INDEX(S.date_envoie_client,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.date_envoie_client,"#",1) ="",0,1))) as dt_envoie_client_dt_acpt_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.date_envoie_client,"#",2),SUBSTRING_INDEX(S.date_envoie_client,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.date_envoie_client,"#",2),SUBSTRING_INDEX(S.date_envoie_client,"#",1),""),2,1) iS NULL,0,1))) as dt_envoie_client_dt_acpt_2
     FROM suividossdb.cvae S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $resdt_envoie_client_dt_acpt = $this->Getconnexion()->prepare($dt_envoie_client_dt_acpt);
        $resdt_envoie_client_dt_acpt->execute(array('id' => $id__eq));
        $resultatresdt_envoie_client_dt_acpt = $resdt_envoie_client_dt_acpt->fetchAll();


        $dt_validation_client = ' SELECT
        sum(if(SUBSTRING_INDEX(S.date_de_validation_client,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.date_de_validation_client,"#",1) ="",0,1))) as dt_validation_client_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.date_de_validation_client,"#",2),SUBSTRING_INDEX(S.date_de_validation_client,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.date_de_validation_client,"#",2),SUBSTRING_INDEX(S.date_de_validation_client,"#",1),""),2,1) iS NULL,0,1))) as dt_validation_client_2
     FROM suividossdb.cvae S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $resdt_validation_client = $this->Getconnexion()->prepare($dt_validation_client);
        $resdt_validation_client->execute(array('id' => $id__eq));
        $resultatresresdt_validation_client = $resdt_validation_client->fetchAll();

        $dt_date_teletransmission = ' SELECT
        sum(if(SUBSTRING_INDEX(S.date_teletransmission,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.date_teletransmission,"#",1) ="",0,1))) as dt_date_teletransmission_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.date_teletransmission,"#",2),SUBSTRING_INDEX(S.date_teletransmission,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.date_teletransmission,"#",2),SUBSTRING_INDEX(S.date_teletransmission,"#",1),""),2,1) iS NULL,0,1))) as dt_date_teletransmission_2
     FROM suividossdb.cvae S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $resdt_dt_date_teletransmission = $this->Getconnexion()->prepare($dt_date_teletransmission);
        $resdt_dt_date_teletransmission->execute(array('id' => $id__eq));
        $resultat_dt_date_teletransmission = $resdt_dt_date_teletransmission->fetchAll();


        $dt_dt_validation_edi = ' SELECT
        sum(if(SUBSTRING_INDEX(S.date_validation_edi,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.date_validation_edi,"#",1) ="",0,1))) as dt_validation_edi_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.date_validation_edi,"#",2),SUBSTRING_INDEX(S.date_validation_edi,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.date_validation_edi,"#",2),SUBSTRING_INDEX(S.date_validation_edi,"#",1),""),2,1) iS NULL,0,1))) as dt_validation_edi_2
     FROM suividossdb.cvae S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $resdt_dt_dt_validation_edi = $this->Getconnexion()->prepare($dt_dt_validation_edi);
        $resdt_dt_dt_validation_edi->execute(array('id' => $id__eq));
        $resultat_dt_dt_validation_edi = $resdt_dt_dt_validation_edi->fetchAll();




        $sql = 'SELECT count( DISTINCT sp.iddoss) as CVAE   FROM suividossdb.situation_par_portfeuil sp INNER JOIN dossier d2 on(d2.id = sp.iddoss) INNER JOIN equipe e on(e.id = d2.equip_id)  WHERE sp.idsituation_dossier <> "MA" and sp.idsituation_dossier <> "MS" and e.id =:id and sp.date_cloturation LIKE "' . substr($date_bilan, 0, 4) . '%"';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('id' => $id__eq));
        $resultat = $res->fetchAll();
        return [
            "total" => $resultat[0]['CVAE'],

            "dt_acpt_1" =>  $resultatS[0]["dt_acpt_1"],
            "dt_acpt_2" =>  $resultatS[0]["dt_acpt_2"],


            "dt_envoie_client_dt_acpt_1" =>  $resultatresdt_envoie_client_dt_acpt[0]["dt_envoie_client_dt_acpt_1"],
            "dt_envoie_client_dt_acpt_2" =>  $resultatresdt_envoie_client_dt_acpt[0]["dt_envoie_client_dt_acpt_2"],

            "dt_validation_client_1" =>  $resultatresresdt_validation_client[0]["dt_validation_client_1"],
            "dt_validation_client_2" =>  $resultatresresdt_validation_client[0]["dt_validation_client_2"],

            "dt_date_teletransmission_1" =>  $resultat_dt_date_teletransmission[0]["dt_date_teletransmission_1"],
            "dt_date_teletransmission_2" =>  $resultat_dt_date_teletransmission[0]["dt_date_teletransmission_2"],

            "dt_validation_edi_1" =>  $resultat_dt_dt_validation_edi[0]["dt_validation_edi_1"],
            "dt_validation_edi_2" =>  $resultat_dt_dt_validation_edi[0]["dt_validation_edi_2"],
        ];
    }


    public function valeurcfe($date_bilan, $id__eq)
    {
        $sqls = ' SELECT
        sum(if(SUBSTRING_INDEX(S.date_cvae_karlit,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.date_cvae_karlit,"#",1) ="",0,1))) as dt_acpt_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.date_cvae_karlit,"#",2),SUBSTRING_INDEX(S.date_cvae_karlit,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.date_cvae_karlit,"#",2),SUBSTRING_INDEX(S.date_cvae_karlit,"#",1),""),2,1) iS NULL,0,1))) as dt_acpt_2
     FROM suividossdb.cfe S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ress = $this->Getconnexion()->prepare($sqls);
        $ress->execute(array('id' => $id__eq));
        $resultatS = $ress->fetchAll();

        $dt_envoie_client_dt_acpt = ' SELECT
        sum(if(SUBSTRING_INDEX(S.date_envoie_client,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.date_envoie_client,"#",1) ="",0,1))) as dt_envoie_client_dt_acpt_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.date_envoie_client,"#",2),SUBSTRING_INDEX(S.date_envoie_client,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.date_envoie_client,"#",2),SUBSTRING_INDEX(S.date_envoie_client,"#",1),""),2,1) iS NULL,0,1))) as dt_envoie_client_dt_acpt_2
     FROM suividossdb.cfe S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $resdt_envoie_client_dt_acpt = $this->Getconnexion()->prepare($dt_envoie_client_dt_acpt);
        $resdt_envoie_client_dt_acpt->execute(array('id' => $id__eq));
        $resultatresdt_envoie_client_dt_acpt = $resdt_envoie_client_dt_acpt->fetchAll();


        $dt_validation_client = ' SELECT
        sum(if(SUBSTRING_INDEX(S.date_de_validation_client,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.date_de_validation_client,"#",1) ="",0,1))) as dt_validation_client_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.date_de_validation_client,"#",2),SUBSTRING_INDEX(S.date_de_validation_client,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.date_de_validation_client,"#",2),SUBSTRING_INDEX(S.date_de_validation_client,"#",1),""),2,1) iS NULL,0,1))) as dt_validation_client_2
     FROM suividossdb.cfe S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $resdt_validation_client = $this->Getconnexion()->prepare($dt_validation_client);
        $resdt_validation_client->execute(array('id' => $id__eq));
        $resultatresresdt_validation_client = $resdt_validation_client->fetchAll();

        $dt_date_teletransmission = ' SELECT
        sum(if(SUBSTRING_INDEX(S.date_teletransmission,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.date_teletransmission,"#",1) ="",0,1))) as dt_date_teletransmission_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.date_teletransmission,"#",2),SUBSTRING_INDEX(S.date_teletransmission,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.date_teletransmission,"#",2),SUBSTRING_INDEX(S.date_teletransmission,"#",1),""),2,1) iS NULL,0,1))) as dt_date_teletransmission_2
     FROM suividossdb.cfe S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $resdt_dt_date_teletransmission = $this->Getconnexion()->prepare($dt_date_teletransmission);
        $resdt_dt_date_teletransmission->execute(array('id' => $id__eq));
        $resultat_dt_date_teletransmission = $resdt_dt_date_teletransmission->fetchAll();


        $dt_dt_validation_edi = ' SELECT
        sum(if(SUBSTRING_INDEX(S.date_validation_edi,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.date_validation_edi,"#",1) ="",0,1))) as dt_validation_edi_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.date_validation_edi,"#",2),SUBSTRING_INDEX(S.date_validation_edi,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.date_validation_edi,"#",2),SUBSTRING_INDEX(S.date_validation_edi,"#",1),""),2,1) iS NULL,0,1))) as dt_validation_edi_2
     FROM suividossdb.cfe S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $resdt_dt_dt_validation_edi = $this->Getconnexion()->prepare($dt_dt_validation_edi);
        $resdt_dt_dt_validation_edi->execute(array('id' => $id__eq));
        $resultat_dt_dt_validation_edi = $resdt_dt_dt_validation_edi->fetchAll();

        $sql = 'SELECT count( DISTINCT sp.iddoss) as cfe   FROM suividossdb.situation_par_portfeuil sp INNER JOIN dossier d2 on(d2.id = sp.iddoss) INNER JOIN equipe e on(e.id = d2.equip_id)  WHERE sp.idsituation_dossier <> "MA" and sp.idsituation_dossier <> "MS" and e.id =:id and sp.date_cloturation LIKE "' . substr($date_bilan, 0, 4) . '%"';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('id' => $id__eq));
        $resultat = $res->fetchAll();

        return [
            "total" => $resultat[0]["cfe"],
            "dt_acpt_1" =>  $resultatS[0]["dt_acpt_1"],
            "dt_acpt_2" =>  $resultatS[0]["dt_acpt_2"],


            "dt_envoie_client_dt_acpt_1" =>  $resultatresdt_envoie_client_dt_acpt[0]["dt_envoie_client_dt_acpt_1"],
            "dt_envoie_client_dt_acpt_2" =>  $resultatresdt_envoie_client_dt_acpt[0]["dt_envoie_client_dt_acpt_2"],

            "dt_validation_client_1" =>  $resultatresresdt_validation_client[0]["dt_validation_client_1"],
            "dt_validation_client_2" =>  $resultatresresdt_validation_client[0]["dt_validation_client_2"],

            "dt_date_teletransmission_1" =>  $resultat_dt_date_teletransmission[0]["dt_date_teletransmission_1"],
            "dt_date_teletransmission_2" =>  $resultat_dt_date_teletransmission[0]["dt_date_teletransmission_2"],

            "dt_validation_edi_1" =>  $resultat_dt_dt_validation_edi[0]["dt_validation_edi_1"],
            "dt_validation_edi_2" =>  $resultat_dt_dt_validation_edi[0]["dt_validation_edi_2"],
        ];
    }


    public function acompteIs($date_bilan, $id__eq)
    {
        $sqls = ' SELECT
        sum(if(SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",1) IS NULL,0,if(SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",1) ="",0,1))) as dt_acpt_1,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",2),SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",1),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",2),SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",1),""),2,1) iS NULL,0,1))) as dt_acpt_2,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",3),SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",2),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",3),SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",2),""),2,1) iS NULL,0,1))) as dt_acpt_3,
        sum(if(substr(REPLACE(SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",4),SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",3),""),2,1) <> "2",0,if(substr(REPLACE(SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",4),SUBSTRING_INDEX(S.dt_acpt_fait_karlit,"#",3),""),2,1) iS NULL,0,1))) as dt_acpt_4  
     
     FROM suividossdb.acompte_is S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and Spp.tvregime = "ST" and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ress = $this->Getconnexion()->prepare($sqls);
        $ress->execute(array('id' => $id__eq));
        $resultatS = $ress->fetchAll();


        $sql = 'SELECT count(sp.id) as ISED   FROM suividossdb.situation_par_portfeuil sp LEFT JOIN dossier d2 on(d2.id = sp.iddoss) LEFT JOIN equipe e on(e.id = d2.equip_id)  WHERE sp.regime_dimpos = "IS" and e.id =:id and sp.date_cloturation LIKE "' . substr($date_bilan, 0, 4) . '%"';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('id' => $id__eq));
        $resultat = $res->fetchAll();
        return [
            "total" => $resultat[0]['ISED'],
            "dt_acpt_1" => $resultatS[0]["dt_acpt_1"],
            "dt_acpt_2" => $resultatS[0]["dt_acpt_2"],
            "dt_acpt_3" => $resultatS[0]["dt_acpt_3"],
            "dt_acpt_4" => $resultatS[0]["dt_acpt_4"],
        ];
    }

    public function liquidation($date_bilan, $id__eq)
    {
        $sqls = ' SELECT
        sum(if(S.dt_acpt_fait_karlit IS NULL,0,if(S.dt_acpt_fait_karlit ="",0,1))) as v_liquidation_is
        FROM suividossdb.liquidation_is S LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) 
            LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)  WHERE e.id =:id and
            Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.date_cloturation LIKE "' . $date_bilan . '%"';
        $ress = $this->Getconnexion()->prepare($sqls);
        $ress->execute(array('id' => $id__eq));
        $resultatS = $ress->fetchAll();

        return [
            "v_liquidation_is" => $resultatS[0]['v_liquidation_is'],
        ];
    }


    function returnAcomptST($dateText)
    {
        $actp_1 = 0;
        $actp_2 = 0;
        $chaine1 = str_replace("111", "1", preg_replace('/\-?\d+/', '1', $dateText));
        $splch = explode('/', $chaine1);
        foreach ($splch as $valeur) {
            $z = explode('#', $valeur);
            $int = 0;
            foreach ($z as $val2) {
                if ($int == 0) {
                    $actp_1 += intval($val2);
                }
                if ($int == 1) {
                    $actp_2 += intval($val2);
                }
                $int++;
            }
        }
        return [
            'actp_1' =>   $actp_1,
            "actp_2" => $actp_2
        ];
    }


    function returnsumDateNomvideETRT($dateText)
    {
        $mars = 0;
        $juin = 0;
        $septembre = 0;
        $decembre = 0;
        $text = "";
        $chaine1 = str_replace("111", "1", preg_replace('/\-?\d+/', '1', $dateText));
        $splch = explode('/', $chaine1);
        foreach ($splch as $valeur) {
            $z = explode('#', $valeur);
            $int = 0;
            foreach ($z as $val2) {
                if ($int == 0) {
                    $mars += intval($val2);
                }
                if ($int == 1) {
                    $juin += intval($val2);
                }
                if ($int == 2) {
                    $septembre += intval($val2);
                }
                if ($int == 3) {
                    $decembre += intval($val2);
                }
                $text .= $val2;
                $int++;
            }
        }
        return [
            "mars" =>   $mars,
            "juin" => $juin,
            "sept" => $septembre,
            "dec"  => $decembre
        ];
    }

    function returnsumDateNomvide($dateText)
    {
        $totaledi = "";
        $jan = 0;
        $fev = 0;
        $mars = 0;
        $avril = 0;
        $mai = 0;
        $juin = 0;
        $juil = 0;
        $aout = 0;
        $sept = 0;
        $oct = 0;
        $nov = 0;
        $dec = 0;
        $convertdate = str_replace(
            "Decembre",
            "11",
            str_replace(
                "Novembre",
                "10",
                str_replace(
                    "Octobre",
                    "9",
                    str_replace(
                        "Septembre",
                        "8",
                        str_replace(
                            "Aout",
                            "7",
                            str_replace(
                                "Juillet",
                                "6",
                                str_replace(
                                    "Juin",
                                    "5",
                                    str_replace(
                                        "Mai",
                                        "4",
                                        str_replace(
                                            "Avril",
                                            "3",
                                            str_ireplace(
                                                "Mars",
                                                "2",
                                                str_ireplace(
                                                    "Fevrier",
                                                    "1",
                                                    str_replace("Janvier", "0", $dateText)
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );

        $t_textse = substr($convertdate, 1);
        $txtgeneral = explode("/", $t_textse);
        for ($count = 0; $count < count($txtgeneral); $count++) {
            $valeurdate = explode("#", explode("__", $txtgeneral[$count])[0]);
            $valeurdatelettre = explode("#", explode("__", $txtgeneral[$count])[1]);
            $rep = "";
            for ($z = 0; $z < count($valeurdatelettre); $z++) {
                if ($valeurdatelettre[$z] == 0 && !empty($valeurdate[$z])) {
                    $jan++;
                }
                if ($valeurdatelettre[$z] == 1 && !empty($valeurdate[$z])) {
                    $fev++;
                }
                if ($valeurdatelettre[$z] == 2 && !empty($valeurdate[$z])) {
                    $mars++;
                }
                if ($valeurdatelettre[$z] == 3 && !empty($valeurdate[$z])) {
                    $avril++;
                }
                if ($valeurdatelettre[$z] == 4 && !empty($valeurdate[$z])) {
                    $mai++;
                }
                if ($valeurdatelettre[$z] == 5 && !empty($valeurdate[$z])) {
                    $juin++;
                }
                if ($valeurdatelettre[$z] == 6 && !empty($valeurdate[$z])) {
                    $juil++;
                }
                if ($valeurdatelettre[$z] == 7 && !empty($valeurdate[$z])) {
                    $aout++;
                }
                if ($valeurdatelettre[$z] == 8 && !empty($valeurdate[$z])) {
                    $sept++;
                }
                if ($valeurdatelettre[$z] == 9 && !empty($valeurdate[$z])) {
                    $oct++;
                }
                if ($valeurdatelettre[$z] == 10 && !empty($valeurdate[$z])) {
                    $nov++;
                }
                if ($valeurdatelettre[$z] == 11 && !empty($valeurdate[$z])) {
                    $dec++;
                }
            }
        }
        return
            array(
                "janv" =>  $jan,
                "fev" =>  $fev,
                "mars" => $mars,
                "avril" => $avril,
                "mai" => $mai,
                "juin" => $juin,
                "juil" => $juil,
                "aout" => $aout,
                "sept" => $sept,
                "oct" =>  $oct,
                "nov" => $nov,
                "dec" => $dec
            );
    }

    public function stat_g($date_bilan)
    {
        $repons = "";
        $array = [];
        for ($i = 1; $i < 13; $i++) {
            if (strlen($i) == 1) {
                $i = "0" . $i;
            }
            $division = 1;
            $sql = 'SELECT count(S.date_cloturation) as total_bilan FROM suividossdb.equipe E  LEFT JOIN suividossdb.dossier D on(D.equip_id = E.id) LEFT JOIN suividossdb.situation_par_portfeuil S on(S.iddoss = D.id)  WHERE S.idsituation_dossier <> "MA" and S.idsituation_dossier <> "MS" and E.id > 0 and  date_cloturation LIKE "' . $date_bilan . "-" . $i . '%"';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            $repons = $resultat[0]['total_bilan'];


            $sql = 'SELECT count(SP.date_cloturation) as total_bilan FROM suividossdb.situation_par_portfeuil SP LEFT JOIN suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id> 0 and SP.date_cloturation LIKE "' . $date_bilan . "-" . $i . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "" )';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            if ($repons  > 0) {
                $division =  $repons;
            }

            $teletransmission_faitf = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
              suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
              LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
              LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
              LEFT JOIN zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
              WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.affiche_dans_stat is null and SP.date_cloturation 
              LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is not null ';
            $teletransmission_fait = $this->Getconnexion()->prepare($teletransmission_faitf);
            $teletransmission_fait->execute();
            $resultat_teletransmission_fait = count($teletransmission_fait->fetchAll());
            $division_trans = 1;



            if ($resultat_teletransmission_fait  > 0) {
                $division_trans =  $repons;
            }

            $division_v_edi = 1;

            $vedi_faitf = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
            LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
            LEFT JOIN zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
            LEFT JOIN zz_valid_edi_cdm_fr ve on(ve.id_situation = vt.id_situation) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is not null and ve.liase_fiscal is not null ';
            $vedi_fait = $this->Getconnexion()->prepare($vedi_faitf);
            $vedi_fait->execute();
            $resultatvedi_fait = count($vedi_fait->fetchAll());



            if ($resultat_teletransmission_fait  > 0) {
                $division_v_edi = $repons;
            }


            $com_client_cdm_fr_fait = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and SP.affiche_dans_stat is null and SP.date_cloturation 
          LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null';
            $res_com_client_cdm_fr_fait = $this->Getconnexion()->prepare($com_client_cdm_fr_fait);
            $res_com_client_cdm_fr_fait->execute();
            $resultat_com_client_cdm_fr_fait = count($res_com_client_cdm_fr_fait->fetchAll());

            $division_com_cl = 1;
            if ($resultat_com_client_cdm_fr_fait  > 0) {
                $division_com_cl = $repons;
            }


            $validation_client_fr_cdmf = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null';
            $validation_client_fr_cdmfaitf = $this->Getconnexion()->prepare($validation_client_fr_cdmf);
            $validation_client_fr_cdmfaitf->execute();
            $resultat_validation_client_fr_cdmafairef = count($validation_client_fr_cdmfaitf->fetchAll());

            $division_v_client_fr = 1;
            if ($resultat_validation_client_fr_cdmafairef  > 0) {
                $division_v_client_fr = $repons;
            }

            array_push($array, [
                "fait" => $resultat[0]['total_bilan'],
                "total" => $repons,
                "restant" => $repons - $resultat[0]['total_bilan'],
                "pourcentage" => number_format((($resultat[0]['total_bilan'] * 100) / $division), 2, '.', ',') . " %",

                "trans_afaire" => $repons,
                "trans_fait" => $resultat_teletransmission_fait,
                "trans_restant" => $repons - $resultat_teletransmission_fait,
                "trans_pourcentage" => number_format((($resultat_teletransmission_fait * 100) / $division_trans), 2, '.', ',') . " %",

                "v_edi_afaire" => $repons,
                "v_edi_fait" => $resultatvedi_fait,
                "v_edi_restant" => $repons - $resultatvedi_fait,
                "t_edi_pourcentage" => number_format((($resultatvedi_fait * 100) / $division_v_edi), 2, '.', ',') . " %",

                "com_cl_afaire" =>  $repons,
                "com_cl_fait" => $resultat_com_client_cdm_fr_fait,
                "com_cl_restant" => $repons - $resultat_com_client_cdm_fr_fait,
                "com_cl_pourcentage" => number_format((($resultat_com_client_cdm_fr_fait * 100) / $division_com_cl), 2, '.', ',') . " %",

                "v_cli_fr_afaire" =>  $repons,
                "v_cli_fr_fait" => $resultat_validation_client_fr_cdmafairef,
                "v_cli_fr_restant" =>  $repons - $resultat_validation_client_fr_cdmafairef,
                "v_cli_fr_pourcentage" => number_format((($resultat_validation_client_fr_cdmafairef * 100) / $division_v_client_fr), 2, '.', ',') . " %",

            ]);
        }
        return $array;
    }

    public function stat_g_fr($date_bilan)
    {
        $repons = "";
        $array = [];
        for ($i = 1; $i < 13; $i++) {
            if (strlen($i) == 1) {
                $i = "0" . $i;
            }
            $division = 1;

            $sql = ' SELECT (SELECT count(SP.date_cloturation) as total_bilan FROM suividossdb.situation_par_portfeuil SP LEFT JOIN suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id> 0 and SP.date_cloturation LIKE "' . $date_bilan . "-" . $i . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "")) 
             as total,count(S.date_cloturation) as total_bilan_valid FROM suividossdb.equipe E  LEFT JOIN suividossdb.dossier 
             D on(D.equip_id = E.id) LEFT JOIN suividossdb.situation_par_portfeuil S on(S.iddoss = D.id)  
             WHERE S.idsituation_dossier <> "MA" and S.idsituation_dossier <> "MS" and  S.date_cloturation 
             LIKE "' . $date_bilan . "-" . $i . '%" and S.reviseur_id > 0';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            $repons = $resultat[0]['total_bilan_valid'];

            if ($repons  > 0) {
                $division =  $repons;
            }

            array_push($array, [
                "total" => $resultat[0]['total'],
                "fait" => $repons,
                "restant" => $resultat[0]['total'] - $repons,
                "pourcentage" => number_format((($division * 100) / $resultat[0]['total']), 2, '.', ',') . " %"
            ]);
        }
        return $array;
    }


    public function list_gaia($cloture)
    {
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

        S.commentaire_et_autre as commentaire_et_autre,Rs.activite as Activite_final 
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
         WHERE S.date_cloturation LIKE "' . $cloture . '%" and D.manger_fr = "1530"  group by S.id order by Eq.code';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $respons = $res->fetchAll();
        return $respons;
    }

    public function stat_g_avec_ms($date_bilan)
    {
        $repons = "";
        $array = [];
        for ($i = 1; $i < 13; $i++) {
            if (strlen($i) == 1) {
                $i = "0" . $i;
            }
            $division = 1;
            $sql = 'SELECT count(S.date_cloturation) as total_bilan FROM suividossdb.equipe E  LEFT JOIN suividossdb.dossier D on(D.equip_id = E.id) LEFT JOIN suividossdb.situation_par_portfeuil S on(S.iddoss = D.id)  WHERE S.idsituation_dossier <> "MA" and E.id > 0 and  date_cloturation LIKE "' . $date_bilan . "-" . $i . '%"';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            $repons = $resultat[0]['total_bilan'];


            $sql = 'SELECT count(SP.date_cloturation) as total_bilan FROM suividossdb.situation_par_portfeuil SP LEFT JOIN suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) WHERE SP.idsituation_dossier <> "MA" and e.id> 0 and SP.date_cloturation LIKE "' . $date_bilan . "-" . $i . '%" and (SP.date_envoie_bilan_karlit is not NULL OR SP.date_envoie_bilan_karlit <> "" )';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            if ($repons  > 0) {
                $division =  $repons;
            }

            array_push($array, [
                "fait" => $resultat[0]['total_bilan'],
                "total" => $repons,
                "restant" => $repons - $resultat[0]['total_bilan'],
                "pourcentage" => number_format((($resultat[0]['total_bilan'] * 100) / $division), 2, '.', ',') . " %"
            ]);
        }
        return $array;
    }

    public function select_sup($pays_id)
    {
        $sql = "SELECT distinct d.manger_fr as id, upper(u.nom) as nom FROM dossier d  left join utilisateur u on(u.id = d.manger_fr) where d.manger_fr is not null group by d.manger_fr";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $resultat = $res->fetchAll();
        return $resultat;
    }


    public function selectall_ptf($mois, $annee)
    {

        $sql = "SELECT code FROM equipe WHERE code <>''";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $resultatd = $res->fetchAll();
        $resp = "";
        for ($i = 0; $i < count($resultatd); $i++) {
            if ($resultatd[$i]["code"] != null and $resultatd[$i]["code"] != "") {
                $resp .=  $resultatd[$i]["code"] . "#";
            }
        }

        $portfeuil = explode("#", $resp);
        $date_bilan = $annee . "-" . $mois;
        $val = [];
        $fait = 0;
        foreach ($portfeuil as $value) {
            $division = 1;

            $sql = 'SELECT E.code as nom_equipe, (SELECT count(SP.date_cloturation) FROM suividossdb.situation_par_portfeuil SP LEFT JOIN suividossdb.dossier d2  
            on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) WHERE SP.idsituation_dossier <> "MA" 
            and SP.idsituation_dossier <> "MS"  and e.code=:equip_nom and SP.affiche_dans_stat is null  and SP.date_cloturation
             LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "" AND SP.date_envoie_bilan_karlit <> " " AND  LENGTH(SP.date_envoie_bilan_karlit) > 9 )) 
             as total,count(S.date_cloturation) as total_bilan FROM suividossdb.equipe E  LEFT JOIN suividossdb.dossier 
             D on(D.equip_id = E.id) LEFT JOIN suividossdb.situation_par_portfeuil S on(S.iddoss = D.id)  
             WHERE S.idsituation_dossier <> "MA" and S.idsituation_dossier <> "MS" and E.code =:equip_nom and S.affiche_dans_stat is null and date_cloturation 
             LIKE "' . $date_bilan . '%"';

            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array('equip_nom' =>  $value,));
            $resultat = $res->fetchAll();
            $total_bilan = $resultat[0]['total_bilan'];
            $fait = $resultat[0]['total'];
            $nom_equipe = $resultat[0]['nom_equipe'];

            $restant  =  $resultat[0]['total_bilan'] - $resultat[0]['total'];
            if ($total_bilan  > 0) {
                $division =  $total_bilan;
            }
            $pourcentage = number_format((($fait * 100) / $division), 2, '.', ',');
            if ($resultat[0]['nom_equipe'] != "" || !empty($resultat[0]['nom_equipe'])) {
                array_push(
                    $val,
                    [
                        "total_bilan" => $total_bilan,
                        "nom_equipe" => $nom_equipe,
                        "fait" => $fait,
                        "pourcentage" => $pourcentage

                    ]
                );
            }
        }

        return $val;
    }

    public function selectall_ptf_cdm($mois, $annee)
    {
        $sql = "SELECT id,nom from utilisateur where post_id = 1 and pays_id = 5";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $resultatd = $res->fetchAll();
        $resp = "";
        $resp_nom = "";
        for ($i = 0; $i < count($resultatd); $i++) {
            if ($resultatd[$i]["id"] != null and $resultatd[$i]["id"] != "") {
                $resp .=  $resultatd[$i]["id"] . "#";
                $resp_nom .=  $resultatd[$i]["nom"] . "#";
            }
        }


        $portfeuil = explode("#", $resp);
        $portfeuil_nom = explode("#", $resp_nom);
        $i = 0;
        $val = [];
        foreach ($portfeuil as $value) {
            $sql = 'SELECT COUNT(spp.id)  as total_fait  FROM suividossdb.situation_par_portfeuil spp left join dossier d2 on(d2.id = spp.iddoss) 
            left join equipe e2 on(e2.id = d2.equip_id) WHERE spp.idsituation_dossier <> "MA" and spp.date_cloturation LIKE :date_annee
            AND spp.date_envoie_bilan_karlit is not null  and spp.utilisateur_id is not null and spp.etat_bilan <> "" AND spp.utilisateur_id =:utilisateur_id';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array(
                'date_annee' => $annee . "-" . $mois . "%",
                'utilisateur_id' => $value
            ));
            $resultat = $res->fetchAll();

            if ($resultat[0]['total_fait'] != "" || !empty($resultat[0]['total_fait'])) {
                array_push(
                    $val,
                    [
                        "total_fait" => $resultat[0]['total_fait'],
                        "nom_cdm" => $portfeuil_nom[$i]
                    ]
                );
            }
            $i++;
        }
        return $val;
    }

    public function __det__click($manager, $cdm_fr, $type, $collab,$_id)
    {
        if ($type == "true") {
            $type_d = " and s.idsituation_dossier <> 'MA'";
        } else {
            $type_d = " ";
        }


        if ($collab == "_ass") {
            $sql_ass = "select distinct d.id, e.code,d.nom,s.idsituation_dossier,tmp.dern_date as date_cloturation,COALESCE(s.etat_bilan,'') as etat_bilan from dossier d left join equipe e on(e.id = equip_id) left join situation_par_portfeuil s on(s.iddoss = d.id) 
        LEFT JOIN utilisateur u on(u.id = d.ass) 
        LEFT JOIN(SELECT iddoss , MAX(date_cloturation) AS dern_date FROM suividossdb.situation_par_portfeuil GROUP BY iddoss) tmp 
            ON (tmp.iddoss = s.iddoss And tmp.dern_date = s.date_cloturation ) where d.ass = '". $_id ."' and tmp.dern_date is not null and d.manger_fr=:manger_fr and  e.id=:cmd_fr " . $type_d;
            $res_ass = $this->Getconnexion()->prepare($sql_ass);
            $res_ass->execute(array(
                'manger_fr' => $manager,
                'cmd_fr' => $cdm_fr,
            ));
            return $res_ass->fetchAll();
        }


        if ($collab == "_cdm") {
            $sql_cdm = "select distinct d.id, e.code,d.nom,s.idsituation_dossier,tmp.dern_date as date_cloturation,COALESCE(s.etat_bilan,'') as etat_bilan from dossier d left join equipe e on(e.id = equip_id) left join situation_par_portfeuil s on(s.iddoss = d.id) 
            LEFT JOIN utilisateur u on(u.id = d.cdm) 
            LEFT JOIN(SELECT iddoss , MAX(date_cloturation) AS dern_date FROM suividossdb.situation_par_portfeuil GROUP BY iddoss) tmp 
                ON (tmp.iddoss = s.iddoss And tmp.dern_date = s.date_cloturation ) where d.cdm = '".$_id."' and tmp.dern_date is not null and d.manger_fr=:manger_fr and  e.id=:cmd_fr " . $type_d ;
            $res_cdm = $this->Getconnexion()->prepare($sql_cdm);
            $res_cdm->execute(array(
                'manger_fr' => $manager,
                'cmd_fr' => $cdm_fr,
            ));
            return $res_cdm->fetchAll();
        }


        if ($collab == "_cde") {
            $sql_cde = "select distinct d.id, e.code,d.nom,s.idsituation_dossier,tmp.dern_date as date_cloturation, COALESCE(s.etat_bilan,'') as etat_bilan from dossier d left join equipe e on(e.id = equip_id) left join situation_par_portfeuil s on(s.iddoss = d.id) 
                LEFT JOIN utilisateur u on(u.id = d.ll) 
                LEFT JOIN(SELECT iddoss , MAX(date_cloturation) AS dern_date FROM suividossdb.situation_par_portfeuil GROUP BY iddoss) tmp 
                    ON (tmp.iddoss = s.iddoss And tmp.dern_date = s.date_cloturation ) where d.ll = '".$_id."' and tmp.dern_date is not null and d.manger_fr=:manger_fr and  e.id=:cmd_fr " . $type_d ;
            $res_cde = $this->Getconnexion()->prepare($sql_cde);
            $res_cde->execute(array(
                'manger_fr' => $manager,
                'cmd_fr' => $cdm_fr,
            ));
            return $res_cde->fetchAll();
        }
    }

    public function date_retour($date_start){
        return ' YEAR(date(now()))*12 + MONTH(date(now())) - (YEAR('.$date_start.')*12 + MONTH('.$date_start.')) as ancienter ,';
    }
    public function lance_reporting($manager, $cdm_fr, $type, $dectect)
    {
        $type_d = "";
        $plus = "";
        $total_resultat = [];
        
        if ($type == "true") {
            $type_d = " and s.idsituation_dossier <> 'MA'";
        } else {
            $type_d = " ";
        }

        $dectect_dect = "";
        if ($dectect == "modal") {
            $dectect_dect = " d.id, e.code,d.nom,s.idsituation_dossier,tmp.dern_date as date_cloturation,s.etat_bilan ";
            $plus = " GROUP BY tmp.iddoss  order by e.code,d.nom ";
        } else {
            $dectect_dect = 'count(distinct d.nom,tmp.dern_date) as total_dossier';
            $plus = " order by e.code,d.nom";
        }


        $sql0 = "select u.nom from manager_fr_lier_superviseur_mada m left join utilisateur u on(u.id = m.supeviseur_mada) WHERE m.manager_fr =:manger_fr";
        $res0 = $this->Getconnexion()->prepare($sql0);
        $res0->execute(array(
            'manger_fr' => $manager,
        ));
        $resultat0 = $res0->fetchAll();



        $sql = "select $dectect_dect from dossier d left join equipe e on(e.id = equip_id) left join situation_par_portfeuil s on(s.iddoss = d.id)
    LEFT JOIN(SELECT iddoss , MAX(date_cloturation) AS dern_date FROM suividossdb.situation_par_portfeuil GROUP BY iddoss) tmp 
        ON (tmp.iddoss = s.iddoss And tmp.dern_date = s.date_cloturation ) where tmp.dern_date is not null and d.manger_fr=:manger_fr and  e.id=:cmd_fr " . $type_d . " " . $plus;
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'manger_fr' => $manager,
            'cmd_fr' => $cdm_fr,
        ));
        $resultat = $res->fetchAll();


        $sql_ass = "select u.niveau_etp, ". $this->date_retour("date_d_entrer") ." d.ass as id_ass, u.prenom_mail, count(distinct(d.nom)) as total from dossier d left join equipe e on(e.id = equip_id) left join situation_par_portfeuil s on(s.iddoss = d.id) 
        LEFT JOIN utilisateur u on(u.id = d.ass) 
        LEFT JOIN(SELECT iddoss , MAX(date_cloturation) AS dern_date FROM suividossdb.situation_par_portfeuil GROUP BY iddoss) tmp 
            ON (tmp.iddoss = s.iddoss And tmp.dern_date = s.date_cloturation ) where tmp.dern_date is not null and d.manger_fr=:manger_fr and  e.id=:cmd_fr " . $type_d . " GROUP BY u.prenom_mail ";
        $res_ass = $this->Getconnexion()->prepare($sql_ass);
        $res_ass->execute(array(
            'manger_fr' => $manager,
            'cmd_fr' => $cdm_fr,
        ));
        $resultat_ass = $res_ass->fetchAll();



        $sql_cdm = "select u.niveau_etp, ". $this->date_retour("date_d_entrer") ." d.cdm as id_cdm, u.prenom_mail, count(distinct(d.nom)) as total from dossier d left join equipe e on(e.id = equip_id) left join situation_par_portfeuil s on(s.iddoss = d.id) 
            LEFT JOIN utilisateur u on(u.id = d.cdm) 
            LEFT JOIN(SELECT iddoss , MAX(date_cloturation) AS dern_date FROM suividossdb.situation_par_portfeuil GROUP BY iddoss) tmp 
                ON (tmp.iddoss = s.iddoss And tmp.dern_date = s.date_cloturation ) where tmp.dern_date is not null and d.manger_fr=:manger_fr and  e.id=:cmd_fr " . $type_d . " GROUP BY u.prenom_mail ";
        $res_cdm = $this->Getconnexion()->prepare($sql_cdm);
        $res_cdm->execute(array(
            'manger_fr' => $manager,
            'cmd_fr' => $cdm_fr,
        ));
        $resultat_cdm = $res_cdm->fetchAll();


        $sql_cde = "select u.niveau_etp, ". $this->date_retour("date_d_entrer") ." d.ll as id_cde, u.prenom_mail, count(distinct(d.nom)) as total from dossier d left join equipe e on(e.id = equip_id) left join situation_par_portfeuil s on(s.iddoss = d.id) 
                LEFT JOIN utilisateur u on(u.id = d.ll) 
                LEFT JOIN(SELECT iddoss , MAX(date_cloturation) AS dern_date FROM suividossdb.situation_par_portfeuil GROUP BY iddoss) tmp 
                    ON (tmp.iddoss = s.iddoss And tmp.dern_date = s.date_cloturation ) where tmp.dern_date is not null and d.manger_fr=:manger_fr and  e.id=:cmd_fr " . $type_d . " GROUP BY u.prenom_mail ";
        $res_cde = $this->Getconnexion()->prepare($sql_cde);
        $res_cde->execute(array(
            'manger_fr' => $manager,
            'cmd_fr' => $cdm_fr,
        ));
        $resultat_cde = $res_cde->fetchAll();


        array_push($total_resultat, [
            "total_dossier" => $resultat,
            "nom_assistant" => $resultat_ass,
            "nom_cdm" => $resultat_cdm,
            "nom_cde" => $resultat_cde,
            "nom_sup_mada" => $resultat0
        ]);

        return $total_resultat;
    }




    public function selectsonportfeuil($id)
    {
        $sql = "select distinct e.id, e.code from dossier d left join equipe e on(e.id = equip_id) where d.manger_fr =:utilisateur_id and e.code is not null group by e.code";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'utilisateur_id' => $id,
        ));
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function selectsonportfeuil_grap($id, $aneselect)
    {
        $sql = "SELECT sonportfeuilles FROM portfeuilsup WHERE utilisateur_id =:utilisateur_id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'utilisateur_id' => $id,
        ));
        $resultat = $res->fetchAll();

        return $this->statGeneralsups_graphique($aneselect, $resultat[0]["sonportfeuilles"]);
    }

    public function __attrib($id)
    {
        $sql = "SELECT D.nom as nom_dsss, 
           u1.prenom_mail as nom_cde,u1.prenom as matricule_cde,u1.mail as mail_cde,
           u2.prenom_mail as nom_rf,u2.prenom as matricule_rf,u2.mail as mail_rf,
           u3.prenom_mail as nom_cdm,u3.prenom as matricule_cdm,u3.mail as mail_cdm,
           u4.prenom_mail as nom_ass,u4.prenom as matricule_ass,u4.mail as mail_ass,
           u7.prenom_mail as nom_mgr,u7.prenom as matricule_mgr,u7.mail as mail_mgr,
           u8.prenom_mail as nom_cdmfr,u8.prenom as matricule_cdmfr,u8.mail as mail_cdmfr         
         FROM dossier D 
        LEFT JOIN utilisateur u1 on(u1.id = D.ll) 
        LEFT JOIN utilisateur u2 on(u2.id = D.reference_t) 
        LEFT JOIN utilisateur u3 on(u3.id = D.cdm) 
        LEFT JOIN utilisateur u4 on(u4.id = D.ass) 
        LEFT JOIN utilisateur u7 on(u7.id = D.manger_fr)
        LEFT JOIN utilisateur u8 on(u8.id = D.cdm_fr)        
         WHERE D.id =:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'id' => $id,
        ));
        $resultat = $res->fetchAll();

        return $resultat;
    }

    

    public function statGeneralsups_graphique($date_bilan, $llportfeuil)
    {
        $portfeuil = explode("#", $llportfeuil);
        $val = [];
        $fait = 0;
        foreach ($portfeuil as $value) {
            $division = 1;

            $sql = 'SELECT E.code as nom_equipe, (SELECT count(SP.date_cloturation) FROM suividossdb.situation_par_portfeuil SP LEFT JOIN suividossdb.dossier d2  
            on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) WHERE SP.idsituation_dossier <> "MA" 
            and SP.idsituation_dossier <> "MS"  and e.code=:equip_nom and SP.affiche_dans_stat is null  and SP.date_cloturation
             LIKE "' . $date_bilan . '-12%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "" AND SP.date_envoie_bilan_karlit <> " " AND  LENGTH(SP.date_envoie_bilan_karlit) > 9 )) 
             as total,count(S.date_cloturation) as total_bilan FROM suividossdb.equipe E  LEFT JOIN suividossdb.dossier 
             D on(D.equip_id = E.id) LEFT JOIN suividossdb.situation_par_portfeuil S on(S.iddoss = D.id)  
             WHERE S.idsituation_dossier <> "MA" and S.idsituation_dossier <> "MS" and E.code =:equip_nom and S.affiche_dans_stat is null and date_cloturation 
             LIKE "' . $date_bilan . '-12%"';

            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array('equip_nom' =>  $value,));
            $resultat = $res->fetchAll();
            $total_bilan = $resultat[0]['total_bilan'];
            $fait = $resultat[0]['total'];
            $nom_equipe = $resultat[0]['nom_equipe'];

            $restant  =  $resultat[0]['total_bilan'] - $resultat[0]['total'];
            if ($total_bilan  > 0) {
                $division =  $total_bilan;
            }
            $pourcentage = number_format((($fait * 100) / $division), 2, '.', ',');



            $sqltrans = 'SELECT count(SP.date_envoie_bilan_karlit) as total_teletrans  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
            LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
            LEFT JOIN zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.code=:equip_nom and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' . $date_bilan . '-12%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is null ';

            $restrans = $this->Getconnexion()->prepare($sqltrans);
            $restrans->execute(array('equip_nom' =>  $value,));
            $resultattrans = $restrans->fetchAll();
            $total_bilan_trans_restant = $resultattrans[0]['total_teletrans'];

            $sqltrans_restat = 'SELECT count(SP.date_envoie_bilan_karlit) as total_bilan_trans_restant  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
            LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
            LEFT JOIN zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.code=:equip_nom and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' . $date_bilan . '-12%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is not null ';

            $restrans_restant = $this->Getconnexion()->prepare($sqltrans_restat);
            $restrans_restant->execute(array('equip_nom' =>  $value,));
            $resultattrans_restant = $restrans_restant->fetchAll();
            $total_bilan_trans = $resultattrans_restant[0]['total_bilan_trans_restant'];

            $division_trans = 1;
            if ($total_bilan_trans  > 0) {
                $division_trans =  $total_bilan_trans + $total_bilan_trans_restant;
            }
            $pourcentage_trans = number_format((($total_bilan_trans * 100) / $division_trans), 2, '.', ',');



            $sqlgrap_v_edi = 'SELECT  count(SP.date_envoie_bilan_karlit) as total_v_edi  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
            LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
            LEFT JOIN zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
            LEFT JOIN zz_valid_edi_cdm_fr ve on(ve.id_situation = vt.id_situation) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.code=:equip_nom and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' .  $date_bilan . '-12%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is not null and ve.liase_fiscal is null';

            $grap_v_edi = $this->Getconnexion()->prepare($sqlgrap_v_edi);
            $grap_v_edi->execute(array('equip_nom' =>  $value,));
            $resultagrap_v_edis = $grap_v_edi->fetchAll();
            $total_bilangrap_v_edi = $resultagrap_v_edis[0]['total_v_edi'];

            $sqlgrap_v_edi_fait = 'SELECT  count(SP.date_envoie_bilan_karlit) as total_v_edi_fait  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
            LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
            LEFT JOIN zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
            LEFT JOIN zz_valid_edi_cdm_fr ve on(ve.id_situation = vt.id_situation) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.code=:equip_nom and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' .  $date_bilan . '-12%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is not null and ve.liase_fiscal is not null';

            $restrans_v_edi_fait = $this->Getconnexion()->prepare($sqlgrap_v_edi_fait);
            $restrans_v_edi_fait->execute(array('equip_nom' =>  $value,));
            $resultattrans_v_edi_fait = $restrans_v_edi_fait->fetchAll();
            $total_bilan_v_edi_fait = $resultattrans_v_edi_fait[0]['total_v_edi_fait'];

            $division_edit = 1;
            if ($total_bilan_v_edi_fait  > 0) {
                $division_edit = $total_bilangrap_v_edi + $total_bilan_v_edi_fait;
            }
            $pourcentage_edi = number_format((($total_bilan_v_edi_fait * 100) / $division_edit), 2, '.', ',');



            $division_trans = 1;
            if ($total_bilan_trans  > 0) {
                $division_trans =  $total_bilan_trans + $total_bilan_trans_restant;
            }
            $pourcentage_trans = number_format((($total_bilan_trans * 100) / $division_trans), 2, '.', ',');



            if ($resultat[0]['nom_equipe'] != "" || !empty($resultat[0]['nom_equipe'])) {
                array_push(
                    $val,
                    [
                        "total_bilan" => $total_bilan,
                        "nom_equipe" => $nom_equipe,
                        "fait" => $fait,
                        "pourcentage" => $pourcentage,
                        "total_bilan_trans" => $total_bilan_trans + $total_bilan_trans_restant,
                        "total_bilan_trans_fait" =>  $total_bilan_trans,
                        "total_bilan_trans_restant" => $total_bilan_trans_restant,
                        "pourcentage_trans" => $pourcentage_trans,
                        "total_bilan_v_edi" => $total_bilangrap_v_edi + $total_bilan_v_edi_fait,
                        "total_bilangrap_v_edi_restant" => $total_bilangrap_v_edi,
                        "total_bilan_v_edi_fait" => $total_bilan_v_edi_fait,
                        "pourcentage_edi" => $pourcentage_edi,

                    ]
                );
            }
        }

        return $val;
    }




    public function statGeneralsup($date_bilan, $llportfeuil)
    {
        $array = [];
        $division = 1;
        $portfeuil = explode("#", $llportfeuil);
        for ($i = 1; $i < 13; $i++) {
            if (strlen($i) == 1) {
                $i = "0" . $i;
            }
            $fait = 0;
            $retotal = 0;
            foreach ($portfeuil as $value) {

                $sql = 'SELECT (SELECT count(SP.date_cloturation) FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
        suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) WHERE 
        SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.code=:equip_id and SP.date_cloturation 
        LIKE "' . $date_bilan . "-" . $i . '%" and (SP.date_envoie_bilan_karlit is not NULL OR SP.date_envoie_bilan_karlit <> "" ) and SP.affiche_dans_stat is null) as total,
        count(S.date_cloturation) as total_bilan FROM suividossdb.equipe E  LEFT JOIN suividossdb.dossier D on(D.equip_id = E.id)
         LEFT JOIN suividossdb.situation_par_portfeuil S on(S.iddoss = D.id)  WHERE S.idsituation_dossier <> "MA" 
         and S.idsituation_dossier <> "MS" and E.code =:equip_id and S.affiche_dans_stat is null and  date_cloturation LIKE "' . $date_bilan . "-" . $i . '%"';
                $res = $this->Getconnexion()->prepare($sql);
                $res->execute(array('equip_id' => $value,));
                $resultat = $res->fetchAll();
                $fait = intval($resultat[0]['total_bilan']) + intval($fait);
                $retotal =     intval($resultat[0]['total']) + intval($retotal);
            }
            if ($fait > 0) {
                $division =  $fait;
            }
            array_push($array, [
                "fait" => $retotal,
                "total" => $fait,
                "restant" => $fait - $retotal,
                "pourcentage" => number_format((($retotal * 100) / $division), 2, '.', ',') . "%"
            ]);
        }
        return $array;
    }


    public function table_option($table)
    {
        $sql = "select * from suividossdb." . $table;
        $rs = $this->Getconnexion()->prepare($sql);
        $rs->execute();
        $resultat = $rs->fetchAll();
        return $resultat;
    }

    public function supstatgblc($date_bilan, $llportfeuil)
    {
        $array = [];
        $portfeuil = explode("#", $llportfeuil);
        $etatbilan = $this->table_option("etat_bilan");

        foreach ($portfeuil as $value) {
            //$sql = "SELECT * FROM "
            foreach ($etatbilan as $critere) {
                if ($critere["nom"] != "") {
                    $sql = 'SELECT SP.id FROM suividossdb.situation_par_portfeuil SP LEFT JOIN dossier d on(d.id = SP.iddoss) 
                    LEFT JOIN equipe e on(e.id = d.equip_id) 
                    WHERE SP.date_cloturation LIKE "' . $date_bilan . '%" and SP.etat_bilan=:etat_bilan and e.code =:code';
                    $res = $this->Getconnexion()->prepare($sql);
                    $res->execute(array(
                        'etat_bilan' => $critere["nom"],
                        'code' => $value
                    ));
                    $resultat = $res->fetchAll();
                    array_push($array, [
                        $value => count($resultat)
                    ]);
                }
            }
        }
        return $array;
    }

    public function listutilisateur()
    {
        $varleuraray = [];
        $sql = 'SELECT U.id, U.nom as nom FROM suividossdb.utilisateur U left join suividossdb.pays P on(U.pays_id = P.id) inner join suividossdb.poste Ps on(Ps.id = U.post_id) where P.nom = "Mada"   and (Ps.nom = "CDM")';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $gasy = $res->fetchAll();

        $sql = 'SELECT U.id,U.nom as nom FROM suividossdb.utilisateur U left join suividossdb.pays P on(U.pays_id = P.id) inner join suividossdb.poste Ps on(Ps.id = U.post_id) where P.nom = "France"  and (Ps.nom = "CDM")';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $frantsay = $res->fetchAll();

        $sql = 'SELECT U.id, U.nom as nom FROM suividossdb.utilisateur U left join suividossdb.pays P on(U.pays_id = P.id) inner join suividossdb.poste Ps on(Ps.id = U.post_id) where P.nom = "Mada"   and (Ps.nom = "REVISEUR" )';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $gasy_rev = $res->fetchAll();

        $sql = 'SELECT U.id,U.nom as nom FROM suividossdb.utilisateur U left join suividossdb.pays P on(U.pays_id = P.id) inner join suividossdb.poste Ps on(Ps.id = U.post_id) where P.nom = "France"  and (Ps.nom = "REVISEUR" )';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $frantsay_rev = $res->fetchAll();

        array_push($varleuraray, [
            'gasy' => $gasy,
            'frantsay' => $frantsay,

            'gasy_rev' => $gasy_rev,
            'frantsay_rev' => $frantsay_rev
        ]);
        return ($varleuraray);
    }

    public function checkprod($date, $tousles_iduserkarlit)
    {
        $rkarlit = explode("#", $tousles_iduserkarlit);
        $array = [];
        foreach ($rkarlit as $id) {
            $sql = 'SELECT    COUNT(spp.id)  as meme  FROM suividossdb.situation_par_portfeuil spp left join dossier d2 on(d2.id = spp.iddoss) 
        left join equipe e2 on(e2.id = d2.equip_id) WHERE spp.idsituation_dossier <> "MA" and spp.date_cloturation LIKE :date_annee 
        AND spp.date_envoie_bilan_karlit is not null and (spp.mem_autre_equipe = :mem_autre_equipe) and spp.utilisateur_id is not null and spp.etat_bilan <> "" AND spp.utilisateur_id = :utilisateur_id';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array(
                'date_annee' => $date . "%",
                'utilisateur_id' => $id,
                'mem_autre_equipe' => 0
            ));
            $gasy = $res->fetchAll();

            $sql2 = 'SELECT    COUNT(spp.id)  as autre  FROM suividossdb.situation_par_portfeuil spp left join dossier d2 on(d2.id = spp.iddoss) 
        left join equipe e2 on(e2.id = d2.equip_id) WHERE spp.idsituation_dossier <> "MA" and spp.date_cloturation LIKE :date_annee 
        AND spp.date_envoie_bilan_karlit is not null and (spp.mem_autre_equipe = :mem_autre_equipe) and spp.utilisateur_id is not null and spp.etat_bilan <> "" AND spp.utilisateur_id = :utilisateur_id';
            $res2 = $this->Getconnexion()->prepare($sql2);
            $res2->execute(array(
                'date_annee' => $date . "%",
                'utilisateur_id' => $id,
                'mem_autre_equipe' => 1
            ));
            $gasy2 = $res2->fetchAll();

            array_push(
                $array,
                [
                    "meme" =>    $gasy,
                    "autre" =>    $gasy2,
                ]
            );
        }
        return ($array);
    }


    public function checkprod_suit($date, $tousles_rev)
    {
        $array = [];
        $revkarlit_rev = explode("#", $tousles_rev);
        foreach ($revkarlit_rev as $id_rev) {
            $sql = 'SELECT count(u.nom) as total_bl FROM suividossdb.equipe E  LEFT JOIN suividossdb.dossier 
            D on(D.equip_id = E.id) LEFT JOIN suividossdb.situation_par_portfeuil S on(S.iddoss = D.id) 
            LEFT JOIN utilisateur u on(u.id = S.reviseur_id)
            WHERE S.idsituation_dossier <> "MA" and S.idsituation_dossier <> "MS" and S.reviseur_id =:reviseur_id and S.affiche_dans_stat is null and  S.date_cloturation 
            LIKE :date_annee and S.reviseur_id > 0';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array(
                'date_annee' => $date . "%",
                'reviseur_id' => $id_rev,
            ));
            $rev = $res->fetchAll();
            array_push($array, ["rev" => $rev,]);
        }
        return ($array);
    }




    public function alert_pes($annee, $idequipe)
    {
        $sql = 'SELECT 
        spp.id,
        MAX(p.date_pes) as date_pes,
        max(r.date_relance) as date_relance,
        max(p.date_retour) as date_retour,
         d.nom,spp.date_cloturation,
         spp.date_de_depot_dernier_keobiz,
         if(spp.date_de_depot_dernier_keobiz is NULL,"",if(spp.notification_s is NULL,"A traiter",spp.notification_s)) 
         as notification
        FROM situation_par_portfeuil spp 
        left join dossier d on(d.id = spp.iddoss) 
        left join relance r on(r.id_situation = spp.iddoss) 
        left join pes p on(p.id_situation = spp.iddoss) 
          where spp.date_cloturation is not null and 
                spp.date_cloturation <> "" and spp.idsituation_dossier <> "MA" and d.equip_id =:equip_id and spp.date_cloturation 
                LIKE "' . $annee . '%" GROUP BY spp.id, d.nom ORDER BY d.nom';
        $stmt = $this->Getconnexion()->prepare($sql);
        $stmt->execute([
            'equip_id' => $idequipe
        ]);
        return $stmt->fetchAll();
    }

    public function elementbloquant($annee, $idequipe)
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
        S.commentaire_et_autre as commentaire_et_autre,Rs.activite as Activite_final
        FROM suividossdb.situation_par_portfeuil S
        LEFT JOIN dossier D on (D.id = S.iddoss) LEFT JOIN 
        suividossdb.pes P on(P.iddoss = S.id) LEFT JOIN suividossdb.relance R on(R.iddoss = S.id) 
        LEFT JOIN utilisateur U on(U.id = S.utilisateur_id) LEFT JOIN suividossdb.equipe Eq on(D.equip_id = Eq.id) 
        LEFT JOIN suividossdb.reseignement_juridique Rs on(D.id = Rs.iddossier)  WHERE S.idsituation_dossier <> "MA" and S.idsituation_dossier is not null and 
        D.equip_id =' . $idequipe . ' and S.date_cloturation LIKE "' . $annee . '%" GROUP BY D.nom ';
        $stmt = $this->Getconnexion()->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }


    public function listclick_det($id, $date_envoie, $condition)
    {

        if ($date_envoie == "-Tous") {
            $sql2 = 'SELECT e.code,d2.nom,spp.date_cloturation,spp.etat_bilan FROM situation_par_portfeuil spp LEFT join dossier d2 
        on(d2.id = spp.iddoss) left join equipe e on(e.id = d2.equip_id) where d2.equip_id =:equip_id and spp.idsituation_dossier = "' . $condition . '"';
            $stmt2 = $this->Getconnexion()->prepare($sql2);
            $stmt2->execute(array('equip_id' => $id));
            $resultat2 = $stmt2->fetchAll();
            return $resultat2;
        } else {
            $sql2 = 'SELECT e.code, d2.nom,spp.date_cloturation,spp.etat_bilan FROM situation_par_portfeuil spp LEFT join dossier d2 
            on(d2.id = spp.iddoss) left join equipe e on(e.id = d2.equip_id) where d2.equip_id =:equip_id and spp.idsituation_dossier = "' . $condition . '" and spp.date_cloturation LIKE "' . $date_envoie . '%"';
            $stmt2 = $this->Getconnexion()->prepare($sql2);
            $stmt2->execute(array('equip_id' => $id));
            $resultat2 = $stmt2->fetchAll();
            return $resultat2;
        }
    }

    public function totalequipes($alllistequipe, $condition)
    {
        $variableLike = "";
        if ($condition == "Tous") {
            $variableLike = "";
        } else {
            $variableLike = " and spp.date_cloturation LIKE '" . $condition . "%'";
        }

        $id = explode("#", $alllistequipe);
        $array = [];
        foreach ($id  as $valeur) {
            $sql1 = 'SELECT count(DISTINCT d2.nom) as istotal   FROM situation_par_portfeuil spp LEFT join dossier d2 
                on(d2.id = spp.iddoss) where d2.equip_id =:equip_id';
            $stmt1 = $this->Getconnexion()->prepare($sql1);
            $stmt1->execute(array('equip_id' => $valeur));
            $resultat1 = $stmt1->fetchAll();

            $sql2 = 'SELECT count(DISTINCT d2.nom) as isactif  FROM situation_par_portfeuil spp LEFT join dossier d2 
                on(d2.id = spp.iddoss) where d2.equip_id =:equip_id and spp.idsituation_dossier = "ACTIF" ' . $variableLike;
            $stmt2 = $this->Getconnexion()->prepare($sql2);
            $stmt2->execute(array('equip_id' => $valeur));
            $resultat2 = $stmt2->fetchAll();

            $sql3 = 'SELECT count(DISTINCT d2.nom) as isma  FROM situation_par_portfeuil spp LEFT join dossier d2 
                on(d2.id = spp.iddoss) where d2.equip_id =:equip_id and spp.idsituation_dossier = "MA" ' . $variableLike;
            $stmt3 = $this->Getconnexion()->prepare($sql3);
            $stmt3->execute(array('equip_id' => $valeur));
            $resultat3 = $stmt3->fetchAll();

            $sql4 = 'SELECT count(DISTINCT d2.nom) as isms  FROM situation_par_portfeuil spp LEFT join dossier d2 
                on(d2.id = spp.iddoss) where d2.equip_id =:equip_id and spp.idsituation_dossier = "MS" ' . $variableLike;
            $stmt4 = $this->Getconnexion()->prepare($sql4);
            $stmt4->execute(array('equip_id' => $valeur));
            $resultat4 = $stmt4->fetchAll();

            $sqls = 'SELECT count(DISTINCT d2.nom) as issommail  FROM situation_par_portfeuil spp LEFT join dossier d2 
                on(d2.id = spp.iddoss) where d2.equip_id =:equip_id and spp.idsituation_dossier = "MISE EN SOMMEIL" ' . $variableLike;
            $stmts = $this->Getconnexion()->prepare($sqls);
            $stmts->execute(array('equip_id' => $valeur));
            $resultats = $stmts->fetchAll();



            $sql5 = 'SELECT count(DISTINCT d2.nom) as iscabinet  FROM situation_par_portfeuil spp LEFT join dossier d2 
                on(d2.id = spp.iddoss) where d2.equip_id =:equip_id and spp.idsituation_dossier = "CABINET" ' . $variableLike;
            $stmt5 = $this->Getconnexion()->prepare($sql5);
            $stmt5->execute(array('equip_id' => $valeur));
            $resultat5 = $stmt5->fetchAll();

            $sql6 = 'SELECT count(DISTINCT d2.nom) as isrev  FROM situation_par_portfeuil spp LEFT join dossier d2 
                on(d2.id = spp.iddoss) where d2.equip_id =:equip_id and spp.idsituation_dossier = "REV" ' . $variableLike;
            $stmt6 = $this->Getconnexion()->prepare($sql6);
            $stmt6->execute(array('equip_id' => $valeur));
            $resultat6 = $stmt6->fetchAll();

            $sql7 = 'SELECT count(DISTINCT d2.nom) as iscrea  FROM situation_par_portfeuil spp LEFT join dossier d2 
                on(d2.id = spp.iddoss) where d2.equip_id =:equip_id and spp.idsituation_dossier = "CREA" ' . $variableLike;
            $stmt7 = $this->Getconnexion()->prepare($sql7);
            $stmt7->execute(array('equip_id' => $valeur));
            $resultat7 = $stmt7->fetchAll();

            $sql8 = 'SELECT count(DISTINCT d2.nom) as isbloque  FROM situation_par_portfeuil spp LEFT join dossier d2 
                on(d2.id = spp.iddoss) where d2.equip_id =:equip_id and spp.idsituation_dossier = "BLOQUE PAR ANCIEN E-C" ' . $variableLike;
            $stmt8 = $this->Getconnexion()->prepare($sql8);
            $stmt8->execute(array('equip_id' => $valeur));
            $resultat8 = $stmt8->fetchAll();
            array_push($array, [
                'istotal' => $resultat1,
                'isactif' => $resultat2,
                'isma' => $resultat3,
                'isms' => $resultat4,
                'issommail' => $resultats,
                'iscabinet' => $resultat5,
                'isrev' => $resultat6,
                'iscrea' => $resultat7,
                'isbloque' => $resultat8,
            ]);
        }
        return $array;
    }

    public function detail_pes($nomdossier, $date_cloture)
    {
        $iddoss = $this->recuperedonner($nomdossier, $date_cloture);

        if (intval($iddoss) > 0) {
            $fin_resultatpes = "";
            $sql = "SELECT * FROM suividossdb.pes where id_situation =:id_situation order by id";
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array('id_situation' => $iddoss));
            $resultat = $res->fetchAll();

            for ($i = 0; $i < count($resultat); $i++) {
                $fin_resultatpes .= "<tr><td>" . $resultat[$i]['pes_num'] . "</td><td class='idps' style='display:none'>" . $resultat[$i]['id'] . "</td><td class='psdt'>" . substr($resultat[$i]['date_pes'], 0, 10) . "</td><td class='retournPes'>" . substr($resultat[$i]['date_retour'], 0, 10) . "</td></tr>";
            }

            $fin_resultatrelance = "";
            $sql = "SELECT * FROM suividossdb.relance where id_situation =:id_situation order by id";
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array('id_situation' => $iddoss));
            $resultat = $res->fetchAll();

            for ($i = 0; $i < count($resultat); $i++) {
                $fin_resultatrelance .= "<tr><td>" . $resultat[$i]['relance_num'] . "</td><td class='idrl' style='display:none'>" . $resultat[$i]['id'] . "</td><td class='rldt'>" . substr($resultat[$i]['date_relance'], 0, 10) . "</td></tr>";
            }

            return  "<TABLE style='background:#fff' class='table-bordered text-center'  width='100%'><TD> <p/><table id='tbpes'><th>N</th><th>date d'envoie</th><th>Retour</th><tr style='display:none'><td>PES N 0</td><td class='psdt'></td></tr>" . $fin_resultatpes . "</table></TD><TD><p/><table id='tbrelance'> <th>N</th><th>date d'envoie</th><tr style='display:none'><td>PES N 0</td><td class='rldt'></td></tr>" . $fin_resultatrelance;
        }
    }


    public function stat_tva_s($id_equip, $condition)
    {
        $array = [];
        if ($condition == "hors_ma") {
            $r_resultat = [];
            $test = [];

            $is_vide = 0;
            $is_ST = 0;
            $is_EM = 0;
            $is_ET = 0;
            $is_RM = 0;
            $is_EXO = 0;
            $is_FDB = 0;
            $is_ST = 0;
            $is_RT = 0;
            $is_RFB = 0;
            $is_NON = 0;
            $is_NS = 0;
            $is_EQUIPE = "";

            $sql = 'SELECT id  FROM suividossdb.dossier  WHERE equip_id =:equip_id AND equip_id > 0';
            $stmt = $this->Getconnexion()->prepare($sql);
            $stmt->execute(array('equip_id' => $id_equip));
            $res1 = $stmt->fetchAll();
            for ($i = 0; $i < count($res1); $i++) {
                $is_vide = 0;
                $is_ST = 0;
                $is_EM = 0;
                $is_ET = 0;
                $is_RM = 0;
                $is_EXO = 0;
                $is_FDB = 0;
                $is_ST = 0;
                $is_RT = 0;
                $is_RFB = 0;
                $is_NON = 0;
                $is_NS = 0;
                $is_EQUIPE = "";
                $sql3 = 'SELECT spp.*,e.code FROM situation_par_portfeuil spp 
                    LEFT JOIN dossier d on(spp.iddoss = d.id) left join equipe e on(e.id = d.equip_id) 
                    WHERE spp.iddoss =:iddoss    ORDER by spp.date_cloturation DESC limit 1';
                $stmt3 = $this->Getconnexion()->prepare($sql3);
                $stmt3->execute(array(
                    'iddoss' => $res1[$i]["id"],
                ));
                $res = $stmt3->fetchAll();
                if (count($res) > 0)
                    array_push($r_resultat, $res);
            }

            for ($i = 0; $i < count($r_resultat); $i++) {

                $is_EQUIPE = $r_resultat[$i][0]["code"];
                if ($r_resultat[$i][0]["tvregime"] == "EM") {
                    $is_EM++;
                }
                if ($r_resultat[$i][0]["tvregime"] == "ET") {
                    $is_ET++;
                }
                if ($r_resultat[$i][0]["tvregime"] == "RM") {
                    $is_RM++;
                }
                if ($r_resultat[$i][0]["tvregime"] == "EXO") {
                    $is_EXO++;
                }
                if ($r_resultat[$i][0]["tvregime"] == "FDB") {
                    $is_FDB++;
                }
                if ($r_resultat[$i][0]["tvregime"] == "ST") {
                    $is_ST++;
                }
                if ($r_resultat[$i][0]["tvregime"] == "RT") {
                    $is_RT++;
                }
                if ($r_resultat[$i][0]["tvregime"] == "RFB") {
                    $is_RFB++;
                }
                if ($r_resultat[$i][0]["tvregime"] == "NON") {
                    $is_NON++;
                }
                if ($r_resultat[$i][0]["tvregime"] == "NS") {
                    $is_NS++;
                }
                if (
                    empty($r_resultat[$i][0]["tvregime"]) || $r_resultat[$i][0]["tvregime"] == null || $r_resultat[$i][0]["tvregime"] == "" ||
                    strlen($r_resultat[$i][0]["date_cloturation"]) < 10 || strlen($r_resultat[$i][0]["date_cloturation"]) > 10 || empty($r_resultat[$i][0]["date_cloturation"]) || $r_resultat[$i][0]["date_cloturation"] == null
                ) {
                    $is_vide++;
                }
            }
            return [
                "EQUIPE" => $is_EQUIPE,
                "RM" => $is_RM,
                "EM" => $is_EM,
                "RT" => $is_RT,
                "ET" => $is_ET,
                "ST" => $is_ST,
                "EXO" => $is_EXO,
                "FDB" => $is_FDB,
                "RFB" => $is_RFB,
                "NON" => $is_NON,
                "NS" => $is_NS,
                "vide" => $is_vide
            ];
        } else {
            $r_resultat = [];
            $test = [];

            $is_vide = 0;
            $is_ST = 0;
            $is_EM = 0;
            $is_ET = 0;
            $is_RM = 0;
            $is_EXO = 0;
            $is_FDB = 0;
            $is_ST = 0;
            $is_RT = 0;
            $is_RFB = 0;
            $is_NON = 0;
            $is_NS = 0;
            $is_EQUIPE = "";

            $sql = 'SELECT id  FROM suividossdb.dossier  WHERE equip_id =:equip_id AND equip_id > 0';
            $stmt = $this->Getconnexion()->prepare($sql);
            $stmt->execute(array('equip_id' => $id_equip));
            $res1 = $stmt->fetchAll();
            for ($i = 0; $i < count($res1); $i++) {
                $is_vide = 0;
                $is_ST = 0;
                $is_EM = 0;
                $is_ET = 0;
                $is_RM = 0;
                $is_EXO = 0;
                $is_FDB = 0;
                $is_ST = 0;
                $is_RT = 0;
                $is_RFB = 0;
                $is_NON = 0;
                $is_NS = 0;
                $is_EQUIPE = "";
                $sql3 = 'SELECT spp.*,e.code FROM situation_par_portfeuil spp 
                    LEFT JOIN dossier d on(spp.iddoss = d.id) left join equipe e on(e.id = d.equip_id) 
                    WHERE spp.iddoss =:iddoss  ORDER by spp.date_cloturation DESC limit 1';
                $stmt3 = $this->Getconnexion()->prepare($sql3);
                $stmt3->execute(array(
                    'iddoss' => $res1[$i]["id"],
                ));
                $res = $stmt3->fetchAll();
                if (count($res) > 0)
                    array_push($r_resultat, $res);
            }

            for ($i = 0; $i < count($r_resultat); $i++) {
                if ($r_resultat[$i][0]["idsituation_dossier"] != "MA" && $r_resultat[$i][0]["idsituation_dossier"] != "MS") {
                    $is_EQUIPE = $r_resultat[$i][0]["code"];
                    if ($r_resultat[$i][0]["tvregime"] == "EM") {
                        $is_EM++;
                    }
                    if ($r_resultat[$i][0]["tvregime"] == "ET") {
                        $is_ET++;
                    }
                    if ($r_resultat[$i][0]["tvregime"] == "RM") {
                        $is_RM++;
                    }
                    if ($r_resultat[$i][0]["tvregime"] == "EXO") {
                        $is_EXO++;
                    }
                    if ($r_resultat[$i][0]["tvregime"] == "FDB") {
                        $is_FDB++;
                    }
                    if ($r_resultat[$i][0]["tvregime"] == "ST") {
                        $is_ST++;
                    }
                    if ($r_resultat[$i][0]["tvregime"] == "RT") {
                        $is_RT++;
                    }
                    if ($r_resultat[$i][0]["tvregime"] == "RFB") {
                        $is_RFB++;
                    }
                    if ($r_resultat[$i][0]["tvregime"] == "NON") {
                        $is_NON++;
                    }
                    if ($r_resultat[$i][0]["tvregime"] == "NS") {
                        $is_NS++;
                    }
                    if (empty($r_resultat[$i][0]["tvregime"]) || $r_resultat[$i][0]["tvregime"] == null || $r_resultat[$i][0]["tvregime"] == "") {
                        $is_vide++;
                    }
                }
            }
            return [
                "EQUIPE" => $is_EQUIPE,
                "RM" => $is_RM,
                "EM" => $is_EM,
                "RT" => $is_RT,
                "ET" => $is_ET,
                "ST" => $is_ST,
                "EXO" => $is_EXO,
                "FDB" => $is_FDB,
                "RFB" => $is_RFB,
                "NON" => $is_NON,
                "NS" => $is_NS,
                "vide" => $is_vide
            ];
        }
    }

    function recuperedonner($nomdoss, $date_cloturation)
    {
        $sql = 'SELECT  spp.iddoss as id FROM  situation_par_portfeuil spp LEFT JOIN dossier d2 on(d2.id = spp.iddoss) WHERE d2.nom=:nomdoss AND spp.date_cloturation =:date_cloturation';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'date_cloturation' => $date_cloturation,
            'nomdoss' => $nomdoss,
        ));
        $resultat = $res->fetchAll();
        return $resultat[0]["id"];
    }

    public function select_base_alex_tiana($cloture, $condition)
    {
        $varwhere = "";
        if ($condition == "0") {
            $varwhere = ' WHERE Eq.code IS NOT NULL AND S.idsituation_dossier <> "MA" and  S.idsituation_dossier <> "MS" and S.date_cloturation LIKE "' . $cloture . '-12%" and Eq.code <> ""';
        }
        if ($condition == "01") {
            $varwhere = ' WHERE Eq.code IS NOT NULL AND S.idsituation_dossier <> "MS" and S.date_cloturation LIKE "' . $cloture . '-12%" and Eq.code <> ""';
        }

        if ($condition == "02") {
            $varwhere = ' WHERE Eq.code IS NOT NULL AND S.idsituation_dossier <> "MA" and S.date_cloturation LIKE "' . $cloture . '-12%" and Eq.code <> ""';
        }

        if ($condition == "012") {
            $varwhere = ' WHERE Eq.code IS NOT NULL AND S.date_cloturation LIKE "' . $cloture . '-12%" and Eq.code <> ""';
        }
        $sql = '
        SELECT DISTINCT 
        Eq.code as code,
        D.nom as dossier, 
        S.idsituation_dossier as sit_dossier,
        S.date_cloturation as cloture,
        S.regime_dimpos as rg_d_imp1,
        S.regime_dimpos2 as rg_d_imp2,
        S.forme_juridique as frm_jrdq,
        S.dpcoala as dp_coala,
        S.tvregime as regime,
        S.situation_trait_karlit as sit_karlit,
        S.etat_bilan as etat_bl,
        S.date_envoie_bilan_karlit as dt_d_envoie_bl_krlt
        FROM suividossdb.situation_par_portfeuil S
        LEFT JOIN dossier D on (D.id = S.iddoss) 
        LEFT JOIN suividossdb.equipe Eq on(D.equip_id = Eq.id) ' .
            $varwhere . ' order by Eq.code';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function dt_tva_clik($date_bilan, $id__eq, $tvareg)
    {
        $sql = 'SELECT e.code, d2.nom as nom_dossier, sp.idsituation_dossier as situation_doss,
          sp.etat_bilan as etat_bilan,sp.date_cloturation as date_cloture,sp.date_envoie_bilan_karlit as date_d_envoie, sp.tvadate_echeance  
          FROM suividossdb.situation_par_portfeuil sp LEFT JOIN dossier d2 on(d2.id = sp.iddoss) LEFT JOIN equipe e on(e.id = d2.equip_id)  WHERE sp.idsituation_dossier <> "MA" and sp.idsituation_dossier <> "MS" and sp.tvregime = :tvareg  and e.id = :id and sp.date_cloturation LIKE "' . substr($date_bilan, 0, 4) . '%"';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'id' => $id__eq,
            'tvareg' => $tvareg
        ));
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function click_detail_stat_general($date_bilan, $condition)
    {
        if ($condition == "non_fait") {
            $sql = 'SELECT S.id,E.code,D.nom,S.idsituation_dossier,S.date_cloturation,S.etat_bilan FROM suividossdb.equipe E  
            LEFT JOIN suividossdb.dossier D on(D.equip_id = E.id) 
            LEFT JOIN suividossdb.situation_par_portfeuil S on(S.iddoss = D.id)  
            WHERE S.idsituation_dossier <> "MA" 
            and S.idsituation_dossier <> "MS" and E.id > 0 and  S.date_cloturation LIKE "' . $date_bilan . '%" ORDER BY E.code';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            return $resultat;
        }

        if ($condition == "fait") {
            $sql = 'SELECT SP.id,e.code,d2.nom,SP.idsituation_dossier,SP.date_cloturation,SP.etat_bilan FROM suividossdb.situation_par_portfeuil SP 
            LEFT JOIN suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id> 0 and SP.date_cloturation 
            LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "" ) ORDER BY e.code';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            return $resultat;
        }

        if ($condition == "reste") {
            $sql = 'SELECT SP.id,e.code,d2.nom,SP.idsituation_dossier,SP.date_cloturation,SP.etat_bilan FROM suividossdb.situation_par_portfeuil SP
            LEFT JOIN suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id> 0 and SP.date_cloturation 
            LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is NULL OR SP.date_envoie_bilan_karlit = "" ) ORDER BY e.code';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            return $resultat;
        }

        if ($condition == "trans_fait") {
            $sql = 'SELECT  SP.id,e.code,d2.nom,SP.idsituation_dossier,SP.date_cloturation  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
            LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
            LEFT JOIN zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' .  $date_bilan .  '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is not null ORDER BY e.code ';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            return $resultat;
        }

        if ($condition == "trans_restant") {
            $sql = 'SELECT  SP.id,e.code,d2.nom,SP.idsituation_dossier,SP.date_cloturation  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
            LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
            LEFT JOIN zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' .  $date_bilan .  '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is null ORDER BY e.code  ';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            return $resultat;
        }

        if ($condition == "v_edi_fait") {
            $sql = 'SELECT SP.id,e.code,d2.nom,SP.idsituation_dossier,SP.date_cloturation  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
            LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
            LEFT JOIN zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
            LEFT JOIN zz_valid_edi_cdm_fr ve on(ve.id_situation = vt.id_situation) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' .  $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is not null and ve.liase_fiscal is not null ';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            return $resultat;
        }

        if ($condition == "v_edi_restant") {
            $sql = 'SELECT SP.id,e.code,d2.nom,SP.idsituation_dossier,SP.date_cloturation  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
            LEFT JOIN zz_valid_manager_fr vm on(vm.id_situation = vf.id_situation) 
            LEFT JOIN zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
            LEFT JOIN zz_valid_edi_cdm_fr ve on(ve.id_situation = vt.id_situation) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' .  $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is not null and ve.liase_fiscal is null ';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            return $resultat;
        }

        if ($condition == "fait_com_client") {
            /*$com_client_cdm_fr = 'SELECT SP.date_envoie_bilan_karlit  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' .  $date_bilan . "-" . $i  . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is null';
            $res_com_client_cdm_fr = $this->Getconnexion()->prepare($com_client_cdm_fr);
            $res_com_client_cdm_fr->execute();
            $resultat_com_client_cdm_fr = count($res_com_client_cdm_fr->fetchAll());*/

            $sql = 'SELECT  SP.id,e.code,d2.nom,SP.idsituation_dossier,SP.date_cloturation FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
               suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
               suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
               left join suividossdb.utilisateur u on(u.id = z.user_id_zz) 
               WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
               LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            return $resultat;
        }

        if ($condition == "afaire_com_cli") {
            $sql = 'SELECT SP.id,e.code,d2.nom,SP.idsituation_dossier,SP.date_cloturation  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
               suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
               suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.expert_id) 
               WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.date_cloturation 
               LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            return $resultat;
        }


        if ($condition == "restant_com_cli") {
            $com_client_cdm_fr = 'SELECT SP.id,e.code,d2.nom,SP.idsituation_dossier,SP.date_cloturation   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' .  $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is null';
            $res_com_client_cdm_fr = $this->Getconnexion()->prepare($com_client_cdm_fr);
            $res_com_client_cdm_fr->execute();
            $resultat_com_client_cdm_fr = $res_com_client_cdm_fr->fetchAll();
            return $resultat_com_client_cdm_fr;
        }


        if ($condition == "v_l_client_fait") {
            $validation_client_fr_cdmf = 'SELECT  SP.id,e.code,d2.nom,SP.idsituation_dossier,SP.date_cloturation   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' .  $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is not null';
            $validation_client_fr_cdmfaitf = $this->Getconnexion()->prepare($validation_client_fr_cdmf);
            $validation_client_fr_cdmfaitf->execute();
            return $validation_client_fr_cdmfaitf->fetchAll();
        }

        if ($condition == "v_l_client_rstant") {
            $validation_client_fr_cdmf = 'SELECT  SP.id,e.code,d2.nom,SP.idsituation_dossier,SP.date_cloturation   FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) LEFT JOIN suividossdb.utilisateur u on(u.id = SP.expert_id) LEFT JOIN zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
            LEFT JOIN zz_valid_client_cdm_fr vf on(vf.id_situation = z.id_situation) 
            WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and SP.affiche_dans_stat is null and SP.date_cloturation 
            LIKE "' .  $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vf.liase_fiscal is null';
            $validation_client_fr_cdmfaitf = $this->Getconnexion()->prepare($validation_client_fr_cdmf);
            $validation_client_fr_cdmfaitf->execute();
            return $validation_client_fr_cdmfaitf->fetchAll();
        }
    }


    public function click_detail_stat_general_sup($date_bilan, $condition, $allequipe_cond)
    {
        if ($condition == "fait") {
            $sql = 'SELECT SP.id, e.code, d2.nom,SP.idsituation_dossier,SP.date_cloturation,SP.etat_bilan FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) WHERE 
            SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and ' . $allequipe_cond . ' and SP.date_cloturation LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL OR SP.date_envoie_bilan_karlit <> "" ) and SP.affiche_dans_stat is null';

            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            return $resultat;
        }

        if ($condition == "non_fait") {
            $sql = 'SELECT S.id, e.code, D.nom,S.idsituation_dossier,S.date_cloturation,S.etat_bilan FROM suividossdb.equipe e  LEFT JOIN suividossdb.dossier D on(D.equip_id = e.id)
            LEFT JOIN suividossdb.situation_par_portfeuil S on(S.iddoss = D.id)  WHERE S.idsituation_dossier <> "MA" and S.idsituation_dossier <> "MS" and ' . $allequipe_cond . ' and S.date_cloturation LIKE "' . $date_bilan . '%" and S.affiche_dans_stat is null';

            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            return $resultat;
        }

        if ($condition == "reste") {
            $sql = 'SELECT SP.id, e.code, d2.nom,SP.idsituation_dossier,SP.date_cloturation,SP.etat_bilan FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
            suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN suividossdb.equipe e on(e.id = d2.equip_id) WHERE 
            SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS" and e.id > 0 and ' . $allequipe_cond . ' and SP.date_cloturation LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is NULL OR SP.date_envoie_bilan_karlit = "") and SP.affiche_dans_stat is null';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute();
            $resultat = $res->fetchAll();
            return $resultat;
        }
    }





    function click_detail_et_rt($id_equipe, $tvaregime, $mois, $annee, $test)
    {

        if ($test == "default") {
            $sql = 'SELECT  e.code, d.nom, Spp.idsituation_dossier, Spp.date_cloturation,Spp.tvregime,Spp.tvadate_echeance FROM suividossdb.suivi_tva S
        LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)
        WHERE e.id =:id and Spp.date_cloturation LIKE "' . $annee . '%" AND       
        if(substring(REPLACE( SUBSTRING_INDEX(S.' . $mois . ',"#",13),SUBSTRING_INDEX(S.' . $mois . ',"#",12),""),2,1) IS NULL,0,
            if(substring(REPLACE( SUBSTRING_INDEX(S.' . $mois . ',"#",13),SUBSTRING_INDEX(S.' . $mois . ',"#",12),""),2,1) + 0 < 1 ,0,1)
            ) = 1  AND Spp.idsituation_dossier <> "MA" AND Spp.idsituation_dossier <> "MS" AND Spp.tvregime =:tvregime ';

            $res = $this->Getconnexion()->prepare($sql);
            $res->execute([
                'id' => $id_equipe,
                'tvregime' => $tvaregime,
            ]);
        }

        if ($test == "faitk") {
            $sql = 'SELECT  e.code, d.nom, Spp.idsituation_dossier, Spp.date_cloturation,Spp.tvregime,Spp.tvadate_echeance FROM suividossdb.suivi_tva S
        LEFT JOIN suividossdb.situation_par_portfeuil Spp on(Spp.id = S.id_situation) LEFT JOIN suividossdb.dossier d on(d.id = Spp.iddoss) LEFT JOIN suividossdb.equipe e on(e.id = d.equip_id)
        WHERE e.id =:id and Spp.date_cloturation LIKE "' . $annee . '%" AND       
        if(substring(REPLACE( SUBSTRING_INDEX(S.' . $mois . ',"#",9),SUBSTRING_INDEX(S.' . $mois . ',"#",8),""),2,1) IS NULL,0,
            if(substring(REPLACE( SUBSTRING_INDEX(S.' . $mois . ',"#",9),SUBSTRING_INDEX(S.' . $mois . ',"#",8),""),2,1) + 0 < 1 ,0,1)
            ) = 1  AND Spp.idsituation_dossier <> "MA" AND Spp.tvregime =:tvregime ';

            $res = $this->Getconnexion()->prepare($sql);
            $res->execute([
                'id' => $id_equipe,
                'tvregime' => $tvaregime,
            ]);
        }

        $resultat = $res->fetchAll();
        return $resultat;
    }

    function click_detail_et_rtNONFAIT($id_equipe, $tvaregime, $mois, $annee)
    {
        $sql = 'SELECT e.code, d.nom, spp.idsituation_dossier, spp.date_cloturation,spp.tvregime,spp.tvadate_echeance  FROM suividossdb.situation_par_portfeuil spp
        LEFT JOIN suividossdb.suivi_tva S on(spp.id = S.id_situation) left JOIN dossier d on(d.id = spp.iddoss) LEFT JOIN equipe e on(e.id = d.equip_id)
         WHERE d.equip_id =:id AND  spp.date_cloturation LIKE "' . $annee . '%" AND spp.tvregime =:tvregime AND if(substring(REPLACE( SUBSTRING_INDEX(S.' . $mois . ',"#",9),SUBSTRING_INDEX(S.' . $mois . ',"#",8),""),2,1) IS NULL,0,
        if(substring(REPLACE( SUBSTRING_INDEX(S.' . $mois . ',"#",9),SUBSTRING_INDEX(S.' . $mois . ',"#",8),""),2,1) + 0 < 1 ,0,1)) = 0 AND spp.idsituation_dossier <> "MA" AND spp.idsituation_dossier <> "MS" ';

        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            'id' => $id_equipe,
            'tvregime' => $tvaregime,
        ]);
        $resultat = $res->fetchAll();
        return $resultat;
    }


    public function bilan_expert($date_bilan, $id__eq)
    {
        $sql = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.nom as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,
       u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.date_cloturation 
          LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is NULL';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('equip_id' => $id__eq,));
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function bilan_expert_v($date_bilan, $id__eq)
    {
        $sql = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.nom as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,
       u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.date_cloturation 
          LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") AND SP.expert_id is NULL AND SP.reviseur_id > 0';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('equip_id' => $id__eq,));
        $resultat = $res->fetchAll();
        return $resultat;
    }



    public function bilan_expert_fait($date_bilan, $id__eq)
    {
        $sql = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.nom as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,
       u.nom as responsable, SP.reviseur_id,SP.date_modif_revu,SP.date_expert  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.reviseur_id) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.date_cloturation 
          LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('equip_id' => $id__eq,));
        $resultat = $res->fetchAll();
        return $resultat;
    }


    public function bilan_expert_v_fait($date_bilan, $id__eq)
    {
        $sql = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.nom as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,
       u.nom as nom_expert, SP.reviseur_id,SP.date_expert  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.expert_id) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.date_cloturation 
          LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('equip_id' => $id__eq,));
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function pt_envclik_bl_restant($date_bilan, $id__eq)
    {
        $sql = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.nom as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,
       u.nom as nom_expert, SP.reviseur_id,SP.date_modif_revu,SP.date_expert  FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.utilisateur u on(u.id = SP.expert_id) 
          left join suividossdb.zz_com_client_cdm_fr z on(SP.id = z.id_situation) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.date_cloturation 
          LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is null';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('equip_id' => $id__eq,));
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function click_pt_fait_tous($date_bilan, $id__eq)
    {
        $sql = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.nom as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,
       u.nom as nom_valid,z.*, SP.reviseur_id,SP.date_modif_revu,SP.date_expert FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
          left join suividossdb.utilisateur u on(u.id = z.user_id_zz) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.date_cloturation 
          LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null';
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('equip_id' => $id__eq,));
        $resultat = $res->fetchAll();
        return $resultat;
    }


    public function click_val_fait_tous($date_bilan, $id__eq, $test)
    {
        $sql = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.nom as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,
       u.nom as nom_valid,z.*, SP.reviseur_id,SP.date_modif_revu,SP.date_expert FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
          left join suividossdb.zz_valid_client_cdm_fr vz on(vz.id_situation = z.id_situation) 
          left join suividossdb.utilisateur u on(u.id = z.user_id_zz) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.date_cloturation 
          LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vz.liase_fiscal ' . $test;
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('equip_id' => $id__eq,));
        $resultat = $res->fetchAll();
        return $resultat;
    }


    public function click_manager_fait_tous($date_bilan, $id__eq, $test)
    {
        $sql = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.nom as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,
       u.nom as nom_valid,z.*, SP.reviseur_id,SP.date_modif_revu,SP.date_expert FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
          left join suividossdb.zz_valid_client_cdm_fr vz on(vz.id_situation = z.id_situation) 
          left join suividossdb.zz_valid_manager_fr vm on(vm.id_situation = vz.id_situation) 
          left join suividossdb.utilisateur u on(u.id = z.user_id_zz) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.date_cloturation 
          LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vz.liase_fiscal is not null and vm.liase_fiscal ' . $test;
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('equip_id' => $id__eq,));
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function click_teletrans_fait_tous($date_bilan, $id__eq, $test)
    {
        $sql = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.nom as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,
       u.nom as nom_valid,z.*, SP.reviseur_id,SP.date_modif_revu,SP.date_expert FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
          suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
          suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
          left join suividossdb.zz_valid_client_cdm_fr vz on(vz.id_situation = z.id_situation) 
          left join suividossdb.zz_valid_manager_fr vm on(vm.id_situation = vz.id_situation) 
          left join suividossdb.zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
          left join suividossdb.utilisateur u on(u.id = z.user_id_zz) 
          WHERE SP.idsituation_dossier <> "MA" and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.date_cloturation 
          LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vz.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal ' . $test;
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('equip_id' => $id__eq,));
        $resultat = $res->fetchAll();
        return $resultat;
    }


    public function click_edi_fait_tous($date_bilan, $id__eq, $test)
    {
        $sql = 'SELECT SP.id as id_situation , SP.etat_bilan, e.code, d2.nom as nomdossier,SP.idsituation_dossier,SP.date_cloturation,SP.date_envoie_bilan_karlit ,
        u.nom as nom_valid,z.*, SP.reviseur_id,SP.date_modif_revu,SP.date_expert FROM suividossdb.situation_par_portfeuil SP LEFT JOIN 
           suividossdb.dossier d2  on(SP.iddoss = d2.id) LEFT JOIN 
           suividossdb.equipe e on(e.id = d2.equip_id)  left join suividossdb.zz_com_client_cdm_fr z on(z.id_situation = SP.id) 
           left join suividossdb.zz_valid_client_cdm_fr vz on(vz.id_situation = z.id_situation) 
           left join suividossdb.zz_valid_manager_fr vm on(vm.id_situation = vz.id_situation) 
           left join suividossdb.zz_trait_tel_cdm_fr vt on(vt.id_situation = vm.id_situation) 
           left join suividossdb.zz_valid_edi_cdm_fr ve on(ve.id_situation = vt.id_situation) 
           left join suividossdb.utilisateur u on(u.id = z.user_id_zz) 
           WHERE SP.idsituation_dossier <> "MA" and SP.affiche_dans_stat is null and SP.idsituation_dossier <> "MS"  and e.id=:equip_id and SP.date_cloturation 
           LIKE "' . $date_bilan . '%" and (SP.date_envoie_bilan_karlit is not NULL AND SP.date_envoie_bilan_karlit <> "") and SP.reviseur_id is not NULL and SP.expert_id is not null and z.liase_fiscal is not null and vz.liase_fiscal is not null and vm.liase_fiscal is not null and vt.liase_fiscal is not null and ve.liase_fiscal ' . $test;
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('equip_id' => $id__eq,));
        $resultat = $res->fetchAll();
        return $resultat;
    }





    public function recuper_val_decl($id_situation_s)
    {
        $array_tab = [
            "zz_com_client_cdm_fr",
            "zz_valid_client_cdm_fr", "zz_valid_manager_fr", "zz_trait_tel_cdm_fr", "zz_valid_edi_cdm_fr", "zz_comm_declaration"
        ];
        $valeur_table = [];
        foreach ($array_tab as $key => $value) {
            $sql = 'SELECT * FROM suividossdb.' . $value . ' WHERE id_situation =:id';
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array('id' => $id_situation_s,));
            $resultat = $res->fetchAll();
            array_push(
                $valeur_table,
                [$value => $resultat]
            );
        }

        return  $valeur_table;
    }




    public function update_revue($resultat_final, $id_situation_s, $reviseur_id)
    {
        $sql = "UPDATE suividossdb.situation_par_portfeuil SET niveau_risque=:niveau_risque,reviseur_id=:reviseur_id,date_modif_revu=:date_modif_revu WHERE id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'niveau_risque' => $resultat_final,
            "reviseur_id" => $reviseur_id,
            "id" => $id_situation_s,
            "date_modif_revu" => date("Y-m-d")
        ));
        return "ok";
    }

    public function _update_niveau_etp($user_id, $niveau)
    {
        $sql = "UPDATE suividossdb.utilisateur SET niveau_etp=:niveau_etp WHERE id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'niveau_etp' => $niveau,
            "id" => $user_id,
        ));
    }
    

    public function update_valeur_alert_pes($id_situation, $valeur)
    {
        $sql = "UPDATE suividossdb.situation_par_portfeuil SET notification_s=:notification_s WHERE id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'notification_s' => $valeur,
            "id" => $id_situation,
        ));
        return "ok";
    }







    public function valide_expert_v($resultat_final, $id_situation_s, $valide_par)
    {
        if (empty($valide_par) || $valide_par == "") {
            $valide_par = null;
        }
        $sql = "UPDATE suividossdb.situation_par_portfeuil SET expert_list=:expert_list,expert_id=:expert_id,date_expert=:date_expert WHERE id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'expert_list' => $resultat_final,
            "expert_id" => $valide_par,
            "id" => $id_situation_s,
            "date_expert" => date("Y-m-d")
        ));
        return "ok";
    }


    public function val_dec_insert($resultat_final, $id_situation_s, $valide_par, $nom_table)
    {
        $repons = explode("#", $resultat_final);
        $liase_fiscal = "";
        $ca12 = "";
        $solde_is = "";
        $cva1330 = "";
        $solde_cvae = "";
        $decloyer = "";
        $das2 = "";
        $c3s = "";
        if ($nom_table != "zz_comm_declaration") {
            if (empty($repons[0]) || trim($repons[0]) == "") {
                $liase_fiscal = null;
            } else {
                $liase_fiscal = date($repons[0]);
            }
            if (empty($repons[1]) || trim($repons[1]) == "") {
                $ca12 = null;
            } else {
                $ca12 = date($repons[1]);
            }
            if (empty($repons[2]) || trim($repons[2]) == "") {
                $solde_is = null;
            } else {
                $solde_is = date($repons[2]);
            }
            if (empty($repons[3]) || trim($repons[3]) == "") {
                $cva1330 = null;
            } else {
                $cva1330 = date($repons[3]);
            }
            if (empty($repons[4]) || trim($repons[4]) == "") {
                $solde_cvae = null;
            } else {
                $solde_cvae = date($repons[4]);
            }
            if (empty($repons[5]) || trim($repons[5]) == "") {
                $decloyer = null;
            } else {
                $decloyer = date($repons[5]);
            }
            if (empty($repons[6]) || trim($repons[6]) == "") {
                $das2 = null;
            } else {
                $das2 = date($repons[6]);
            }
            if (empty($repons[7]) || trim($repons[7]) == "") {
                $c3s = null;
            } else {
                $c3s = date($repons[7]);
            }
        } else {
            if (empty($repons[0]) || trim($repons[0]) == "") {
                $liase_fiscal = null;
            } else {
                $liase_fiscal = ($repons[0]);
            }
            if (empty($repons[1]) || trim($repons[1]) == "") {
                $ca12 = null;
            } else {
                $ca12 = ($repons[1]);
            }
            if (empty($repons[2]) || trim($repons[2]) == "") {
                $solde_is = null;
            } else {
                $solde_is = ($repons[2]);
            }
            if (empty($repons[3]) || trim($repons[3]) == "") {
                $cva1330 = null;
            } else {
                $cva1330 = ($repons[3]);
            }
            if (empty($repons[4]) || trim($repons[4]) == "") {
                $solde_cvae = null;
            } else {
                $solde_cvae = ($repons[4]);
            }
            if (empty($repons[5]) || trim($repons[5]) == "") {
                $decloyer = null;
            } else {
                $decloyer = ($repons[5]);
            }
            if (empty($repons[6]) || trim($repons[6]) == "") {
                $das2 = null;
            } else {
                $das2 = ($repons[6]);
            }
            if (empty($repons[7]) || trim($repons[7]) == "") {
                $c3s = null;
            } else {
                $c3s = ($repons[7]);
            }
        }

        if (count($this->recuereexistid($nom_table, $id_situation_s)) < 1) {
            $sql = "INSERT INTO " .  $nom_table . " (liase_fiscal,ca12,solde_is,cva1330,solde_cvae,decloyer,das2,c3s,user_id_zz,id_situation) 
             VALUES (:liase_fiscal,:ca12,:solde_is,:cva1330,:solde_cvae,:decloyer,:das2,:c3s,:user_id_zz,:id_situation)";
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array(
                'liase_fiscal' => $liase_fiscal,
                'ca12' => $ca12,
                'solde_is' => $solde_is,
                'cva1330' => $cva1330,
                'solde_cvae' => $solde_cvae,
                'decloyer' => $decloyer,
                'das2' => $das2,
                'c3s' => $c3s,
                'user_id_zz' => $valide_par,
                'id_situation' => $id_situation_s,
            ));
            return $repons[0];
        } else {
            $sql = "UPDATE suividossdb." . $nom_table . " SET 
            liase_fiscal=:liase_fiscal,
            ca12=:ca12,
            solde_is=:solde_is,
            cva1330=:cva1330,
            solde_cvae=:solde_cvae,
            decloyer=:decloyer,  
            das2=:das2,
            c3s=:c3s,
            user_id_zz=:user_id_zz 
            WHERE id_situation=:id_situation";
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array(
                'liase_fiscal' => $liase_fiscal,
                'ca12' => $ca12,
                'solde_is' => $solde_is,
                'cva1330' => $cva1330,
                'solde_cvae' => $solde_cvae,
                'decloyer' => $decloyer,
                'das2' => $das2,
                'c3s' => $c3s,
                "user_id_zz" => $valide_par,
                "id_situation" => $id_situation_s
            ));
            return $repons[1];
        }
    }

    public function recuereexistid($nomtable, $id_situation)
    {
        $sql = "SELECT * FROM " . $nomtable . "  where id_situation =:id_situation";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array('id_situation' => $id_situation,));
        $resultat = $res->fetchAll();
        return $resultat;
    }
}
