const title = document.querySelector('.title__tic-tac-toe');


const status = function(response) {
  if (response.status !== 200) {
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
};

const json = function(response) {
  return response.json();
};

export function getTitle() {
  fetch('http://localhost:3000/test')
      .then(status)
      .then(json)
      .then(function(data) {
        data =JSON.parse(data);
        title.innerHTML = data;
      })
      .catch(function(error) {
        console.log(error);
      });
}


