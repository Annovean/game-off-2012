#pragma strict

public var maxEnemies:int = 10;
private var enemy:GameObject;

function Start () {
  enemy = GameObject.Find('Enemy');
}

function Update () {
  var enemies = GameObject.FindGameObjectsWithTag("Enemy");
  if (enemies.length < maxEnemies) {
	Instantiate(enemy, Vector2(Random.value * 1024, Random.value * 768), Quaternion.identity);
  }
}