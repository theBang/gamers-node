# gamers-node
Node.js script for creating a gamers postgresql table from a CSV file.

Script:
1. Creates a PosgreSQL table named `players`.
2. Parses data from `data/players.csv`.
3. Inserts the data into the table.
4. Starts an express server.
5. Opens a browser page with the inserted data fetched from the server.

Before starting the script:
1. Install PorstgreSQL.
2. Create `.env` from the `.env.example`.
3. Create `data/players.csv` from `data/players.example.csv`.

To start the script:

`npm install`

`npm start`
