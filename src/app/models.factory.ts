import { Task } from "./models";

export function createTask(): Task {
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