<?php
session_start();
//composer dump-autoload  'executer a chaque ajout class
use Jss\Equipe;
use Jss\Acceuil;
use Jss\Login;
use Jss\Situation_portfeuille;
use Jss\Situation_tva;
use Jss\Suivi;

require 'vendor/autoload.php';
//Routing
$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/view');
$twig = new \Twig\Environment($loader, [
    'debug' => true,
    'cache' => false,
]);

$equipe = new Equipe();
$acc = new Acceuil();
$login = new Login();
$suivi = new Suivi();
$situation = new Situation_portfeuille();

//die(var_dump($_GET));
if (isset($_GET["suivi_karlit"])) {
    switch ($_GET["suivi_karlit"]) {
        case 'suivi':
            if (isset($_SESSION['utilisateur']) && count($_SESSION['utilisateur']) > 0) {
                //$v = $suivi->profile($_SESSION['utilisateur'][0]["id"]);
                $v = $equipe->recupereEquipe($_SESSION['utilisateur'][0]["id"]);
                //--------------------------x-----------------------------------
                $sit = $situation->table_option("situation_dossier");
                $rg1 = $situation->table_option("regime_dimposition");
                $rg2 = $situation->table_option("regim_imposition2");
                $dp_coala = $situation->table_option("dp_coala");
                $tva_regime = $situation->table_option("tva_regime");
                $etat_bilan = $situation->table_option("etat_bilan");
                $forme_juridique = $situation->table_option("forme_juridique");
                $situation_traitement_karlit = $situation->table_option("situation_traitement_karlit");
                $portfeuilsup =  $equipe->portfeuilsup($_SESSION['utilisateur'][0]["pays_id"]);
                echo $twig->render('suivi.html.twig', [
                    'utilisateur' => $_SESSION['utilisateur'],
                    "portfeuilsup" => $portfeuilsup,
                    'sonEquipe' => $v,
                    'situation_dossier' => $sit,
                    'regime_impos1' => $rg1,
                    'regime_impos2' => $rg2,
                    'dp_coala' => $dp_coala,
                    'tva_regime' => $tva_regime,
                    'etat_bilan' => $etat_bilan,
                    'situation_traitement_karlit' => $situation_traitement_karlit,
                    'forme_juridique' => $forme_juridique,
                ]);
            } else {
                $_SESSION['utilisateur'] = [];
                echo $twig->render('Authentification.html.twig');
            }
            break;

            case 'suivi_tva':
                if (isset($_SESSION['utilisateur']) && count($_SESSION['utilisateur']) > 0) {
                    $v = $equipe->recupereEquipe($_SESSION['utilisateur'][0]["id"]);
                    //$v = $suivi->profile($_SESSION['utilisateur'][0]["id"]);
                    $sit = $situation->table_option("situation_dossier");
                    $rg1 = $situation->table_option("regime_dimposition");
                    $rg2 = $situation->table_option("regim_imposition2");
                    $dp_coala = $situation->table_option("dp_coala");
                    $tva_regime = $situation->table_option("tva_regime");
                    $etat_bilan = $situation->table_option("etat_bilan");
                    $etat_tva = $situation->table_option("etat_tva");
                    $forme_juridique = $situation->table_option("forme_juridique");
                    $situation_traitement_karlit = $situation->table_option("situation_traitement_karlit");
                    $portfeuilsup =  $equipe->portfeuilsup($_SESSION['utilisateur'][0]["pays_id"]);
    
                    echo $twig->render('suivi_tva.html.twig', [
                        "portfeuilsup" => $portfeuilsup,
                        'utilisateur' => $_SESSION['utilisateur'],
                        'sonEquipe' => $v,
                        'situation_dossier' => $sit,
                        'regime_impos1' => $rg1,
                        'regime_impos2' => $rg2,
                        'dp_coala' => $dp_coala,
                        'tva_regime' => $tva_regime,
                        'etat_bilan' => $etat_bilan,
                        'situation_traitement_karlit' => $situation_traitement_karlit,
                        'forme_juridique' => $forme_juridique,
                        'etat_tva' => $etat_tva
                    ]);
                } else {
                    $_SESSION['utilisateur'] = [];
                    echo $twig->render('Authentification.html.twig');
                }
                break;            

        case 'authentification':
            $_SESSION['utilisateur'] = [];
            echo $twig->render('Authentification.html.twig');
            break;

        case 'statistique':
            if (isset($_SESSION['utilisateur']) && count($_SESSION['utilisateur']) > 0) {
           

                $resultat = $equipe->listequipe();
                $list = $acc->listutilisateur();
                $tva_regime = $situation->table_option("tva_regime");
                $sit = $situation->table_option("situation_dossier");
                $etat_bilan = $situation->table_option("etat_bilan");
                //$v = $suivi->profile($_SESSION['utilisateur'][0]["id"]);
                $v = $equipe->recupereEquipe($_SESSION['utilisateur'][0]["id"]);
                $portfeuilsup =  $equipe->portfeuilsup($_SESSION['utilisateur'][0]["pays_id"]);
                echo $twig->render('statistique.html.twig', [
                    "portfeuilsup" => $portfeuilsup,
                    "equipe" => $v,
                    "gasy" => $list[0]["gasy"],
                    "france" => $list[0]["frantsay"],
                    "gasy_rev" => $list[0]["gasy_rev"],
                    "frantsay_rev" => $list[0]["frantsay_rev"],
                    "utilisateur" => $_SESSION['utilisateur'],
                ]);
            } else {
                $_SESSION['utilisateur'] = [];
                echo $twig->render('Authentification.html.twig');
            }
            break;
        
            case 'chart':
                if (isset($_SESSION['utilisateur']) && count($_SESSION['utilisateur']) > 0) {
               
    
                    $resultat = $equipe->listequipe();
                    $list = $acc->listutilisateur();
                    $tva_regime = $situation->table_option("tva_regime");
                    $sit = $situation->table_option("situation_dossier");
                    $etat_bilan = $situation->table_option("etat_bilan");
                    //$v = $suivi->profile($_SESSION['utilisateur'][0]["id"]);
                    $tousequipe = $equipe->listequipe();
                    $v = $equipe->recupereEquipe($_SESSION['utilisateur'][0]["id"]);
                    $portfeuilsup =  $equipe->portfeuilsup($_SESSION['utilisateur'][0]["pays_id"]);
                    echo $twig->render('chart.html.twig', [
                        "portfeuilsup" => $portfeuilsup,
                        "equipe" => $v,
                        "allequipe" => $tousequipe,
                        "gasy" => $list[0]["gasy"],
                        "france" => $list[0]["frantsay"],
                        "gasy_rev" => $list[0]["gasy_rev"],
                        "frantsay_rev" => $list[0]["frantsay_rev"],                        
                        "utilisateur" => $_SESSION['utilisateur'],
                    ]);
                } else {
                    $_SESSION['utilisateur'] = [];
                    echo $twig->render('Authentification.html.twig');
                }
                break;            
            
                case 'juridique':
                    if (isset($_SESSION['utilisateur']) && count($_SESSION['utilisateur']) > 0) {                   
        
                        $resultat = $equipe->listequipe();
                        $list = $acc->listutilisateur();
                        $tva_regime = $situation->table_option("tva_regime");
                        $sit = $situation->table_option("situation_dossier");
                        $etat_bilan = $situation->table_option("etat_bilan");
                        //$v = $suivi->profile($_SESSION['utilisateur'][0]["id"]);
                        $tousequipe = $equipe->listequipe();
                        $v = $equipe->recupereEquipe($_SESSION['utilisateur'][0]["id"]);
                        $portfeuilsup =  $equipe->portfeuilsup($_SESSION['utilisateur'][0]["pays_id"]);
                        echo $twig->render('juridique.html.twig', [
                            "portfeuilsup" => $portfeuilsup,
                            "equipe" => $v,
                            "allequipe" => $tousequipe,
                            "gasy" => $list[0]["gasy"],
                            "france" => $list[0]["frantsay"],
                            "gasy_rev" => $list[0]["gasy_rev"],
                            "frantsay_rev" => $list[0]["frantsay_rev"],                        
                            "utilisateur" => $_SESSION['utilisateur'],
                        ]);
                    } else {
                        $_SESSION['utilisateur'] = [];
                        echo $twig->render('Authentification.html.twig');
                    }
                    break; 

        case 'accesslogin':
            $_SESSION['utilisateur'] = [];
            if (isset($_POST["login"]) && isset($_POST["password"])) {
                $response = $login->returnLogin(trim($_POST["login"]), trim($_POST["password"]));
                $_SESSION['utilisateur'] = $response;
                if (count($response) > 0) {
                    if (mb_strtolower($_POST["login"],"UTF-8") == "admin") {
                        header("location:/SuiviKARLIT/admin/admin.php");
                    } else {
                        
                        $resultat = $equipe->listequipe();
                        $list = $acc->listutilisateur();
                        //$v = $suivi->profile($_SESSION['utilisateur'][0]["id"]);
                        $v = $equipe->recupereEquipe($_SESSION['utilisateur'][0]["id"]);
                        $tva_regime = $situation->table_option("tva_regime");
                        $sit = $situation->table_option("situation_dossier");
                        $etat_bilan = $situation->table_option("etat_bilan");
                        $portfeuilsup =  $equipe->portfeuilsup($_SESSION['utilisateur'][0]["pays_id"]);
                        header("location:/SuiviKARLIT/?suivi_karlit=statistique");
                    }
                } else {
                    $_SESSION['utilisateur'] = [];
                    echo $twig->render('Authentification.html.twig', [
                        "message" => "Mot de passe incorrect !",
                    ]);
                }
            } else {
                $_SESSION['utilisateur'] = [];
                echo $twig->render('Authentification.html.twig', [
                    "message" => "",
                ]);
            }
            break;

        case 'situtation_tva':
            if (isset($_SESSION['utilisateur']) && count($_SESSION['utilisateur']) > 0) {
                $v = $suivi->profile($_SESSION['utilisateur'][0]["id"]);
                $situation_traitement_karlit = $situation->table_option("situation_traitement_karlit");
                $st_tva = new Situation_tva();
                $list_etatbilanbq = $st_tva->etatbilanbq();
                $piecemanquante = $st_tva->piecemanquante();
                $etat_tva = $situation->table_option("etat_tva");
                $tva_regime = $situation->table_option("tva_regime");
                $sit = $situation->table_option("situation_dossier");
                $portfeuilsup =  $equipe->portfeuilsup($_SESSION['utilisateur'][0]["pays_id"]);
                echo $twig->render('Situation_tva.html.twig', [
                    "portfeuilsup" => $portfeuilsup,
                    'utilisateur' => $_SESSION['utilisateur'],
                    'sonEquipe' => $v,
                    'list_etatbilanbq' => $list_etatbilanbq,
                    'piecemanquante' => $piecemanquante,
                    'etat_tva' => $etat_tva,
                    'tva_regime' => $tva_regime,
                    'sit' => $sit

                ]);
            } else {
                $_SESSION['utilisateur'] = [];
                echo $twig->render('Authentification.html.twig');
            }
            break;

        case 'situtation_bilan':
            if (isset($_SESSION['utilisateur']) && count($_SESSION['utilisateur']) > 0) {
                //$v = $suivi->profile($_SESSION['utilisateur'][0]["id"]);
                $v = $equipe->recupereEquipe($_SESSION['utilisateur'][0]["id"]);
                $situation_traitement_karlit = $situation->table_option("situation_traitement_karlit");
                $st_tva = new Situation_tva();
                $list_etatbilanbq = $st_tva->etatbilanbq();
                $piecemanquante = $st_tva->piecemanquante();
                $etat_tva = $situation->table_option("etat_tva");
                $tva_regime = $situation->table_option("tva_regime");
                $sit = $situation->table_option("situation_dossier");
                $etat_bilan = $situation->table_option("etat_bilan");
                $portfeuilsup =  $equipe->portfeuilsup($_SESSION['utilisateur'][0]["pays_id"]);

                echo $twig->render('Situation_bilan.html.twig', [
                    "portfeuilsup" => $portfeuilsup,
                    'utilisateur' => $_SESSION['utilisateur'],
                    'sonEquipe' => $v,
                    'list_etatbilanbq' => $list_etatbilanbq,
                    'piecemanquante' => $piecemanquante,
                    'etat_bilan' => $etat_bilan,
                    'etat_tva' => $etat_tva,
                    'tva_regime' => $tva_regime,
                    'sit' => $sit

                ]);
            } else {
                $_SESSION['utilisateur'] = [];
                echo $twig->render('Authentification.html.twig');
            }
            break;

        case 'declaration_periodique':
            if (isset($_SESSION['utilisateur']) && count($_SESSION['utilisateur']) > 0) {
       
                $v = $equipe->recupereEquipe($_SESSION['utilisateur'][0]["id"]);
                //$v = $suivi->profile($_SESSION['utilisateur'][0]["id"]);
                $situation_traitement_karlit = $situation->table_option("situation_traitement_karlit");
                $st_tva = new Situation_tva();
                $list_etatbilanbq = $st_tva->etatbilanbq();
                $piecemanquante = $st_tva->piecemanquante();
                $tva_regime = $situation->table_option("tva_regime");
                $portfeuilsup =  $equipe->portfeuilsup($_SESSION['utilisateur'][0]["pays_id"]);
                echo $twig->render('declaration_periodique.twig', [
                    "portfeuilsup" => $portfeuilsup,
                    'utilisateur' => $_SESSION['utilisateur'],
                    'sonEquipe' => $v,
                    'list_etatbilanbq' => $list_etatbilanbq,
                    'piecemanquante' => $piecemanquante,
                    'tva_regime' => $tva_regime
                ]);
            } else {
                $_SESSION['utilisateur'] = [];
                echo $twig->render('Authentification.html.twig');
            }
            break;

        default:
            $_SESSION['utilisateur'] = [];
            echo $twig->render('Authentification.html.twig', [
                "message" => "",
            ]);
            break;
    }
} else {
    $_SESSION['utilisateur'] = [];
    echo $twig->render('Authentification.html.twig', [
        "message" => "",
    ]);
}
