import {Pipe, PipeTransform} from '@angular/core';
import {IdValuePairArray} from '../interfaces/id-value-pair-array';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: IdValuePairArray, searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLocaleLowerCase();

        return items.filter(it => {
            return it.value.toLocaleLowerCase().includes(searchText);
        });
    }
}
