import { useEffect, useState } from "react";
import { getDataServiceFn } from "../api/getDataService";
import { subDays, format, startOfMonth, differenceInCalendarDays } from "date-fns";

export const useUsersIntoPage = async() => {
    const {data: getDataServiceVar} = await getDataServiceFn({ pageParam: 1 });
    console.log(getDataServiceVar)
    const [last30DaysDataUsers, setLast30DaysDataUsers] = useState<number[]>([]);
    const [quantityLast30DaysDataUsers, setQuantityLast30DaysDataUsers] = useState<number>(0);
    const [actualDaysDataUsers, setActualDaysDataUsers] = useState<number[]>([]);
    const [quantityActualDaysDataUsers, setQuantityActualDaysDataUsers] = useState<number>(0);
    const [quantityCountriesLast30Days, setQuantityCountriesLast30Days] = useState<{ [key: string]: number }>({});
    const [quantityCountriesActualDays, setQuantityCountriesActualDays] = useState<{ [key: string]: number }>({});

    // Para los últimos 30 días
    useEffect(() => {
        if (getDataServiceVar && getDataServiceVar.length) {
            const now = new Date();
            const counts = [];
            const countries: { [key: string]: number } = {};

            for (let i = 0; i < 31; i++) {
                const targetDate = subDays(now, i);
                const formattedDate = format(targetDate, "yyyy-MM-dd");

                if (Array.isArray(getDataServiceVar)) {
                    const count = getDataServiceVar.filter(
                        (item: any) => format(new Date(item.date), "yyyy-MM-dd") === formattedDate
                    ).length;

                    counts.push(count);

                    // Contar los países de América
                    getDataServiceVar.forEach((item: any) => {
                        if (format(new Date(item.date), "yyyy-MM-dd") === formattedDate) {
                            if (item.country in countries) {
                                countries[item.country]++;
                            } else {
                                countries[item.country] = 1;
                            }
                        }
                    });
                }
            }

            setLast30DaysDataUsers(counts.reverse());
            setQuantityCountriesLast30Days(countries);
        }
    }, [getDataServiceVar]);

    useEffect(() => {
        if (last30DaysDataUsers) {
            setQuantityLast30DaysDataUsers(last30DaysDataUsers.reduce((a, b) => a + b, 0));
        }
    }, [last30DaysDataUsers]);

    // Para los días del mes actual
    useEffect(() => {
        if (getDataServiceVar && getDataServiceVar.length) {
            const now = new Date();
            const startOfCurrentMonth = startOfMonth(now);
            const daysInCurrentMonth = differenceInCalendarDays(now, startOfCurrentMonth) + 1;

            const monthCounts = [];
            const monthCountries: { [key: string]: number } = {};

            for (let i = 0; i < daysInCurrentMonth; i++) {
                const targetDate = subDays(now, i);
                const formattedDate = format(targetDate, "yyyy-MM-dd");

                if (Array.isArray(getDataServiceVar)) {
                    const count = getDataServiceVar.filter(
                        (item: any) => format(new Date(item.date), "yyyy-MM-dd") === formattedDate
                    ).length;

                    monthCounts.push(count);

                    // Contar los países de América
                    getDataServiceVar.forEach((item: any) => {
                        if (format(new Date(item.date), "yyyy-MM-dd") === formattedDate) {
                            if (item.country in monthCountries) {
                                monthCountries[item.country]++;
                            } else {
                                monthCountries[item.country] = 1;
                            }
                        }
                    });
                }
            }

            setActualDaysDataUsers(monthCounts.reverse());
            setQuantityCountriesActualDays(monthCountries);
        }
    }, [getDataServiceVar]);
    
    useEffect(() => {
        if (actualDaysDataUsers) {
            setQuantityActualDaysDataUsers(actualDaysDataUsers.reduce((a, b) => a + b, 0));
        }
    }, [actualDaysDataUsers]);

    console.log(quantityCountriesLast30Days);
    console.log(quantityCountriesActualDays);

    return { 
        last30DaysDataUsers, 
        quantityLast30DaysDataUsers, 
        actualDaysDataUsers, 
        quantityActualDaysDataUsers, 
        quantityCountriesLast30Days,
        quantityCountriesActualDays 
    };
};
