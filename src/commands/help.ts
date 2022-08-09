import { ArgumentInfo, CommandFileI, CommandInfo } from "../types";
import {Command} from "../classes/Command"

const command:CommandFileI = {
    args: [],
    run:async (cmd:Command)=>{
        const cmds = require("../handlers/index")
        .commands.map((command:CommandInfo)=>
        `\n\nName: ${command.name} \nDescription: ${command.description} \nArgs: ${command.args.length ? `${command.args.map((arg:ArgumentInfo)=>`Name: ${arg.name} Description: ${arg.description}`).join("\n")}` : `None` } `)
        .join("\n\n")
        return {type: true, message: cmds, command:cmd}
    },
    info:{
        name: "help",
        description: "show all cmds and usage",
        args: []
    }
}

module.exports = command;