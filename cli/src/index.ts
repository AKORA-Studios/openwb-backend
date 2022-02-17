#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import connectMQTTClient, { subsribe } from './mqtt.js';

async function cli() {
    const { module: answer } = await inquirer.prompt({
        name: 'module',
        type: 'list',
        message: 'Choose your module',
        choices: ['MQTT Client', 'Redis Client'],
    });

    if (answer === 'MQTT Client') {
        const opts: {
            url: string;
            username: string;
            password: string;
            filter: string;
        } = await inquirer.prompt([
            {
                name: 'url',
                type: 'input',
                message: 'MQTT Broker URL?',
            },
            {
                name: 'username',
                type: 'input',
                message: 'Username?',
            },
            {
                name: 'password',
                type: 'password',
                message: 'Password?',
            },
            {
                name: 'filter',
                type: 'input',
                message: 'Filter',
            },
            {
                name: 'confirm',
                type: 'confirm',
                message: 'Connect to Broker?',
            },
        ]);

        const spinner = createSpinner('Connecting...').start();

        try {
            const client = await connectMQTTClient(opts.url, opts),
                emitter = await subsribe(client, opts.filter);
            spinner.success({ text: 'Connected to: ' + opts.url });

            emitter.on('message', (topic: string, str, counter: number) => {
                console.log(
                    chalk.grey((counter + '').padStart(5)),
                    chalk.white('Received:'),
                    chalk.green(topic.padEnd(56)),
                    chalk.white('-'),
                    chalk.red('"') + chalk.yellow(str) + chalk.red('"')
                );
            });
        } catch (e: any) {
            spinner.error({ text: 'Failed: ' + e });
            console.error(e.stack);
        }
    } else {
    }
}
cli();
