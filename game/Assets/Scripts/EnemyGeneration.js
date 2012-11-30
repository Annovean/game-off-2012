#pragma strict

var enemyPrefabs : GameObject[]; 
var amountEnemies : int = 20; 
var yieldTimeMin : int = 2; 
var yieldTimeMax : int = 5; 

function Start()
{
    Spawn();
}

function Spawn() 
{ 
   for(var i:int = 0; i < amountEnemies; i++) {
      yield WaitForSeconds(Random.Range(yieldTimeMin, yieldTimeMax));
      var index : int = Random.Range(0, enemyPrefabs.length - 1);
      if(index == enemyPrefabs.Length || index < 0) {
        index = 0;
      }
      
      try {
        var obj : GameObject = enemyPrefabs[index];
        var enemy : GameObject = Instantiate(obj, Vector3(0,0,0), Quaternion.identity);
      } catch (exception) {
        // Do Nothing
      }
   }
}  