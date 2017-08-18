<?php
    session_start();
    require_once 'dbConfig.php';

    if(isset($_POST['btn-login']))
    {
        $user_email = strtolower(trim($_POST['login-email']));
        $user_password = trim($_POST['login-password']);
        $password = md5($user_password);
        $user_col = 'users';

        try{
            $find_user=array('email'=>$user_email);
            $options=[
                    'projection'=>[
                        '_id'=>0,
                        'uname'=>1,
                        'md5pass'=>1,
                        'api_key'=>1,
                        'insar_app.max_zoom'=>1,
                        'insar_app.locations'=>1
                    ],
                    'limit'=>1
                ];
            $cursor = $conn_u->$db_u->$user_col->find($find_user, $options);

            $returned = '';
            foreach($cursor as $doc)
            {
                $returned = $doc['md5pass'];
                $uname = $doc['uname'];
                $apikey = $doc['api_key'];
                $insar_app = $doc['insar_app'];
                    if(isset($insar_app['max_zoom'])){$max_zoom = $insar_app['max_zoom'];}
                    if(isset($insar_app['locations'])){
                        $location = $insar_app['locations'];
                        if(is_string($location)){
                            if(strcmp($location, 'all') !== 0){
                                 echo 'This user has a non-standard location set in the database. Please contact an admin.';
                                 exit;
                            }
                        }
                        else{
                            foreach($location as $loc){
                                if(isset($loc['name'])){
                                    if(strcmp($loc['name'],'home')==0){
                                        $coordinates = $loc['coordinates'];
                                            $ulon = $coordinates[0];
                                            $ulat = $coordinates[1];
                                    }
                                }
                            }
                        }
                    }
                break;
            }

            if($returned==$password){
                echo "ok"; // log in
                $_SESSION['user_session'] = $uname;
                $_SESSION['apikey'] = $apikey;
                if(isset($insar_app['max_zoom'])){$_SESSION['max_zoom'] = $max_zoom;}
                if(isset($coordinates)){
                    $_SESSION['ulon'] = $ulon;
                    $_SESSION['ulat'] = $ulat;
                }
            }
            else{
                echo "Incorrect e-mail or password."; // wrong details
            }

        }
        catch (Exception $e) {
            echo $e->getMessage();
        }
    }

?>