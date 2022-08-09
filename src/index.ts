import readline from "readline";
import * as baseHandler from "./handlers"
import { ClientOptions, CommandHandler, Reply } from "./types";
import { Command } from "./classes/Command"
import { PathLike } from "fs";

export class Client {

    read: readline.Interface;
    handler: CommandHandler;
    commandPath: PathLike

    constructor(options: ClientOptions) {
        this.handler = options.handler ?? baseHandler
        this.commandPath = options.commandsPath ?? __dirname + "/commands"
    }

    public send(reply: Reply): void {
        if (reply.type) return console.log(reply.message)
        console.error(reply.message)
    }

    public async start(): Promise<void> {
        this.read = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.read.on("line", async (rawline) => {
            if (!rawline) return;
            let line = rawline.split(" ")
            let name: string = line.shift();
            let args: Array<string> = line;
            const command: Command = new Command({ name: name, args: args, createdTimestamp: Date.now(), client: this })
            const reply: Reply = await this.handler.runCommand(command)
            if (reply.type) return console.log(
                `Command ${reply.command.name} - OK.\nOutput: ${reply.message}`
            )
            return console.error(`Command ${reply.command.name} - Error.\nLog: ${reply.message}`)
        });
    }
}



