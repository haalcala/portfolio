import {getData} from 'country-list';

type Country = {
    name: string;
    code: string;
}

export const COUNTRIES = getData().sort((a: Country, b: Country) => (a.name > b.name ? 1 : -1));
