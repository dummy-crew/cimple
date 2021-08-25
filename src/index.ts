import chalk from 'chalk';

interface Options {
  template: string;
  name: string;
  skipPrompts: boolean;
}

async function downloadTemplate(options: Options) {
  console.log(chalk.green('Downloading template...'));
  const COMMANDS: object | any = {
    nuxt: 'create-nuxt-app',
    next: 'create-next-app',
    react: 'create-react-app',
  };
  const command = COMMANDS[options.template];

  if (!command) {
    console.log(chalk.red('Unsupported template'));
    return;
  }

  console.log(chalk.green(`Installing ${options.template}...`));
}

export { downloadTemplate };
