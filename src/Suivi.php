<?php
namespace Jss;

use App\Connection;

class Suivi extends Connection{

    public function profile($id){
        $sql = 'SELECT DISTINCT e.id, e.code FROM suividossdb.affectation_dossier a left join 
        dossier d on(d.id = a.iddossier) left join
         equipe e on(e.id = d.equip_id) left join 
         utilisateur u on(u.id = a.id_utilisateur) where d.id is not null and a.id_utilisateur =:id ORDER BY e.code';
         $res = $this->Getconnexion()->prepare($sql);
         $res->execute([
             'id' => $id
         ]);
         $resultat = $res->fetchAll();
         return $resultat;
    }
}