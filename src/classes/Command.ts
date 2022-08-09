import { Client } from ".."
import {CommandI, CommandInfo, CommandOptions, Reply} from "../types"

export class Command implements CommandI{
    name: string
    args: Array<string>
    createdTimestamp: number
    info?: CommandInfo
    client: Client

    constructor(options:CommandOptions) {
        this.name = options.name;
        this.args = options.args;
        this.createdTimestamp = options.createdTimestamp;
        this.info = options.info;
        this.client = options.client;
    }

    reply (reply: Reply) {
        this.client.send(reply)
        return this
    };
}