<?php

namespace Jss;

use App\Connection;

class Situation_tva extends Connection
{
    public function etatbilanbq()
    {
        $sql = "SELECT  * FROM suividossdb.etatbilanbq";
        $rs = $this->Getconnexion()->prepare($sql);
        $rs->execute();
        $resultat = $rs->fetchAll();
        return $resultat;
    }

    public function piecemanquante()
    {
        $sql = "SELECT  * FROM suividossdb.piecemanquante";
        $rs = $this->Getconnexion()->prepare($sql);
        $rs->execute();
        $resultat = $rs->fetchAll();
        return $resultat;
    }

    public function insertion_st($user_id,$situation_id,$etat_g,$date_dernier_keobiz,$etat,$piece_manquant,$commentaire,$commentaire_g){
        if( count($this->recuereexistid($situation_id)) < 1){
        $sql = "INSERT INTO suividossdb.situation_tva (user_id,situation_id,etat_g,date_dernier_keobiz,etat,piece_manquant,commentaire,commentaire_g) 
        VALUES(:user_id,:situation_id,:etat_g,:date_dernier_keobiz,:etat,:piece_manquant,:commentaire,:commentaire_g)";
        $rs = $this->Getconnexion()->prepare($sql);
        $rs->execute([
            'user_id' => $user_id,
            'situation_id' => $situation_id,
            'etat_g' => $etat_g,
            'date_dernier_keobiz' => $date_dernier_keobiz,
            'etat' => $etat,
            'piece_manquant' => $piece_manquant,
            'commentaire' => $commentaire,
            'commentaire_g' => $commentaire_g
        ]);
        }else{
            $sql = "UPDATE suividossdb.situation_tva SET 
            user_id=:user_id,etat_g=:etat_g
            ,date_dernier_keobiz=:date_dernier_keobiz,etat=:etat
             ,piece_manquant=:piece_manquant,commentaire=:commentaire,commentaire_g=:commentaire_g
            where situation_id =:situation_id";
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array(
                'user_id' => $user_id,
                'situation_id' => $situation_id,
                'etat_g' => $etat_g,
                'date_dernier_keobiz' => $date_dernier_keobiz,
                'etat' => $etat,
                'piece_manquant' => $piece_manquant,
                'commentaire' => $commentaire,
                'commentaire_g' => $commentaire_g
            ));
        }
    }

    public function recuereexistid($situation_id){
		$sql = "SELECT tva.*, st.dt_validation_edi FROM suividossdb.situation_tva tva left JOIN suividossdb.acompte_tva_st st on(tva.situation_id = st.id_situation)  where situation_id =:situation_id";
		$res = $this->Getconnexion()->prepare($sql);
		$res->execute(array('situation_id' => $situation_id,));
		$resultat = $res->fetchAll();
		return $resultat;		
	}

    public function select_situation_et_rt($situation_id){
		$sql = "SELECT tva.*, tr.dt_validation_edi FROM suividossdb.situation_tva tva left JOIN suividossdb.tva_trim tr on(tva.situation_id = tr.id_situation)  where situation_id =:situation_id";
		$res = $this->Getconnexion()->prepare($sql);
		$res->execute(array('situation_id' => $situation_id,));
		$resultat = $res->fetchAll();
		return $resultat;		
	}

    public function select_situation_em_rm($situation_id){
		$sql = "SELECT tva.*, tm.dt_validation_edi FROM suividossdb.situation_tva tva left JOIN suividossdb.tva_mensuel tm on(tva.situation_id = tm.id_situation)  where situation_id =:situation_id";
		$res = $this->Getconnexion()->prepare($sql);
		$res->execute(array('situation_id' => $situation_id,));
		$resultat = $res->fetchAll();
		return $resultat;		
	}
    

}
