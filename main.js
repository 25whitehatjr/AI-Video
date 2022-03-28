video = "";
objects = [];
status = "";

function preload()
{
    video = createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas=createCanvas(500, 300);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 500, 300);
    if(status != ""){
        objectDetector.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected"
            document.getElementById("number").innerHTML = "Number of Objects Detected : " + objects.length;

            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}

function gotResults(error, results)
{
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}


function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model is Loaded.")
    status = true;
    video.loop();
    video.speed(2);
    video.volume(1);
}