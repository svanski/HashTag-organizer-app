import { ITask } from "./models";

export function createTask(): ITask {
    return {
        title: '',
        hashTags: [],
        description: '',
        startDate: undefined,
        dueDate: undefined,
        assignee: [],
        attachements: [],
        comments: [],
        lastModifyUserEmail: "Dachi",
        lastModifyDate: new Date()
    }
}