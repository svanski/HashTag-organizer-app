import { ITask } from "./models";

export function createTask(): ITask {
    return {
        title: '',
        hashTags: [],
        description: '',
        startDate: null,
        dueDate: null,
        assignee: [],
        attachements: [],
        comments: [],
        lastModifyUserEmail: "Dachi",
        lastModifyDate: new Date()
    }
}