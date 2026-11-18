// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  const attempts = window.reportData.attempts

  if (filter === 'passed') {
    return attempts.filter((attempt) => attempt.passed === true)
  }

  if (filter === 'failed') {
    return attempts.filter((attempt) => attempt.passed === false)
  }

  return attempts
}

function renderAttempts(attempts) {
  let markup = ''

  attempts.forEach((attempt) => {
    const status = attempt.passed ? 'Порог пройден' : 'Порог не пройден'
    markup += `
      <li class="result-item">
        <span class="result-name">${escapeHtml(attempt.name)}</span>
        <span>${attempt.score} из ${attempt.questionCount} (${attempt.percentage}%) — ${status}</span>
      </li>`
  })

  document.querySelector('#result-list').innerHTML = markup
}

function startFilter() {
  const form = document.querySelector('#filter-form')
  const filterSelect = document.querySelector('#filter')
  const resultCount = document.querySelector('#result-count')
  const resultList = document.querySelector('#result-list')

  if (!form || !filterSelect || !resultCount || !resultList) {
    return
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const selectedAttempts = selectAttempts(filterSelect.value)
    renderAttempts(selectedAttempts)
    resultCount.textContent = `Показано: ${selectedAttempts.length} из ${window.reportData.attempts.length}`
  })
}

startFilter()
