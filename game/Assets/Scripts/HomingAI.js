#pragma strict
public var speed : int = 3;

private var player : GameObject;

function Start () {
  player = GameObject.Find('Player');
}

function Update () {
  if(transform.position.x > player.transform.position.x) {
    transform.position.x -= speed * Time.deltaTime;
  } else {
    transform.position.x += speed * Time.deltaTime;
  }
  
  if(transform.position.y > player.transform.position.y) {
    transform.position.y -= speed * Time.deltaTime;
  } else {
    transform.position.y += speed * Time.deltaTime;
  }
}