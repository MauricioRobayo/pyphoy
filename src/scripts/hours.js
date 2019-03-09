function timeString(time) {
  const hours = Math.floor(time / (1000 * 60 * 60))
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours ? `${hours}h` : ''}${minutes ? ` ${minutes}m` : ''}`
}

const uls = document.getElementsByClassName('hours-interactive')

for (let i = 0; i < uls.length; i += 1) {
  const ul = uls[i]

  const lis = ul.getElementsByTagName('li')
  const { comment } = ul.dataset
  const { days } = ul.dataset

  for (let j = 0; j < lis.length; j += 1) {
    const li = lis[j]

    const { start } = li.dataset
    const { end } = li.dataset

    const today = new Date()
    const dtString = today.toDateString()
    const startTime = new Date(
      `${dtString} ${comment === 'Todo el día' ? '0:00' : start}`
    )
    const endTime = new Date(
      `${dtString} ${comment === 'Todo el día' ? '0:00' : end}`
    )
    if (endTime <= startTime) endTime.setDate(endTime.getDate() + 1)
    const hourActive = today >= startTime && today <= endTime
    const hourWarning = today < startTime

    if (
      (hourActive || hourWarning) &&
      (days.length === 0 || days.includes(today.getDay()))
    ) {
      const span = document.createElement('span')
      const textNode = document.createTextNode(
        hourActive ? timeString(endTime - today) : timeString(startTime - today)
      )

      span.classList.add('lapse')
      span.appendChild(textNode)

      li.classList.add(`hour-${hourActive ? 'active' : 'warning'}`)
      li.appendChild(span)

      break
    }
  }
}
