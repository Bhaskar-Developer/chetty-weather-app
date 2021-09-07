const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = searchInput.value
  let url;
  
  if(location === '') {
    url = `http://localhost:3000/weather`
  } else {
    url = `http://localhost:3000/weather?address=${location}` 
  }
  
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(url)
    .then((response) => {
      response.json()
        .then((data) => {
          if(data.error) {
            return messageOne.textContent = data.error
          }
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
          searchInput.value = ''
        })
    })
})  