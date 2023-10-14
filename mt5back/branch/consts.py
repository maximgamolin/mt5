from datetime import time, timedelta, datetime

INTERVALS = (
    (
        time(hour, minute),
        (datetime.combine(datetime.today(), time(hour, minute)) + timedelta(minutes=15)).time()
    )
    for hour in range(24) for minute in [0, 15, 30, 45]
)

INTERVALS_WITH_ALIAS = {
    f"T{i[0].strftime('%H%M')}_{i[1].strftime('%H%M')}": i for i in INTERVALS
}
