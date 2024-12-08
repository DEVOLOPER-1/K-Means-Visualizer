/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
//  */


function get_centeroid(points_lista){
    let Centroid = {x:0 ,y:0};
    var sum_x = 0;
    var sum_y = 0;
    var counter = 0;
    for (let i = 0; i < points_lista.length; i++) {
        let point = points_lista[i];
        sum_x += point.x;
        sum_y += point.y;
        counter++;
    }

    Centroid.x = sum_x / counter;
    Centroid.y = sum_y / counter;

    return Centroid;
}

function get_points_and_centroid(HowManyPoints) {
    var points = [];
    for (var i = 0; i < HowManyPoints; i++) {
        points.push({
            x: Math.random() * 10,
            y: Math.random() * 10
        });
    }
    var centroid = get_centeroid(points)
    return {points:points, centroid:centroid};
}

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([
    am5themes_Animated.new(root)
]);

function is_it_away_enough(point, centroid, distance) {
    let ecluidean_distance = Math.sqrt(Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2));
    if (ecluidean_distance < distance) {
        // direction vector
        let directionX = point.x - centroid.x;
        let directionY = point.y - centroid.y;

        //Normalizing the direction vector , as i searched the normalization is the process of adjusting data to a coomon scale , and this can be done by scaling
        let magnitude = Math.sqrt(directionX ** 2 + directionY ** 2);
        directionX /= magnitude;
        directionY /= magnitude;

        // Moving the point to my specified threshold dist
        point.x = centroid.x + directionX * distance;
        point.y = centroid.y + directionY * distance;
    }

    return point;
}

function replicate_and_deviate_centroid(centroid, deviation = 2) {
    console.log("Math.Pi" , Math.PI);
    let angle1 = Math.random() * 2 * Math.PI; //  1st direction
    let angle2 = angle1 + Math.PI; // Opposite direction (180 degrees apart)
    console.log("angle1", angle1 , "angle2", angle2);
    return [
        {
            x: centroid.x + Math.cos(angle1) * deviation,
            y: centroid.y + Math.sin(angle1) * deviation,
        },
        {
            x: centroid.x + Math.cos(angle2) * deviation,
            y: centroid.y + Math.sin(angle2) * deviation,
        }
    ];
}

function assign_points_to_their_centroids(points, centroids) {
    let clusters = centroids.map(() => []); // Initialize clusters for each centroid

    for (let point of points) {
        let closest_centroid = centroids[0];
        let minDistance = Infinity;

        for (let i = 0; i < centroids.length; i++) {
            let centroid = centroids[i];
            let distance = Math.sqrt(Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2));
            if (distance < minDistance) {
                minDistance = distance;
                closest_centroid = centroid;
            }
        }

        // Find the index of the closest centroid and add the point to the corresponding cluster
        let index = centroids.indexOf(closest_centroid);
        clusters[index].push(point);
    }

    return clusters;
}

let used_colors = [];

function get_random_color(){
    const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]
    let hexColorRep = "#";
    for (let i = 0; i < 6; i++){
        const randomPosition = Math.floor ( Math.random() * hexCharacters.length )
        hexColorRep += hexCharacters[randomPosition];
    }
    if (hexColorRep  in used_colors){
        return get_random_color();
    }
    used_colors.push(hexColorRep);
    return hexColorRep
}
/* deprecated
function animate_centroid(color, targetted_point, starting_point, centroid_circle) {
    if (!centroid_circle) {
        centroid_circle = root.container.children.push(
            am5.Circle.new(root, {
                radius: 10,
                fill: am5.color(color),
                x: starting_point.x,
                y: starting_point.y
            })
        );
        total_used_centroids_circles.push(centroid_circle);
    }

    centroid_circle.animate({
        from: starting_point.y,
        key: "y",
        to: targetted_point.y,
        duration: 4000,
        easing: am5.ease.linear
    });
    centroid_circle.animate({
        from: starting_point.x,
        key: "x",
        to: targetted_point.x,
        duration: 4000,
        easing: am5.ease.linear
    });

    centroids_positions_after_last_movement.push({ index: animate_centroid_counter++, coordinates: targetted_point });
    console.log("targetted_point", animate_centroid_counter, targetted_point);
    console.log("animate_centroid_counter", animate_centroid_counter);
}
*/


let their_positions_after_movement = [];
let circles_objects = [];
/*
deprecated
let animate_centroid_counter = 0;
let total_used_centroids_circles = [];
let centroids_positions_after_last_movement = [];
*/


