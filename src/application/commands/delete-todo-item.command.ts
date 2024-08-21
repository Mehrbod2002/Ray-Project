export class DeleteTodoItemCommand {
    constructor(
        public readonly id: string,
        public readonly todoListId: string
    ) { }
}