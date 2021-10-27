import { useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Loader from "../components/Loader";
import Month from "../components/Upcoming/Month";

import Head from "next/head";

export default function Upcoming() {
    const [isLoading, setIsLoading] = useState(true);

    const [months, setMonths] = useState([]);

    async function fetchUpcoming() {
        const res = await fetch(
            `/api/collections?minDate=${new Date().getTime()}`
        );

        if (res.status === 200) {
            const resData = await res.json();
            console.log(resData);

            parseDates(resData);
        }
    }

    function parseDates(data: Array<any>) {
        let ret: any = [];

        data.forEach((collection) => {
            let listDate = new Date(collection.listDate);

            let dayExists = false;
            ret.forEach((date: any) => {
                console.log(listDate.getDate());

                if (
                    date.dayOfMonth === listDate.getDate() &&
                    date.month === listDate.getMonth()
                ) {
                    dayExists = true;

                    date.collections.push(collection);
                }
            });

            if (!dayExists) {
                console.log("pushing new");
                ret.push({
                    dayOfMonth: listDate.getDate(),
                    month: listDate.getMonth(),
                    collections: [collection],
                });
            }
        });

        sortDates(ret);
    }

    function sortDates(data: any) {
        data.forEach((dateType: any) => {
            dateType.collections = dateType.collections.sort(
                (a: any, b: any) => {
                    return a.listDate - b.listDate;
                }
            );
        });

        parseByMonth(data);
    }

    function parseByMonth(data: any) {
        let ret: any = [];

        data.forEach((dateType: any) => {
            console.log(dateType);
            let monthExists = false;

            ret.forEach((month: any) => {
                if (month.month === dateType.month) {
                    monthExists = true;

                    month.days.push(dateType);
                }
            });

            if (!monthExists) {
                ret.push({
                    month: dateType.month,
                    days: [dateType],
                });
            }
        });

        setMonths(ret);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchUpcoming();
    }, []);

    return (
        <>
            <Head>
                <title>Rarity Radar - Upcoming</title>
                <meta name="title" content={`Rarity Radar - Upcoming`} />

                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Rarity Radar - Upcoming`} />

                <meta
                    property="twitter:title"
                    content={`Rarity Radar - Upcoming`}
                />
            </Head>

            <div
                className="flex flex-col items-center w-11/12 pt-12 animate-fadeIn"
                style={{ minHeight: "calc(100vh - 64px)" }}
            >
                <h1 className="self-start mb-10 text-4xl font-extrabold transition-opacity duration-300 hover:opacity-70 dark:text-white">
                    upcoming
                </h1>

                <SwitchTransition>
                    <CSSTransition
                        key={isLoading ? "true" : "false"}
                        classNames="fade"
                        timeout={300}
                    >
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <div className="flex flex-col w-full">
                                {months.map((month: any) => {
                                    return (
                                        <Month
                                            key={month.month}
                                            month={month.month}
                                            days={month.days}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </>
    );
}
