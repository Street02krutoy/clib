import { PathLike } from "fs"
import { Client } from "."

export interface CommandOptions {
    name: string,
    args: Array<string>,
    createdTimestamp: number,
    info?: CommandInfo, 
    client: Client

}

export interface CommandI implements CommandOptions {
    reply: (reply:Reply)=>Command
}

export interface CommandInfo {
    name: string,
    args: Array<ArgumentInfo>,
    description: string,
}

export interface ArgumentInfo {
    name: string,
    description: string,
}

export interface Reply {
    type: Boolean,
    message: string,
    command?: Command,
}

export interface CommandFileI {
    args:Array<string>
    run: (cmd:Command) => Promise<Reply> | Reply
    info: CommandInfo, 
}

export interface CommandHandler {
    runCommand: (cmd:Command)=> Reply | Promise<Reply>
    registerCommands: () => Array<CommandInfo> | Promise<Array<CommandInfo>>
}

export interface ClientOptions {
    handler?:CommandHandler,
    commandsPath: PathLike
}