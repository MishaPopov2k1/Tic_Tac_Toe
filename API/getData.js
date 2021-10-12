
const getStatus = function(response) {
  if (response.status !== 200) {
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
};

const getJson = function(response) {
  return response.json();
};

export async function sendGameCellState(gameCellState) {
  await fetch('http://localhost:3000/test')
      .then(getStatus)
      .then(getJson)
      .catch();
}

export async function getTitle() {
  const title = await fetch('http://localhost:3000/test')
      .then(getStatus)
      .then(getJson)
      .catch(function(error) {
        console.log(error);
      });
  console.log('title: ', title);
  return JSON.parse(title);
}


