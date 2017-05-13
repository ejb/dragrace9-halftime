const Spanner = require('@google-cloud/spanner');
const spanner = Spanner();
const instanceId = 'rupaul-9-halftime-entries';
const databaseId = 'season9halftime';

exports.getEntries = function() {
    // Gets a reference to a Cloud Spanner instance and database
    const instance = spanner.instance(instanceId);
    const database = instance.database(databaseId);

    // The query to execute
    const query = {
      sql: 'SELECT * FROM Entries'
    };

    // Execute the query
    return database.run(query)
      .then((results) => {
        const rows = results[0].map((row) => row.toJSON());
        rows.forEach((row) => {
          res.write(JSON.stringify(row));
        });
        res
          .status(200)
          .end();
      })
      .catch((err) => {
        res
          .status(500)
          .send(`Error querying Spanner: ${err}`)
          .end();
      });
}

exports.helloGET = function helloGET (req, res) {
    res.send(`Helloooo ladies`);
};