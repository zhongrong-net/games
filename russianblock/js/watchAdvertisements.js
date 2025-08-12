
var watchAdvertisementsState = {
	create: function(){

		gameover = false;
		
		var curScoreNum;
	
		var curScoreNumHq = localStorage.getItem('curScoreNum');
		console.log('分数',curScoreNumHq);
		
		curScoreNum = curScoreNumHq ? parseInt(curScoreNumHq) : 0;

		

		


        // var tongg = true
		// localStorage.setItem('tongg', tongg.toString());

        console.log('执行',curScoreNum);
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

				if(!nowPlaying){
					board = [
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
						[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
					];
		
					boardDisplay = [
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
						[,,,,,,,,,],
					];
					nextWindow = [
						[,,],
						[,,],
						[,,],
						[,,],
						[,,],
						[,,],
						[,,],
						[,,],
						[,,],
						[,,],
						[,,],
						[,,] 
					];
		
					holdWindow = [
						[,,],
						[,,],
						[,,],
						[,,] 
					];
					gameover = false;
					softDrop = false;
					hardDrop = false;
					hardDropLock = false;
					cleaningLines = false;
					waitingLineClear = false;
					holdLock = false;
					lineCount = 0;
					speedUpGoal = 10;
					curCombo = 0;
					curScore = 0;
					level = 1;
					tickInterval = 500;
					lastValidMoveWasASpin = false;
					userKeys = loadUserKeys();
				}
				
			
				   
				   // 隐藏模态框和按钮
				   if (customModal) customModal.style.display = 'none';

				   var curScore = 0;

				   localStorage.setItem('tetrisScore', curScore.toString());

				   var level = 1;
				   localStorage.setItem('gmvolevel', level.toString());
				   var lineCountGG = 0;
                    localStorage.setItem('lineCountGG',lineCountGG.toString());
				   
				   // 重新开始游戏
				   game.state.start('play');
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

				if (curScoreNum<2) {
					curScoreNum += 1

					localStorage.setItem('curScoreNum', curScoreNum.toString());

					if(!nowPlaying){
						board = [
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
							[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
						];
			
						boardDisplay = [
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
							[,,,,,,,,,],
						];
						nextWindow = [
							[,,],
							[,,],
							[,,],
							[,,],
							[,,],
							[,,],
							[,,],
							[,,],
							[,,],
							[,,],
							[,,],
							[,,] 
						];
			
						holdWindow = [
							[,,],
							[,,],
							[,,],
							[,,] 
						];
						gameover = false;
						softDrop = false;
						hardDrop = false;
						hardDropLock = false;
						cleaningLines = false;
						waitingLineClear = false;
						holdLock = false;
						lineCount = 0;
						speedUpGoal = 10;
						curCombo = 0;
						curScore = 0;
						level = 1;
						tickInterval = 500;
						lastValidMoveWasASpin = false;
						userKeys = loadUserKeys();
					}

						   
						   customModal.style.display = 'none';
						   restartButton.style.display = 'none';
						   game.state.start('play');










					
				}else{

					alert('次数以用完！')
				}
		
					 
			  
		
			   };
		   }
        
		
	
		// game.state.start('play');
	}
};
