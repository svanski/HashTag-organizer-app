export interface ITask {
    hashTags: string[],
    title: string | null,
    description: string | null,
    startDate: Date | null,
    dueDate: Date | null,
    assignee: string[],
    attachements: [],
    comments: IComment[],
    lastModifyDate: Date,
    lastModifyUser: string,
}

export interface IUser {
    id: number,
    email: string,
    name: string,
    selected: boolean
}

export interface IComment {
    user: IUser,
    message: string,
    date: Date;
}