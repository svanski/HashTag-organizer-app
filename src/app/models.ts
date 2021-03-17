export interface ITask {
    hashTags: string[],
    titile: string,
    description: string,
    startDate: Date,
    dueDate: Date,
    assignee: string[],
    assigner: string[],
}

export interface IUser {
    id: number,
    email: string,
    name: string,
    selected: boolean
}