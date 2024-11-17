const horas = [
    "8:30-9:15",
    "9:20-10:15",
    "10:20-11:10",
    "11:10-11:40",
    "11:40-12:30",
    "12:35-13:25",
    "13:25-14:20",
];

const horario = [
    ["Mates", "Historia", "Lengua", "Recreo", "Filosofía", "TIC", "Biología"],
    ["Lengua", "TIC", "Biología", "Recreo", "Inglés", "Química", "Filosofía"],
    ["Historia", "TIC", "Biología", "Recreo", "Mates", "Química", "Inglés"],
    ["Historia", "Filosofía", "Mates", "Recreo", "Lengua", "TIC", "Química"],
    ["Inglés", "Química", "Mates", "Recreo", "Historia", "Biología", "Lengua"],
];

const asignaturas = {
    "Mates": "mates",
    "Historia": "historia",
    "Lengua": "lengua",
    "Filosofía": "filosofia",
    "TIC": "tic",
    "Biología": "biologia",
    "Inglés": "ingles",
    "Química": "quimica",
    "Recreo": "recreo",
};

const tbody = document.querySelector("#horario tbody");


horas.forEach((hora, index) => {
    const row = document.createElement("tr");
    const horaCell = document.createElement("td");
    horaCell.textContent = hora;
    row.appendChild(horaCell);


    horario.forEach(dia => {
        const cell = document.createElement("td");
        const asignatura = dia[index];
        cell.textContent = asignatura;
        cell.className = asignaturas[asignatura];
        row.appendChild(cell);
    });

    tbody.appendChild(row);
});
