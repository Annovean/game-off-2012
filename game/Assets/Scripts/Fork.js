#pragma strict

public var speed : int = 10;
public var size : float = 2;

private var player : Player;

private var firstUpdate : boolean = true;

function Start()  {
	player = GameObject.Find('Player').GetComponent(Player);
	player.size /= 2;
	size = player.size;
}

function OnCollisionStay(collisionInfo : Collision) {
    for (var contact : ContactPoint in collisionInfo.contacts) {
    	var object : GameObject = contact.otherCollider.gameObject;
    	if(object.gameObject.tag == "Enemy") {
    	  var enemy : Enemy = object.GetComponent(Enemy);
    	  if(enemy.size < size) {
    	    enemy.size -= speed * Time.deltaTime;
    	  } else if(size > 0) {
    	  	size -= ( speed * Time.deltaTime ) / 2;
    	  }
    	  if(enemy.size <= 0.5) {
    	    Destroy(object);
    	  }
    	}
    }
}

function Update() {
    transform.localScale = Vector3(size, size, 1);
    if(firstUpdate) {
	    transform.position = player.transform.position;
    	speed = player.speed / 2;
    	firstUpdate = false;
	}
	
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
	
	rigidbody.constraints = RigidbodyConstraints.FreezeRotation | RigidbodyConstraints.FreezePositionZ;
}