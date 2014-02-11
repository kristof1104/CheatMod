var CheatModKristof1104 = {};
(function () {
	var new_date = 0;
	var perfectScores = false;
	var noBugsMode = false;
	var fastResearch = false;
	var showAllHints = false;
	
	var oldSetupNewGame = GameManager._setupNewGame;
	var newSetupNewGame = function(){
		oldSetupNewGame();
		GameManager.company.researchCompleted.push(Research.Sequels);
		GameManager.company.researchCompleted.push(Research.CasualGames);
	}
	GameManager._setupNewGame = newSetupNewGame;

	function removeNeedForVacationForStaff(){
			for(var i=0;i<GameManager.company.staff.length;i++){
				var character = GameManager.company.staff[i];
					character.flags.nextVacation = 2700 * (GameManager.SECONDS_PER_WEEK * 1E3);; // more then 40 years :)
					character.flags.needsVacation = false;
			}
	}
	
	function addDreamTeam(){
		if(GameManager.company.currentLevel == 4)
			GameManager.company.maxStaff = 7;
	
		for (var i=1;i<GameManager.company.maxStaff;i++){
		var skipCharacter = false;
			for(var j=0;j<GameManager.company.staff.length;j++){
				if(GameManager.company.staff[j].slot == i){
					skipCharacter = true;
					break;
				}
			}
			
			if(skipCharacter){
				continue;
			}
			
			var character = new Character({
                    id: GameManager.getGUID(),
                    name: "Cheater"+i,
                    dF: 2,
                    tF: 2,
                    speedF: 2,
                    qualityF: 1,
                    experience: LevelCalculator.getXpForLevel(10),
                    researchF: 2,
                    salary: 1,
                    efficiency: 1,
                    slot: i,
                    sex: ["male", "female"].pickRandom()
					});
				
					GameManager.setBodyAndHead(character);
					character.flags.hiredTimestamp = GameManager.gameTime;
					character.flags.nextVacation = GameManager.gameTime + 48E3 * GameManager.SECONDS_PER_WEEK;
					character.flags.workload = 0;
					character.maxBoostLevel = 3;
					character.boostLevel = 0;
					character.boostRechargeProgress = 1;
					UI._resetBoostUI();
					GameManager.company.staff.push(character);
					GameManager.uiSettings.findStaffData = null;
					VisualsManager.reloadAllCharacters();
					GameManager.company.staff[GameManager.company.staff.length - 1].startAnimations();
					VisualsManager.addComputer(character);
					VisualsManager.refreshHiringButtons();
					VisualsManager.refreshTrainingOverlays();
		}
		
		2 < GameManager.company.staff.length && GameManager.enableMediumContracts();
		UI.reset();
		
	}	
	
	function addBTeam(){
		if(GameManager.company.currentLevel == 4)
			GameManager.company.maxStaff = 7;
	
		for (var i=1;i<GameManager.company.maxStaff;i++){
		var skipCharacter = false;
			for(var j=0;j<GameManager.company.staff.length;j++){
				if(GameManager.company.staff[j].slot == i){
					skipCharacter = true;
					break;
				}
			}
			
			if(skipCharacter){
				continue;
			}
			
			var character = new Character({
                    id: GameManager.getGUID(),
                    name: "B Cheater"+i,
                    dF: 1.4,
                    tF: 1.4,
                    speedF: 1.4,
                    qualityF: 1.4,
                    experience: 700,
                    researchF: 1.4,
                    salary: 1,
                    efficiency: 1,
                    slot: i,
                    sex: ["male", "female"].pickRandom()
					});
				
					GameManager.setBodyAndHead(character);
					character.flags.hiredTimestamp = GameManager.gameTime;
					character.flags.nextVacation = GameManager.gameTime + 48E3 * GameManager.SECONDS_PER_WEEK;
					character.flags.workload = 0;
					GameManager.company.staff.push(character);
					GameManager.uiSettings.findStaffData = null;
					VisualsManager.reloadAllCharacters();
					GameManager.company.staff[GameManager.company.staff.length - 1].startAnimations();
					VisualsManager.addComputer(character);
					VisualsManager.refreshHiringButtons();
					VisualsManager.refreshTrainingOverlays();
		}
		
		2 < GameManager.company.staff.length && GameManager.enableMediumContracts();
		UI.reset();
		
	}
	
	function createProDeveloper(){
		var character = GameManager.company.staff[0];
        character.designFactor= 2;
        character.technologyFactor= 2;
        character.speedFactor= 2;
		character.qualityFactor= 1;
        character.experience= 10000;
        character.researchFactor= 2;
        character.efficiency= 1;
	}
	
	function moveToLevel4(){
	
		if(GameManager.company.gameLog.length == 0){
			GameManager.company.notifications.push(new Notification("CheatMod", "To continue to the final level, you need to have at least created game 1 game"));
			return
		}

		if(GameManager.company.currentLevel != 4){
		
			//add at least 1 staff member & at least 1 game
			if(GameManager.company.staff.length<2){
				GameManager.company.maxStaff = 7;
				
				var character = new Character({
                    id: GameManager.getGUID(),name: "Cheater1",dF: 2,
                    tF: 2,speedF: 2,qualityF: 1,experience: 10000,
                    researchF: 2,salary: 1,efficiency: 1,
                    slot: 2,sex: 1});
				
					GameManager.setBodyAndHead(character);
					character.flags.hiredTimestamp = GameManager.gameTime;
					character.flags.nextVacation = GameManager.gameTime + 48E3 * GameManager.SECONDS_PER_WEEK;
					character.flags.workload = 0;
					GameManager.company.staff.push(character);
					GameManager.uiSettings.findStaffData = null;
					VisualsManager.reloadAllCharacters();
					GameManager.company.staff[GameManager.company.staff.length - 1].startAnimations();
					VisualsManager.addComputer(character);
					VisualsManager.refreshHiringButtons();
					VisualsManager.refreshTrainingOverlays();
			}
			GameManager.company.currentLevel = 4,
			VisualsManager.nextLevel();
			Media.createLevel4Notifications();
			GameManager.save(GameManager.company.slot + "L4");
			GameManager.resume(true);
		}
		unlockRnDLab();
		unlockHwLab();
	}		
	
	function unlockHwLab(){
		if(! GameManager.company.flags.hwLabUnlocked){
			GameManager.company.flags.hwLabUnlocked = !0;
			GameManager.company.flags.hwBudget = 0;
			GameManager.company.flags.fractionalHwLabCosts = 0;
			GameManager.company.notifications.push(new Notification("Hardware lab".localize(), "Our hardware lab is ready.".localize()));
			Tutorial.hwLabReady(); 
			GameManager.pause(!0); 
			
			UI.fadeInTransitionOverlay(function () {
				VisualsManager.loadStage(!0);
				VisualsManager.refreshLabCrew();
				VisualsManager.updateProjectStatusCards();
				UI.fadeOutTransitionOverlay(function () {
					GameManager.resume(true)
				})
			});
			GameManager.resume(true);
		}
	}	
	
	function unlockRnDLab(){
		if(! GameManager.company.flags.rndLabUnlocked){
			GameManager.company.flags.rndLabUnlocked = !0;
			GameManager.company.flags.rndBudget = 0;
			GameManager.company.flags.fractionalRndLabCosts = 0;
			GameManager.company.notifications.push(new Notification("R&D lab".localize(), "Our R&D  lab is ready.".localize()))
			Tutorial.rndLabReady();
			GameManager.pause(!0);
			UI.fadeInTransitionOverlay(function () {
                VisualsManager.loadStage(!0);
                VisualsManager.refreshLabCrew();
                VisualsManager.updateProjectStatusCards();
                UI.fadeOutTransitionOverlay(function () {
                    GameManager.resume(true)
                })
            });
			GameManager.resume(true);
		}
	}	
	function addMoney(money){
		GameManager.company.adjustCash(money,"cheat mode " + money / 1000000 + "M");
	}	
	
	function setMoney(){
		var money = $("#moneyField").val();
		money = money.replace(/\./g,""); 
		
		if(isNaN(money))
			return;
	
		GameManager.company.cash = parseInt(money);
	}	
	
	function setFans(){
		var fans = $("#fansField").val();
		fans = fans.replace(/\./g,""); 
		
		if(isNaN(fans))
			return;
	
		GameManager.company.fans = parseInt(fans);
	}
	
	function addResearchPoints(){
		GameManager.company.researchPoints += 100;
		VisualsManager.researchPoints.updatePoints(GameManager.company.researchPoints); 
	}
	
	function addFans(fans){
		GameManager.company.fans += fans;
	}	
	
	function addHype(hype){
		GameManager.company.adjustHype(hype);
	}	
	
	function addAAAResearch(){
		if(GameManager.company.researchCompleted.indexOf(Research.MediumSizeGames) == -1){
			GameManager.company.notifications.push(new Notification("CheatMod", "To Add AAA games, you need to have medium games researched"));
			return;
		}
	
		if(-1 == GameManager.company.researchCompleted.indexOf(Research.AAA)){
			GameManager.company.researchCompleted.push(Research.AAA);
		}
	}		
	
	function addAllTopics(){
		GameManager.company.topics = [];
		GameManager.company.topics = GameManager.company.topics.concat([],Topics.topics);
	}

	var div = $("body");
	div.append('<div id="CheatContainer" class="windowBorder tallWindow" style="z-index: 5400;overflow:auto;display:none;"> <div id="cheatmodtop" class="windowTitle smallerWindowTitle">CheatMod</div>');
	div = $("#CheatContainer");
	div.append('<div id="moneylbl" style="margin-left:50px;width: 450px;" >Add Money</div>');
	div.append('<div id="money1M" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:50px;width: 104px;" >Add 1M</div>');
	div.append('<div id="money10M" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:0px;width: 103px;" >Add 10M</div>');
	div.append('<div id="money100M" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:0px;width: 103px;" >Add 100M</div>');
	div.append('<div id="money1B" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:0px;width: 104px;" >Add 1B</div>');
		
	div.append('<div id="fanslbl" style="margin-left:50px;width: 450px;" >Add Fans</div>');
	div.append('<div id="fans1M" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:50px;width: 142px;" >Add 1M</div>');
	div.append('<div id="fans10M" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:0px;width: 142px;" >Add 10M</div>');
	div.append('<div id="fans100M" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:0px;width: 142px;" >Add 100M</div>');
	
	div.append('<div id="hypelbl" style="margin-left:50px;width: 450px;" >Add Hype</div>');
	div.append('<div id="hype10" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:50px;width: 142px;" >Add 10</div>');
	div.append('<div id="hype50" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:0px;width: 142px;" >Add 50</div>');
	div.append('<div id="hype100" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:0px;width: 142px;" >Add 100</div>');
	
	div.append('<div id="research" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px;">Add Research Points (100pt)</div>');
	div.append('<div id="dreamteam" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;height: 100px;width: 450px">Fill open Team positions with 1337 Teammembers</div>');
	div.append('<div id="bteam" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;height: 100px;width: 450px">Fill open Team positions with B-Team Teammembers</div>');
	div.append('<div id="proDeveloper" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Turn your player into a 1337 developer</div>');
	div.append('<div id="generateNewTrend" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Generate random trend</div>');
	div.append('<div id="moveToLvl4" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Move To Final level</div>');
	div.append('<div id="AAAResearch" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:50px;width: 219px">Add AAA games</div>');
	div.append('<div id="addAllTopics" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Add All Topics</div>');
	div.append('<div id="removeNeedForVacationForStaff" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Remove need for staff vacation</div>');
	div.append('<div id="setPerfectScoreEnabled" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Activate Always have PerfectScores</div>');
	div.append('<div id="setNoBugsModeEnabled" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Activate No Bugs Mode</div>');
	div.append('<div id="setFastResearchModeEnabled" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Activate Fast Research Mode</div>');
	div.append('<div id="showAllHintsEnabled" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Activate show all hints Mode</div>');
	
	div.append('<div id="cheatmodLbl" class="windowTitle smallerWindowTitle">TechLevels</div>');
	div.append('<div id="cheatmodTechLevels"></div>');
	
	div.append('<div id="cheatmodLbl" class="windowTitle smallerWindowTitle">Modding</div><br>');
	div.append('set cash value to: <input id="moneyField" type="text" maxlength="35" style="width:170px;font-size: 22pt"/> ');
	div.append('<div id="setMoney" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:50px;width: 104px;" >SET</div>');
	div.append('<br>');	
	div.append('set fans value to: <input id="fansField" type="text" maxlength="35" style="width:170px;font-size: 22pt"/> ');
	div.append('<div id="setFans" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="display:inline-block;position: relative;margin-left:50px;width: 104px;" >SET</div>');
	div.append('<br>');

	div.append('<div id="cheatmodLbl" class="windowTitle smallerWindowTitle">Experimental!</div><br>');
	div.append('<div style="margin-left:50px;width: 450px">Move through time, only use this for mod development/testing!(Moving back in time can add double platforms, moving in the future should work fine!</div>');
	div.append('<div id="cheatmod_date" style="text-align:center;margin-left:50px;width: 450px"></div>');
	div.append('<div class="volumeSlider"></div>');
	div.append('<div id="moveToDate" class="selectorButton whiteButton" onclick="UI.pickCheatClick(this)" style="margin-left:50px;width: 450px">Move To Date</div>');
	
	UI.pickCheatClick = function (a) {
		Sound.click();
		switch (a.id) {
            case "money1M":
                addMoney(1000000);
				break;
            case "money10M":
                addMoney(10000000);
				break;
            case "money100M":
                addMoney(100000000);
				break;
            case "money1B":
                addMoney(1000000000);
				break;
            case "research":
                addResearchPoints();
				break;
            case "fans1M":
                addFans(1000000);
				break;
            case "fans10M":
                addFans(10000000);
				break;
            case "fans100M":
                addFans(100000000);
				break;
			case "dreamteam":
                addDreamTeam();
				break;			
			case "bteam":
                addBTeam();
				break;
			case "proDeveloper":
                createProDeveloper();
				break;
			case "moveToLvl4":
                moveToLevel4();
				break;
			case "AAAResearch":
                addAAAResearch();
				break;			
			case "SequelResearch":
                addSequelResearch();
				break;
			case "moveToDate":
                moveToDate();
				break;
			case "removeNeedForVacationForStaff":
                removeNeedForVacationForStaff();
				break;
			case "hype10":
                addHype(10);
				break;
			case "hype50":
                addHype(50);
				break;
			case "hype100":
                addHype(100);
				break;
			case "setPerfectScoreEnabled":
                setPerfectScoreEnabled();
				break;
			case "setNoBugsModeEnabled":
                setNoBugsModeEnabled();
				break;
			case "addAllTopics":
                addAllTopics();
				break;
			case "setFastResearchModeEnabled":
                setFastResearchEnabled();
				break;				
			case "showAllHintsEnabled":
                setShowAllHintsEnabled();
				break;			
			case "generateNewTrend":
                generateNewTrend();
				break;
			case "setMoney":
                setMoney();
				break;
			case "setFans":
                setFans();
				break;
            default:
                return;
            }
	}
	
	function moveToDate(){
		GameManager.gameTime = new_date * (GameManager.SECONDS_PER_WEEK * 1E3);
		//GameManager.company.currentWeek = GameManager.gameTime;
		General.proceedOneWeek(GameManager.company,new_date);
	}	
	
	function setDate(d){
		new_date = d
		
		 var a = Math.floor(d) % 4 + 1;
		 var c = Math.floor(d) / 4;
         var b = c / 12 + 1;
         var year = Math.floor(b);
         var month = Math.floor(c % 12 + 1);
         var week = Math.floor(a);
        
		var div = $("#CheatContainer");
		div.find("#cheatmod_date").html("Y" + year + " M" + month  + " W" + week);
	}	
	
	var original_showContextMenu = UI._showContextMenu;
	var new_showContextMenu = function(b, c, d, h){
	
		if(b == "competitorMod"){
		}else{
			c.push({
					label: "CheatMode...",
					action: function () {
						Sound.click();
						GameManager.resume(true);
						
						generateTechLevelScreen();	
						var div = $("#CheatContainer");
						div.scrollTop()
						$("#CheatContainer").css("z-index","5400");
						div.gdDialog({
								popout: !0,
								close: !0,
								onClose : function () {
									var div = $("#cheatmodTechLevels");
									div.empty();
								}
						})
					}
				})

				div.animate({
					scrollTop: $("#cheatmodtop").offset().top
				}, 2000);
				
				//set current cash & fans textFields
				div.find("#moneyField").val(UI.getLongNumberString(GameManager.company.cash));
				div.find("#fansField").val(UI.getLongNumberString(GameManager.company.fans));
				
				//test slider
				div.find(".volumeSlider").slider({
				min: 0,
				max: 2160,
				range: "min",
				value: Math.floor(GameManager.company.currentWeek),
				animate: !1,
				slide: function (a, b) {
					var c = b.value;
					setDate(c);
				}
				
				
			});
			setDate(GameManager.company.currentWeek);
		}
		original_showContextMenu(b, c, d, h);
	};
	UI._showContextMenu = new_showContextMenu
	
	
	//always perfect scores easy way
	var getPerfectScoreComment = function(hasPerfectScore){
		if(hasPerfectScore == false){
			return ["A masterpiece.".localize(), "Best of its kind.".localize(), "Truly great.".localize(), "Everyone loves it!".localize(), "Must have!".localize(), "Outstanding achievement.".localize(), "Awesome!".localize(), "My new favorite!".localize()].pickRandom();
		}else{
			return ["11 out of 10. Game of the year, any year!".localize(), "11 out of 10. Nuff said.".localize(), "11 out of 10. A exceptional score for an exceptional game.".localize(), "11 out of 10. Rules don't apply to this outstanding game.".localize()].pickRandom();
		}
	}
	
	var setPerfectScores = function (e) {
		e.reviews[0].score = 10;
		e.reviews[0].message = getPerfectScoreComment(false);
		e.reviews[1].score = 10;
		e.reviews[1].message = getPerfectScoreComment(false);
		e.reviews[2].score = 10;
		e.reviews[2].message = getPerfectScoreComment(false);
		
		var r = GameManager.company.getRandom();
		if (r >= 0.7) {
			e.reviews[3].score = 11;
			e.reviews[3].message = getPerfectScoreComment(true);
		}else{
			e.reviews[3].score = 10;
			e.reviews[3].message = getPerfectScoreComment(false);
		}

		e.game.score = 10;
	};
	
	var setPerfectScoreEnabled = function(){
		if(perfectScores){
			GDT.off(GDT.eventKeys.gameplay.afterGameReview, setPerfectScores);
			var div = $("#CheatContainer");
			div.find("#setPerfectScoreEnabled").html("Activate Always have PerfectScores");
			perfectScores = false;
		}else{
			GDT.on(GDT.eventKeys.gameplay.afterGameReview, setPerfectScores);
			var div = $("#CheatContainer");
			div.find("#setPerfectScoreEnabled").html("Deactivate Always have PerfectScores");
			perfectScores = true;
		}
	}
	
	//remove bugs
	var old_updateCharacters = GameManager.updateCharacters;
	var new_updateCharacters = function(){
		if(noBugsMode && typeof GameManager.company.currentGame != 'undefined' && GameManager.company.currentGame != null){
			GameManager.company.currentGame.bugs = 0;
		}
		old_updateCharacters();
		if(noBugsMode && typeof GameManager.company.currentGame != 'undefined' && GameManager.company.currentGame != null){
			GameManager.company.currentGame.bugs = 0;
		}
	}
	GameManager.updateCharacters = new_updateCharacters
	
	var setNoBugsModeEnabled = function(){
		if(noBugsMode){
			var div = $("#CheatContainer");
			div.find("#setNoBugsModeEnabled").html("Activate No Bugs Mode");
			noBugsMode = false;
		}else{
			var div = $("#CheatContainer");
			div.find("#setNoBugsModeEnabled").html("Deactivate No Bugs Mode");
			noBugsMode = true;
		}
	}
	
	//instant research
	var old_increaseResearchProgress = GameManager.increaseResearchProgress;
	var new_increaseResearchProgress = function(researcher, progress){
		if(typeof researcher.currentResearch != 'undefined' && researcher.currentResearch != null && researcher.currentResearch.type == "training"){
			old_increaseResearchProgress(researcher, progress);
		}else{
			if(fastResearch){
				var researchTemp = GameManager.currentResearches.first(function (c) {
					return c.staffId === researcher.id
				});
				if (GameManager.currentFeature || GameManager.currentEngineDev)
						GameManager.finishResearch(researcher, researchTemp);
					else
						researcher.endWorking();
			}else{
				old_increaseResearchProgress(researcher, progress);
			}		
		}
	}
	GameManager.increaseResearchProgress = new_increaseResearchProgress

	var setFastResearchEnabled = function(){
		if(fastResearch){
			var div = $("#CheatContainer");
			div.find("#setFastResearchModeEnabled").html("Activate Fast Research Mode");
			fastResearch = false;
		}else{
			var div = $("#CheatContainer");
			div.find("#setFastResearchModeEnabled").html("Deactivate Fast Research Mode");
			fastResearch = true;
		}
	}
	
	//generate trend
	var generateNewTrend = function () {
		if (GameManager.company.currentLevel == 1){
			GameManager.company.notifications.push(new Notification("CheatMod", "Can not generate a trend in the first level(garage). Please move to the next level."));
			return;
		}

		if(typeof GameManager.company.flags.trends != 'undefined' && GameManager.company.flags.trends != null){
			GameManager.company.flags.trends = {};
		}
		GameManager.company.flags.trends.currentTrend = null;

		do
		{
			GameManager.company.flags.trends.expireBy = GameManager.gameTime-1;
			GameTrends.updateTrends(GameManager.company);
		}
		while (GameManager.company.flags.trends.currentTrend == null);
	}
	
	//techlevels
	var xpItems = [];
	var generateTechLevelScreen = function () {
		xpItems = [];
		var game = GameManager.company.gameLog.last();
		
		if(typeof game == 'undefined' || game == null){
			var div = $("#cheatmodTechLevels");
			div.append('Requirement: Need at least 1 released game');
			return;
		}
		
		var selectedGameFeatures = game.features;
		for (var i = 0; i < game.featureLog.length; i++) {
			var mission = game.featureLog[i];
			if (mission.missionType != "mission")
				continue;
				
			var feature = General.getMission(mission.id);

			var gain = 0;
			var item = {
				originalItem : feature,
				name : feature.name,
				level : LevelCalculator.getLevel(feature.experience),
				progress : LevelCalculator.getProgressToNextLevel(feature.experience),
				xpGain : gain,
				progressColor : "orange",
				progressGainColor : "#FFC456"
			};
			xpItems.push(item);	
		}
		
		var allFeatures = GameManager.company.features;
		for (var i = 0; i < allFeatures.length; i++) {
			var feature = allFeatures[i];
			if (!feature.showXPGain)
				continue;

			var gain = 0;
			var item = {
				originalItem : feature,
				name : feature.name,
				level : LevelCalculator.getLevel(feature.experience),
				progress : LevelCalculator.getProgressToNextLevel(feature.experience),
				xpGain : gain,
				progressColor : "orange",
				progressGainColor : "#FFC456"
			};
			xpItems.push(item);
		}
		
		var div = $("#cheatmodTechLevels");
		div.empty()
		var featureElementTemplate = $(".releaseGameFeatureTemplate");
		for (var i = 0; i < xpItems.length; i++) {
			var element = featureElementTemplate.clone();
			
			div.append(element);
			element.append('<div id="featureTechLvl" class="selectorButton whiteButton" onclick="CheatModKristof1104.addTechLevel({0})" style="display:inline-block;position: relative;margin: 0px;top:3px;line-height: 20px;height:22px;width: 22px;" >+</div>'.format(i));

			element.css("font-size", 12 + "pt");

			var item = xpItems[i];
			(function (element, item) {
				element.find(".featureName").text(item.name);
				element.find(".featureLevel").text("Lvl. ".localize() + item.level);
				var featureLevelUp = element.find(".featureLevelUp");
				featureLevelUp.hide();
				element.find(".featureProgress").css({
					width : item.progress - 1 + "%"
				}).css({
					"background-color" : item.progressColor
				});
				var featureGain =
					element.find(".featureProgressGain").css({
						"background-color" : item.progressGainColor
					});
				featureGain["css_width_percent"] = 0;
				var featureGainCaption = element.find(".featureGainCaption");
				featureGainCaption["klug_number_int_text"] = 0;
				
			})(element, item)
		}
	}
	
	CheatModKristof1104.addTechLevel = function(i){
		var feature = xpItems[i];
		var xpNeeded = LevelCalculator.getXpToNextLevel(feature.originalItem.experience);
		var lvl = LevelCalculator.getLevel(feature.originalItem.experience);
		var baseXp = LevelCalculator.getXpForLevel(lvl);
		xpNeeded -= baseXp;
		feature.originalItem.experience += xpNeeded;
		generateTechLevelScreen();
	}

	//Add Tech and design points during game dev
	CheatModKristof1104.addTechAndDesignPointsButtons = function(){
		var div = $("#canvasContainer");
		var designButton = $('<div id="cheatModDesignPoints" class="selectorButton " style="background-color: orange;position:absolute;line-height: 25px;height:30px;width: 30px; opacity=0;-webkit-border-radius: 999px;-moz-border-radius: 999px;border-radius: 999px;behavior: url(PIE.htc);">' + "+" + "</div>");
		var techButton = $('<div id="cheatModTechPoints" class="selectorButton " style="background-color: deepskyblue;position:absolute;line-height: 25px;height:30px;width: 30px; opacity=0;-webkit-border-radius: 999px;-moz-border-radius: 999px;border-radius: 999px;behavior: url(PIE.htc);">' + "+" + "</div>");
		var designButton100 = $('<div id="cheatModDesignPoints100" class="selectorButton " style="background-color: orange;position:absolute;line-height: 35px;height:40px;width: 40px; opacity=0;-webkit-border-radius: 999px;-moz-border-radius: 999px;border-radius: 999px;behavior: url(PIE.htc);">' + "+" + "</div>");
		var techButton100 = $('<div id="cheatModTechPoints100" class="selectorButton " style="background-color: deepskyblue;position:absolute;line-height: 35px;height:40px;width: 40px; opacity=0;-webkit-border-radius: 999px;-moz-border-radius: 999px;border-radius: 999px;behavior: url(PIE.htc);">' + "+" + "</div>");
		var research = $('<div id="cheatModAddResearch" class="selectorButton " style="background-color: #006AFF;color:white;position:absolute;line-height: 25px;height:30px;width: 30px; opacity=0;-webkit-border-radius: 999px;-moz-border-radius: 999px;border-radius: 999px;behavior: url(PIE.htc);">' + "+" + "</div>");
		div.append(designButton);
		div.append(techButton);		
		div.append(designButton100);
		div.append(techButton100);
		div.append(research);
		$("#cheatModDesignPoints").css("left",VisualsManager.gameStatusBar.x + VisualsManager.gameStatusBar.designPoints.x -14);
		$("#cheatModDesignPoints").css("top",VisualsManager.gameStatusBar.y + VisualsManager.gameStatusBar.designPoints.y + 82);
		$("#cheatModDesignPoints").click (function () {
				CheatModKristof1104.addTechAndDesignPoints(true);
				return false;
		});
		$("#cheatModTechPoints").css("left",VisualsManager.gameStatusBar.x + VisualsManager.gameStatusBar.technologyPoints.x -14);
		$("#cheatModTechPoints").css("top",VisualsManager.gameStatusBar.y + VisualsManager.gameStatusBar.technologyPoints.y + 82);
		$("#cheatModTechPoints").click (function () {
				CheatModKristof1104.addTechAndDesignPoints(false);
				return false;
		});		
		$("#cheatModDesignPoints100").css("left",VisualsManager.gameStatusBar.x + VisualsManager.gameStatusBar.designPoints.x +16);
		$("#cheatModDesignPoints100").css("top",VisualsManager.gameStatusBar.y + VisualsManager.gameStatusBar.designPoints.y + 82);
		$("#cheatModDesignPoints100").click (function () {
				CheatModKristof1104.addTechAndDesignPoints(true,true);
				return false;
		});
		$("#cheatModTechPoints100").css("left",VisualsManager.gameStatusBar.x + VisualsManager.gameStatusBar.technologyPoints.x + 16);
		$("#cheatModTechPoints100").css("top",VisualsManager.gameStatusBar.y + VisualsManager.gameStatusBar.technologyPoints.y + 82);
		$("#cheatModTechPoints100").click (function () {
				CheatModKristof1104.addTechAndDesignPoints(false,true);
				return false;
		});		
		$("#cheatModAddResearch").css("left", VisualsManager.researchPoints.x );
		$("#cheatModAddResearch").css("top", VisualsManager.researchPoints.y + 72);
		$("#cheatModAddResearch").click (function () {
				addResearchPoints();
				return false;
		});
	}	
	
	CheatModKristof1104.addTechAndDesignPoints = function(design,addBy100){
		if(!GameManager.company.isCurrentlyDevelopingGame())
			return;
		
		var game = GameManager.company.currentGame;
		
		if(typeof addBy100 != 'undefined' && addBy100 != null){
			if(design){
			game.designPoints += 100;
			}else{
				game.technologyPoints += 100;
			}
		}else{
			if(design){
			game.designPoints += 10;
			}else{
				game.technologyPoints += 10;
			}
		}
		VisualsManager.updatePoints();
	}
	
	var designAndTechAdded = false;
	var initTechAndDesignButtons = function(data){
		if(designAndTechAdded == false){
			CheatModKristof1104.addTechAndDesignPointsButtons();	
			designAndTechAdded = true;
		}
	}
	GDT.on(GDT.eventKeys.gameplay.weekProceeded,initTechAndDesignButtons);
	
	
	//knowledge
	var old_hasComboKnowledge = Knowledge.hasComboKnowledge;
	var new_hasComboKnowledge = function(company, game, source){
		if(showAllHints){
			return true;
		}else{
			return old_hasComboKnowledge(company, game, source);
		}		
	}
	Knowledge.hasComboKnowledge = new_hasComboKnowledge;	
	
	var old_hasTrainingKnowledge = Knowledge.hasTrainingKnowledge;
	var new_hasTrainingKnowledge = function(training){
		if(showAllHints){
			return true;
		}else{
			return old_hasTrainingKnowledge(training);
		}		
	}
	Knowledge.hasTrainingKnowledge = new_hasTrainingKnowledge;		
	
	var old_hasMissionWeightingKnowledge = Knowledge.hasMissionWeightingKnowledge;
	var new_hasMissionWeightingKnowledge = function(company, mission, game, ignoreTopic, source){
		if(showAllHints){
			return true;
		}else{
			return old_hasMissionWeightingKnowledge(company, mission, game, ignoreTopic, source);
		}		
	}
	Knowledge.hasMissionWeightingKnowledge = new_hasMissionWeightingKnowledge;	

	var old_getPlatformGenreWeightingKnowledge = Knowledge.getPlatformGenreWeightingKnowledge;
	var new_getPlatformGenreWeightingKnowledge = function(company, platform){
		if(showAllHints){
			var match = {id : platform.id};
			match["genreWeightings"] = [0, 0, 0, 0, 0, 0];
			match["genreWeightings"] = platform.genreWeightings
			return match["genreWeightings"];
		}else{
			return old_getPlatformGenreWeightingKnowledge(company, platform);
		}		
	}
	Knowledge.getPlatformGenreWeightingKnowledge = new_getPlatformGenreWeightingKnowledge;
	
	var old_getPlatformAudienceWeightingKnowledge = Knowledge.getPlatformAudienceWeightingKnowledge;
	var new_getPlatformAudienceWeightingKnowledge = function(company, platform){
		if(showAllHints){
			var match = {id : platform.id};
			match["audienceWeightings"] = [0, 0, 0];
			var weighting1 = Platforms.getAudienceWeighting([platform], "young", true);
			var weighting2 = Platforms.getAudienceWeighting([platform], "everyone", true);
			var weighting3 = Platforms.getAudienceWeighting([platform], "mature", true);

			match["audienceWeightings"][0] = weighting1;
			match["audienceWeightings"][1] = weighting2;
			match["audienceWeightings"][2] = weighting3;
			
			return match["audienceWeightings"];
		}else{
			return old_getPlatformAudienceWeightingKnowledge(company, platform);
		}		
	}
	Knowledge.getPlatformAudienceWeightingKnowledge = new_getPlatformAudienceWeightingKnowledge;	

	var old_getTopicAudienceWeightingKnowledge = Knowledge.getTopicAudienceWeightingKnowledge;
	var new_getTopicAudienceWeightingKnowledge = function(company, topic, audience, target){
		if(showAllHints){
			var match = {id : topic.id};
			match["audienceWeightings"] =[0, 0, 0];
			var weighting1 = General.getAudienceWeighting(topic.audienceWeightings, "young");
			var weighting2 = General.getAudienceWeighting(topic.audienceWeightings, "everyone");
			var weighting3 = General.getAudienceWeighting(topic.audienceWeightings, "mature");

			match["audienceWeightings"][0] = weighting1;
			match["audienceWeightings"][1] = weighting2;
			match["audienceWeightings"][2] = weighting3;
			
			return match["audienceWeightings"];
		}else{
			return old_getTopicAudienceWeightingKnowledge(company, topic, audience, target);
		}		
	}
	Knowledge.getTopicAudienceWeightingKnowledge = new_getTopicAudienceWeightingKnowledge;
	

	var setShowAllHintsEnabled = function(){
		if(showAllHints){
			var div = $("#CheatContainer");
			div.find("#showAllHintsEnabled").html("Activate show all hints Mode");
			showAllHints = false;
		}else{
			var div = $("#CheatContainer");
			div.find("#showAllHintsEnabled").html("Deactivate show all hints Mode");
			showAllHints = true;
		}
	}
	
})();