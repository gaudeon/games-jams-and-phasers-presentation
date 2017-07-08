function AllPlayersModel (database) {
    "use strict";

    this.config = getConfig();

    this.database = database;
};

AllPlayersModel.prototype.getHighScores = function (number_of_scores) {
    "use strict";

    if (this.config.mock) {
    }
    else {
        return this.database.child("players").orderByChild("max_score").limitToLast(number_of_scores);
    }
};
