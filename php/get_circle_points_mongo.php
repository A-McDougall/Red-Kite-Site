<?php

require_once 'dbConfig.php';

// Retrieve data from Query String
$centreString = ($_POST['centre']);
$rad = floatval($_POST['rad']);
$col = htmlspecialchars($_POST['col']);
//$start = $_POST['start'];
//$end = $_POST['end'];

$centre[0] = (float)$centreString[0];
$centre[1] = (float)$centreString[1];

// find the nearest point within Xm from the users click
try{
    $find_query=array(
        'geometry'=>array(
            '$near'=>array(
                '$geometry'=>array(
                    'type'=>'Point',
                    'coordinates'=> $centre
                ),
                '$maxDistance' => $rad
            )
        )
    );

    $displace_area_query=[
                     [
                          '$geoNear'=> [
                              'near'=> [
                                  'type'=> 'Point',
                                  'coordinates'=> $centre
                              ],
                              'distanceField'=> 'properties.dist',
                              'maxDistance'=> $rad,
                              'includeLocs'=> 'geometry',
                              'spherical'=> true,
                              'limit'=> 1000000
                          ]
                      ],
                      [
                          '$sort'=> ['properties.dist'=>1, 'properties.date'=> 1]
                      ],
                      [
                          '$group'=> [
                              '_id'=> '$geometry',
                              'data'=> [
                                  '$push'=> [
                                      'date'=> '$properties.date',
                                      'displace'=> '$properties.displace'
                                  ]
                              ],
                              'dist'=> ['$first'=> '$properties.dist'],
                              'oid'=> ['$last'=> '$_id']
                          ]
                      ],
                      [
                          '$project'=>[
                              '_id'=> '$oid',
                              'geometry'=> '$_id',
                              'data'=> 1
                          ]
                      ]
                  ];
//    $cursor = $conn->$db_d->$col->find($find_query);
    $cursor = $conn->$db_d->$col->aggregate($displace_area_query);
}
catch (Exception $e) {
    if (strcmp($e->getMessage(), "") ===0){
        echo $e->getMessage();
    }
    else{
        echo "Could not find a point within ".$rad."m\n" . $e->getMessage();
    }

    exit;
}


$i = 0;
echo "[";
foreach( $cursor as $doc )
{
    if ( $i > 0){
        echo ", ";
    }

    $json = MongoDB\BSON\toJSON(MongoDB\BSON\fromPHP($doc));
    echo $json;

    $i++;
}
echo "]";

?>