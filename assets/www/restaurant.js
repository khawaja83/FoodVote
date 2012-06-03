var holder = [];

function Restaurant(id, name, location, openingTime) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.openingTime = openingTime;

    this.distanceTo = function(location2) {
	
    };

    holder.push(this);
}

function idToName(id) {
    for (var i = 0; i < holder.length; i++) {
	if (holder[i].id == id) {
	    return holder[i].name;
	}
    }

    return "Muu";
}