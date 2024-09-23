// import { useEffect, useState } from "react";
import { getDataServiceFn } from "../api/getDataService";
// import { subDays, format, startOfMonth, differenceInCalendarDays } from "date-fns";

export const useUsersIntoPage = async() => {
    const {data: getDataServiceVar2} = await getDataServiceFn({ pageParam: 1 });
    console.log(getDataServiceVar2)
    console.log(getDataServiceVar2)
    const  getDataServiceVar =  [{
        id: 1,
        country: 'Colombia',
        city: 'Bogotá',
        path: '/home',
        device: 'Desktop',
        user_id: '550e8400-e29b-41d4-a716-446655440000',
        date: '2024-08-19T00:00:00.000Z',
        time: '15:30:00',
        duration: { minutes: 45 }
      },
      {
        id: 2,
        country: 'Colombia',
        city: 'Pereira',
        path: '/sistemasautoorganizados',
        device: 'computador',
        user_id: 'EMNQ1724109429600',
        date: '2024-08-19T00:00:00.000Z',
        time: '18:17:00',
        duration: { minutes: 3, seconds: 19 }
      },
      {
        id: 3,
        country: 'Colombia',
        city: 'Cartago',
        path: '/sistemasautoorganizados',
        device: 'celular',
        user_id: 'FSYT1724110154797',
        date: '2024-08-19T00:00:00.000Z',
        time: '18:29:00',
        duration: { hours: 1, minutes: 13, seconds: 45 }
      },
      {
        id: 4,
        country: 'Colombia',
        city: 'Bogotá',
        path: '/',
        device: 'celular',
        user_id: 'FEPL1724110175317',
        date: '2024-08-19T00:00:00.000Z',
        time: '18:29:00',
        duration: { seconds: 39 }
      }]
    console.log(getDataServiceVar)
    // const [last30DaysDataUsers, setLast30DaysDataUsers] = useState()
    // const [quantityLast30DaysDataUsers, setQuantityLast30DaysDataUsers] = useState<number>(0);
    // const [actualDaysDataUsers, setActualDaysDataUsers] = useState<number[]>([]);
    // const [quantityActualDaysDataUsers, setQuantityActualDaysDataUsers] = useState<number>(0);
    // const [quantityCountriesLast30Days, setQuantityCountriesLast30Days] = useState<{ [key: string]: number }>({});              
    // const [quantityCountriesActualDays, setQuantityCountriesActualDays] = useState<{ [key: string]: number }>({});

    // Para los últimos 30 días
    // useEffect(() => {
    //     if (getDataServiceVar && getDataServiceVar.length) {
    //         const now = new Date();
    //         const counts = [];
    //         const countries: { [key: string]: number } = {};

    //         for (let i = 0; i < 31; i++) {
    //             const targetDate = subDays(now, i);
    //             const formattedDate = format(targetDate, "yyyy-MM-dd");

    //             if (Array.isArray(getDataServiceVar)) {
    //                 const count = getDataServiceVar.filter(
    //                     (item: any) => format(new Date(item.date), "yyyy-MM-dd") === formattedDate
    //                 ).length;

    //                 counts.push(count);

    //                 // Contar los países de América
    //                 getDataServiceVar.forEach((item: any) => {
    //                     if (format(new Date(item.date), "yyyy-MM-dd") === formattedDate) {
    //                         if (item.country in countries) {
    //                             countries[item.country]++;
    //                         } else {
    //                             countries[item.country] = 1;
    //                         }
    //                     }
    //                 });
    //             }
    //         }

    //         // setLast30DaysDataUsers(counts.reverse());
    //         setQuantityCountriesLast30Days(countries);
    //     }
    // }, [getDataServiceVar]);

    // useEffect(() => {
    //     if (last30DaysDataUsers) {
    //         setQuantityLast30DaysDataUsers(last30DaysDataUsers.reduce((a, b) => a + b, 0));
    //     }
    // }, [last30DaysDataUsers]);

    // Para los días del mes actual
    // useEffect(() => {
    //     if (getDataServiceVar && getDataServiceVar.length) {
    //         const now = new Date();
    //         const startOfCurrentMonth = startOfMonth(now);
    //         const daysInCurrentMonth = differenceInCalendarDays(now, startOfCurrentMonth) + 1;

    //         const monthCounts = [];
    //         const monthCountries: { [key: string]: number } = {};

    //         for (let i = 0; i < daysInCurrentMonth; i++) {
    //             const targetDate = subDays(now, i);
    //             const formattedDate = format(targetDate, "yyyy-MM-dd");

    //             if (Array.isArray(getDataServiceVar)) {
    //                 const count = getDataServiceVar.filter(
    //                     (item: any) => format(new Date(item.date), "yyyy-MM-dd") === formattedDate
    //                 ).length;

    //                 monthCounts.push(count);

    //                 // Contar los países de América
    //                 getDataServiceVar.forEach((item: any) => {
    //                     if (format(new Date(item.date), "yyyy-MM-dd") === formattedDate) {
    //                         if (item.country in monthCountries) {
    //                             monthCountries[item.country]++;
    //                         } else {
    //                             monthCountries[item.country] = 1;
    //                         }
    //                     }
    //                 });
    //             }
    //         }

    //         setActualDaysDataUsers(monthCounts.reverse());
    //         setQuantityCountriesActualDays(monthCountries);
    //     }
    // }, [getDataServiceVar]);
    
    // useEffect(() => {
    //     if (actualDaysDataUsers) {
    //         setQuantityActualDaysDataUsers(actualDaysDataUsers.reduce((a, b) => a + b, 0));
    //     }
    // }, [actualDaysDataUsers]);

    // console.log(quantityCountriesLast30Days);
    // console.log(quantityCountriesActualDays);
    const  last30DaysDataUsers = [{1:1,2:2}]
    const quantityLast30DaysDataUsers = [1,2] 
    const actualDaysDataUsers = [1,2] 
    const quantityActualDaysDataUsers = [1,2] 
    const quantityCountriesLast30Days = [{1:1,2:2}]
    const quantityCountriesActualDays = [{1:1,2:2}]

    return { 
        last30DaysDataUsers, 
        quantityLast30DaysDataUsers, 
        actualDaysDataUsers, 
        quantityActualDaysDataUsers, 
        quantityCountriesLast30Days,
        quantityCountriesActualDays 
    };
};
