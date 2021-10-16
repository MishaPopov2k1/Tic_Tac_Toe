export const urlHeroku = 'https://intense-lowlands-28420.herokuapp.com';
export const urlLocal = 'http://127.0.0.1:3000';

const getStatus = function(response) {
  if (response.status !== 200) {
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
};

const getJson = function(response) {
  return response.json();
};


export async function getTitle() {
  const title = await fetch(urlHeroku+'/test')
      .then(getStatus)
      .then(getJson)
      .catch(function(error) {
        console.log(error);
      });
  console.log('title: ', title);
  return JSON.parse(title);
}


