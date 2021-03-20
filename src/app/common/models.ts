export interface ITask {
    id: string;
    hashTags: string[],
    title: string | null,
    description: string | null,
    startDate?: Date,
    dueDate?: Date,
    assignee: string[],
    attachements: [],
    comments: IComment[],
    lastModifyDate: Date,
    lastModifyUserEmail: string
}

export interface IUser {
    id: Number,
    email: string,
    name: string,
    selected: boolean
}

export interface IComment {
    user: IUser,
    message: string,
    date: Date;
}