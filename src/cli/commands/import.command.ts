import chalk from 'chalk';
import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;

    if (!filename) {
      console.error(chalk.red('Error: file path is required. Usage: --import <path>'));
      return;
    }

    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      const offers = fileReader.toArray();

      console.info();
      console.info(chalk.bold.green(`Data from "${filename}" was successfully imported.`));
      console.info(chalk.green(`Offers found: ${offers.length}`));
      console.info();
      console.log(offers);
      console.info();
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(`Details: ${err.message}`));
    }
  }
}
