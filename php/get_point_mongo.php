<?php

require_once 'dbConfig.php';

// Retrieve data from Query String
$lng = floatval($_POST['lng']);
$lat = floatval($_POST['lat']);
$col = htmlspecialchars($_POST['col']);
$col_d=$col.'split';
$col_v=$col.'properties';
//$start = $_POST['start'];
//$end = $_POST['end'];

// find the nearest point within Xm from the users click
try{
   $displace_agg_query=[
                 [
                      '$geoNear'=> [
                          'near'=> [
                              'type'=> 'Point',
                              'coordinates'=> [$lng, $lat]
                          ],
                          'distanceField'=> 'properties.dist',
                          'maxDistance'=> 100,
                          'includeLocs'=> 'geometry',
                          'spherical'=> true,
                          'limit'=> 1000000
                      ]
                  ],
                  [
                      '$sort'=> ['properties.date'=> 1]
                  ],
                  [
                      '$group'=> [
                          '_id'=> '$geometry',
                          'data'=> [
                              '$push'=> [
                                  'date'=> '$properties.date',
                                  'displace'=> '$properties.displace',
                                  'split_id'=> '$_id'
                              ]
                          ],
                          'dist'=> ['$first'=> '$properties.dist']
                      ]
                  ],
                  [
                      '$sort'=> ['dist'=> 1],
                  ],
                  ['$limit'=> 1],
                  [
                      '$project'=>[
                          '_id'=> 0,
                          'geometry'=> '$_id',
                          'data'=> 1
                      ]
                  ]
              ];

    $velocity_agg_query=[
                           [
                                '$geoNear'=> [
                                    'near'=> [
                                        'type'=> 'Point',
                                        'coordinates'=> [$lng, $lat]
                                    ],
                                    'distanceField'=> 'properties.dist',
                                    'maxDistance'=> 100,
                                    'includeLocs'=> 'geometry',
                                    'spherical'=> true,
                                    'limit'=> 1000000
                                ]
                            ],
                            [
                                '$sort'=> ['properties.dist'=>1, 'properties.date'=> 1]
                            ],
                            ['$limit'=> 1],
                            [
                                '$project'=>[
                                    '_id'=> 1,
                                    'properties'=> 1
                                ]
                            ]
                        ];

    $cursor = $conn->$db_d->$col_d->aggregate($displace_agg_query);
    $cursor2 = $conn->$db_d->$col_v->aggregate($velocity_agg_query);
}
catch (Exception $e) {
    if (strcmp($e->getMessage(), "") ===0){
        echo $e->getMessage();
    }
    else{
        echo "Could not find a point within 100m\n" . $e->getMessage();
    }

    exit;
}


foreach($cursor as $doc)
{
    $json = MongoDB\BSON\toJSON(MongoDB\BSON\fromPHP($doc));
//    echo $json;
}
if(isset($json)){
    $json = rtrim($json,'}');
    echo $json;
    echo ', ';
} else{
    echo "Could not find a point within 100m\n";
    exit;
}




foreach($cursor2 as $doc)
{
    $vels = MongoDB\BSON\toJSON(MongoDB\BSON\fromPHP($doc));
//    echo $vels;
}
$vels = ltrim($vels,'{');
echo $vels;

exit;
?>