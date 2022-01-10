import { format } from 'date-fns'

export function dataToString(date) {
    if (!date) { return ''; }
    return format(date, 'yyyy年M月d日 HH時mm分');
}
