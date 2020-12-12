const formAddSong = document.getElementById('formAddSong');


formAddSong.addEventListener('submit', (event) => {
    event.preventDefault();
   
    console.log(document.querySelector('#title').value);
    console.log(document.querySelector('#album').value);
    console.log(document.querySelector('#artist').value);
    console.log(document.querySelector('#duration').value);

    addSong(
        document.querySelector('#title').value,
        document.querySelector('#album').value,
        document.querySelector('#artist').value,
        parseInt(document.querySelector('#duration').value)
    )
});


async function fetchAsync (url, methodHttp) {
  let response = await fetch(url,{
      method: methodHttp
  });
  let data = await response.json();
  return data;
}

async function addSong(title, album, artist, duration){
    let response = await fetch('http://pepitolearning.es-1.axarnet.cloud/webservices/songs/',{
        method: 'POST',
        mode: 'cors', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, album, artist, duration})
    });
}

function remove(id){
    console.log("Me llamaron desde: " + id);
    fetchAsync('http://pepitolearning.es-1.axarnet.cloud/webservices/songs/'+id, 'DELETE').then((result) => {
        console.log("Resultado de la operacion: " + result);
    })
}


function generateSongs(){

    fetchAsync('http://pepitolearning.es-1.axarnet.cloud/webservices/songs', 'GET').then( (data) => {
        console.log('[generateSongs] fetch:');
        console.log(data);


        let htmlTable = document.getElementById('song_table');
        let table = document.createElement('table');
        let tableBody = document.createElement('tbody');
        table.appendChild(tableBody);

        

        let headerTR = ['Id', 'Title', 'Album', 'Artist', 'Duration', 'Remove'];

        let tr = document.createElement('tr');
        headerTR.forEach((header)=> {
            let th = document.createElement('th');
            th.textContent = header;
            tr.appendChild(th);
        })
        tableBody.appendChild(tr);



        data.forEach((value) => {
            tr = document.createElement('tr');
            
            let td = document.createElement('td');
            td.textContent = value.id;
            tr.appendChild(td);

            td = document.createElement('td');
            td.textContent = value.title
            tr.appendChild(td);

            td = document.createElement('td');
            td.textContent = value.album
            tr.appendChild(td);

            td = document.createElement('td');
            td.textContent = value.artist
            tr.appendChild(td);

            td = document.createElement('td');
            td.textContent = value.duration
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerHTML = "<button type=\"button\" value=\" "+ value.id + "\" onclick=\"remove("+ value.id + ");\" class=\"btn btn-primary btn-sm\">Remove Song</button>"
            tr.appendChild(td);
            tableBody.appendChild(tr);
        });

        htmlTable.appendChild(table);
    })
}

generateSongs();