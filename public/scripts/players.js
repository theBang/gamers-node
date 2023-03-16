const header = {
    nickname: "Ник",
    email: "Email",
    registered: "Зарегистрирован",
    status: "Статус"
}

function formatStatus(status) {
    return status ? "On" : "Off";
}

function formatDate(utc) {
    const dateTime = new Date(utc * 1000); // From seconds to ms precision
    const locale = "ru-RU";
    const options = { timeZone: "UTC" };
    const date = dateTime.toLocaleDateString(locale, options);
    const time = dateTime.toLocaleTimeString(locale, { ...options, timeStyle: "short" });

    return date + " " + time;
}

function renderTable(players) {
    if (Array.isArray(players) && !!players[0]) {
        const table = document.querySelector("table");
        table.innerHTML = "";

        const headerRow = document.createElement("tr");
        for (const key of Object.keys(players[0])) {
            const cell = document.createElement("th");
            cell.innerText = header[key];
            headerRow.appendChild(cell);
        }
        const tableHeader = document.createElement("thead");
        tableHeader.appendChild(headerRow);
        table.appendChild(tableHeader);

        const tableBody = document.createElement("tbody");
        for (const player of players) {
            const row = document.createElement("tr");
            for (const [key, value] of Object.entries(player)) {
                const cell = document.createElement("td");
                let text = value;

                if (key === "status") {
                    text = formatStatus(value);
                } else if (key === "registered") {
                    text = formatDate(value);
                }

                cell.innerText = text;
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
        }
        table.appendChild(tableBody);
    }
}

fetch("/api/players").then(r => r.json()).then(renderTable);