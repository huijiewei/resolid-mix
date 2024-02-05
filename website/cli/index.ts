import 'dotenv/config';

import { Command } from 'commander';
import { dbSeed } from './commands/dbSeed';
import { districtImport } from './commands/districtImport';
import { userFake } from './commands/userFake';

const program = new Command();

program.name('resolid-cli').description('Resolid Mix 终端工具').version('0.1.0');

program
  .command('seed')
  .description('初始数据填充')
  .action(async () => {
    await dbSeed();
  });

program
  .command('district-import')
  .description('从 JSON 文件导入区域数据')
  .action(async () => {
    await districtImport();

    process.exit();
  });

program
  .command('user-fake')
  .description('用户生成')
  .argument('[number]', '用户数量', (value) => parseInt(value, 10), 20)
  .action(async (number: number) => {
    await userFake(number);

    process.exit();
  });

await program.parseAsync(process.argv);
