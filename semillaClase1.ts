import { execSync } from 'child_process';
import * as fs from 'fs';

const seeds: string[] = [
    "seed.bitcoin.sipa.be",
    "dnsseed.bluematt.be",
    "seed.btc.petertodd.net",
    "seed.bitcoin.sprovoost.nl",
    "dnsseed.emzy.de",
    "seed.bitcoin.wiz.biz",
    "seed.mainnet.achownodes.xyz"
];
try {
    fs.unlinkSync('dns_seeds.log');
    console.log('Archivo eliminado con éxito.');
} catch (error) {
    console.error('El archivo no existe o no se pudo eliminar:', error);
}



const logFile = "dns_seeds.log";
const timestamp = new Date().toISOString();

let logOutput = `\n--- Ejecución: ${timestamp} ---\n`;

for (const seed of seeds) {
    console.log(`Consultando ${seed}...`);
    try {
        const result = execSync(`dig +short ${seed}`, { encoding: 'utf-8' });
        const ips = result.trim().split('\n');
        for (const ip of ips) {
            if (ip) {
                logOutput += `Seed: ${seed} -> IP: ${ip}\n`;
                console.log(`  Encontrada: ${ip}`);
            }
        }
    } catch (error) {
        console.error(`Error consultando ${seed}:`, error);
    }
}

fs.appendFileSync(logFile, logOutput);
console.log(`¡Listo! Direcciones guardadas en ${logFile}`);