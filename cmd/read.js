const fs = require('fs');
const chalk = require('chalk');

function read(yargs) {
    yargs.command({
        command: 'read',
        describe: 'Visualizza lista dei clienti',
        handler(){
            readClienti();
        }
    })
}

function readClienti(){
    const clientiJSON = fs.readFileSync('clienti.json' , 'utf-8');
    const clienti = JSON.parse(clientiJSON);
    if (clienti.length > 0){
        console.log(chalk.green.bold('\n Clienti trovati:\n'))

        clienti.forEach((cliente=>{
            if (!cliente.telefono) {
                console.log(`\n Nome: ${cliente.nome}\n Cognome: ${cliente.cognome}\n Email: ${cliente.email}\n Telefono: --`)

            }else{
                console.log(`\n Nome: ${cliente.nome}\n Cognome: ${cliente.cognome}\n Email: ${cliente.email}\n Telefono: ${cliente.telefono}`)
            }
           }))
    } else {
        console.log(chalk.red.bold('Nessun cliente nel database'));
    }
}

module.exports = read;