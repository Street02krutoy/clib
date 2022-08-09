import fs from 'fs';
import {CommandFileI, CommandInfo, Reply} from "../types";
import {Command} from "../classes/Command"
export const commands:CommandInfo[] = []; 

export const runCommand = async (cmd:Command):Promise<Reply> => {
    if(!fs.existsSync(`./build/src/commands/${cmd.name}.js`)) 
        return {type: false, message: `Cannot find command ${cmd.name}`, command:cmd}
    const commandFile:CommandFileI = require(`../commands/${cmd.name}`); 
    if(cmd.args.length!==commandFile.args.length) return {type: false, message: `Got ${cmd.args.length} args instead of ${commandFile.args.length}`, command:cmd}
    try {
        return await commandFile.run(cmd);
    }   catch (e) {
        return {type: false, message: `Error in ${cmd.name}: \n ${e}`, command:cmd};
    };
};

export const registerCommands = async (): Promise<CommandInfo[]> => {
    const files = fs.readdirSync("build/src/commands/");

    for (let filename of files) {
        let file:CommandFileI = require(`../commands/${filename}`);

        file.info ? commands.push(file.info) : null;
    };
    return commands;
}