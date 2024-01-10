//Nel file GET.JS importiamo il fileSystem e il pacchetto Chalk:
const fs = require('fs');
const chalk = require('chalk');

function add(yargs){
    yargs.command({
        command: 'add',
        describe: 'Aggiungi un cliente',
        builder:{
            nome:{
                describe: 'Nome del cliente',
                demandOption: false,
                type: 'string'
            },
            cognome:{
                describe: 'Cognome del cliente',
                demandOption: false,
                type: 'string'
            },
            email:{
                describe: 'Email del cliente',
                demandOption: false,
                type: 'string'
            },
            telefono:{
                describe: 'Telefono del cliente',
                demandOption: false,
                type: 'string'
            }
        },
        handler(argv){
            addCliente(argv);
        }
    })
}

function addCliente({nome, cognome, email, telefono}){
    const clientiJSON = fs.readFileSync('clienti.json' , 'utf-8');
    const clienti = JSON.parse(clientiJSON);
    if (nome && cognome && email){
        clienti.push({nome , cognome, email, telefono});
        fs.writeFileSync('clienti.json' , JSON.stringify(clienti));
        if(telefono === undefined){
            console.log(chalk.green.bold(`\n È stato aggiunto il cliente:\n`));
            console.log(` Nome: ${nome}\n Cognome: ${cognome}\n Email: ${email}\n Telefono: --`);
        }else{
            console.log(chalk.green.bold(`\n È stato aggiunto il cliente:\n`));
            console.log(` Nome: ${nome}\n Cognome: ${cognome}\n Email: ${email}\n Telefono: ${telefono}`);
        }


    }else{
        console.log(chalk.red.bold('Nome, cognome ed email obbligatori per aggiungere un cliente'));
    }}


    module.exports = add;