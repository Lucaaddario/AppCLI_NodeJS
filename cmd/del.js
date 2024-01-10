const fs = require('fs');
const chalk = require('chalk');

function del(yargs) {
    yargs.command({
        command: 'del',
        describe: 'Rimozione di un cliente',
        builder:{
            nome:{
                describe: 'Nome del cliente',
                demandOption: true,
                type: 'string'
            },
            cognome:{
                describe: 'Cognome del cliente',
                demandOption: true,
                type: 'string'
            },
            email:{
                describe: 'Email del cliente',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv){
            delCliente(argv.nome , argv.email , argv.cognome);
        }
    })
}

function delCliente(nome,email,cognome) {
    const clientiJSON = fs.readFileSync('clienti.json' , 'utf-8');
    const clienti = JSON.parse(clientiJSON);
    const clienteIndice = clienti.findIndex(cliente => cliente.nome === nome && cliente.email === email && cliente.cognome === cognome) ;

    if(clienteIndice === -1){
        console.log(chalk.red.bold('Cliente non trovato'));
        return;
    }else{
        clienti.splice(clienteIndice, 1);
        fs.writeFileSync('clienti.json' , JSON.stringify(clienti));
        console.log(chalk.green.bold(`È stato rimosso il cliente:\n`));
        console.log(` Nome:${nome}\n Cognome: ${cognome}\n Email:${email}`);
    }
}

module.exports = del;