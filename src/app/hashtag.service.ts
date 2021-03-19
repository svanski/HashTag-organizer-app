import { Task } from "./models";

export class HashTagService {

    static recalculateHashTags(task: Task): void {

        const curryStringProperyTypeHandler = (porpertyName: string) => (obj: Task, key: keyof Task, hashTags: string[]): string[] | null => key === porpertyName ? stringPropertyHandler(obj, key, hashTags) : null;
        const curryStringArrayProperyTypeHandler = (porpertyName: string) => (obj: Task, key: keyof Task, hashTags: string[]): string[] | null => key === porpertyName ? stringArrayPropertyHandler(obj, key, hashTags) : null;
        const curryDateProperyTypeHandler = (porpertyName: string) => (obj: Task, key: keyof Task, hashTags: string[]): string[] | null => key === porpertyName ? dateTimePropertyHandler(obj, key, hashTags) : null;

        const handlers = [
            curryStringProperyTypeHandler('title'),
            curryStringProperyTypeHandler('description'),
            curryStringProperyTypeHandler('lastModifyUserEmail'),
            curryDateProperyTypeHandler('startDate'),
            curryDateProperyTypeHandler('dueDate'),
            curryDateProperyTypeHandler('lastModifyDate'),
            curryStringArrayProperyTypeHandler('assignee')
        ]



        for (let key of Object.keys(task)) {
            const res = handlers.reduce((res: string[] | null, func) => res ? res : func(task, key as any, task.hashTags.slice()), null);

            task.hashTags = res ? res : task.hashTags;
        }

        HashTagService.sortHashtags(task);
    }

    static sortHashtags(task: Task): void {
        task.hashTags = task.hashTags.sort(sortFunc);

    }

}



function sortFunc(a: string, b: string): number {
    const propertynames = ['#title', '#description', '#lastModifyUserEmail', '#startDate', '#dueDate', '#lastModifyDate', '#assignee'];
    if (propertynames.includes(a) && !propertynames.includes(b)) {
        return -1;
    }

    if (!propertynames.includes(a) && propertynames.includes(b)) {
        return 1;
    }

    return (a as any) - (b as any);
}




function stringPropertyHandler(obj: Task, propertyName: keyof Task, hashTags: string[]): string[] | null {
    const hashTagPrefix = `#${propertyName}-`;
    const filteredHashTags = hashTags.filter(v => !v.startsWith(hashTagPrefix));

    const newHashTag = obj[propertyName] ? `${hashTagPrefix}${obj[propertyName]}` : null;

    return newHashTag ? [...filteredHashTags, newHashTag] : filteredHashTags;
}

function stringArrayPropertyHandler(obj: Task, propertyName: keyof Task, hashTags: string[]): string[] | null {
    const hashTagPrefix = `#${propertyName}-`;
    const filteredHashTags = hashTags.filter(v => !v.startsWith(hashTagPrefix));

    const value = obj[propertyName] as string[];
    const newHashTags = value ? value.map(v => `${hashTagPrefix}${v}`) : null;

    return newHashTags ? [...filteredHashTags, ...newHashTags] : filteredHashTags;
}

function dateTimePropertyHandler(obj: Task, propertyName: keyof Task, hashTags: string[]): string[] | null {
    const hashTagPrefix = `#${propertyName}-`;
    const filteredHashTags = hashTags.filter(v => !v.startsWith(hashTagPrefix));

    const value = obj[propertyName] as Date;
    const newHashTag = value ? `${hashTagPrefix}${value.getMonth()}/${value.getDate()}/${value.getFullYear()}` : null;

    return newHashTag ? [...filteredHashTags, newHashTag] : filteredHashTags;
}



// function handleProperty(obj: ITask, key: keyof ITask): string[] {

//     if (['hashTags', 'comments', 'description', 'title'].includes(key)) {
//         return obj.hashTags;
//     }

//     if (key === 'assignee') {
//         const assigneePrefix = '#assignee';
//         const newAssigneeHashs = obj.assignee.map((name: string) => `${assigneePrefix}-${name}`);
//         const res = newAssigneeHashs.concat(obj.hashTags.filter((val: string) => !val.startsWith(assigneePrefix)));

//         return res;
//     }

//     const prefix = `#${key}`;
//     const res = obj.hashTags.filter((val: string) => !val.startsWith(prefix));

//     const propValueMissing = (obj[key] !== typeof Boolean && !obj[key])
//         || (obj[key] && obj[key] === typeof [] && (obj[key] as []).length === 0);

//     if (propValueMissing) {
//         return res;
//     }
//     console.log('DEBUG 1 is date. Key=', key, 'obj[key] === typeof Date=', obj[key] === typeof Date, ' typeof obj[key]=', typeof obj[key]);

//     let newHashTag = `${prefix}-${obj[key]}`;
//     if (obj[key] === typeof Date) {
//         const date: Date = obj[key] as Date;
//         newHashTag = `${prefix}-${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
//     }
//     res.push(newHashTag);
//     return res;
// }

