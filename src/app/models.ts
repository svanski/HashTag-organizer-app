export class Task {

    private _hashTags: string[] = [];
    public get hashTags(): string[] { return this._hashTags }
    public set hashTags(val: string[]) { this._hashTags = val; }

    public title: string | null = null;
    public description: string | null = null;
    public startDate?: Date;
    public dueDate?: Date;
    public assignee: string[] = [];
    public attachements: [] = [];
    public comments: IComment[] = []
    public lastModifyDate: Date = new Date();
    public lastModifyUserEmail: string | null = null;
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