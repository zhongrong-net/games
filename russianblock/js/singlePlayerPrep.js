

var singlePlayerPrepState = {
	create: function(){
		console.log('触发');
		
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
		var curScore = 0;
		localStorage.setItem('tetrisScore', curScore.toString());

		var curScoreNum = 0
		localStorage.setItem('curScoreNum', curScoreNum.toString());

		
		var level = 1;
		localStorage.setItem('gmvolevel', level.toString());
		var lineCountGG = 0;
        localStorage.setItem('lineCountGG',lineCountGG.toString());

		game.state.start('play');
	}
};
