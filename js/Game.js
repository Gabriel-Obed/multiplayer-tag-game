class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100, 200, 173, 109);
    car1.addImage(plr1Img);
    car1.collide(obstacle4);
    car2 = createSprite(300, 200, 89, 151);
    car2.collide(obstacle4);
    car2.addImage(plr2Img)
    cars = [car1, car2];
  }
 
  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background("#c68767");
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 190;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = allPlayers[plr].distancex;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x;
          camera.position.y = cars[index-1].y
        }
       
      
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distancex -= 10;
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distancex += 10;
      player.update();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -= 10;
      player.update();
    }

    if (player.distance > 3600) {
      gameState = 2;
      player.rank++;
      Player.updateCarsAtEnd(player.rank);
    }

    drawSprites();
  }
  end(){
    console.log("game ended");
    console.log(player.rank);
  }
  
}
