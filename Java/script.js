//Calendario
let currentDate = new Date();

document.getElementById('showCalendarBtn').addEventListener('click', function() {
  const calendar = document.getElementById('calendar');
  calendar.style.display = calendar.style.display === 'block' ? 'none' : 'block';
  displayCalendar();
});

// Funcionalidad para retroceder al mes anterior
document.getElementById('prevMonthBtn').addEventListener('click', function() {
  currentDate.setMonth(currentDate.getMonth() - 1); // Retroceder un mes
  displayCalendar();
});

// Funcionalidad para avanzar al mes siguiente
document.getElementById('nextMonthBtn').addEventListener('click', function() {
  currentDate.setMonth(currentDate.getMonth() + 1); // Avanzar un mes
  displayCalendar();
});

function displayCalendar() {
  const monthYear = document.getElementById('monthYear');
  const calendarTable = document.getElementById('calendarTable').getElementsByTagName('tbody')[0];

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Limpiar la tabla antes de llenarla
  calendarTable.innerHTML = "";

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

  let row = document.createElement('tr');
  let dayCount = 1;

  // Llenar los días previos (vacíos)
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('td');
    row.appendChild(emptyCell);
  }

  // Llenar el calendario con los días
  for (let i = firstDay; i < 7; i++) {
    const cell = document.createElement('td');
    cell.classList.add('day-number');
    cell.textContent = dayCount;
    row.appendChild(cell);
    dayCount++;
  }

  calendarTable.appendChild(row);
  
  // Llenar el resto de las semanas
  while (dayCount <= lastDate) {
    row = document.createElement('tr');
    for (let i = 0; i < 7; i++) {
      if (dayCount > lastDate) break;
      const cell = document.createElement('td');
      cell.classList.add('day-number');
      cell.textContent = dayCount;
      row.appendChild(cell);
      dayCount++;
    }
    calendarTable.appendChild(row);
  }
}
