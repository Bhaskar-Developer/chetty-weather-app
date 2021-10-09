const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const divOutput = document.querySelector('.output')

searchInput.addEventListener('keydown', () => {
  divOutput.innerHTML = ``
})

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  divOutput.innerHTML = `<p>Loading...</p>`
  const location = searchInput.value
  let url;

  if (location === '') {
    url = `/weather`
  } else {
    url = `/weather?address=${location}`
  }

  fetch(url)
    .then((response) => {
      response.json()
        .then((data) => {
          if (data.error) {
            divOutput.innerHTML = `<p class="error"><strong>${data.error}</strong></p>`
            searchInput.value = ''
            return
          }
          divOutput.innerHTML =
            `
           <table>
            <tr>
              <td>
                <p><strong>Location: </strong>${data.location}</p>  
                <p><strong>Forecast: </strong>${data.forecast.forecast}</p>
                <p><strong>Temperature: </strong>${data.forecast.temperature}<span>&#176;</span>C</p>
                <p><strong>Feelslike: </strong>${data.forecast.feelslike}<span>&#176;</span>C</p>
                <p><strong>Humidity: </strong>${data.forecast.humidity}%</p>
              </td>
              <td id="image-td"><img class="weather-image" src="${data.forecast.icon}"></td>
            </tr>
           </table>
          `
          searchInput.value = ''
        })
    })
})