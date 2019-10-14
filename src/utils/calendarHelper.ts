export type tables = "2seatsVIP" | "3seatsStd" | "3seatsVIP"

export type tableType = {
  sort: number
  name: string
}

type tableTypes = {
  [t in tables]: tableType
}

export const tableTypes: tableTypes = {
  "2seatsVIP": {
    sort: 1,
    name: "2 seats, VIP"
  },
  "3seatsStd": {
    sort: 2,
    name: "3 seats, standart"
  },
  "3seatsVIP": {
    sort: 3,
    name: "3 seats, VIP"
  }
};

export const bookingTime = [
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00"
] as const;

export type bookingTimeType = typeof bookingTime[number]

type tableData = {
  [t in tables]: bookingTimeType[]
}

type calendarDay = {
  date: number,
  tables: Partial<tableData>
}

export type calendarData = {
  dates: calendarDay[]
}

const dayMs = 1000 * 60 * 60 * 24

export const dataMock: calendarData =
{
  dates: [
    {
      date: 1554152400000, //02.04.2019
      tables: {
        "2seatsVIP": [],
        "3seatsVIP": ["11:00", "12:00", "17:00"],
        "3seatsStd": ["11:00", "12:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
      }
    },
    {
      date: 1554152400000 + dayMs, 
      tables: {
        "2seatsVIP": ["12:00", "14:00", "17:00"],
        "3seatsVIP": ["11:00", "12:00", "17:00", "19:00"],
        "3seatsStd": ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",  "22:00"],
      }
    },
    {
      date: 1554152400000 + dayMs * 2, 
      tables: {
        "2seatsVIP": ["12:00", "14:00", "17:00"],
        "3seatsVIP": ["11:00", "12:00", "17:00", "19:00"],
        "3seatsStd": ["11:00", "12:00", "16:00"],
      }
    },
    {
      date: 1554152400000 + dayMs * 3, 
      tables: {
        "2seatsVIP": ["12:00", "14:00", "17:00"],
        "3seatsVIP": ["11:00", "13:00", "17:00", "19:00"],
        "3seatsStd": ["11:00", "14:00", "16:00"],
      }
    },
    {
      date: 1554152400000 + dayMs * 4, 
      tables: {
        "2seatsVIP": ["12:00", "14:00", "17:00"],
        "3seatsVIP": ["11:00", "12:00", "17:00", "19:00"],
        "3seatsStd": ["11:00", "12:00", "16:00"],
      }
    },
    {
      date: 1554152400000 + dayMs * 5, 
      tables: {
        "2seatsVIP": ["12:00", "14:00", "17:00"],
        "3seatsVIP": ["11:00", "12:00", "17:00", "19:00"],
        "3seatsStd": ["11:00", "12:00", "16:00"],
      }
    },
    {
      date: 1554152400000 + dayMs * 6, 
      tables: {
        "2seatsVIP": ["12:00", "14:00", "17:00"],
        "3seatsVIP": ["11:00", "12:00", "17:00", "19:00"],
        "3seatsStd": ["11:00", "12:00", "16:00"],
      }
    },
    {
      date: 1554152400000 + dayMs * 7, 
      tables: {
        "2seatsVIP": ["12:00", "14:00", "17:00"],
        "3seatsVIP": ["11:00", "12:00", "17:00", "19:00"],
        "3seatsStd": ["11:00", "12:00", "16:00"],
      }
    },
    {
      date: 1554152400000 + dayMs * 8, 
      tables: {
        "2seatsVIP": ["12:00", "14:00", "17:00"],
        "3seatsVIP": ["11:00", "12:00", "17:00", "19:00"],
        "3seatsStd": ["11:00", "12:00", "16:00"],
      }
    },
  ]
};

export function gettingData () {
  return new Promise<calendarData>((resolve, reject) => {
    resolve(dataMock)
  })  
}

export function isBookedTime(bookedTime: Partial<bookingTimeType>[], time: bookingTimeType): boolean {
  return bookedTime.includes(time)
}

export function getPercentage(bookedTime: Partial<bookingTimeType>[]): number {
  const perc = 100* bookedTime.length / bookingTime.length
  return parseInt(String(perc));
}
export function getDates(calendarData: calendarData): number[] {
  const dates: number[] = [];
  calendarData.dates!.forEach(day => {
    dates.push(day.date)
  });
  return dates;
}