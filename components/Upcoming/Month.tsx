import { monthNames } from "../../utils/client";
import DayOfMonth from "./DayOfMonth";

interface IMonth {
    month: number;
    days: Array<any>;
}

export default function Month({ month, days }: IMonth) {
    return (
        <>
            <h2 className="mb-1 text-lg font-black text-white">
                {monthNames[month]}
            </h2>
            <div
                className="grid w-11/12 gap-3 mb-10"
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(210px, 1fr))",
                }}
            >
                {days.map((dayOfMonth: any) => {
                    return (
                        <DayOfMonth
                            key={dayOfMonth.dayOfMonth}
                            dayOfMonth={dayOfMonth.dayOfMonth}
                            month={dayOfMonth.month}
                            collections={dayOfMonth.collections}
                        />
                    );
                })}
            </div>
        </>
    );
}
