const generativeLabels = document.querySelectorAll<HTMLElement>('[data-generating-label]')
for (const label of generativeLabels) {
  let dots = 0
  setInterval(() => {
    dots = (dots + 1) % 4
    label.textContent = `Generating${'.'.repeat(dots)}`
  }, 420)
}

const versionSelect = document.querySelector<HTMLSelectElement>('#version-select')
if (versionSelect) {
  versionSelect.addEventListener('change', () => {
    const v = versionSelect.value.trim()
    if (!v) return
    window.location.href = `/docs/${v}/`
  })
}

const yearEl = document.querySelector<HTMLElement>('[data-current-year]')
if (yearEl) yearEl.textContent = String(new Date().getFullYear())
