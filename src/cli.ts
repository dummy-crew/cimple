import { Options } from './types';
import arg from 'arg';
import inquirer from 'inquirer';
import { downloadTemplate } from '.';

function parseArgumentsIntoOptions(rawArgs: string[]): Options {
  const args = arg(
    {
      '--use': String,
      '--yes': Boolean,
      '-u': '--use',
      '-y': '--yes',
    },
    {
      argv: rawArgs.slice(2),
    },
  );
  return {
    skipPrompts: args['--yes'] || false,
    template: args['--use'] || args['-u'] || '',
    name: args._[0] || 'my-app',
  };
}

async function promptForMissingOptions(options: any) {
  const defaultTemplate = 'nuxt';
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }
  const questions = [];
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: ['nuxt', 'next', 'react'],
      default: defaultTemplate,
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
  };
}

export async function cli(args: string[]): Promise<void> {
  const parsedArgs = parseArgumentsIntoOptions(args);
  const options = await promptForMissingOptions(parsedArgs);
  downloadTemplate(options);
}
