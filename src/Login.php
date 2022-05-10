<?php
namespace Jss;

use App\Connection;

class Login extends Connection{
    public function returnLogin($login, $password){
        $sql = "SELECT u.*,p.nom as nom_poste FROM utilisateur u left join poste p on(p.id = u.post_id) WHERE login =:login and password=:password";
        $res = $this->Getconnexion()->prepare($sql);
        $res->execute(array(
            'login' => $login,
            'password' => $password
        ));
        $reponse = $res->fetchAll();
        return $reponse;
    }
}