function createAnimation(points, centroid, easing, title, color , targetted_iteration_count) {
    points.forEach((point, index) => {
        var circle = root.container.children.push(
            am5.Circle.new(root, {
                radius: 5,
                fill: am5.color(color),
                x: point.x,
                y: point.y
            })
        );
        let going_to = is_it_away_enough(point, centroid, 1);
        going_to.y = going_to.y * 50;
        going_to.x = going_to.x * 50;

        circle.animate({
            from: centroid.y,
            key: "y",
            to: going_to.y,
            duration: 4000,
            easing: easing,
            delay: index * 200 // Stagger animations
        });
        circle.animate({
            from: centroid.x,
            key: "x",
            to: going_to.x,
            duration: 4000,
            easing: easing,
            delay: index * 200 // Stagger animations
        });
        circles_objects.push(circle);
        their_positions_after_movement.push(going_to);
    });

    let initial_centroid_location = get_centeroid(their_positions_after_movement);
    console.log("initial centroid location", initial_centroid_location);

    let iteration = 0;
    const MAX_ITERATIONS = targetted_iteration_count; // Number of splitting iterations desired

    // Create initial centroid circle
    let initial_circle = root.container.children.push(
        am5.Circle.new(root, {
            radius: 10,
            fill: am5.color(0xFFFFFF, 1),
            opacity: 1,  //opacity  100%
            x: initial_centroid_location.x,
            y: initial_centroid_location.y
        })
    );


    let current_centroids = [{
        point: initial_centroid_location,
        circle: initial_circle
    }];
    let current_colors = [color];

    function performIteration() {
        if (iteration >= MAX_ITERATIONS) return;

        let new_centroids = [];
        let new_colors = [];

        current_centroids.forEach((parent_centroid, index) => {

            let deviation = 100 / (iteration + 1);
            let [c1, c2] = replicate_and_deviate_centroid(parent_centroid.point, deviation);

            let color1 = get_random_color();
            let color2 = get_random_color();
            new_colors.push(color1, color2);

            let circle1 = root.container.children.push(
                am5.Circle.new(root, {
                    radius: 10,
                    fill: am5.color(color1),
                    x: parent_centroid.point.x,
                    y: parent_centroid.point.y
                })
            );

            let circle2 = root.container.children.push(
                am5.Circle.new(root, {
                    radius: 10,
                    fill: am5.color(color2),
                    x: parent_centroid.point.x,
                    y: parent_centroid.point.y
                })
            );


            circle1.animate({
                key: "x",
                to: c1.x,
                duration: 2000,
                easing: am5.ease.linear
            });
            circle1.animate({
                key: "y",
                to: c1.y,
                duration: 2000,
                easing: am5.ease.linear
            });

            circle2.animate({
                key: "x",
                to: c2.x,
                duration: 2000,
                easing: am5.ease.linear
            });
            circle2.animate({
                key: "y",
                to: c2.y,
                duration: 2000,
                easing: am5.ease.linear
            });
            //storing the generated centroids coordinates and their objects
            new_centroids.push({
                point: c1,
                circle: circle1
            }, {
                point: c2,
                circle: circle2
            });

            // removing parent centroid
            if (parent_centroid.circle) {
                parent_centroid.circle.set("visible", false);
                parent_centroid.circle.dispose();
            }
        });

        // updting clusters then moving centroids to cluster centers
        setTimeout(() => {
            // re-assigning points 2 newly generatd centroids
            let clusters = assign_points_to_their_centroids(
                their_positions_after_movement,
                new_centroids.map(c => c.point) //choosing only all the point dict in new_centroids
            );

            updateClusterColors(clusters, new_colors);


            clusters.forEach((cluster, index) => {
                if (cluster.length > 0) {
                    let cluster_centroid = get_centeroid(cluster);
                    let centroid_obj = new_centroids[index];

                    // moving centroid 2 new position
                    if (centroid_obj.circle) {
                        centroid_obj.circle.animate({
                            key: "x",
                            to: cluster_centroid.x,
                            duration: 2000,
                            easing: am5.ease.linear
                        });
                        centroid_obj.circle.animate({
                            key: "y",
                            to: cluster_centroid.y,
                            duration: 2000,
                            easing: am5.ease.linear
                        });
                        centroid_obj.point = cluster_centroid;
                    }
                }
            });

            current_centroids = new_centroids;
            current_colors = new_colors;
            iteration++;

            if (iteration < MAX_ITERATIONS) {
                setTimeout(performIteration, 4000);
            }
        }, 2000);
    }

    setTimeout(performIteration, 4500);
}



function updateClusterColors(clusters, colors) {
    clusters.forEach((cluster, clusterIndex) => {
        let cluster_color = colors[clusterIndex];
        cluster.forEach((point) => {
            for (let i = 0; i < their_positions_after_movement.length; i++) {
                let current_point = their_positions_after_movement[i];
                if (point.x === current_point.x && point.y === current_point.y) {
                    let circle = circles_objects[i];
                    circle.set("fill", am5.color(cluster_color));
                    break;
                }
            }
        });
    });
}


var { points, centroid } = get_points_and_centroid(50);
console.log("Starting Point Coordinates", centroid);
createAnimation(points, centroid, am5.ease.linear, "am5.ease.linear", get_random_color() , 3);