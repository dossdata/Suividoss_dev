<?php
namespace Jss;

use App\Connection;

class Equipe extends Connection
{
    public function listequipe(){
        $sql = "SELECT DISTINCT id,code FROM suividossdb.equipe ORDER BY code";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute();
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function recupereEquipe($id){
        $sql = "SELECT tous_portfeuil_id as id,tous_portfeuil_nom as code FROM suividossdb.acces_portfeuil where utilisateur_id=:id";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            "id" => $id,
        ]);
        $resultat = $res->fetchAll();
        return $resultat;
    }

    public function portfeuilsup($id){
        $sql = "SELECT * FROM suividossdb.portfeuilsup sp inner join suividossdb.utilisateur u on (sp.utilisateur_id = u.id) where u.pays_id =:pays_id;";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute([
            "pays_id" => $id,
        ]);
        $resultat = $res->fetchAll();
        return $resultat;
    }

    
}
