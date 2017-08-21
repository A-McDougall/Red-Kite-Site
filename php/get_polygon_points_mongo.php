<?php

require_once 'dbConfig.php';

// Retrieve data from Query String
$areaString = $_POST['area'];
$col = htmlspecialchars($_POST['col']);
//$start = $_POST['start'];
//$end = $_POST['end'];
foreach($areaString as $j=>$arr){
    foreach($arr as $k=>$arr2){
        $area[$j][$k][0] = (float)$arr2[0];
        $area[$j][$k][1] = (float)$arr2[1];
    }
}

try{
    $area_query=array(
            'geometry'=>array(
                '$geoIntersects'=>array(
                    '$geometry'=>array(
                        'type'=>'Polygon',
                        'coordinates'=> $area
                    )
                )
            )
        );

    $displacement_query=[
                       [
                            '$match'=> [
                                'geometry'=> [
                                    '$geoIntersects'=> [
                                        '$geometry'=> [
                                            'type'=> 'Polygon',
                                            'coordinates'=> $area
                                        ],
                                    ]
                                ]
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
                                'geometry'=> ['$first'=> '$geometry'],
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

//    print_r($area_query);

//    $cursor = $conn->$db_d->$col->find($area_query);
    $cursor = $conn->$db_d->$col->aggregate($displacement_query);

}
catch (Exception $e) {
    if (strcmp($e->getMessage(), "can't find ns") ===0){
        echo '{}';
    }
    else{
        echo "Could not retrieve data:\n" . $e->getMessage();
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