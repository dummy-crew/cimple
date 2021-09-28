import { Options } from './types';
import path from 'path';
import chalk from 'chalk';
import execa from 'execa';

const KILL_PROCESS_ON = 5000;
const cwd = process.cwd();

async function downloadTemplate(options: Options) {
  console.log(chalk.green(`Downloading ${options.template} template...`));
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

  const { template, name } = options;
  const root = path.join(cwd, name);
  const subprocess = execa(`npx ${command}`, [root]);

  setTimeout(() => {
    subprocess.cancel();
  }, KILL_PROCESS_ON);

  try {
    const { stdout } = await subprocess;
    console.log(chalk.green(`Installing ${template}...`));
    console.log(stdout);
    console.log(chalk.green('Done!'));
  } catch (error: any) {
    console.log(subprocess.killed); // true
    console.log(error.isCanceled); // true
  }
}

export { downloadTemplate };
