import { Injectable } from "@angular/core";
import { ITask } from "./models";

@Injectable({ providedIn: 'root' })
export class HashTagService {

    public recalculateHashTags(task: ITask): void {

        const curryStringProperyTypeHandler = (porpertyName: string) => (obj: ITask, key: keyof ITask, hashTags: string[]): string[] | null => key === porpertyName ? stringPropertyHandler(obj, key, hashTags) : null;
        const curryStringArrayProperyTypeHandler = (porpertyName: string) => (obj: ITask, key: keyof ITask, hashTags: string[]): string[] | null => key === porpertyName ? stringArrayPropertyHandler(obj, key, hashTags) : null;
        const curryDateProperyTypeHandler = (porpertyName: string) => (obj: ITask, key: keyof ITask, hashTags: string[]): string[] | null => key === porpertyName ? dateTimePropertyHandler(obj, key, hashTags) : null;

        const handlers = [
            curryStringProperyTypeHandler('id'),
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

        this.sortDistinctHashtags(task);
    }

    public sortDistinctHashtags(task: ITask): void {
        task.hashTags = task.hashTags.filter((value, index, self) => self.indexOf(value) === index).sort(sortFunc);
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




function stringPropertyHandler(obj: ITask, propertyName: keyof ITask, hashTags: string[]): string[] | null {
    const hashTagPrefix = `#${propertyName}-`;
    const filteredHashTags = hashTags.filter(v => !v.startsWith(hashTagPrefix));

    const newHashTag = obj[propertyName] ? `${hashTagPrefix}${obj[propertyName]}` : null;

    return newHashTag ? [...filteredHashTags, newHashTag] : filteredHashTags;
}

function stringArrayPropertyHandler(obj: ITask, propertyName: keyof ITask, hashTags: string[]): string[] | null {
    const hashTagPrefix = `#${propertyName}-`;
    const filteredHashTags = hashTags.filter(v => !v.startsWith(hashTagPrefix));

    const value = obj[propertyName] as string[];
    const newHashTags = value ? value.map(v => `${hashTagPrefix}${v}`) : null;

    return newHashTags ? [...filteredHashTags, ...newHashTags] : filteredHashTags;
}

function dateTimePropertyHandler(obj: ITask, propertyName: keyof ITask, hashTags: string[]): string[] | null {
    const hashTagPrefix = `#${propertyName}-`;
    const filteredHashTags = hashTags.filter(v => !v.startsWith(hashTagPrefix));

    const value = obj[propertyName] as Date;
    const newHashTag = value ? `${hashTagPrefix}${value.getMonth()}/${value.getDate()}/${value.getFullYear()}` : null;

    return newHashTag ? [...filteredHashTags, newHashTag] : filteredHashTags;
}