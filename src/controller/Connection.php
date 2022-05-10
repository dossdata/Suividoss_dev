<?php
namespace App;

use PDO;
use PDOException;

class Connection
{
   
   private $server;
   private $base;
   private $password;
   private $root;

   public function Getconnexion()
   {
      $this->server = "suividoss-production.caukscxdgck1.eu-central-1.rds.amazonaws.com";
      $this->base = "suividossdb";
      $this->password = "CfeSArICSDzqwNM58R4Y";
      $this->root = "admin";
      $this->port = 3306;
      try {
         $dsn = "mysql:host=". $this->server .";dbname=". $this->base.";charset=utf8";
         $pdo = new PDO($dsn, $this->root, $this->password);
         $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         return $pdo;
      } catch (PDOException $th) {
         echo "Connection invalid ". $th->getMessage();
      }
      return $pdo;
   }
}
