# gamers-node
Node.js app for creating a players postgresql table from a CSV file.

App:
1. Creates a PosgreSQL table named `players`.
2. Parses data from `data/players.csv`.
3. Inserts the data into the table.
4. Starts an express server.
5. Opens a browser page with the inserted data fetched from the server.
## Installation

Install [Node.js](https://nodejs.org/en/download/).

Install [PorstgreSQL](https://www.postgresql.org/download/).

Clone the repository and change directory:

    git clone https://github.com/theBang/gamers-node.git
    cd gamers-node

Create `.env` from the `.env.example`.

Create `data/players.csv` from `data/players.example.csv`.

Install dependencies: 
    
    npm install

## Usage

To start the app:

    npm start
