export class TodoItemPriorityUpdatedEvent {
    constructor(
        public readonly todoItemId: string,
        public readonly newPriority: number,
    ) { }
}
