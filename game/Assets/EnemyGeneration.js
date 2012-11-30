#pragma strict

public var maxEnemies:int = 10;
private var enemy:GameObject;

function Start () {
	enemy = GameObject.Find('Enemy');
}

function Update () {
	if (maxEnemies > 0) {
		Instantiate(enemy.transform, Vector2(Random.value * 1024, Random.value * 768), Quaternion.identity);
		maxEnemies--;
	}
}