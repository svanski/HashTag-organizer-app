import { ITask } from "./models";

export function createTask(): ITask {
    return {
        title: null,
        hashTags: [],
        description: null,
        startDate: null,
        dueDate: null,
        assignee: [],
        attachements: [],
        comments: [],
        lastModifyUser: "Dachi",
        lastModifyDate: new Date()
    }
}