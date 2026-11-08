const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`;

let data;

try {
  data = JSON.parse(sourceJson);
} catch (error) {
  document.querySelector('#data-error').hidden = false;
}

function buildReport(services, guideChecked, audioChecked, catalogChecked) {
  const choices = {
    guide: guideChecked,
    audio: audioChecked,
    catalog: catalogChecked
  };

  const items = services
    .filter((service) => choices[service.id] === true)
    .map((service) => {
      const { title, price } = service;
      return { title: title.trim(), price };
    });

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return {
    count: items.length,
    total: total,
    items: items
  };
}

if (data !== undefined) {
  const program = document.querySelector('#program');
  const form = document.querySelector('#service-form');
  const choiceError = document.querySelector('#choice-error');
  const result = document.querySelector('#result');
  const reportJson = document.querySelector('#report-json');

  form.hidden = false;

  function showProgram() {
    program.innerHTML = data.event.meeting;
    program.hidden = false;
  }

  function submitServices(event) {
    event.preventDefault();

    const guideChecked = document.querySelector('#guide').checked;
    const audioChecked = document.querySelector('#audio').checked;
    const catalogChecked = document.querySelector('#catalog').checked;

    const report = buildReport(data.services, guideChecked, audioChecked, catalogChecked);

    if (report.count === 0) {
      choiceError.hidden = false;
      result.hidden = true;
      reportJson.hidden = true;
      return;
    }

    choiceError.hidden = true;

    const names = report.items.map((item) => item.title);
    result.innerHTML = `Выбрано услуг: ${report.count}<br>Итого: ${report.total} руб.<br>${names.join('<br>')}`;
    result.hidden = false;

    const jsonString = JSON.stringify(report);
    JSON.parse(jsonString);
    reportJson.textContent = jsonString;
    reportJson.hidden = false;
  }

  document.querySelector('#show-program').addEventListener('click', showProgram);
  form.addEventListener('submit', submitServices);
}
