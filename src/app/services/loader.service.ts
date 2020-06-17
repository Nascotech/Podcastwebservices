import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class LoaderService {
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public IsCustomer: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public IsHelp: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    isCustomer(value: boolean) {
        this.IsCustomer.next(value);
    }

    display(value: boolean) {
        this.status.next(value);
    }

    isHelp(value:boolean){
        this.IsHelp.next(value)
    }
}