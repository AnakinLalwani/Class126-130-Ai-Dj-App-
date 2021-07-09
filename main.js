song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 500, 400);
    fill("#FF0000");
    stroke("#FF0000");
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        inNumberLeftWrist = Number(leftWristY);
        remove_decimal = floor(inNumberLeftWrist);
        volume = remove_decimal/400;
        song.setVolume(volume);
        document.getElementById("volumedisplay").innerHTML = "Volume: " + volume;
    }
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 80) {
            document.getElementById("speeddisplay").innerHTML = "Speed: 0.5";
            song.rate(0.5);
        } else if (rightWristY > 80 && rightWristY <= 160) {
            document.getElementById("speeddisplay").innerHTML = "Speed: 1.0";
            song.rate(1.0);
        } else if (rightWristY > 160 && rightWristY <= 240) {
            document.getElementById("speeddisplay").innerHTML = "Speed: 1.5";
            song.rate(1.5);
        } else if (rightWristY > 240 && rightWristY <= 320) {
            document.getElementById("speeddisplay").innerHTML = "Speed: 2.0";
            song.rate(2.0);
        } else if (rightWristY > 320) {
            document.getElementById("speeddisplay").innerHTML = "Speed: 2.5";
            song.rate(2.5);
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1)
}

function modelLoaded() {
    console.log("Model is Loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("left x: " + leftWristX + " left y: " + leftWristY);
        console.log("right x: " + rightWristX + " right y: " + rightWristY);
    }
}
