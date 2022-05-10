<?php
session_start();
//composer dump-autoload  'executer a chaque ajout class

use Jss\Acompte_is;
use Jss\Acompte_tva_st;
use Jss\Bilansimple;
use Jss\Cfe;
use Jss\Cvae;
use Jss\Liquidation_is;
use Jss\Tva_mens;
use Jss\Tva_trim;
use Jss\Tvs;
use Seld\JsonLint\JsonParser;

require 'vendor/autoload.php';
$tvs = new Tvs();
$bilan = new Bilansimple();
$cvae = new Cvae();
$cfe = new Cfe();
$acompt_tva_st = new Acompte_tva_st();
$tva_trim = new Tva_trim();
$tva_mens = new Tva_mens();
$acompte_is = new Acompte_is();
$liquidation_is = new Liquidation_is();
switch ($_POST["param"]) {
    case "TVA MENS":
        $tva_mens->insert_tva_mens($_POST['id_situation'],
                $_POST['dt_fait_karlit']
                ,$_POST['dt_envoie_client'],$_POST['dt_validation_client'],
                $_POST['dt_teletransmision'],
                $_POST['dt_validation_edi'],$_POST['adddate'],$_POST['commentaire'],
                $_SESSION['utilisateur'][0]["id"]); 
                
        break;

        case "TVA TRIM":
            $tva_trim->insert_tva_trim($_POST['id_situation'],
                $_POST['dt_fait_karlit']
                ,$_POST['dt_envoie_client'],$_POST['dt_validation_client'],
                $_POST['dt_teletransmision'],
                $_POST['dt_validation_edi'],$_POST['commentaire'],
                $_SESSION['utilisateur'][0]["id"]);  
            
        break;

        case "ACOMPTE TVA ST":
            $acompt_tva_st->insertacompte_tva_st($_POST['id_situation'],
            $_POST['montant'],$_POST['dt_acpt_fait_karlit']
            ,$_POST['date_envoie_client'],$_POST['date_de_validation_client'],
            $_POST['date_teletransmission'],
            $_POST['date_validation_edi'],$_POST['commentaire'],$_POST['montant_st'],
            $_SESSION['utilisateur'][0]["id"]);  

        break;

        case "ACOMPTE IS":
            $acompte_is->insert_acompte_is($_POST['id_situation'],$_POST['montant'],$_POST['dt_fait_karlit']
            ,$_POST['dt_envoie_client'],$_POST['dt_validation_client'],
            $_POST['dt_teletransmision'],
            $_POST['dt_validation_edi'],$_POST['montant_is'],$_POST['commentaire'],
            $_SESSION['utilisateur'][0]["id"]);  
        break;

        case "LQUIDIATION IS":
            $liquidation_is->insert_Liquidation_is($_POST['id_situation'],$_POST['montant'],$_POST['dt_fait_karlit']
            ,$_POST['dt_envoie_client'],$_POST['dt_validation_client'],
            $_POST['dt_teletransmision'],
            $_POST['dt_validation_edi'],$_POST['commentaire'],
            $_SESSION['utilisateur'][0]["id"]);  
        break;

        

        case "CVAE":
            $cvae->insertCvae($_POST['id_situation'],
            $_POST['montant'],$_POST['date_cfe_karlit']
            ,$_POST['date_envoie_client'],$_POST['date_de_validation_client'],
            $_POST['date_teletransmission'],
            $_POST['date_validation_edi'],$_POST['commentaire'],$_POST['montant_cfe'],
            $_SESSION['utilisateur'][0]["id"]
        );            
        break;

        case "CFE":
            $cfe->insertCfe($_POST['id_situation'],
            $_POST['montant'],$_POST['date_cfe_karlit']
            ,$_POST['date_envoie_client'],$_POST['date_de_validation_client'],
            $_POST['date_teletransmission'],
            $_POST['date_validation_edi'],$_POST['commentaire'],$_POST['montant_cfe'],
            $_SESSION['utilisateur'][0]["id"]
        );            
        break;
        

        case "TVS":
            $tvs->insertTvs($_POST['id_situation'],
            $_POST['montant'],$_POST['date_cvae_karlit']
            ,$_POST['date_envoie_client'],$_POST['date_de_validation_client'],
            $_POST['date_teletransmission'],
            $_POST['date_validation_edi'],$_POST['commentaire'],
            $_SESSION['utilisateur'][0]["id"]);
            
        break;
        case "BILAN":
                $bilan->insert_bilan($_POST['id_situation'],
                $_POST['dt_validation_fr'],$_POST['dt_fait_karlit']
                ,$_POST['dt_envoie_client'],$_POST['dt_validation_client'],
                $_POST['dt_teletransmision'],
                $_POST['dt_validation_edi'],$_POST['commentaire'],
                $_SESSION['utilisateur'][0]["id"]);            
        break;

    case "tvs_select":
        echo json_encode($tvs->recuereexistid($_POST["id_situation"]));
        break;

        case "bilan_select":
            echo json_encode($bilan->recuereexistid($_POST["id_situation"]));
            break;

        case "cvae_select":
            echo json_encode($cvae->recuereexistid($_POST["id_situation"]));
            break;  

        case "acompt_tva_st_select":
                echo json_encode($acompt_tva_st->recuereexistid($_POST["id_situation"]));
                break; 

        case "tva_trim_select":
            echo json_encode($tva_trim->recuereexistid($_POST["id_situation"]));
            break;

            case "tva_mens_select":
                echo json_encode($tva_mens->recuereexistid($_POST["id_situation"]));
                break;

                case "acompte_is_select":
                    echo json_encode($acompte_is->recuereexistid($_POST["id_situation"]));
                    break;    
                    
                    case "liquidation_is":
                        echo json_encode($liquidation_is->recuereexistid($_POST["id_situation"]));
                        break;  

                        case "cpte_cfe":
                            echo json_encode($cfe->recuereexistid($_POST["id_situation"]));
                            break;                          
                        
                    
                
            
}