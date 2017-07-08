var library = library || {};

library.shuffle = function(list) {
    for (var i = list.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = list[randomIndex];

        list[randomIndex] = list[i];
        list[i] = itemAtIndex;
    }
    return list;
};

library.flatten = function(twoDArray) {
    return [].concat.apply([], twoDArray);
};

library.shuffleDeeply = function(thing) {
    var a = thing.length;
    var b = thing[0].length;
    var tempArray = this.flatten(thing);
    library.shuffle(tempArray);
    for (var x = 0; x < a; x++) {
        thing[x] = [];
        for (var y = 0; y < b; y++) {
            thing[x][y] = tempArray.shift();
        }
    }
};

library.choose = function(list) {
    var index = Math.floor(Math.random() * list.length);
    return list[index];
};

library.range = function(first, last, interval) {
    if (!last) {
        last = first || 0;
        first = 0;
    }
    if (!interval) {
        interval = last < first ? -1 : 1;
    }
    var length = Math.max(Math.ceil((last - first) / interval), 0);
    var numbers = Array(length);

    for (var i = 0; i < length; i++, first += interval) {
        numbers[i] = first;
    }
    return numbers;
};

library.click = function(pointer) {
    var startPoint = {};
    startPoint.x = pointer.clientX;
    startPoint.y = pointer.clientY;
    return startPoint; 
};

library.release_click = function(pointer, startPoint, swipeTolerance) {
    var endPoint = {};
    endPoint.direction = false;

    endPoint.x = pointer.clientX;
    endPoint.y = pointer.clientY;

    var deltaX = endPoint.x - startPoint.x;
    var deltaY = endPoint.y - startPoint.y;

    if(Math.abs(deltaX) >= Math.abs(deltaY)) {
        if (Math.abs(deltaX) < swipeTolerance) {
            endPoint.direction = 'tap';
        }
        else if (deltaX < 0) {
            endPoint.direction = 'left';
        }
        else {
            endPoint.direction = 'right';
        }
    }
    else {
        if (Math.abs(deltaY) < swipeTolerance) {
            endPoint.direction = 'tap';
        }
        else if (deltaY < 0) {
            endPoint.direction = 'up';
        }
        else {
            endPoint.direction = 'down';
        }
    }
    return endPoint;
};
