import { useEffect, useState } from "react";
import { getDataServiceFn } from "../api/getDataService";
import { subDays, format, startOfMonth, differenceInCalendarDays } from "date-fns";

export const useUsersIntoPage = () => {
    const getDataServiceVar = getDataServiceFn()
    const [last30DaysDataUsers, setLast30DaysDataUsers] = useState<number[]>([])
    const [quantityLast30DaysDataUsers, setQuantityLast30DaysDataUsers] = useState<number>(0)
    const [actualDaysDataUsers, setActualDaysDataUsers] = useState<number[]>([])
    const [quantityActualDaysDataUsers, setQuantityActualDaysDataUsers] = useState<number>(0)

    useEffect(() => {
        if (getDataServiceVar && getDataServiceVar.length) {
            const now = new Date();
            const counts = [];

            // Para los últimos 30 días
            for (let i = 0; i < 31; i++) {
                const targetDate = subDays(now, i);
                const formattedDate = format(targetDate, "yyyy-MM-dd");

                if (Array.isArray(getDataServiceVar)) {
                    const count = getDataServiceVar.filter(
                        (item: any) => format(new Date(item.date), "yyyy-MM-dd") === formattedDate
                    ).length;

                    counts.push(count);
                }
            }

            setLast30DaysDataUsers(counts.reverse());
        }
    }, [getDataServiceVar]);

    useEffect(() => {
        if (last30DaysDataUsers) {
            setQuantityLast30DaysDataUsers(last30DaysDataUsers.reduce((a, b) => a + b, 0));
        }
    }, [last30DaysDataUsers]);

    useEffect(() => {
        if (getDataServiceVar && getDataServiceVar.length) {
            const now = new Date();
            const startOfCurrentMonth = startOfMonth(now);
            const daysInCurrentMonth = differenceInCalendarDays(now, startOfCurrentMonth) + 1;

            const monthCounts = [];

            for (let i = 0; i < daysInCurrentMonth; i++) {
                const targetDate = subDays(now, i);
                const formattedDate = format(targetDate, "yyyy-MM-dd");

                if (Array.isArray(getDataServiceVar)) {
                    const count = getDataServiceVar.filter(
                        (item: any) => format(new Date(item.date), "yyyy-MM-dd") === formattedDate
                    ).length;

                    monthCounts.push(count);
                }
            }

            setActualDaysDataUsers(monthCounts.reverse());
        }
    }, [getDataServiceVar]);
    
    useEffect(() => {
        if (actualDaysDataUsers) {
            setQuantityActualDaysDataUsers(actualDaysDataUsers.reduce((a, b) => a + b, 0))
        }
    }, [actualDaysDataUsers])

    return { last30DaysDataUsers, quantityLast30DaysDataUsers, actualDaysDataUsers,quantityActualDaysDataUsers }
};
