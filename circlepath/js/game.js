var game;

var numSan = 0
var stepsSU= 0;
var ballDistance = 120;
var rotationSpeed = 4;
var angleRange = [25, 155];
var visibleTargets = 7;
var bgColors = [0x62bd18, 0xffbb00, 0xff5300, 0xd21034, 0xff475c, 0x8f16b2];

window.onload = function() {	
    game = new Phaser.Game(640, 960, Phaser.CANVAS, "gameCanvas");
    game.state.add("PlayGame", playGame);
    game.state.start("PlayGame");
}

var playGame = function(game){};

playGame.prototype = {
    preload: function(){
        game.load.image("ball", "assets/ball.png");
        game.load.image("target", "assets/target.png");
        game.load.image("arm", "assets/arm.png");
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },
    create: function(){
        this.savedData = localStorage.getItem("circlepath")==null?{score:0}:JSON.parse(localStorage.getItem("circlepath"));
        var style = {
            font: "bold 64px Arial",
            fill: "#ffffff"
        };
        // this.savedData.score = 10;
        var text = game.add.text(0, game.height - 64, "最高分: "+this.savedData.score.toString(), style);
        this.destroy = false;
        this.saveRotationSpeed = rotationSpeed;
        this.tintColor = bgColors[game.rnd.between(0, bgColors.length - 1)];
        do{
            this.tintColor2 = bgColors[game.rnd.between(0, bgColors.length - 1)];     
        } while(this.tintColor == this.tintColor2)
        game.stage.backgroundColor = this.tintColor;
        this.targetArray = [];
        this.steps = stepsSU;
        this.rotatingDirection = game.rnd.between(0, 1);
        this.gameGroup = game.add.group();
        this.targetGroup = game.add.group();
        this.ballGroup = game.add.group();
        this.gameGroup.add(this.targetGroup);
        this.gameGroup.add(this.ballGroup);
        this.arm = game.add.sprite(game.width / 2, game.height / 4 * 2.7, "arm");
        this.arm.anchor.set(0, 0.5);
        this.arm.tint = this.tintColor2;
        this.ballGroup.add(this.arm);
        this.balls = [
            game.add.sprite(game.width / 2, game.height / 4 * 2.7, "ball"),
            game.add.sprite(game.width / 2, game.height / 2, "ball")                   
        ]
        this.balls[0].anchor.set(0.5);
        this.balls[0].tint = this.tintColor2;
        this.balls[1].anchor.set(0.5);
        this.balls[1].tint = this.tintColor2;
        this.ballGroup.add(this.balls[0]);
        this.ballGroup.add(this.balls[1]);
        this.rotationAngle = 0;
        this.rotatingBall = 1;
        var target = game.add.sprite(0, 0, "target");
        target.anchor.set(0.5);
        target.x = this.balls[0].x;
        target.y = this.balls[0].y;
        this.targetGroup.add(target);   
        this.targetArray.push(target);      
        game.input.onDown.add(this.changeBall, this);
        for(var i = 0; i < visibleTargets; i++){
            this.addTarget(); 
        }
    },
    update: function(){
        var distanceFromTarget = this.balls[this.rotatingBall].position.distance(this.targetArray[1].position);
        if(distanceFromTarget > 90 && this.destroy && this.steps > visibleTargets){
            this.gameOver();
        }
        if(distanceFromTarget < 40 && !this.destroy){
            this.destroy = true;
        }
        this.rotationAngle = (this.rotationAngle + this.saveRotationSpeed * (this.rotatingDirection * 2 - 1)) % 360;
        this.arm.angle = this.rotationAngle + 90;
        this.balls[this.rotatingBall].x = this.balls[1 - this.rotatingBall].x - ballDistance * Math.sin(Phaser.Math.degToRad(this.rotationAngle));
        this.balls[this.rotatingBall].y = this.balls[1 - this.rotatingBall].y + ballDistance * Math.cos(Phaser.Math.degToRad(this.rotationAngle));
        var distanceX = this.balls[1 - this.rotatingBall].worldPosition.x - game.width / 2;
        var distanceY = this.balls[1 - this.rotatingBall].worldPosition.y - game.height / 4 * 2.7;
        this.gameGroup.x = Phaser.Math.linearInterpolation([this.gameGroup.x, this.gameGroup.x - distanceX], 0.05);
        this.gameGroup.y = Phaser.Math.linearInterpolation([this.gameGroup.y, this.gameGroup.y - distanceY], 0.05);                   
    },
    changeBall:function(){
        this.destroy = false;
        var distanceFromTarget = this.balls[this.rotatingBall].position.distance(this.targetArray[1].position);
        if(distanceFromTarget < 20){
            this.rotatingDirection = game.rnd.between(0, 1);
            var detroyTween = game.add.tween(this.targetArray[0]).to({
                alpha: 0
            }, 500, Phaser.Easing.Cubic.In, true);
            detroyTween.onComplete.add(function(e){
                e.destroy();
            })
            this.targetArray.shift();
            this.arm.position = this.balls[this.rotatingBall].position;
            this.rotatingBall = 1 - this.rotatingBall;
            this.rotationAngle = this.balls[1 - this.rotatingBall].position.angle(this.balls[this.rotatingBall].position, true) - 90;
            this.arm.angle = this.rotationAngle + 90; 
            for(var i = 0; i < this.targetArray.length; i++){
                this.targetArray[i].alpha += 1 / 7;  
            }      
            this.addTarget();
        }
        else{
            this.gameOver();
        }   
    },
    addTarget: function(){
        this.steps++;
        startX = this.targetArray[this.targetArray.length - 1].x;
        startY = this.targetArray[this.targetArray.length - 1].y;          
        var target = game.add.sprite(0, 0, "target");
        var randomAngle = game.rnd.between(angleRange[0] + 90, angleRange[1] + 90);
        target.anchor.set(0.5);
        target.x = startX + ballDistance * Math.sin(Phaser.Math.degToRad(randomAngle));
        target.y = startY + ballDistance * Math.cos(Phaser.Math.degToRad(randomAngle));
        target.alpha = 1 - this.targetArray.length * (1 / 7);
        var style = {
            font: "bold 32px Arial",
            fill: "#" + this.tintColor.toString(16),
            align: "center"
        };
        var text = game.add.text(0, 0, this.steps.toString(), style);
        text.anchor.set(0.5);
        target.addChild(text);
        this.targetGroup.add(target);   
        this.targetArray.push(target);      
    },
    gameOver: function(){

       
       

  


         console.log('this.steps - visibleTargets',this.steps - visibleTargets);
         
        var csFs = this.steps - visibleTargets

        console.log('分数1', csFs);
        localStorage.setItem("circlepath",JSON.stringify({
            score: Math.max(this.savedData.score, this.steps - visibleTargets)
        }));
        game.input.onDown.remove(this.changeBall, this);
        this.saveRotationSpeed = 0;
        this.arm.destroy();
        var gameOverTween = game.add.tween(this.balls[1 - this.rotatingBall]).to({
            alpha: 0
        }, 1000, Phaser.Easing.Cubic.Out, true);
        gameOverTween.onComplete.add(function() {
            // Show custom modal
            var customModal = document.getElementById('customModal');
            var videoPlayer = document.getElementById('videoPlayer');
            var restartButton = document.getElementById('restartButton');
            var resetButton = document.getElementById('resetButton'); // 继续
            var currentScore = document.getElementById('currentScore'); //重新开始按钮
            // currentScore.textContent = '当前分数 ' + this.savedData.score + 's';
            console.log('currentScore');
            
            customModal.style.display = 'block';
         
            // 确保所有按钮都隐藏（除了可能一直显示的按钮）
            if (restartButton) restartButton.style.display = 'block';
            if (resetButton) resetButton.style.display = 'block'; // 显示重新开始按钮
         
            // 添加事件监听器给重新开始按钮
            if (resetButton) {
                resetButton.onclick = function() {
                    // 重置游戏数据
                    stepsSU = 0;
                    numSan = 0;
                    localStorage.setItem("circlepath", JSON.stringify({ score: 0 }));
                    
                    // 隐藏模态框和按钮
                    if (customModal) customModal.style.display = 'none';
                    
                    // 重新开始游戏
                    game.state.start("PlayGame");
                };
            }
         
            // 监听视频时间更新事件
            if (videoPlayer && restartButton ) {
                videoPlayer.addEventListener('timeupdate', function() {
                    var remainingTime = Math.ceil(videoPlayer.duration - videoPlayer.currentTime);
                    if (restartButton) {
                        restartButton.textContent = '继续游戏 ' + remainingTime + 's';
                        if (remainingTime <= 0 ) {
                           
                            
                            restartButton.disabled = false; // 启用按钮
                        } else {
                            restartButton.disabled = true; // 禁用按钮
                        }
                    }
                });
            }
         
            // 监听视频结束事件
            if (videoPlayer && restartButton) {
                videoPlayer.addEventListener('ended', function() {
                    if (restartButton) {
                        restartButton.disabled = false; // 确保在视频结束时启用按钮
                        restartButton.textContent = '继续游戏 0s';
                    }
                });
            }
         
            // 每次显示模态框时，重置视频并播放
            if (videoPlayer) {
                videoPlayer.currentTime = 0; // 重置视频到开始
                videoPlayer.play().catch(error => {
                    console.error('Autoplay failed:', error);
              
                });
            }
         
            // 原有重启按钮逻辑（如果需要保留）
            if (restartButton) {
                restartButton.onclick = function() {
                    if (numSan < 1) {
                        this.savedData = localStorage.getItem("circlepath") == null ? 
                                         { score: 0 } : 
                                         JSON.parse(localStorage.getItem("circlepath"));
                                         
                        // if(this.steps - visibleTargets>0){
                        //     stepsSU =this.savedData.score
                        //     console.log('stepsSU ',stepsSU );
                            
                        // }else{
                        //     stepsSU = 0
                        // }
                    
                        console.log('分数', csFs);
                        
                        stepsSU = csFs
                        numSan += 1;
                        
                        customModal.style.display = 'none';
                        restartButton.style.display = 'none';
                        game.state.start("PlayGame");
                    } else {
                        alert('看广告次数用完！');
                    }
                };
            }
        }, this);
    }
}