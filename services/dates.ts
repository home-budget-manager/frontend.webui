export interface DatesService {
    toDateString(date: Date): string;
}

export class DatesServiceImpl implements DatesService {
    toDateString(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

export function createDatesService(): DatesService {
    return new DatesServiceImpl();
}

export const datesService: DatesService = createDatesService();