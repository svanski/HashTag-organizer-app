import { ITask } from "./models";

export function createTask(): ITask {
    return {
        title: '',
        hashTags: [],
        description: null,
        startDate: null,
        dueDate: null,
        assignee: [],
        attachements: [],
        comments: [],
        lastModifyUserEmail: "Dachi",
        lastModifyDate: new Date()
    }
}