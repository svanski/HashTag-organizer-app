import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionFacade } from "./session.facade";

@Injectable({ providedIn: 'root' })
export class HashTagsRepository {

    private readonly repo: BehaviorSubject<string[]>;
    private readonly sessionFacade = SessionFacade<string[]>('PlannerAppHashtags');

    constructor() {
        const dataArr = this.sessionFacade.load() ?? [];
        this.repo = new BehaviorSubject<string[]>(dataArr);

        this.repo.subscribe(tasks => this.sessionFacade.save(tasks));
    }

    public getHashTags(): Observable<string[]> {
        return this.repo;
    }

    public addHashTags(...hashTags: string[]): void {
        if (!hashTags || hashTags.length < 1) {
            return;
        }

        const allHashTags = this.repo.value.concat(hashTags);
        const uniqueHashTags = allHashTags.filter((value, index, self) => self.indexOf(value) === index);
        uniqueHashTags.sort();

        this.repo.next(uniqueHashTags);
    }

}