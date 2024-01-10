//Nel file GET.JS importiamo il fileSystem e il pacchetto Chalk:
const fs = require('fs');
const chalk = require('chalk');

//Creiamo una funzione get che avrà come parametro (yargs). Questa funzione viene esportata e invocata in app.js:
function get(yargs) {
    //Creiamo il nostro comando yargs 'get'
    yargs.command({
        command: 'get',
        describe: 'Ricerca cliente',
        builder: {
            nome:{
                describe:'Nome del cliente',
                demandOption: false,
                type: 'string'
            },
            cognome:{
                describe:'Cognome del cliente',
                demandOption: false,
                type:'string'
            },
            email:{
                describe:'Email del cliente',
                demandOption:false,
                typeof:'string'
            }
        },
        handler(argv){
            const ris = getCliente(argv.nome , argv.email, argv.cognome);
            if(argv.nome&&argv.cognome&&argv.email){
                console.log(chalk.red.bold('\n Ricercare per nome e cognome oppure per email\n'))
            }else{
                if (ris.status){
                    console.log(chalk.green.bold('\n Clienti trovati:\n'))
                    ris.clients.forEach((cliente =>{

                            console.log(`\n Nome: ${cliente.nome}\n Cognome: ${cliente.cognome}\n Email: ${cliente.email}`)
                            if (cliente.telefono){
                                console.log(` Telefono: ${cliente.telefono}`)
                            }

                    }))
                } else {
                    console.log(chalk.red.bold('\n Nessun cliente trovato\n'))
                }
            }
        }
    })
}

function getCliente(nome, email,cognome){
    const clientiJSON = fs.readFileSync('clienti.json' , 'utf-8');
    const clienti = JSON.parse(clientiJSON);

    let clients = [];
    clienti.forEach((singoloCliente => {
        if ((singoloCliente.nome === nome && singoloCliente.cognome === cognome)){
            clients.push(singoloCliente);

        }else if((singoloCliente.email === email)){
            clients.push(singoloCliente);
        }
    }))


    const ris = {status: false , clients:[]};


    if(clients.length > 0){
        ris.status = true;
        ris.clients = clients;

        return ris;
    }else{
        ris.status = false;
        ris.clients = [];

        return ris;
    }

}

module.exports = get;